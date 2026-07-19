import axios from "axios"

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

