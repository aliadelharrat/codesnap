"use server";

import { snippetSchema } from "@/lib/zod-schemas/snippet-schema";
import { actionClient } from "@/server/actions/safe-action";
import { db } from "@/server";
import { snippetsTable } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getLanguageById } from "./languages/get-language-by-id";
import { notFound } from "next/navigation";

export const updateSnippet = actionClient
  .schema(snippetSchema)
  .action(
    async ({
      parsedInput: { id, title, code, description, visibility, languageId },
    }) => {
      try {
        // Make sure the language ID does exist
        const language = await getLanguageById(languageId);

        await db
          .update(snippetsTable)
          .set({
            title,
            code,
            description,
            visibility,
            languageId,
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
