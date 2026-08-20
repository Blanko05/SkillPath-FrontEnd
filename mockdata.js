// mockData.js
// Single source of truth for frontend dev before the real API is ready.
// Shapes here match what /api/* endpoints will eventually return —
// when the backend is live, delete this file and swap api/*.js calls
// from these arrays to real axios/fetch calls returning the same shape.

export const mockUsers = [
  {
    id: "usr_001",
    name: "Sara Khaled",
    email: "sara@example.com",
    role: "student",
    createdAt: "2026-08-01T09:00:00Z",
  },
  {
    id: "usr_002",
    name: "Yousef Odeh",
    email: "yousef@example.com",
    role: "student",
    createdAt: "2026-08-02T10:15:00Z",
  },
  {
    id: "usr_010",
    name: "Omar Nasser",
    email: "omar@example.com",
    role: "manager",
    createdAt: "2026-07-10T08:00:00Z",
  },
  {
    id: "usr_011",
    name: "Lina Fares",
    email: "lina@example.com",
    role: "manager",
    createdAt: "2026-07-11T08:00:00Z",
  },
  {
    id: "usr_020",
    name: "Admin User",
    email: "admin@skillpath.dev",
    role: "admin",
    createdAt: "2026-07-01T08:00:00Z",
  },
];

export const mockCourses = [
  {
    id: "crs_001",
    title: "Intro to SQL",
    description:
      "Learn relational databases from scratch, covering joins, indexes, and normalization.",
    category: "Databases",
    skillLevel: "beginner",
    durationHours: 12,
    status: "published",
    manager: { id: "usr_010", name: "Omar Nasser" },
    createdAt: "2026-07-15T12:00:00Z",
  },
  {
    id: "crs_002",
    title: "React Fundamentals",
    description:
      "Build interactive UIs with components, props, state, and hooks.",
    category: "Frontend",
    skillLevel: "beginner",
    durationHours: 18,
    status: "published",
    manager: { id: "usr_011", name: "Lina Fares" },
    createdAt: "2026-07-16T12:00:00Z",
  },
  {
    id: "crs_003",
    title: "Advanced Express APIs",
    description:
      "Design RESTful services with middleware, auth, and Postgres integration.",
    category: "Backend",
    skillLevel: "advanced",
    durationHours: 20,
    status: "published",
    manager: { id: "usr_010", name: "Omar Nasser" },
    createdAt: "2026-07-18T12:00:00Z",
  },
  {
    id: "crs_004",
    title: "JavaScript Fundamentals",
    description:
      "Core JS concepts: variables, functions, arrays, and the DOM.",
    category: "Programming",
    skillLevel: "beginner",
    durationHours: 10,
    status: "published",
    manager: { id: "usr_011", name: "Lina Fares" },
    createdAt: "2026-07-12T12:00:00Z",
  },
  {
    id: "crs_005",
    title: "Docker for Developers",
    description:
      "Containerize applications and understand images, volumes, and networking.",
    category: "DevOps",
    skillLevel: "intermediate",
    durationHours: 8,
    status: "draft",
    manager: { id: "usr_010", name: "Omar Nasser" },
    createdAt: "2026-07-20T12:00:00Z",
  },
  {
    id: "crs_006",
    title: "Database Design & Normalization",
    description:
      "Model schemas correctly the first time: 1NF through 3NF, keys, and relationships.",
    category: "Databases",
    skillLevel: "intermediate",
    durationHours: 14,
    status: "published",
    manager: { id: "usr_011", name: "Lina Fares" },
    createdAt: "2026-07-22T12:00:00Z",
  },
];

export const mockEnrollments = [
  {
    id: "enr_001",
    userId: "usr_001",
    courseId: "crs_001",
    enrolledAt: "2026-08-05T14:20:00Z",
  },
  {
    id: "enr_002",
    userId: "usr_001",
    courseId: "crs_004",
    enrolledAt: "2026-08-06T09:10:00Z",
  },
  {
    id: "enr_003",
    userId: "usr_002",
    courseId: "crs_002",
    enrolledAt: "2026-08-07T11:45:00Z",
  },
];

export const mockQuizResponses = [
  {
    id: "qz_001",
    userId: "usr_001",
    skillLevel: "beginner",
    timeAvailability: "5-10 hrs/week",
    goals: ["career-change", "certification"],
    freeTextPrompt:
      "I want to get into backend development but I'm intimidated by databases.",
    createdAt: "2026-08-05T14:00:00Z",
  },
  {
    id: "qz_002",
    userId: "usr_002",
    skillLevel: "intermediate",
    timeAvailability: "10-15 hrs/week",
    goals: ["skill-upgrade"],
    freeTextPrompt:
      "I already know some JS and want to build real UIs with React.",
    createdAt: "2026-08-07T11:30:00Z",
  },
];

export const mockRecommendations = [
  {
    quizResponseId: "qz_001",
    recommendations: [
      {
        rank: 1,
        course: {
          id: "crs_001",
          title: "Intro to SQL",
          category: "Databases",
          skillLevel: "beginner",
        },
        aiRationale:
          "Matches your stated goal of backend development and addresses the database hesitation you mentioned.",
      },
      {
        rank: 2,
        course: {
          id: "crs_004",
          title: "JavaScript Fundamentals",
          category: "Programming",
          skillLevel: "beginner",
        },
        aiRationale:
          "A gentler entry point before backend work, matching your available time commitment.",
      },
    ],
  },
  {
    quizResponseId: "qz_002",
    recommendations: [
      {
        rank: 1,
        course: {
          id: "crs_002",
          title: "React Fundamentals",
          category: "Frontend",
          skillLevel: "beginner",
        },
        aiRationale:
          "Directly matches your goal of building real UIs with React using your existing JS knowledge.",
      },
      {
        rank: 2,
        course: {
          id: "crs_006",
          title: "Database Design & Normalization",
          category: "Databases",
          skillLevel: "intermediate",
        },
        aiRationale:
          "A logical next step once frontend basics are solid, rounding out full-stack skills.",
      },
    ],
  },
];

// Simulates an async API call with a small delay so components
// built against this file already handle loading/error states
// correctly once real fetch/axios calls replace it.
export function mockFetch(data, delay = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}