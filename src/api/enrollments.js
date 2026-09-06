import client from "./client.js";

export async function getEnrollments() {
  const response = await client.get("/enrollments?extended=true");
  return response.data;
}

export async function createEnrollment(userId, courseId) {
  const response = await client.post("/enrollments", { userId, courseId });
  return response.data;
}

export async function deleteEnrollment(id) {
  const response = await client.delete(`/enrollments/${id}`);
  return response.data;
}
