"use client";

import { useActionState, useState } from "react";
import { update, deleteImage } from "@/app/(admin)/admin/items/action";
import { uploadToCloudinary } from "@/lib/cloudinary/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UploadCloud, X, DollarSign, RefreshCw } from "lucide-react";

interface UploadedImage {
    url: string;
    publicId: string;
    uploading?: boolean;
}
interface Item {
    id: number;
    desc: string;
    price: number | string;
    status: string;
    images: string[];
}

const initialState: { success: boolean; message?: string } = {
    success: false,
    message: undefined,
};

export default function EditItemForm({ item }: { item: Item }) {
    // ✅ bind id ចូល update action — useActionState ត្រូវការ (prevState, formData) ២ parameter ប៉ុណ្ណោះ
    const updateWithId = update.bind(null, item.id);
    const [state, formAction, isPending] = useActionState(
        updateWithId,
        initialState,
    );

    // Pre-fill images ពី item ដែលមានស្រាប់ (publicId មិនចាំបាច់ត្រឹមត្រូវ 100% សម្រាប់ display, តែត្រូវការសម្រាប់ delete)
    const [images, setImages] = useState<UploadedImage[]>(
        item.images.map((url, i) => ({
            url,
            publicId: `existing-${i}`, // placeholder — មិនប្រើសម្រាប់ Cloudinary delete ដោយផ្ទាល់ (server action ស្រាប់ extract ពី URL)
        })),
    );

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = "";

        for (const file of files) {
            const tempId = crypto.randomUUID();
            setImages((prev) => [
                ...prev,
                { url: "", publicId: tempId, uploading: true },
            ]);

            try {
                const uploaded = await uploadToCloudinary(file);
                setImages((prev) =>
                    prev.map((img) =>
                        img.publicId === tempId
                            ? { ...uploaded, uploading: false }
                            : img,
                    ),
                );
            } catch {
                setImages((prev) =>
                    prev.filter((img) => img.publicId !== tempId),
                );
            }
        }
    };

    const removeImage = async (publicId: string, url: string) => {
        setImages((prev) => prev.filter((img) => img.publicId !== publicId));
        // សម្រាប់ image ថ្មី (មាន real Cloudinary publicId) → លុបចេញភ្លាមៗ
        if (!publicId.startsWith("existing-")) {
            await deleteImage(publicId);
        }
        // Image ចាស់ (existing-N) នឹងត្រូវ cleanup ដោយ update() server action ខ្លួនឯង
        // ព្រោះវាប្រៀបធៀប old images vs new images submitted
    };

    const isUploading = images.some((img) => img.uploading);
    const readyImages = images.filter((img) => !img.uploading);

    return (
        <Card className="border-slate-800/80 bg-slate-200 text-slate-950">
            <CardHeader>
                <CardTitle>Edit Item #{item.id}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="flex flex-col gap-5">
                    {state.message && (
                        <div
                            className={`rounded-md border px-3 py-2 text-sm ${
                                state.success
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                    : "border-red-500/30 bg-red-500/10 text-red-400"
                            }`}
                        >
                            {state.message}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            name="desc"
                            defaultValue={item.desc}
                            required
                            disabled={isPending}
                            className="border-slate-800 bg-slate-300/50 placeholder:text-slate-600 focus-visible:ring-blue-500"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={item.price}
                                required
                                disabled={isPending}
                                className="border-slate-800 bg-slate-300/50 pl-9 placeholder:text-slate-600 focus-visible:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={item.status}>
                            <SelectTrigger
                                id="status"
                                disabled={isPending}
                                className="border-slate-800 bg-slate-950/50 text-white"
                            >
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="available">
                                    Available
                                </SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label>Images</Label>
                            <span className="text-xs text-slate-500">
                                {readyImages.length} image
                                {readyImages.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <label
                            htmlFor="images-upload"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-800 bg-slate-300/50 py-8 text-slate-500 transition-colors hover:border-blue-500/50 hover:text-slate-950"
                        >
                            <UploadCloud className="h-8 w-8" />
                            <span className="text-sm">
                                Click to upload images
                            </span>
                        </label>
                        <input
                            id="images-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {readyImages.map((img) => (
                            <input
                                key={img.publicId}
                                type="hidden"
                                name="images[]"
                                value={img.url}
                            />
                        ))}

                        {images.length === 0 && (
                            <p className="text-xs text-red-500">
                                At least one image is required
                            </p>
                        )}

                        {images.length > 0 && (
                            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                                {images.map((img) => (
                                    <div
                                        key={img.publicId}
                                        className="group relative aspect-square overflow-hidden rounded-md bg-slate-800"
                                    >
                                        {img.uploading ? (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                                            </div>
                                        ) : (
                                            <>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={img.url}
                                                    alt="preview"
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(
                                                            img.publicId,
                                                            img.url,
                                                        )
                                                    }
                                                    disabled={isPending}
                                                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={
                            isPending || isUploading || readyImages.length === 0
                        }
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : isUploading ? (
                            "Uploading images..."
                        ) : (
                            "Update Item"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
