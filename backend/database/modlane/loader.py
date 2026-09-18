# Loads the hand-authored YAML editorial catalog into validated in-memory
# lists at import time — same "build once at startup" pattern main.py already
# uses for CARS_DATA (see main.py's _CARS_WITH_META). YAML instead of Python
# dicts specifically so a non-engineer content editor gets a clear per-field
# Pydantic error on a bad entry, not an opaque import-time exception.
from pathlib import Path
from typing import Dict, List

import yaml
from pydantic import ValidationError

from .schema import CarOverlay, ModCategory, Mod, RealityScore, StyleRecipe, VendorListing

_ROOT = Path(__file__).parent


class ModLaneDataError(Exception):
    """A YAML file under database/modlane/ failed schema validation."""


def _load_yaml_file(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f) or []


def _load_many(glob_dir: Path, pattern: str, model, list_field: str | None = None):
    records = []
    if not glob_dir.exists():
        return records
    for path in sorted(glob_dir.glob(pattern)):
        raw = _load_yaml_file(path)
        items = raw.get(list_field, raw) if (list_field and isinstance(raw, dict)) else raw
        if not items:
            continue
        for entry in items:
            try:
                records.append(model.model_validate(entry))
            except ValidationError as exc:
                raise ModLaneDataError(f"{path}: {exc}") from exc
    return records


def load_categories() -> List[ModCategory]:
    path = _ROOT / "categories.yaml"
    if not path.exists():
        return []
    raw = _load_yaml_file(path)
    try:
        return [ModCategory.model_validate(c) for c in raw]
    except ValidationError as exc:
        raise ModLaneDataError(f"{path}: {exc}") from exc


def load_mods() -> List[Mod]:
    return _load_many(_ROOT / "mods", "*.yaml", Mod)


def load_recipes() -> List[StyleRecipe]:
    return _load_many(_ROOT / "recipes", "*.yaml", StyleRecipe)


def load_vendors() -> List[VendorListing]:
    path = _ROOT / "vendors.yaml"
    if not path.exists():
        return []
    raw = _load_yaml_file(path)
    try:
        return [VendorListing.model_validate(v) for v in raw]
    except ValidationError as exc:
        raise ModLaneDataError(f"{path}: {exc}") from exc


def load_car_overlays() -> Dict[str, CarOverlay]:
    """model_name -> CarOverlay (hero/gallery images, tagline). One file per
    car under cars/*.yaml — not every car needs one; absence just means the
    frontend has no hero imagery for that car yet.
    """
    cars_dir = _ROOT / "cars"
    overlays: Dict[str, CarOverlay] = {}
    if not cars_dir.exists():
        return overlays
    for path in sorted(cars_dir.glob("*.yaml")):
        raw = _load_yaml_file(path)
        if not raw:
            continue
        try:
            overlay = CarOverlay.model_validate(raw)
        except ValidationError as exc:
            raise ModLaneDataError(f"{path}: {exc}") from exc
        overlays[overlay.model_name] = overlay
    return overlays


def load_rto_baseline() -> Dict[str, RealityScore]:
    """category_id -> national baseline RealityScore, before any state override."""
    path = _ROOT / "rto_rules" / "baseline.yaml"
    if not path.exists():
        return {}
    raw = _load_yaml_file(path) or {}
    try:
        return {cat: RealityScore.model_validate(score) for cat, score in raw.items()}
    except ValidationError as exc:
        raise ModLaneDataError(f"{path}: {exc}") from exc


def load_rto_state_overrides() -> Dict[str, Dict[str, RealityScore]]:
    """state_code -> {category_id -> RealityScore}. A file only exists for a
    state where research found a genuine state-specific escalation or a
    documented local enforcement pattern worth surfacing — most states have
    no file at all because Indian motor vehicle law (CMVR/MVA) is overwhelmingly
    national, not state-specific. Absence of a file means "no override found",
    not "not yet researched" vs "researched and found nothing" — see the
    Phase 3 sourcing notes for which states were actually checked.
    """
    states_dir = _ROOT / "rto_rules" / "states"
    overrides: Dict[str, Dict[str, RealityScore]] = {}
    if not states_dir.exists():
        return overrides
    for path in sorted(states_dir.glob("*.yaml")):
        state_code = path.stem
        raw = _load_yaml_file(path) or {}
        try:
            overrides[state_code] = {cat: RealityScore.model_validate(score) for cat, score in raw.items()}
        except ValidationError as exc:
            raise ModLaneDataError(f"{path}: {exc}") from exc
    return overrides


def rto_rules_for_state(state_code: str | None) -> Dict[str, RealityScore]:
    """Baseline merged with a state's overrides, if any. Categories the state
    file doesn't mention fall back to the national baseline untouched.
    """
    merged = dict(RTO_BASELINE)
    if state_code:
        merged.update(RTO_STATE_OVERRIDES.get(state_code.upper(), {}))
    return merged


CATEGORIES: List[ModCategory] = load_categories()
MODS: List[Mod] = load_mods()
RECIPES: List[StyleRecipe] = load_recipes()
VENDORS: List[VendorListing] = load_vendors()
RTO_BASELINE: Dict[str, RealityScore] = load_rto_baseline()
RTO_STATE_OVERRIDES: Dict[str, Dict[str, RealityScore]] = load_rto_state_overrides()
CAR_OVERLAYS: Dict[str, CarOverlay] = load_car_overlays()

_CATEGORY_IDS = {c.id for c in CATEGORIES}
for _mod in MODS:
    if _mod.category_id not in _CATEGORY_IDS:
        raise ModLaneDataError(
            f"Mod '{_mod.id}' references unknown category_id '{_mod.category_id}'"
        )
