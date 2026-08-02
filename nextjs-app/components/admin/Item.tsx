// components/admin/Item.tsx
"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ItemTable } from "@/components/admin/ItemTable";
import { ItemForm } from "@/components/admin/ItemForm";
import { Item } from "@/types/item";
import { ItemPayload } from "@/types/item";
import { useState } from "react";
const Items = ({ items }: { items: Item[] }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectitem] = useState<ItemPayload | null>(null);
    const openCreate = () => {
        setSelectitem(null);
        setOpen(true);
    };
    const openEdit = (item: ItemPayload) => {
        setSelectitem(item);
        setOpen(true);
    };
    const closeForm = () => {
        setSelectitem(null);
        setOpen(false);
    };
    return (
        <div className="flex flex-col gap-2 mx-auto bg-slate-900 p-4 rounded-lg shadow-lg shadow-slate-950/20 text-white">
            <div className="flex justify-end">
                <Button
                    onClick={openCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-fit shadow-lg shadow-blue-500/20"
                >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">Create Item</span>
                </Button>
            </div>
            <ItemTable items={items} onEdit={openEdit} />
            {open && (
                <ItemForm onClose={closeForm} initialData={selectedItem} />
            )}
        </div>
    );
};

export default Items;
