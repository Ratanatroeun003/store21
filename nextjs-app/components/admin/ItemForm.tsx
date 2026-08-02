"use client";
import { Loader2, X, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useActionState } from "react";
import { store } from "@/app/_actions/item-action";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import type { ItemPayload } from "@/types/item";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUpload } from "@/hooks/use-upload";
interface ItemForm {
    onClose: () => void;
    initialData: ItemPayload | null;
}
export const ItemForm = ({ onClose, initialData }: ItemForm) => {
    const { images, uploadImage, removeImage, uploadLoading, uploadError } =
        useUpload(initialData?.images || []);
    const [state, formAction, isPending] = useActionState(store, null);
    const isEdit = Boolean(initialData?.id);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(
                state.message ||
                    (isEdit
                        ? "Updated successfully!"
                        : "Created successfully!"),
            );
            onClose();
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, isEdit, onClose]);
    useEffect(() => {
        if (uploadError) {
            toast.error(uploadError);
        }
    }, [uploadError]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadImage(e.target.files);
        }
    };
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gray-800 border-white/10 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "✏️ Edit Item" : "➕ Create Item"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {isEdit
                            ? `Editing item #${initialData?.id}`
                            : "Create new game item"}
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    {initialData?.id && (
                        <input type="hidden" name="id" value={initialData.id} />
                    )}
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            name="desc"
                            defaultValue={initialData?.desc || ""}
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
                            name="price"
                            defaultValue={initialData?.price || 0}
                            className="w-full rounded bg-gray-900 p-3 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            defaultValue={initialData?.status || "available"}
                            className="w-full rounded bg-gray-900 p-3 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                        >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <input
                        type="hidden"
                        name="images"
                        value={JSON.stringify(images)}
                    />
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Images
                        </label>
                        <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-lg cursor-pointer bg-slate-800/50">
                            {uploadLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                            ) : (
                                <Upload className="w-5 h-5 text-slate-400" />
                            )}
                            <span className="text-sm text-slate-400">
                                {uploadLoading
                                    ? "Uploading..."
                                    : "Upload images"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                disabled={uploadLoading}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        {images.length > 0 && (
                            <div className="flex gap-2 flex-wrap mt-3">
                                {images.map((img, index) => (
                                    <div
                                        key={img.public_id || index}
                                        className="relative w-16 h-16 border border-slate-700 rounded overflow-hidden"
                                    >
                                        <img
                                            src={img.url}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(img.public_id)
                                            }
                                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
