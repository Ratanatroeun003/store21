"use server"
import {api} from "@/lib/axios"
interface resProps{
    items:itemProps[],
    message:string
}
   interface UploadImage {
    url: string;
    public_id: string;
}
interface itemProps{
    id: number;
    desc: string;
    price: number;
    status: string;
    images: UploadImage[];
    created_at:string
}
export const index = async ():Promise<{success:boolean,message:string,items:itemProps[]}> => {
    try {
        const res = await api.get<resProps>("/items")
        return { success: true, items: res.data.items,message:'Data fetched' }
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                message:"Request Fail!",
                items:[]
            }
        }
        return { success: false, message: "Server error!",items:[] }
    }
}
export async function show(id: string | number) {
    try {
        const response = await api.get(`/items/${id}`);
        return response.data.item;
    } catch (error) {
        console.error("Failed to fetch item details:", error);
        return null;
    }
}