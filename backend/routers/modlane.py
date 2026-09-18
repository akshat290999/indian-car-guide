# ModLane API — the cosmetic-modification vertical alongside Tuner's Guide.
# Read routes serve the hand-authored YAML catalog (database/modlane/loader.py).
# Write routes run the community-submission review queue (database/submissions_db.py).
#
# Split into its own router (rather than growing main.py further) because
# the write routes below add real complexity — auth, validation, a second
# data store — that the original 4-route, read-only main.py never had to
# carry.
import os

from fastapi import APIRouter, Depends, Header, HTTPException

from database import submissions_db
from database.modlane import loader
from database.modlane.schema import SubmissionApproval, SubmissionCreate, SubmissionRejection

router = APIRouter(prefix="/api/modlane", tags=["modlane"])


# ── Admin auth ────────────────────────────────────────────────────────────
# No auth exists anywhere else in this app today. A shared-secret header is
# the deliberate v1 floor, not the end state — real login is a fast-follow
# once submission volume justifies it. Fails CLOSED: if MODLANE_ADMIN_KEY
# isn't set, admin routes are unusable rather than silently open.
def require_admin(x_admin_key: str | None = Header(default=None)) -> None:
    configured_key = os.getenv("MODLANE_ADMIN_KEY")
    if not configured_key:
        raise HTTPException(status_code=503, detail="Admin routes are not configured on this server.")
    if x_admin_key != configured_key:
        raise HTTPException(status_code=401, detail="Invalid or missing X-Admin-Key header.")


# ── Read routes: editorial catalog ───────────────────────────────────────
@router.get("/categories")
def get_categories():
    return [c.model_dump() for c in loader.CATEGORIES]


@router.get("/mods")
def get_mods():
    editorial = [m.model_dump() for m in loader.MODS]
    community = submissions_db.approved_submissions_as_mods()
    return editorial + community


@router.get("/mods/{mod_id}")
def get_mod(mod_id: str):
    for m in loader.MODS:
        if m.id == mod_id:
            return m.model_dump()
    for m in submissions_db.approved_submissions_as_mods():
        if m["id"] == mod_id:
            return m
    raise HTTPException(status_code=404, detail=f"Mod '{mod_id}' not found")


@router.get("/recipes")
def get_recipes():
    return [r.model_dump() for r in loader.RECIPES]


@router.get("/cars/{model_name}")
def get_car_overlay(model_name: str):
    overlay = loader.CAR_OVERLAYS.get(model_name)
    if overlay is None:
        raise HTTPException(status_code=404, detail=f"No ModLane overlay for '{model_name}'")
    return overlay.model_dump()


@router.get("/rto-rules")
def get_rto_rules(state: str | None = None):
    """Optional ?state=KA merges that state's overrides (rto_rules/states/)
    onto the national baseline. Most states have no override file at all —
    Indian motor vehicle law is overwhelmingly national, not state-specific;
    see loader.load_rto_state_overrides for which states were checked.
    """
    rules = loader.rto_rules_for_state(state)
    return {cat: score.model_dump() for cat, score in rules.items()}


@router.get("/rto-rules/states")
def get_rto_rules_states():
    """Which states have a documented override on file at all."""
    return sorted(loader.RTO_STATE_OVERRIDES.keys())


# ── Write routes: community submission queue ─────────────────────────────
@router.post("/submissions", status_code=201)
def submit_mod(payload: SubmissionCreate):
    submission_id = submissions_db.create_submission(payload)
    return {"id": submission_id, "status": "pending"}


@router.get("/submissions", dependencies=[Depends(require_admin)])
def list_submissions(status: str | None = None):
    return submissions_db.list_submissions(status=status)


@router.patch("/submissions/{submission_id}/approve", dependencies=[Depends(require_admin)])
def approve_submission(submission_id: str, approval: SubmissionApproval):
    try:
        return submissions_db.approve_submission(submission_id, approval)
    except submissions_db.SubmissionNotFound:
        raise HTTPException(status_code=404, detail=f"Submission '{submission_id}' not found")
    except submissions_db.SubmissionNotPending as exc:
        raise HTTPException(status_code=409, detail=str(exc))


@router.patch("/submissions/{submission_id}/reject", dependencies=[Depends(require_admin)])
def reject_submission(submission_id: str, rejection: SubmissionRejection):
    try:
        return submissions_db.reject_submission(submission_id, rejection.rejection_reason)
    except submissions_db.SubmissionNotFound:
        raise HTTPException(status_code=404, detail=f"Submission '{submission_id}' not found")
    except submissions_db.SubmissionNotPending as exc:
        raise HTTPException(status_code=409, detail=str(exc))
