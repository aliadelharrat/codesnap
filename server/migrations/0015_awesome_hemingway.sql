ALTER TABLE "snippets" DROP CONSTRAINT "snippets_languageId_languages_id_fk";
--> statement-breakpoint
ALTER TABLE "snippets" DROP COLUMN "languageId";