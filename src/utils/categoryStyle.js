// Fixed "book cover" colors per category - constant regardless of light/dark
// theme, the way a real book's cover doesn't change color when you turn off
// the lights. Two reuse the site's own accent colors; the rest are new but
// pick from the same warm, desaturated family so nothing clashes.

const CATEGORY_COVERS = {
  Databases: "#2f4858",
  "Web Development": "#6b2737",
  "Data Science": "#7a5c1e",
  "Machine Learning": "#4b3f72",
  DevOps: "#3c5a54",
  Cybersecurity: "#2e3b2f",
  "Cloud Computing": "#35597a",
  Design: "#7a3b4a",
  "Mobile Development": "#6e4a2e",
};

const DEFAULT_COVER = "#4a4038";

export function getCoverColor(category) {
  return CATEGORY_COVERS[category] || DEFAULT_COVER;
}
