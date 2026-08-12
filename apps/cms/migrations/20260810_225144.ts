import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_posts_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_announcements_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_announcements_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_announcements_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_programs_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_programs_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_programs_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_shorts_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_shorts_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_shorts_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TABLE "pages_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_pages_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_pages_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_url" varchar NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"round" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"meta_description" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_url" varchar,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_posts_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_posts_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_url" varchar NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"round" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_posts_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_announcements_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_announcements_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_url" varchar NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"round" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "announcements_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_announcements_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "announcements_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_programs_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_programs_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_url" varchar NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"round" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "programs_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_programs_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "programs_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_shorts_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_shorts_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_url" varchar NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"round" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "shorts_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_shorts_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shorts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_paragraph" ADD CONSTRAINT "pages_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_heading" ADD CONSTRAINT "pages_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_items" ADD CONSTRAINT "pages_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list" ADD CONSTRAINT "pages_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_paragraph" ADD CONSTRAINT "posts_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_heading" ADD CONSTRAINT "posts_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image" ADD CONSTRAINT "posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_list_items" ADD CONSTRAINT "posts_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_list" ADD CONSTRAINT "posts_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_quote" ADD CONSTRAINT "posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_paragraph" ADD CONSTRAINT "announcements_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_heading" ADD CONSTRAINT "announcements_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_hero" ADD CONSTRAINT "announcements_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_image" ADD CONSTRAINT "announcements_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_list_items" ADD CONSTRAINT "announcements_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_list" ADD CONSTRAINT "announcements_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_quote" ADD CONSTRAINT "announcements_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_blocks_cta" ADD CONSTRAINT "announcements_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_paragraph" ADD CONSTRAINT "programs_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_heading" ADD CONSTRAINT "programs_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_hero" ADD CONSTRAINT "programs_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_image" ADD CONSTRAINT "programs_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_list_items" ADD CONSTRAINT "programs_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_list" ADD CONSTRAINT "programs_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_quote" ADD CONSTRAINT "programs_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_blocks_cta" ADD CONSTRAINT "programs_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_paragraph" ADD CONSTRAINT "shorts_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_heading" ADD CONSTRAINT "shorts_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_hero" ADD CONSTRAINT "shorts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_image" ADD CONSTRAINT "shorts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_list_items" ADD CONSTRAINT "shorts_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_list" ADD CONSTRAINT "shorts_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_quote" ADD CONSTRAINT "shorts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shorts_blocks_cta" ADD CONSTRAINT "shorts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shorts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_paragraph_order_idx" ON "pages_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "pages_blocks_paragraph_parent_id_idx" ON "pages_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_paragraph_path_idx" ON "pages_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "pages_blocks_heading_order_idx" ON "pages_blocks_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_heading_parent_id_idx" ON "pages_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_heading_path_idx" ON "pages_blocks_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_items_order_idx" ON "pages_blocks_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_items_parent_id_idx" ON "pages_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_order_idx" ON "pages_blocks_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_parent_id_idx" ON "pages_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_path_idx" ON "pages_blocks_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "posts_blocks_paragraph_order_idx" ON "posts_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "posts_blocks_paragraph_parent_id_idx" ON "posts_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_paragraph_path_idx" ON "posts_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "posts_blocks_heading_order_idx" ON "posts_blocks_heading" USING btree ("_order");
  CREATE INDEX "posts_blocks_heading_parent_id_idx" ON "posts_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_heading_path_idx" ON "posts_blocks_heading" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_order_idx" ON "posts_blocks_image" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_parent_id_idx" ON "posts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_path_idx" ON "posts_blocks_image" USING btree ("_path");
  CREATE INDEX "posts_blocks_list_items_order_idx" ON "posts_blocks_list_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_list_items_parent_id_idx" ON "posts_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_list_order_idx" ON "posts_blocks_list" USING btree ("_order");
  CREATE INDEX "posts_blocks_list_parent_id_idx" ON "posts_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_list_path_idx" ON "posts_blocks_list" USING btree ("_path");
  CREATE INDEX "posts_blocks_quote_order_idx" ON "posts_blocks_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_quote_parent_id_idx" ON "posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_quote_path_idx" ON "posts_blocks_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE INDEX "announcements_blocks_paragraph_order_idx" ON "announcements_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "announcements_blocks_paragraph_parent_id_idx" ON "announcements_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_paragraph_path_idx" ON "announcements_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "announcements_blocks_heading_order_idx" ON "announcements_blocks_heading" USING btree ("_order");
  CREATE INDEX "announcements_blocks_heading_parent_id_idx" ON "announcements_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_heading_path_idx" ON "announcements_blocks_heading" USING btree ("_path");
  CREATE INDEX "announcements_blocks_hero_order_idx" ON "announcements_blocks_hero" USING btree ("_order");
  CREATE INDEX "announcements_blocks_hero_parent_id_idx" ON "announcements_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_hero_path_idx" ON "announcements_blocks_hero" USING btree ("_path");
  CREATE INDEX "announcements_blocks_image_order_idx" ON "announcements_blocks_image" USING btree ("_order");
  CREATE INDEX "announcements_blocks_image_parent_id_idx" ON "announcements_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_image_path_idx" ON "announcements_blocks_image" USING btree ("_path");
  CREATE INDEX "announcements_blocks_list_items_order_idx" ON "announcements_blocks_list_items" USING btree ("_order");
  CREATE INDEX "announcements_blocks_list_items_parent_id_idx" ON "announcements_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_list_order_idx" ON "announcements_blocks_list" USING btree ("_order");
  CREATE INDEX "announcements_blocks_list_parent_id_idx" ON "announcements_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_list_path_idx" ON "announcements_blocks_list" USING btree ("_path");
  CREATE INDEX "announcements_blocks_quote_order_idx" ON "announcements_blocks_quote" USING btree ("_order");
  CREATE INDEX "announcements_blocks_quote_parent_id_idx" ON "announcements_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_quote_path_idx" ON "announcements_blocks_quote" USING btree ("_path");
  CREATE INDEX "announcements_blocks_cta_order_idx" ON "announcements_blocks_cta" USING btree ("_order");
  CREATE INDEX "announcements_blocks_cta_parent_id_idx" ON "announcements_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "announcements_blocks_cta_path_idx" ON "announcements_blocks_cta" USING btree ("_path");
  CREATE INDEX "programs_blocks_paragraph_order_idx" ON "programs_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "programs_blocks_paragraph_parent_id_idx" ON "programs_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_paragraph_path_idx" ON "programs_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "programs_blocks_heading_order_idx" ON "programs_blocks_heading" USING btree ("_order");
  CREATE INDEX "programs_blocks_heading_parent_id_idx" ON "programs_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_heading_path_idx" ON "programs_blocks_heading" USING btree ("_path");
  CREATE INDEX "programs_blocks_hero_order_idx" ON "programs_blocks_hero" USING btree ("_order");
  CREATE INDEX "programs_blocks_hero_parent_id_idx" ON "programs_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_hero_path_idx" ON "programs_blocks_hero" USING btree ("_path");
  CREATE INDEX "programs_blocks_image_order_idx" ON "programs_blocks_image" USING btree ("_order");
  CREATE INDEX "programs_blocks_image_parent_id_idx" ON "programs_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_image_path_idx" ON "programs_blocks_image" USING btree ("_path");
  CREATE INDEX "programs_blocks_list_items_order_idx" ON "programs_blocks_list_items" USING btree ("_order");
  CREATE INDEX "programs_blocks_list_items_parent_id_idx" ON "programs_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_list_order_idx" ON "programs_blocks_list" USING btree ("_order");
  CREATE INDEX "programs_blocks_list_parent_id_idx" ON "programs_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_list_path_idx" ON "programs_blocks_list" USING btree ("_path");
  CREATE INDEX "programs_blocks_quote_order_idx" ON "programs_blocks_quote" USING btree ("_order");
  CREATE INDEX "programs_blocks_quote_parent_id_idx" ON "programs_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_quote_path_idx" ON "programs_blocks_quote" USING btree ("_path");
  CREATE INDEX "programs_blocks_cta_order_idx" ON "programs_blocks_cta" USING btree ("_order");
  CREATE INDEX "programs_blocks_cta_parent_id_idx" ON "programs_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "programs_blocks_cta_path_idx" ON "programs_blocks_cta" USING btree ("_path");
  CREATE INDEX "shorts_blocks_paragraph_order_idx" ON "shorts_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "shorts_blocks_paragraph_parent_id_idx" ON "shorts_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_paragraph_path_idx" ON "shorts_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "shorts_blocks_heading_order_idx" ON "shorts_blocks_heading" USING btree ("_order");
  CREATE INDEX "shorts_blocks_heading_parent_id_idx" ON "shorts_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_heading_path_idx" ON "shorts_blocks_heading" USING btree ("_path");
  CREATE INDEX "shorts_blocks_hero_order_idx" ON "shorts_blocks_hero" USING btree ("_order");
  CREATE INDEX "shorts_blocks_hero_parent_id_idx" ON "shorts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_hero_path_idx" ON "shorts_blocks_hero" USING btree ("_path");
  CREATE INDEX "shorts_blocks_image_order_idx" ON "shorts_blocks_image" USING btree ("_order");
  CREATE INDEX "shorts_blocks_image_parent_id_idx" ON "shorts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_image_path_idx" ON "shorts_blocks_image" USING btree ("_path");
  CREATE INDEX "shorts_blocks_list_items_order_idx" ON "shorts_blocks_list_items" USING btree ("_order");
  CREATE INDEX "shorts_blocks_list_items_parent_id_idx" ON "shorts_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_list_order_idx" ON "shorts_blocks_list" USING btree ("_order");
  CREATE INDEX "shorts_blocks_list_parent_id_idx" ON "shorts_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_list_path_idx" ON "shorts_blocks_list" USING btree ("_path");
  CREATE INDEX "shorts_blocks_quote_order_idx" ON "shorts_blocks_quote" USING btree ("_order");
  CREATE INDEX "shorts_blocks_quote_parent_id_idx" ON "shorts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_quote_path_idx" ON "shorts_blocks_quote" USING btree ("_path");
  CREATE INDEX "shorts_blocks_cta_order_idx" ON "shorts_blocks_cta" USING btree ("_order");
  CREATE INDEX "shorts_blocks_cta_parent_id_idx" ON "shorts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "shorts_blocks_cta_path_idx" ON "shorts_blocks_cta" USING btree ("_path");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcements_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shorts_blocks_cta" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_paragraph" CASCADE;
  DROP TABLE "pages_blocks_heading" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_list_items" CASCADE;
  DROP TABLE "pages_blocks_list" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "posts_blocks_paragraph" CASCADE;
  DROP TABLE "posts_blocks_heading" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_image" CASCADE;
  DROP TABLE "posts_blocks_list_items" CASCADE;
  DROP TABLE "posts_blocks_list" CASCADE;
  DROP TABLE "posts_blocks_quote" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "announcements_blocks_paragraph" CASCADE;
  DROP TABLE "announcements_blocks_heading" CASCADE;
  DROP TABLE "announcements_blocks_hero" CASCADE;
  DROP TABLE "announcements_blocks_image" CASCADE;
  DROP TABLE "announcements_blocks_list_items" CASCADE;
  DROP TABLE "announcements_blocks_list" CASCADE;
  DROP TABLE "announcements_blocks_quote" CASCADE;
  DROP TABLE "announcements_blocks_cta" CASCADE;
  DROP TABLE "programs_blocks_paragraph" CASCADE;
  DROP TABLE "programs_blocks_heading" CASCADE;
  DROP TABLE "programs_blocks_hero" CASCADE;
  DROP TABLE "programs_blocks_image" CASCADE;
  DROP TABLE "programs_blocks_list_items" CASCADE;
  DROP TABLE "programs_blocks_list" CASCADE;
  DROP TABLE "programs_blocks_quote" CASCADE;
  DROP TABLE "programs_blocks_cta" CASCADE;
  DROP TABLE "shorts_blocks_paragraph" CASCADE;
  DROP TABLE "shorts_blocks_heading" CASCADE;
  DROP TABLE "shorts_blocks_hero" CASCADE;
  DROP TABLE "shorts_blocks_image" CASCADE;
  DROP TABLE "shorts_blocks_list_items" CASCADE;
  DROP TABLE "shorts_blocks_list" CASCADE;
  DROP TABLE "shorts_blocks_quote" CASCADE;
  DROP TABLE "shorts_blocks_cta" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_heading_level";
  DROP TYPE "public"."enum_pages_blocks_heading_align";
  DROP TYPE "public"."enum_pages_blocks_list_kind";
  DROP TYPE "public"."enum_posts_blocks_heading_level";
  DROP TYPE "public"."enum_posts_blocks_heading_align";
  DROP TYPE "public"."enum_posts_blocks_list_kind";
  DROP TYPE "public"."enum_announcements_blocks_heading_level";
  DROP TYPE "public"."enum_announcements_blocks_heading_align";
  DROP TYPE "public"."enum_announcements_blocks_list_kind";
  DROP TYPE "public"."enum_programs_blocks_heading_level";
  DROP TYPE "public"."enum_programs_blocks_heading_align";
  DROP TYPE "public"."enum_programs_blocks_list_kind";
  DROP TYPE "public"."enum_shorts_blocks_heading_level";
  DROP TYPE "public"."enum_shorts_blocks_heading_align";
  DROP TYPE "public"."enum_shorts_blocks_list_kind";`)
}
