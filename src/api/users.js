import client from "./client.js";

export async function getUsers() {
  const response = await client.get("/users");
  return response.data;
}

export async function getUserById(id) {
  const response = await client.get(`/users/${id}`);
  return response.data;
}

export async function createUser(userData) {
  const response = await client.post("/users", userData);
  return response.data;
}

export async function updateUser(id, userData) {
  const response = await client.put(`/users/${id}`, userData);
  return response.data;
}

export async function deleteUser(id) {
  const response = await client.delete(`/users/${id}`);
  return response.data;
}
