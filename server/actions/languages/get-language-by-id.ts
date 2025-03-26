"use server";

import { db } from "@/server";
import { languagesTable } from "@/server/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getLanguageById(id: string) {
  const language = await db
    .select()
    .from(languagesTable)
    .where(eq(languagesTable.id, id));

  if (!language) return notFound();
}
