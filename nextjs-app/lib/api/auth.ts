
import { api } from "@/lib/axios";
import { signin } from "@/types/auth";

export const AUTH = {
    signin: (data: signin) => api.post("/signin", data),
    signout: (token:string) => api.post("/signout",{},{headers: { Authorization: `Bearer ${token}` }}),
    verify: () => api.get("/verify"),
};