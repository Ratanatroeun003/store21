"use client";
import { Loader2, X, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createItem, updateItem } from "@/app/_actions/item-action";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemInput, itemSchema } from "@/lib/validations/item";
import { Button } from "@/components/ui/button";
import type { ItemPayload } from "@/types/item";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldSet,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
interface ItemForm {
    onClose: () => void;
    initialData: ItemPayload | null;
}
export const ItemForm = ({ onClose, initialData }: ItemForm) => {
    const router = useRouter();
    const isEdit = Boolean(initialData?.id);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(itemSchema),
        defaultValues: initialData || {},
    });
    const onSubmit = async (data: ItemInput) => {
        if (isEdit && initialData?.id) {
            const res = await updateItem(initialData.id, data);
            if (res.success) {
                toast.success(res.message);
                onClose();
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } else {
            const res = await createItem(data);
            if (res.success) {
                toast.success(res.message);
                onClose();
                router.refresh();
            } else {
                toast.error(res.message);
            }
        }
    };
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="w-full sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "✏️ Edit Item" : "➕ Create Item"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? `Editing item #${initialData?.id}`
                            : "Create new game item"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldSet disabled={isSubmitting}>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>Price</FieldLabel>
                                    <Input
                                        placeholder="0.00"
                                        {...register("price", {
                                            valueAsNumber: true,
                                        })}
                                    />
                                    <FieldError>
                                        {errors.price?.message}
                                    </FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>status</FieldLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="available">
                                                            Available
                                                        </SelectItem>
                                                        <SelectItem value="sold">
                                                            Sold
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    {...register("desc")}
                                    rows={3}
                                    placeholder="Enter your description..."
                                />
                                <FieldError>{errors.desc?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel>Images</FieldLabel>
                                <Controller
                                    name="images"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                <FieldError>
                                    {errors.images?.message}
                                </FieldError>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <DialogFooter>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant={"default"}
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
