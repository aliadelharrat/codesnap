"use server";

import { db } from "@/server";
import { eq } from "drizzle-orm";
import { languagesTable, snippetsTable } from "../schema";
import { notFound } from "next/navigation";

export async function getSnippet(id: string) {
  const res = await db
    .select({
      language: languagesTable,
      snippet: snippetsTable,
    })
    .from(snippetsTable)
    .leftJoin(languagesTable, eq(snippetsTable.languageId, languagesTable.id))
    .where(eq(snippetsTable.id, id));

  // TODO: fix this later
  // if (res.length === 0) return notFound();
  return res[0];
}
