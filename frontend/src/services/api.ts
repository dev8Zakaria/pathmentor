import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pathmentor_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function setSession(accessToken: string, refreshToken: string) {
  localStorage.setItem("pathmentor_access_token", accessToken);
  localStorage.setItem("pathmentor_refresh_token", refreshToken);
}

export function clearSession() {
  localStorage.removeItem("pathmentor_access_token");
  localStorage.removeItem("pathmentor_refresh_token");
}
