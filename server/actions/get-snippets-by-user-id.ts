"use server";

import { db } from "@/server";
import { asc, desc, eq } from "drizzle-orm";
import { snippetsTable } from "../schema";

export async function getSnippetsByUserId(id: string) {
  const snippets = await db
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.userId, id))
    .orderBy(desc(snippetsTable.createdAt));

  return snippets;
}
