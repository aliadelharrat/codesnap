CREATE TYPE "public"."visibility" AS ENUM('private', 'public');--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "visibility" "visibility" DEFAULT 'private';--> statement-breakpoint
ALTER TABLE "snippets" DROP COLUMN "language";