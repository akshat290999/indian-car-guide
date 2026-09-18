# Community-submission review queue. SQLite (stdlib sqlite3, no new
# dependency) rather than a JSON file (unsafe concurrent writes, no
# query-by-status) or Postgres (a new service to run/back up on a
# single-EC2-box deploy for a queue that will hold a handful of rows/month
# at launch).
#
# The DB file MUST live outside the git-managed clone: deploy.yml runs
# `git reset --hard origin/main` on every push, and a file inside the repo
# path is one future `git clean -fd` away from silently wiping the queue.
# Point MODLANE_DB_PATH at a directory outside ~/app on EC2 (same pattern as
# the existing REDIS_URL env var in main.py). Local dev defaults to a
# gitignored file next to this module.
import json
import os
import sqlite3
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from database.modlane.schema import (
    PriceRange,
    RealityScore,
    RtoRisk,
    Source,
    SubmissionApproval,
    SubmissionCreate,
)

_DEFAULT_DB_PATH = Path(__file__).resolve().parent.parent / "modlane_dev.db"
DB_PATH = Path(os.getenv("MODLANE_DB_PATH", str(_DEFAULT_DB_PATH)))

_SCHEMA = """
CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'pending',
    submitted_at TEXT NOT NULL,
    submitter_contact TEXT,
    car_model TEXT NOT NULL,
    car_variant TEXT,
    category_id TEXT NOT NULL,
    mod_name TEXT NOT NULL,
    city TEXT NOT NULL,
    workshop_name TEXT NOT NULL,
    cost_paid_inr INTEGER NOT NULL,
    install_date TEXT,
    photo_paths TEXT NOT NULL,
    self_reported_warranty_experience TEXT,
    self_reported_road_clearance_experience TEXT,
    self_reported_rto_state TEXT NOT NULL,
    self_reported_rto_experience TEXT,
    editorial_reviewer TEXT,
    editorial_notes TEXT,
    corroborating_sources TEXT,
    final_warranty_risk TEXT,
    final_road_clearance_risk TEXT,
    final_rto_risk TEXT,
    final_price_range TEXT,
    final_fitment_notes TEXT,
    final_applicable_variant_ids TEXT,
    final_mod_name TEXT,
    published_mod_id TEXT,
    rejection_reason TEXT,
    reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
"""


