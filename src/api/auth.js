import client from "./client.js";

export async function signup(name, email, password) {
  const response = await client.post("/auth/signup", { name, email, password });
  return response.data.user;
}

export async function login(email, password) {
  const response = await client.post("/auth/login", { email, password });
  return response.data.user;
}
