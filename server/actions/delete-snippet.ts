"use server";

import { db } from "@/server";
import { eq } from "drizzle-orm";
import { snippetsTable } from "../schema";

export async function deleteSnippet(id: string) {
  try {
    await db.delete(snippetsTable).where(eq(snippetsTable.id, id));
    return { success: "Deleted Snippet" };
  } catch {
    return { failure: "Snippet Not Deleted" };
  }
}
