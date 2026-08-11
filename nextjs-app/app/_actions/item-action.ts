'use server'
import { revalidatePath } from "next/cache";
import { handleApiError } from "@/lib/api-error";
import {ITEM} from "@/lib/api/item";
import {ItemInput,itemSchema} from "@/lib/validations/item";
export const getItems = async () => {
    try {
        const res = await ITEM.getAll();
        return { 
          success: true, 
          items: res.data.items,
          message:'Successfully fetched items' 
        }
    } catch (error: any) {
      return handleApiError(error)
    }
}
export async function getItemById( id: number) {
    try {
        const res = await ITEM.getById(id);
        return {
           success: true,
            message: "Item fetched successfully", 
            item: res.data.item 
          };
    } catch (error: any) {
      return handleApiError(error)
    }
}
export async function createItem(
data:ItemInput
){
  try {
    const validation = itemSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, message:"Validation failed"};
    }
    await ITEM.create(validation.data);
    return { success: true, message: "Item created successfully" };
  } catch (error: any) {
   return handleApiError(error)
  }
}
export async function updateItem(id: number,
data:ItemInput
){
  try {
    const validation = itemSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, message:"Validation failed"};
    }else{
    await ITEM.update(id,validation.data);
    return {
       success: true,
        message: "Item updated successfully" };
    }
  } catch (error: any) {
  return  handleApiError(error)
  }
}
export async function deleteItem(id: number) {
    try {
        await ITEM.delete(id);
        revalidatePath("/admin/items");
        return { 
        success: true,
         message: "Item deleted successfully" };
    } catch (error: any) {
      return  handleApiError(error)
  }
}