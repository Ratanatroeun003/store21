"use client";
import { Loader2, X, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/cloudinary/client";
import type { Item, ItemPayload } from "@/types/item";
import { deleteImage } from "@/app/(admin)/admin/items/action";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
interface ItemForm {
    open: boolean;
    onClose: () => void;
    formData: Item;
    setFormData: React.Dispatch<React.SetStateAction<Item>>;
    onSave: (payload: ItemPayload) => void;
    isPending: boolean;
}
export const ItemForm = ({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    isPending,
}: ItemForm) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const isEdit = !!formData.id;
    const images = formData.images || [];
    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        try {
            setUploadLoading(true);
            const uploaded = await Promise.all(
                Array.from(files).map(async (file) => {
                    const image = await uploadImage(file);
                    console.log(image.url, image.public_id);
                    return {
                        url: image.url,
                        public_id: image.public_id,
                    };
                }),
            );
            setFormData((prev) => ({
                ...prev,
                images: [...(prev.images || []), ...uploaded],
            }));
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploadLoading(false);
        }
    };
    const handleRemoveImage = async (publicId: string) => {
        console.log("for remove", publicId);
        const res = await deleteImage(publicId);
        if (!res.success) {
            console.log("message image remove", res.message);
        }
        setFormData((prev) => ({
            ...prev,
            images: (prev.images || []).filter(
                (img) => img.public_id !== publicId,
            ),
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="bg-gray-800 border-white/10 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "✏️ Edit Item" : "➕ Create Item"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {isEdit
                            ? `Editing item #${formData.id}`
                            : "Create new game item"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            value={formData.desc}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    desc: e.target.value,
                                }))
                            }
                            className="w-full rounded bg-gray-900 p-3 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                }))
                            }
                            className="w-full rounded bg-gray-900 p-3 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }))
                            }
                            className="w-full rounded bg-gray-900 p-3 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                        >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">
                                Images
                            </label>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-600 hover:bg-gray-700 text-white"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadLoading}
                            >
                                {uploadLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ImagePlus className="mr-2 h-4 w-4" />
                                )}
                                Upload
                            </Button>
                            <input
                                ref={fileInputRef}
                                hidden
                                multiple
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUpload(e.target.files)}
                            />
                        </div>
                        {images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 border border-dashed border-gray-700 p-2 rounded bg-gray-900/50">
                                {images.map((img) => (
                                    <div
                                        key={img.public_id}
                                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-gray-700"
                                    >
                                        <Image
                                            src={img.url}
                                            alt="Item image"
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(img.public_id)
                                            }
                                            className="absolute top-1 right-1 rounded-full bg-red-600 hover:bg-red-700 p-1 text-white transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-gray-700 hover:bg-gray-600 text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isPending || uploadLoading}
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : isEdit ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
