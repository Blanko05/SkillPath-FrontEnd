// Library-style call numbers for the "Index" visual direction - a category
// code plus a number whose hundreds digit encodes skill level, so codes
// read as something real rather than decoration (e.g. "ML · 210").

const CATEGORY_CODES = {
  Databases: "DB",
  "Web Development": "WD",
  "Data Science": "DS",
  "Machine Learning": "ML",
  DevOps: "OP",
  Cybersecurity: "SEC",
  "Cloud Computing": "CC",
  Design: "UX",
  "Mobile Development": "MOB",
};

const LEVEL_BASE = { beginner: 100, intermediate: 200, advanced: 300 };

export function getCallNumber(course) {
  const code =
    CATEGORY_CODES[course.category] ||
    course.category.slice(0, 2).toUpperCase();
  const base = LEVEL_BASE[course.skillLevel] ?? 100;
  const suffix = base + (course.id % 100);
  return `${code} · ${suffix}`;
}
