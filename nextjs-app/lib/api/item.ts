import {api} from "@/lib/axios";
import  {ItemInput} from "@/lib/validations/item";
export const ITEM ={
    getAll: () => api.get("/items"),
    getById: (id:number) => api.get(`/items/${id}`),
    create: (data:ItemInput) => api.post("/items", data),
    update: (id:number,data:ItemInput) => api.put(`/items/${id}`, data),
    delete: (id:number) => api.delete(`/items/${id}`),
}