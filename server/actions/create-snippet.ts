"use server";

import { snippetSchema } from "@/lib/zod-schemas/snippet-schema";
import { actionClient } from "@/server/actions/safe-action";
import { db } from "@/server";
import { snippetsTable } from "../schema";
import { revalidatePath } from "next/cache";

export const createSnippet = actionClient
  .schema(snippetSchema)
  .action(async ({ parsedInput: { title, code, description } }) => {
    try {
      await db.insert(snippetsTable).values({
        title,
        code,
        description,
      });
      revalidatePath("/dashboard");
      return { success: "Snippet saved successfully." };
    } catch (error) {
      console.log(error);
      return { failure: "Couldn't save snippet!" };
    }
  });
