import axios from "axios"
import { cookies } from "next/headers";
const baseURL = typeof window === "undefined"
  ? "http://laravel-con:8000/api"
  : "http://localhost:8000/api"

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
})
api.interceptors.request.use(async (config) => {
    if (typeof window === "undefined") {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

