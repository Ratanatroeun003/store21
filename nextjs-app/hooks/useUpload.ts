// hooks/useUpload.ts
"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary/client";
import { deleteImage } from "@/app/(admin)/admin/items/action";

export interface UploadImage {
    url: string;
    public_id: string;
    uploading?: boolean;
}
export const useUpload = () => {
    const [images, setImages] = useState<UploadImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleUpload = async (files: FileList | null) => {
        if (!files) return;
        setLoading(true);
        setError("");
        try {
            const uploaded = await Promise.all(
                Array.from(files).map(async (file) => {
                    const image = await uploadImage(file);

                    return {
                        url: image.url,
                        public_id: image.public_id,
                    };
                })
            );
            setImages((prev) => [...prev, ...uploaded]);
        } catch (err) {
            console.error(err);
            setError("Failed to upload image");
        } finally {
            setLoading(false);
        }
    };
    const removeImage = async (public_id: string) => {
        try {
            const res = await deleteImage(public_id);
            if (!res.success) {
                setError("Failed to delete image");
                return;
            }
            setImages((prev) =>
                prev.filter((img) => img.public_id !== public_id)
            );
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };
    const clearImages = () => {
        setImages([]);
    };
    return {
        images,
        setImages,
        loading,
        error,
        handleUpload,
        removeImage,
        clearImages,
    };
};