@contextmanager
def _connect():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with _connect() as conn:
        conn.executescript(_SCHEMA)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def create_submission(payload: SubmissionCreate) -> str:
    submission_id = str(uuid.uuid4())
    with _connect() as conn:
        conn.execute(
            """
            INSERT INTO submissions (
                id, status, submitted_at, submitter_contact, car_model, car_variant,
                category_id, mod_name, city, workshop_name, cost_paid_inr, install_date,
                photo_paths, self_reported_warranty_experience,
                self_reported_road_clearance_experience, self_reported_rto_state,
                self_reported_rto_experience
            ) VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                submission_id,
                _now(),
                payload.submitter_contact,
                payload.car_model,
                payload.car_variant,
                payload.category_id,
                payload.mod_name,
                payload.city,
                payload.workshop_name,
                payload.cost_paid_inr,
                payload.install_date,
                json.dumps(payload.photo_paths),
                payload.self_reported_warranty_experience,
                payload.self_reported_road_clearance_experience,
                payload.self_reported_rto_state,
                payload.self_reported_rto_experience,
            ),
        )
    return submission_id


def _row_to_dict(row: sqlite3.Row) -> dict:
    d = dict(row)
    for json_field in (
        "photo_paths",
        "corroborating_sources",
        "final_warranty_risk",
        "final_road_clearance_risk",
        "final_rto_risk",
        "final_price_range",
        "final_applicable_variant_ids",
    ):
        if d.get(json_field):
            d[json_field] = json.loads(d[json_field])
    return d


def list_submissions(status: Optional[str] = None) -> list[dict]:
    with _connect() as conn:
        if status:
            rows = conn.execute(
                "SELECT * FROM submissions WHERE status = ? ORDER BY submitted_at DESC", (status,)
            ).fetchall()
        else:
            rows = conn.execute("SELECT * FROM submissions ORDER BY submitted_at DESC").fetchall()
    return [_row_to_dict(r) for r in rows]


def get_submission(submission_id: str) -> Optional[dict]:
    with _connect() as conn:
        row = conn.execute("SELECT * FROM submissions WHERE id = ?", (submission_id,)).fetchone()
    return _row_to_dict(row) if row else None


class SubmissionNotFound(Exception):
    pass


class SubmissionNotPending(Exception):
    pass


def approve_submission(submission_id: str, approval: SubmissionApproval) -> dict:
    """Marks a submission approved and returns the Mod-shaped dict it now
    publishes as. Structurally cannot succeed without corroborating_sources
    and all three final_* scores, enforced by SubmissionApproval itself
    (Pydantic requires them) — an editor cannot approve by just echoing the
    submitter's self-reported text back out.
    """
    existing = get_submission(submission_id)
    if existing is None:
        raise SubmissionNotFound(submission_id)
    if existing["status"] != "pending":
        raise SubmissionNotPending(f"submission {submission_id} is '{existing['status']}', not 'pending'")

    published_mod_id = f"community-{submission_id}"
    with _connect() as conn:
        conn.execute(
            """
            UPDATE submissions SET
                status = 'approved',
                editorial_reviewer = ?,
                corroborating_sources = ?,
                final_warranty_risk = ?,
                final_road_clearance_risk = ?,
                final_rto_risk = ?,
                final_price_range = ?,
                final_fitment_notes = ?,
                final_applicable_variant_ids = ?,
                final_mod_name = ?,
                published_mod_id = ?,
                reviewed_at = ?
            WHERE id = ?
            """,
            (
                approval.editorial_reviewer,
                json.dumps([s.model_dump() for s in approval.corroborating_sources]),
                approval.final_warranty_risk.model_dump_json(),
                approval.final_road_clearance_risk.model_dump_json(),
                approval.final_rto_risk.model_dump_json(),
                approval.price_range.model_dump_json(),
                approval.fitment_notes,
                json.dumps(approval.applicable_variant_ids),
                approval.mod_name_override,
                published_mod_id,
                _now(),
                submission_id,
            ),
        )
    return get_submission(submission_id)


def reject_submission(submission_id: str, rejection_reason: str) -> dict:
    existing = get_submission(submission_id)
    if existing is None:
        raise SubmissionNotFound(submission_id)
    if existing["status"] != "pending":
        raise SubmissionNotPending(f"submission {submission_id} is '{existing['status']}', not 'pending'")
    with _connect() as conn:
        conn.execute(
            "UPDATE submissions SET status = 'rejected', rejection_reason = ?, reviewed_at = ? WHERE id = ?",
            (rejection_reason, _now(), submission_id),
        )
    return get_submission(submission_id)


def approved_submissions_as_mods() -> list[dict]:
    """Materializes approved submissions into Mod-shaped dicts at read time —
    the SQLite row is the source of truth, nothing gets written back into the
    hand-authored YAML files.
    """
    mods = []
    for row in list_submissions(status="approved"):
        final_rto_risk = json.loads(row["final_rto_risk"]) if isinstance(row["final_rto_risk"], str) else row["final_rto_risk"]
        mods.append(
            {
                "id": row["published_mod_id"],
                "name": row["final_mod_name"] or row["mod_name"],
                "category_id": row["category_id"],
                "applicable_cars": [row["car_model"]],
                "applicable_variant_ids": row["final_applicable_variant_ids"] or "all",
                "price_range": row["final_price_range"],
                "fitment_notes": row["final_fitment_notes"],
                "warranty_risk": row["final_warranty_risk"],
                "road_clearance_risk": row["final_road_clearance_risk"],
                "rto_risk": final_rto_risk,
                "editorial_status": "community_submitted",
                "source_submission_id": row["id"],
                "workshop_links": [{"city": row["city"], "workshop_name": row["workshop_name"], "whatsapp_link": None}],
                "photos": row["photo_paths"],
                "disclaimer": (
                    "Based on community research and editorial judgment, not official "
                    "manufacturer or government policy."
                ),
                "last_reviewed": row["reviewed_at"],
            }
        )
    return mods


init_db()
