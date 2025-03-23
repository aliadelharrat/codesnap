"use server";

import { db } from "@/server";
import { desc } from "drizzle-orm";
import { snippetsTable } from "../schema";

export async function getSnippets() {
  const snippets = await db.query.snippetsTable.findMany({
    orderBy: [desc(snippetsTable.createdAt)],
  });
  return snippets;
}
