"use server";

import { cookies } from "next/headers";
import { api } from "@/lib/axios";
import { revalidatePath } from "next/cache";
import { deleteFromCloudinary } from "@/lib/cloudinary/server";
import type {ItemPayload } from "@/types/item";
export async function store(payload:ItemPayload): Promise<{success:boolean,message:string}> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };
    const { id, desc, price, status, images } = payload;
    if (!desc || !price || !status) {
        return { success: false, message: "All fields are required" };
    }
    try {
           await api.post(
            "/items",
            { id, desc, price, status, images },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        revalidatePath("/admin/items");
        return { 
            success: true, 
            message:"Item saved successfully" 
        };
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                message:"Failed to save item",
            };
        }
        return { success: false, message: "Server error!" };
    }
}
export async function destroy(id: undefined | number): Promise<{success:boolean,message:string}> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { success: false, message: "Unauthorized" };
    try {
        await api.delete(`/items/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        revalidatePath("/admin/items");
        return { success: true, message: "Item deleted successfully" };
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message ?? "Failed to delete item",
            };
        }
        return { success: false, message: "Server error!" };
    }
}
export async function deleteImage(publicId: string): Promise<{ success: boolean; message?: string }> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        console.error("Delete Image Error: No token found in cookies (Unauthorized)");
        return { success: false, message: "Unauthorized" };
    }
    try {
        await deleteFromCloudinary(publicId);
        return { success: true };
    } catch (error: any) {
        console.log("🔴 Cloudinary Delete Failed Details:", error);
        return { success: false, message: error?.message || "Cloudinary deletion failed" };
    }
}