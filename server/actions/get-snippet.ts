"use server";

import { db } from "@/server";
import { eq } from "drizzle-orm";
import { snippetsTable } from "../schema";
import { notFound } from "next/navigation";

export async function getSnippet(id: string) {
  const snippet = await db
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.id, id));

  if (!snippet.length) return notFound();
  return snippet[0];
}
