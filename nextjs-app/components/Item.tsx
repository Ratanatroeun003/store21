"use client";

import Image from "next/image";
import { ImageIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItemImage } from "@/types/item";
import { Item } from "@/types/item";
export default function ItemList({ items }: { items: Item[] }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
                const totalSlots = 12;
                const displayImages: (ItemImage | string)[] = [
                    ...item.images,
                ].slice(0, totalSlots);
                while (displayImages.length < totalSlots) {
                    displayImages.push("");
                }

                return (
                    <Card
                        key={item.id}
                        className="group relative overflow-hidden border-2 border-slate-800 rounded-2xl bg-slate-900 p-0 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1 cursor-pointer"
                    >
                        {/* Image grid */}
                        <CardContent className="relative aspect-[3/4] w-full bg-slate-950 p-1.5 grid grid-cols-3 grid-rows-4 gap-0.5 overflow-hidden">
                            {displayImages.map((img, i) => {
                                // ទាញយក URL ទោះជាវាជា Object ឬជា String ទទេ
                                const imgSrc =
                                    typeof img === "string" ? img : img.url;

                                return (
                                    <div
                                        key={i}
                                        className="relative h-full w-full overflow-hidden rounded-md bg-slate-800/60"
                                    >
                                        {imgSrc && (
                                            <Image
                                                src={imgSrc}
                                                alt={`${item.desc ?? "item"} ${i + 1}`}
                                                priority={
                                                    i === 0 && imgSrc !== ""
                                                }
                                                fill
                                                sizes="150px"
                                                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                                                    item.status === "sold"
                                                        ? "opacity-40 saturate-50"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}

                            {/* Sold overlay */}
                            {item.status === "sold" && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/50 backdrop-blur-[1px]">
                                    <Badge
                                        variant="destructive"
                                        className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-lg"
                                    >
                                        Sold
                                    </Badge>
                                </div>
                            )}

                            {/* Images Count Badge */}
                            {item.status === "available" && (
                                <Badge
                                    variant="secondary"
                                    className="absolute top-2 right-2 z-10 gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                                >
                                    <ImageIcon
                                        size={13}
                                        className="text-blue-400"
                                    />
                                    {item.images.length}
                                </Badge>
                            )}
                        </CardContent>

                        {/* Info footer */}
                        {/* 🚀 ដំណោះស្រាយទី២៖ កែសម្រួលពណ៌អក្សរឱ្យស្រឡះភ្នែក (ប្តូរពី text-slate-950 មក text-white) */}
                        <CardFooter className="flex flex-col items-start gap-1 border-t border-slate-800/80 px-4 py-3 text-white">
                            <div className="flex w-full items-center justify-between gap-2">
                                <h3 className="truncate text-sm font-semibold text-slate-200">
                                    {item.desc || "No description"}
                                </h3>
                                {item.status === "available" && (
                                    <CheckCircle2
                                        size={15}
                                        className="shrink-0 text-emerald-400"
                                    />
                                )}
                            </div>
                            <p className="text-lg font-bold tracking-tight text-white">
                                <span className="mr-0.5 text-sm font-medium text-blue-400">
                                    $
                                </span>
                                {item.price.toLocaleString()}
                            </p>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
