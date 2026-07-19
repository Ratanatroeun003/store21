// components/admin/Item.tsx
"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useItem } from "@/hooks/useItem";
import { ItemTable } from "./ItemTable";
import { ItemForm } from "./ItemForm";
interface gameItem {
    id: number;
    desc: string;
    price: number | string;
    status: string;
    images: string[];
    created_at?: string;
}
interface ItemProps {
    data: gameItem[];
}
const Item = ({ data }: ItemProps) => {
    const {
        error,
        saveItem,
        remove,
        loading,
        message,
        open,
        openCreate,
        selectedItem,
        openEdit,
        closeDialog,
    } = useItem();
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
            <ItemTable
                items={data}
                isPending={loading}
                onEdit={openEdit}
                onDelete={remove}
            />
            <ItemForm
                open={open}
                onClose={closeDialog}
                selectedItem={selectedItem}
                onSave={saveItem}
                isPending={loading}
            />
        </div>
    );
};

export default Item;
