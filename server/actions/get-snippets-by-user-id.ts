"use server";

import { db } from "@/server";
import { asc, desc, eq } from "drizzle-orm";
import { languagesTable, snippetsTable } from "../schema";

export async function getSnippetsByUserId(id: string) {
  const snippets = await db
    .select({
      language: languagesTable,
      snippet: snippetsTable,
    })
    .from(snippetsTable)
    .leftJoin(languagesTable, eq(snippetsTable.languageId, languagesTable.id))
    .where(eq(snippetsTable.userId, id))
    .orderBy(desc(snippetsTable.createdAt));
  return snippets;
}
