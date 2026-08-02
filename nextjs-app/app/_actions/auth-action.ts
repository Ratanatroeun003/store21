"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleApiError } from "@/lib/api-error";
import {AUTH} from "@/lib/api/auth"
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
    try {
        const res = await AUTH.signin({ email, password });
        const token = res.data.token;
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
          httpOnly: true,
         secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
         maxAge: 60 * 60 * 24 * 7, 
      });
    } catch (error: any) {
        handleApiError(error)
    }
    redirect("/admin");
}
export async function logout() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
        try {
          await AUTH.signout()
        } catch(error) {
          handleApiError(error)
        }
    }
    cookieStore.delete("token");
    redirect("/auth");
}
