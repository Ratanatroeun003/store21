
import { api } from "@/lib/axios";
import { signin } from "@/types/auth";

export const AUTH = {
    signin: (data: signin) => api.post("/signin", data),

    signout: () => api.post("/signout"),

    verify: () => api.get("/verify"),
};