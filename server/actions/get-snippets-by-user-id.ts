"use server";

import { db } from "@/server";
import { desc, eq } from "drizzle-orm";
import { snippetsTable } from "../schema";

export async function getSnippetsByUserId(id: string) {
  const snippets = await db
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.userId, id));

  return snippets;
}
