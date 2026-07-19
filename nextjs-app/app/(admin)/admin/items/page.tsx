// components/admin/Item.tsx
"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useItem } from "@/hooks/useItem";
import { ItemTable } from "@/components/admin/ItemTable";
import { ItemForm } from "@/components/admin/ItemForm";
import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";
import { deleteImage } from "./action";
import { ItemPayload } from "@/types/item";
interface ItemProps {
    id: number | undefined;
    status: string;
    desc: string;
    price: number | string;
    images: UploadImage[];
}
interface UploadImage {
    url: string;
    public_id: string;
}
const defaultFormValues: ItemPayload = {
    id: undefined,
    desc: "",
    price: "",
    status: "available",
    images: [],
};
const page = () => {
    const [open, setOpen] = useState(false);
    const { items } = useAdmin();
    const { error, saveItem, remove, loading, message } = useItem();
    const [formData, setFormData] = useState<ItemProps>(defaultFormValues);
    const handleCreate = () => {
        setFormData(defaultFormValues);
        setOpen(true);
    };
    const handleEdit = (item: Item) => {
        setFormData({
            id: item.id,
            desc: item.desc,
            status: item.status,
            images: item.images || [],
            price: item.price,
        });
        setOpen(true);
    };
    const handleDeleteItem = async (item: ItemProps) => {
        if (!item.id) return;

        try {
            if (item.images && item.images.length > 0) {
                console.log("លុបរូបភាពទាំងឡាយ៖", item.images);
                const deleteImagePromises = item.images.map((img) =>
                    deleteImage(img.public_id).catch((err: any) =>
                        console.error(`មិនអាចលុបរូបភាព ${img.public_id}:`, err),
                    ),
                );
                await Promise.all(deleteImagePromises);
            }
            await remove(item.id);
        } catch (error) {
            console.error("មានបញ្ហាពេលលុប៖", error);
        }
    };
    return (
        <div className="flex flex-col gap-2 mx-auto bg-slate-900 p-4 rounded-lg shadow-lg shadow-slate-950/20 text-white">
            <div className="flex justify-end">
                <Button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-fit shadow-lg shadow-blue-500/20"
                >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">Create Item</span>
                </Button>
            </div>
            <ItemTable
                items={items}
                isPending={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteItem}
            />
            <ItemForm
                open={open}
                onClose={() => setOpen(false)}
                onSave={saveItem}
                isPending={loading}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

export default page;
