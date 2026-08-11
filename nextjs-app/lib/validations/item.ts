import { z } from "zod";
export const itemSchema = z.object({
  id: z.number().optional(), 
  desc: z.string().min(1, "Description is required"),
  price: z
    .number({ message: "Price must be a number" })
    .gt(0, "Price must be greater than 0"),
  status: z.enum(["available", "sold"], {
    message: "Status must be either 'available' or 'sold'",
  }),
  images: z
    .array(
      z.object({
      id: z.number().optional(), 
        public_id: z.string(),
        url: z.string(),
      })
    )
    .min(1, "At least one image is required!"),
});

export type ItemInput = z.infer<typeof itemSchema>;