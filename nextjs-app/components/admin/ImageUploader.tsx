// components/ImageUploader.tsx
import ImagePreview from "./ImagePreview";
import { useImageUpload } from "@/hooks/use-upload";
import { Upload } from "lucide-react";
import { ItemImage } from "@/types/item";
export const ImageUploader = ({
    value,
    onChange,
}: {
    value: ItemImage[];
    onChange: any;
}) => {
    const { addImages, removeImage, isUploading, error } =
        useImageUpload(onChange);
    return (
        <div className="overflow-hidden">
            <label>
                <p>
                    {isUploading ? (
                        "Uploading"
                    ) : (
                        <Upload className="hover:cursor-pointer" />
                    )}
                </p>
                <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                        e.target.files && addImages(e.target.files, value)
                    }
                />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <div className="scroll-fade-x scrollbar-thin overflow-x-auto">
                <div className="flex mt-2 mx-auto rounded-2xl gap-2">
                    {value.map((img: ItemImage) => (
                        <ImagePreview
                            key={img.public_id}
                            img={img}
                            onRemove={(id) => removeImage(id, value)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
