"use server";

import { db } from "@/server";
import { desc, eq } from "drizzle-orm";
import { snippetsTable } from "../schema";

export async function getSnippet(id: string) {
  const snippet = await db
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.id, id));

  if (!snippet.length) throw new Error("Snippet not found");
  return snippet[0];
}
