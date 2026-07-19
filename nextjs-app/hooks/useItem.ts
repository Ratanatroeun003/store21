"use client";

import { store, destroy } from "@/app/(admin)/admin/items/action";
import { index } from "@/app/(store)/action";
import { useAdmin } from "@/context/AdminContext";
import { ItemPayload } from "@/types/item";
import { useState } from "react";
export interface UploadImage {
    url: string;
    public_id: string;
}
export interface ItemProps {
     id?: number | null;
    desc: string;
    price: number | string;
    status: string;
    images: UploadImage[];
}
export const useItem = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { setItems } = useAdmin();
    const refreshItems = async () => {
        try {
            const res = await index();
            if (!res.success) {
                setError(res.message);
            } else {
                setItems(res.items);
            }
        } catch (err) {
            console.error("Refresh Error:", err);
            setError("Failed to refresh items");
        }
    };
    const saveItem = async (payload: ItemPayload) => {
        try {
            setLoading(true);
            setError("");
            setMessage("");
            
            const res = await store(payload);
            
            if (!res.success) {
                setError(res.message);
            } else {
                setMessage(res.message);
                await refreshItems();
            }
        } catch (err) {
            console.error("Save Error:", err);
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id: number| undefined) => {
        try {
            setLoading(true);
            setError("");
            setMessage("");
            
            const res = await destroy(id);
            if (!res.success) {
                setError(res.message);
            } else {
                setMessage(res.message);
                await refreshItems();
            }
        } catch (err) {
            console.error("Delete Error:", err);
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        message,
        error,
        refreshItems,
        saveItem,
        remove,
    };
};