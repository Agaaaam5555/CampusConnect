import axios from "axios";
import { mock } from "./mock";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const http = axios.create({ baseURL: API_URL });

// Sends the JWT with every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("cc_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const data = (p) => p.then((r) => r.data);

// Exactly the endpoints agreed with the backend
const real = {
  register: (d) => data(http.post("/api/auth/register", d)),              // -> { token, user }
  login: (d) => data(http.post("/api/auth/login", d)),                    // -> { token, user }
  getRequests: (params) => data(http.get("/api/requests", { params })),   // ?category=&urgency=
  createRequest: (d) => data(http.post("/api/requests", d)),
  getMatches: (id) => data(http.get(`/api/requests/${id}/matches`)),      // -> top 3-5 users
  acceptRequest: (id) => data(http.patch(`/api/requests/${id}/accept`)),
  completeRequest: (id) => data(http.patch(`/api/requests/${id}/complete`)),
  getMessages: (id) => data(http.get(`/api/requests/${id}/messages`)),
  sendMessage: (id, text) => data(http.post(`/api/requests/${id}/messages`, { text })),

  // There is no GET /api/requests/:id yet, so we find it in the list.
  getRequest: (id) => real.getRequests().then((list) => list.find((r) => r._id === id) || null),
};

// Every page imports `api` and never cares which one it is.
export const api = USE_MOCK ? mock : real;
