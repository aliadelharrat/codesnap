CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"created_at" date DEFAULT now()
);
