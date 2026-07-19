// components/admin/ItemTable.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Loader2 } from "lucide-react";
interface UploadImage {
    url: string;
    public_id: string;
}
interface GameItem {
    id: number | undefined;
    status: string;
    desc: string;
    price: number | string;
    images: UploadImage[];
}

interface ItemTableProps {
    items: GameItem[];
    isPending: boolean;
    onEdit: (item: GameItem) => void;
    onDelete: (item: GameItem) => void;
}

export const ItemTable = ({
    items,
    isPending,
    onEdit,
    onDelete,
}: ItemTableProps) => {
    return (
        <Table>
            <TableCaption className="text-gray-400 pb-4">
                A list of your warehouse inventory items.
            </TableCaption>

            <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead className="w-24 text-gray-300 font-semibold">
                        ID
                    </TableHead>
                    <TableHead className="text-gray-300 font-semibold">
                        STATUS
                    </TableHead>
                    <TableHead className="text-gray-300 font-semibold">
                        DESCRIPTION
                    </TableHead>
                    <TableHead className="text-right text-gray-300 font-semibold">
                        PRICE
                    </TableHead>
                    <TableHead className="text-center text-gray-300 font-semibold">
                        ACTION
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            className="text-center py-8 text-gray-400"
                        >
                            No items found.
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map((item) => (
                        <TableRow
                            key={item.id}
                            className="border-gray-800 hover:bg-gray-800/30 transition-colors"
                        >
                            <TableCell className="font-mono font-medium text-blue-400">
                                #{item.id}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                        item.status === "available"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }`}
                                >
                                    {item.status.toUpperCase()}
                                </span>
                            </TableCell>
                            <TableCell className="text-gray-300 max-w-xs truncate">
                                {item.desc}
                            </TableCell>
                            <TableCell className="text-right font-medium text-emerald-400">
                                ${Number(item.price).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => onEdit(item)}
                                        className="h-8 w-8 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                        disabled={isPending}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => onDelete(item)}
                                        className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
