// lib/auth.ts

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/axios";

export async function requireAdmin() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect("/auth");
    }
    try {
        const { data } = await api.get("/verify", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch {
        redirect("/auth");
    }
}