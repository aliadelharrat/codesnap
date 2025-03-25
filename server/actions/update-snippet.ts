"use server";

import { snippetSchema } from "@/lib/zod-schemas/snippet-schema";
import { actionClient } from "@/server/actions/safe-action";
import { db } from "@/server";
import { snippetsTable } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateSnippet = actionClient
  .schema(snippetSchema)
  .action(
    async ({ parsedInput: { id, title, code, description, visibility } }) => {
      try {
        await db
          .update(snippetsTable)
          .set({
            title,
            code,
            description,
            visibility,
          })
          .where(eq(snippetsTable.id, id!));
        revalidatePath("/dashboard", "layout");
        return { success: "Snippet updated successfully." };
      } catch (error) {
        console.log(error);
        return { failure: "Couldn't update snippet!" };
      }
    }
  );
