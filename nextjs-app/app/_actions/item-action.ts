'use server'
import { revalidatePath } from "next/cache";
import { handleApiError } from "@/lib/api-error";
import { api } from "@/lib/axios";
import { Item,ItemImage } from "@/types/item";
export type FormState = {
  success: boolean;
  message: string | null;
} | null;
export const index = async ():Promise<{success:boolean,message:string,items:Item[]}> => {
    try {
        const res = await api.get("/items")
        return { success: true, items: res.data.items,message:'Data fetched' }
    } catch (error: any) {
       handleApiError(error)
    }
}
export async function show(
    id: number
): Promise<{ success: boolean; message: string; item: Item | null }> {
    try {
        const response = await api.get(`/items/${id}`);
        return { success: true, message: "Item fetched", item: response.data.item };
    } catch (error: any) {
       handleApiError(error)
    }
}
export async function store(
  prevState: FormState,
  formData: FormData
): Promise<{success:boolean,message:string}> {
  try {
    const rawId = formData.get("id");
    const id = rawId ? Number(rawId) : undefined;
    const desc = formData.get("desc") as string;
    const price = Number(formData.get("price"));
    const status = formData.get("status") as string;
    const imagesRaw = formData.get("images") as string;
    const images: ItemImage[] = imagesRaw ? JSON.parse(imagesRaw) : [];
    if (!desc || isNaN(price) || !status) {
      return { success: false, message: "All fields are required" };
    }
  if (images.length === 0) {
        return { success: false, message: "At least one image is required!" };
    }
    await api.post("/items", { id, desc, price, status, images });
    revalidatePath("/admin/items");
    return {
      success: true,
      message: id ? "Item updated successfully" : "Item created successfully",
    };
  } catch (error: any) {
    handleApiError(error)
  }
}
export async function destroy(id: number): Promise<{success:boolean,message:string}> {
    try {
        await api.delete(`/items/${id}`);
        revalidatePath("/admin/items");
        return { success: true, message: "Item deleted successfully" };
    } catch (error: any) {
        handleApiError(error)
  }
}