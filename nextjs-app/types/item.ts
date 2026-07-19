export interface Image {
    url: string;
    public_id: string;
}
export interface Item {
    id: number;
    desc: string;
    price: number;
    status: "available" | "sold";
    images: Image[];
    created_at?: string;
}
export interface ItemPayload {
    id?: number;
    desc: string;
    price: number;
    status: "available" | "sold";
    images: Image[];
}