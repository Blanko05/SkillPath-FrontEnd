import client from "./client.js";

export async function getCourses() {
  const response = await client.get("/courses");
  return response.data;
}

export async function getCourseById(id) {
  const response = await client.get(`/courses/${id}`);
  return response.data;
}

export async function createCourse(courseData) {
  const response = await client.post("/courses", courseData);
  return response.data;
}

export async function updateCourse(id, courseData) {
  const response = await client.put(`/courses/${id}`, courseData);
  return response.data;
}

export async function deleteCourse(id) {
  const response = await client.delete(`/courses/${id}`);
  return response.data;
}

export async function reassignCourseManager(id, managerId) {
  const response = await client.put(`/courses/${id}/manager`, { managerId });
  return response.data;
}
