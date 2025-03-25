"use server";

import { snippetSchema } from "@/lib/zod-schemas/snippet-schema";
import { actionClient } from "@/server/actions/safe-action";
import { db } from "@/server";
import { snippetsTable } from "../schema";
import { revalidatePath } from "next/cache";

export const createSnippet = actionClient
  .schema(snippetSchema)
  .action(
    async ({ parsedInput: { id, title, code, description, visibility } }) => {
      try {
        if (!id) {
          return { failure: "Missing ID, Please login again!" };
        }
        await db.insert(snippetsTable).values({
          userId: id,
          title,
          code,
          description,
          visibility,
        });
        revalidatePath("/dashboard");
        return { success: "Snippet saved successfully." };
      } catch (error) {
        console.log(error);
        return { failure: "Couldn't save snippet!" };
      }
    }
  );
