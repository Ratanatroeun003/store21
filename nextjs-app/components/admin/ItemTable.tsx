// components/admin/ItemTable.tsx
"use client";
import { Item } from "@/types/item";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "../BtnDelete";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import { deleteItem } from "@/app/_actions/item-action";
interface ItemTableProps {
    items: Item[];
    onEdit: (item: Item) => void;
}
export const ItemTable = ({ items, onEdit }: ItemTableProps) => {
    return (
        <Table>
            <TableCaption className="text-gray-900 pb-4">
                A list of your warehouse inventory items.
            </TableCaption>
            <TableHeader className="bg-gray-800/50 rounded-md">
                <TableRow className="text-gray-900 border-slate-200">
                    <TableHead>ID</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>DESCRIPTION</TableHead>
                    <TableHead>PRICE</TableHead>
                    <TableHead>ACTION</TableHead>
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
                            <TableCell className="font-mono font-medium text-blue-700">
                                #{item.id}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                        item.status === "available"
                                            ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                                            : "bg-red-500/10 text-red-700 border-red-500/20"
                                    }`}
                                >
                                    {item.status.toUpperCase()}
                                </span>
                            </TableCell>
                            <TableCell>{item.desc}</TableCell>
                            <TableCell className="text-right font-medium text-emerald-400">
                                ${Number(item.price).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => onEdit(item)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <DeleteButton
                                        id={item.id}
                                        onDelete={deleteItem}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
