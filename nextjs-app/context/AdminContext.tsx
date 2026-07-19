// context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
interface UploadImage {
    url: string;
    public_id: string;
}
interface GameItem {
    id: number | undefined;
    status: string;
    desc: string;
    price: number;
    images: UploadImage[];
    created_at?: string;
}
interface AdminContextType {
    items: GameItem[];
    setItems: React.Dispatch<React.SetStateAction<GameItem[]>>;
}
const AdminContext = createContext<AdminContextType | undefined>(undefined);
export function AdminProvider({
    initialItems,
    children,
}: {
    children: React.ReactNode;
    initialItems?: GameItem[];
}) {
    const [items, setItems] = useState<GameItem[]>(initialItems || []);
    return (
        <AdminContext.Provider value={{ items, setItems }}>
            {children}
        </AdminContext.Provider>
    );
}
export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}
