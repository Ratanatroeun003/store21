export interface ItemImage {
    url: string;
    public_id: string;
}
export interface ImageUpload{

}
export interface Item {
    id: number;
    desc: string;
    price: number;
    status: "available" | "sold";
    images: ItemImage[];
    created_at?: string;
}
export interface ItemPayload {
    id?: number;
    desc: string;
    price: number;
    status: "available" | "sold";
    images: ItemImage[];
}


