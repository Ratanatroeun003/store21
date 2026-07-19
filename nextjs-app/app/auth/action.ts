"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/axios";

interface LoginState {
    success: boolean;
    message?: string;
}

export async function login(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }

    let token: string;

    try {
        const res = await api.post("/signin", { email, password });
        token = res.data.token;
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                message: "Invalid email or password",
            };
        }
        return { success: false, message: "Server error!" };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, 
    });

    redirect("/admin");
}
export async function logout() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        try {
            await api.post(
                "/signout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch {
        }
    }

    cookieStore.delete("token");
    redirect("/auth");
}