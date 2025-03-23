import { z } from "zod";

export const snippetSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50, {
      message: "Title must be at most 50 characters long",
    }),
  code: z
    .string()
    .min(10, {
      message: "Code must be at least 10 characters long",
    })
    .max(10000, {
      message: "Code must be at most 10000 characters long",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long",
    })
    .max(1000, {
      message: "Description must be at most 1000 characters long",
    }),
});
