import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attaches the logged-in user's role/id to every request, the same way the
// course's auth pattern expects the client to self-report who it is -
// trusted outright by the backend, no token involved.
client.interceptors.request.use((config) => {
  const stored = localStorage.getItem("currentUser");
  if (stored) {
    const user = JSON.parse(stored);
    config.headers["x-role"] = user.role;
    config.headers["x-user-id"] = user.id;
  }
  return config;
});

export default client;
