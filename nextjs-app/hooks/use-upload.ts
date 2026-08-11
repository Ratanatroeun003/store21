import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary/client";
import { ItemImage } from "@/types/item";

export const useImageUpload = (onChange: (images: ItemImage[]) => void) => {
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addImages = async (files: FileList, currentImages: ItemImage[]) => {
    try {
      setUploading(true);
      const newUploaded = await Promise.all(
        Array.from(files).map((file) => uploadImage(file))
      );
      onChange([...currentImages, ...newUploaded]);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const removeImage = (id: string, currentImages: ItemImage[]) => {
    onChange(currentImages.filter((img) => img.public_id !== id));
  };
  return { addImages, removeImage, isUploading, error };
};
