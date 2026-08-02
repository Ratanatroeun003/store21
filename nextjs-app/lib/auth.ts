// lib/auth.ts
'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {AUTH} from "@/lib/api/auth"
import { handleApiError } from "./api-error";
async function getToken() {
    return (await cookies()).get("token")?.value;
}
export async function getCurrentUser() {
    const token = await getToken();
    if (!token) return null;
    try {
        const res =  await AUTH.verify();
        return res.data.user
    } catch(error) {
        handleApiError(error)
    }
}
export async function verify() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth");
    }
    return user;
}