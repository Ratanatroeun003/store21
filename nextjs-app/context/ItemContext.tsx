"use client";

import React, { createContext, useContext, useState } from "react";
import { Item } from "@/types/item";
interface ItemContextType {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}
const ItemContext = createContext<ItemContextType | undefined>(undefined);
export function ItemProvider({
    initialItems,
    children,
}: {
    children: React.ReactNode;
    initialItems?: Item[];
}) {
    const [items, setItems] = useState<Item[]>(initialItems || []);
    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
}
export function useItem() {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error("useItems must be used within ItemsProvide");
    }
    return context;
}
