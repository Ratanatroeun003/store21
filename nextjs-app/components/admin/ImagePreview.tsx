// components/ImagePreview.tsx
import Image from "next/image";
import { ItemImage } from "@/types/item";
import { Button } from "../ui/button";
const ImagePreview = ({
    img,
    onRemove,
}: {
    img: ItemImage;
    onRemove: (id: string) => void;
}) => {
    return (
        <div className="relative shrink-0">
            <Image
                src={img.url}
                alt="preview"
                width={80}
                height={100}
                loading="lazy"
            />
            <Button
                type="button"
                size="icon-sm"
                onClick={() => onRemove(img.public_id)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
            >
                ✕
            </Button>
        </div>
    );
};

export default ImagePreview;
