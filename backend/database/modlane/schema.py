# ModLane data contracts — every reality-indicator score is required to carry
# a source + confidence level so the platform's one disclaimer ("editorial
# judgment, not official policy") is an auditable trail, not a hand-wave.
from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field

DISCLAIMER = (
    "Based on community research and editorial judgment, not official "
    "manufacturer or government policy."
)

Rating = Literal["green", "amber", "red"]
Confidence = Literal[
    "verified_3plus",          # 3+ independent reports agree
    "two_independent",
    "single_source",
    "official_document",       # manufacturer/government doc directly
    "editorial_judgment_only", # no external source yet — must stay visible in UI
]
SourceType = Literal[
    "owner_forum_report",
    "manufacturer_document",
    "government_document",
    "workshop_interview",
    "editorial_field_test",
    "community_submission_photo",
]


class Source(BaseModel):
    label: str
    url: Optional[str] = None
    source_type: SourceType
    state: Optional[str] = None        # only meaningful for RTO sources
    date_observed: Optional[str] = None  # ISO date — rules/prices drift over time


class RealityScore(BaseModel):
    rating: Rating
    rationale: str
    sources: List[Source] = Field(default_factory=list)
    confidence: Confidence
    last_reviewed: str


class RtoRisk(BaseModel):
    baseline: RealityScore
    state_overrides: Dict[str, RealityScore] = Field(default_factory=dict)


class PriceRange(BaseModel):
    min_inr: int
    max_inr: int
    confidence: Literal[
        "verified_3plus", "two_independent", "single_source", "editorial_judgment_only"
    ]
    sample_size: int = 0

    def merged_with(self, other: "PriceRange") -> "PriceRange":
        """Worst-of confidence, widened range — used when combining mods into a recipe."""
        order = ["editorial_judgment_only", "single_source", "two_independent", "verified_3plus"]
        worse = min([self.confidence, other.confidence], key=order.index)
        return PriceRange(
            min_inr=self.min_inr + other.min_inr,
            max_inr=self.max_inr + other.max_inr,
            confidence=worse,
            sample_size=min(self.sample_size, other.sample_size),
        )


class ModCategory(BaseModel):
    id: str
    name: str
    icon: Optional[str] = None


class WorkshopLink(BaseModel):
    city: str
    workshop_name: str
    whatsapp_link: Optional[str] = None


class BrandRecommendation(BaseModel):
    name: str
    tier: Literal["budget", "mid", "premium"]
    note: Optional[str] = None


class Mod(BaseModel):
    id: str
    name: str
    category_id: str
    applicable_cars: List[str]
    applicable_variant_ids: List[int] | Literal["all"] = "all"
    price_range: PriceRange
    fitment_notes: str
    warranty_risk: RealityScore
    road_clearance_risk: RealityScore
    rto_risk: RtoRisk
    editorial_status: Literal["editorial_pick", "community_submitted"] = "editorial_pick"
    source_submission_id: Optional[str] = None
    workshop_links: List[WorkshopLink] = Field(default_factory=list)
    photos: List[str] = Field(default_factory=list)
    # Style archetype tags for the Style Planner's matching logic (frontend).
    # Derived from each mod's existing category/rationale, not invented.
    style_tags: List[str] = Field(default_factory=list)
    # Real, researched brand names only (see rto_rules/ for the sourcing
    # discipline this follows) — absent/empty is fine and renders nothing on
    # the frontend; never populate with a plausible-sounding but unverified name.
    top_brands: List[BrandRecommendation] = Field(default_factory=list)
    disclaimer: str = DISCLAIMER
    last_reviewed: str


def worst_rating(ratings: List[Rating]) -> Rating:
    order = ["green", "amber", "red"]
    return max(ratings, key=order.index)


class StyleRecipe(BaseModel):
    id: str
    car_model: str
    name: str
    mod_ids: List[str]
    combined_price_range: PriceRange
    combined_warranty_risk: Rating
    combined_road_clearance_risk: Rating
    combined_rto_risk_baseline: Rating
    style_tags: List[str] = Field(default_factory=list)
    disclaimer: str = DISCLAIMER


class CarOverlay(BaseModel):
    """ModLane-specific presentation data for a car — hero/gallery images and
    a tagline. Distinct from Tuner's Guide's own /api/cars trim/pricing data;
    this is purely what the ModLane frontend needs to render a car hub page.
    """
    model_name: str
    tagline: Optional[str] = None
    hero_images: List[str] = Field(default_factory=list)
    gallery_images: List[str] = Field(default_factory=list)


# ── Community submission queue ────────────────────────────────────────────
# Self-reported fields (what the owner experienced) are kept structurally
# separate from the final_* fields (what an editor actually publishes) so it
# is impossible for a submission to become a published score by simply
# echoing the submitter's own claim back out — see submissions_db.py.

class SubmissionCreate(BaseModel):
    submitter_contact: Optional[str] = None  # private, never published
    car_model: str
    car_variant: Optional[str] = None
    category_id: str
    mod_name: str
    city: str
    workshop_name: str
    cost_paid_inr: int = Field(gt=0)
    install_date: Optional[str] = None
    photo_paths: List[str] = Field(min_length=1)
    self_reported_warranty_experience: Optional[str] = None
    self_reported_road_clearance_experience: Optional[str] = None
    self_reported_rto_state: str
    self_reported_rto_experience: Optional[str] = None


class SubmissionApproval(BaseModel):
    editorial_reviewer: str
    corroborating_sources: List[Source] = Field(min_length=1)
    final_warranty_risk: RealityScore
    final_road_clearance_risk: RealityScore
    final_rto_risk: RtoRisk
    price_range: PriceRange
    fitment_notes: str
    applicable_variant_ids: List[int] | Literal["all"] = "all"
    mod_name_override: Optional[str] = None


class SubmissionRejection(BaseModel):
    rejection_reason: str
