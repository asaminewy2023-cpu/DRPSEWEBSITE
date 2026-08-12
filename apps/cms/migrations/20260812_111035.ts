import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_press_releases_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_press_releases_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_press_releases_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_success_stories_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_success_stories_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_success_stories_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TYPE "public"."enum_public_notices_blocks_heading_level" AS ENUM('h1', 'h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_public_notices_blocks_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_public_notices_blocks_list_kind" AS ENUM('bulleted', 'numbered');
  CREATE TABLE "news_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "press_releases_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_releases_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_press_releases_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_press_releases_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "press_releases_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_releases_blocks_image" (
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
  
  CREATE TABLE "press_releases_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "press_releases_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_press_releases_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "press_releases_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "press_releases_blocks_cta" (
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
  
  CREATE TABLE "press_releases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer,
  	"content" jsonb NOT NULL,
  	"pinned" boolean DEFAULT false,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "success_stories_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "success_stories_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_success_stories_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_success_stories_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "success_stories_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "success_stories_blocks_image" (
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
  
  CREATE TABLE "success_stories_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "success_stories_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_success_stories_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "success_stories_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "success_stories_blocks_cta" (
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
  
  CREATE TABLE "success_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer,
  	"content" jsonb NOT NULL,
  	"pinned" boolean DEFAULT false,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "public_notices_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "public_notices_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"level" "enum_public_notices_blocks_heading_level" DEFAULT 'h2',
  	"align" "enum_public_notices_blocks_heading_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "public_notices_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "public_notices_blocks_image" (
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
  
  CREATE TABLE "public_notices_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "public_notices_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_public_notices_blocks_list_kind" DEFAULT 'bulleted',
  	"block_name" varchar
  );
  
  CREATE TABLE "public_notices_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "public_notices_blocks_cta" (
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
  
  CREATE TABLE "public_notices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer,
  	"content" jsonb NOT NULL,
  	"pinned" boolean DEFAULT false,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "category_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "press_releases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "success_stories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "public_notices_id" integer;
  ALTER TABLE "news_categories" ADD CONSTRAINT "news_categories_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_paragraph" ADD CONSTRAINT "press_releases_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_heading" ADD CONSTRAINT "press_releases_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_hero" ADD CONSTRAINT "press_releases_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_image" ADD CONSTRAINT "press_releases_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_list_items" ADD CONSTRAINT "press_releases_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_list" ADD CONSTRAINT "press_releases_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_quote" ADD CONSTRAINT "press_releases_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases_blocks_cta" ADD CONSTRAINT "press_releases_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases" ADD CONSTRAINT "press_releases_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_releases" ADD CONSTRAINT "press_releases_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_paragraph" ADD CONSTRAINT "success_stories_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_heading" ADD CONSTRAINT "success_stories_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_hero" ADD CONSTRAINT "success_stories_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_image" ADD CONSTRAINT "success_stories_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_list_items" ADD CONSTRAINT "success_stories_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_list" ADD CONSTRAINT "success_stories_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_quote" ADD CONSTRAINT "success_stories_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_blocks_cta" ADD CONSTRAINT "success_stories_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_paragraph" ADD CONSTRAINT "public_notices_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_heading" ADD CONSTRAINT "public_notices_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_hero" ADD CONSTRAINT "public_notices_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_image" ADD CONSTRAINT "public_notices_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_list_items" ADD CONSTRAINT "public_notices_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_list" ADD CONSTRAINT "public_notices_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_quote" ADD CONSTRAINT "public_notices_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices_blocks_cta" ADD CONSTRAINT "public_notices_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_notices" ADD CONSTRAINT "public_notices_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "public_notices" ADD CONSTRAINT "public_notices_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "news_categories_slug_idx" ON "news_categories" USING btree ("slug");
  CREATE INDEX "news_categories_created_by_idx" ON "news_categories" USING btree ("created_by_id");
  CREATE INDEX "news_categories_updated_at_idx" ON "news_categories" USING btree ("updated_at");
  CREATE INDEX "news_categories_created_at_idx" ON "news_categories" USING btree ("created_at");
  CREATE INDEX "press_releases_blocks_paragraph_order_idx" ON "press_releases_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_paragraph_parent_id_idx" ON "press_releases_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_paragraph_path_idx" ON "press_releases_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_heading_order_idx" ON "press_releases_blocks_heading" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_heading_parent_id_idx" ON "press_releases_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_heading_path_idx" ON "press_releases_blocks_heading" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_hero_order_idx" ON "press_releases_blocks_hero" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_hero_parent_id_idx" ON "press_releases_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_hero_path_idx" ON "press_releases_blocks_hero" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_image_order_idx" ON "press_releases_blocks_image" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_image_parent_id_idx" ON "press_releases_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_image_path_idx" ON "press_releases_blocks_image" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_list_items_order_idx" ON "press_releases_blocks_list_items" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_list_items_parent_id_idx" ON "press_releases_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_list_order_idx" ON "press_releases_blocks_list" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_list_parent_id_idx" ON "press_releases_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_list_path_idx" ON "press_releases_blocks_list" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_quote_order_idx" ON "press_releases_blocks_quote" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_quote_parent_id_idx" ON "press_releases_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_quote_path_idx" ON "press_releases_blocks_quote" USING btree ("_path");
  CREATE INDEX "press_releases_blocks_cta_order_idx" ON "press_releases_blocks_cta" USING btree ("_order");
  CREATE INDEX "press_releases_blocks_cta_parent_id_idx" ON "press_releases_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "press_releases_blocks_cta_path_idx" ON "press_releases_blocks_cta" USING btree ("_path");
  CREATE INDEX "press_releases_featured_image_idx" ON "press_releases" USING btree ("featured_image_id");
  CREATE INDEX "press_releases_created_by_idx" ON "press_releases" USING btree ("created_by_id");
  CREATE INDEX "press_releases_updated_at_idx" ON "press_releases" USING btree ("updated_at");
  CREATE INDEX "press_releases_created_at_idx" ON "press_releases" USING btree ("created_at");
  CREATE INDEX "success_stories_blocks_paragraph_order_idx" ON "success_stories_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_paragraph_parent_id_idx" ON "success_stories_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_paragraph_path_idx" ON "success_stories_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_heading_order_idx" ON "success_stories_blocks_heading" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_heading_parent_id_idx" ON "success_stories_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_heading_path_idx" ON "success_stories_blocks_heading" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_hero_order_idx" ON "success_stories_blocks_hero" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_hero_parent_id_idx" ON "success_stories_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_hero_path_idx" ON "success_stories_blocks_hero" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_image_order_idx" ON "success_stories_blocks_image" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_image_parent_id_idx" ON "success_stories_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_image_path_idx" ON "success_stories_blocks_image" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_list_items_order_idx" ON "success_stories_blocks_list_items" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_list_items_parent_id_idx" ON "success_stories_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_list_order_idx" ON "success_stories_blocks_list" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_list_parent_id_idx" ON "success_stories_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_list_path_idx" ON "success_stories_blocks_list" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_quote_order_idx" ON "success_stories_blocks_quote" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_quote_parent_id_idx" ON "success_stories_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_quote_path_idx" ON "success_stories_blocks_quote" USING btree ("_path");
  CREATE INDEX "success_stories_blocks_cta_order_idx" ON "success_stories_blocks_cta" USING btree ("_order");
  CREATE INDEX "success_stories_blocks_cta_parent_id_idx" ON "success_stories_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "success_stories_blocks_cta_path_idx" ON "success_stories_blocks_cta" USING btree ("_path");
  CREATE INDEX "success_stories_featured_image_idx" ON "success_stories" USING btree ("featured_image_id");
  CREATE INDEX "success_stories_created_by_idx" ON "success_stories" USING btree ("created_by_id");
  CREATE INDEX "success_stories_updated_at_idx" ON "success_stories" USING btree ("updated_at");
  CREATE INDEX "success_stories_created_at_idx" ON "success_stories" USING btree ("created_at");
  CREATE INDEX "public_notices_blocks_paragraph_order_idx" ON "public_notices_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_paragraph_parent_id_idx" ON "public_notices_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_paragraph_path_idx" ON "public_notices_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_heading_order_idx" ON "public_notices_blocks_heading" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_heading_parent_id_idx" ON "public_notices_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_heading_path_idx" ON "public_notices_blocks_heading" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_hero_order_idx" ON "public_notices_blocks_hero" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_hero_parent_id_idx" ON "public_notices_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_hero_path_idx" ON "public_notices_blocks_hero" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_image_order_idx" ON "public_notices_blocks_image" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_image_parent_id_idx" ON "public_notices_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_image_path_idx" ON "public_notices_blocks_image" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_list_items_order_idx" ON "public_notices_blocks_list_items" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_list_items_parent_id_idx" ON "public_notices_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_list_order_idx" ON "public_notices_blocks_list" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_list_parent_id_idx" ON "public_notices_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_list_path_idx" ON "public_notices_blocks_list" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_quote_order_idx" ON "public_notices_blocks_quote" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_quote_parent_id_idx" ON "public_notices_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_quote_path_idx" ON "public_notices_blocks_quote" USING btree ("_path");
  CREATE INDEX "public_notices_blocks_cta_order_idx" ON "public_notices_blocks_cta" USING btree ("_order");
  CREATE INDEX "public_notices_blocks_cta_parent_id_idx" ON "public_notices_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "public_notices_blocks_cta_path_idx" ON "public_notices_blocks_cta" USING btree ("_path");
  CREATE INDEX "public_notices_featured_image_idx" ON "public_notices" USING btree ("featured_image_id");
  CREATE INDEX "public_notices_created_by_idx" ON "public_notices" USING btree ("created_by_id");
  CREATE INDEX "public_notices_updated_at_idx" ON "public_notices" USING btree ("updated_at");
  CREATE INDEX "public_notices_created_at_idx" ON "public_notices" USING btree ("created_at");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_news_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_categories_fk" FOREIGN KEY ("news_categories_id") REFERENCES "public"."news_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_releases_fk" FOREIGN KEY ("press_releases_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_public_notices_fk" FOREIGN KEY ("public_notices_id") REFERENCES "public"."public_notices"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_news_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("news_categories_id");
  CREATE INDEX "payload_locked_documents_rels_press_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("press_releases_id");
  CREATE INDEX "payload_locked_documents_rels_success_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("success_stories_id");
  CREATE INDEX "payload_locked_documents_rels_public_notices_id_idx" ON "payload_locked_documents_rels" USING btree ("public_notices_id");
  ALTER TABLE "posts" DROP COLUMN "category";
  DROP TYPE "public"."enum_posts_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_category" AS ENUM('Announcements', 'Press Releases', 'Success Stories', 'Public Notices');
  ALTER TABLE "news_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "press_releases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_notices" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "news_categories" CASCADE;
  DROP TABLE "press_releases_blocks_paragraph" CASCADE;
  DROP TABLE "press_releases_blocks_heading" CASCADE;
  DROP TABLE "press_releases_blocks_hero" CASCADE;
  DROP TABLE "press_releases_blocks_image" CASCADE;
  DROP TABLE "press_releases_blocks_list_items" CASCADE;
  DROP TABLE "press_releases_blocks_list" CASCADE;
  DROP TABLE "press_releases_blocks_quote" CASCADE;
  DROP TABLE "press_releases_blocks_cta" CASCADE;
  DROP TABLE "press_releases" CASCADE;
  DROP TABLE "success_stories_blocks_paragraph" CASCADE;
  DROP TABLE "success_stories_blocks_heading" CASCADE;
  DROP TABLE "success_stories_blocks_hero" CASCADE;
  DROP TABLE "success_stories_blocks_image" CASCADE;
  DROP TABLE "success_stories_blocks_list_items" CASCADE;
  DROP TABLE "success_stories_blocks_list" CASCADE;
  DROP TABLE "success_stories_blocks_quote" CASCADE;
  DROP TABLE "success_stories_blocks_cta" CASCADE;
  DROP TABLE "success_stories" CASCADE;
  DROP TABLE "public_notices_blocks_paragraph" CASCADE;
  DROP TABLE "public_notices_blocks_heading" CASCADE;
  DROP TABLE "public_notices_blocks_hero" CASCADE;
  DROP TABLE "public_notices_blocks_image" CASCADE;
  DROP TABLE "public_notices_blocks_list_items" CASCADE;
  DROP TABLE "public_notices_blocks_list" CASCADE;
  DROP TABLE "public_notices_blocks_quote" CASCADE;
  DROP TABLE "public_notices_blocks_cta" CASCADE;
  DROP TABLE "public_notices" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_news_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_press_releases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_success_stories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_public_notices_fk";
  
  DROP INDEX "posts_category_idx";
  DROP INDEX "payload_locked_documents_rels_news_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_press_releases_id_idx";
  DROP INDEX "payload_locked_documents_rels_success_stories_id_idx";
  DROP INDEX "payload_locked_documents_rels_public_notices_id_idx";
  ALTER TABLE "posts" ADD COLUMN "category" "enum_posts_category" DEFAULT 'Announcements' NOT NULL;
  ALTER TABLE "posts" DROP COLUMN "category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "press_releases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "success_stories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "public_notices_id";
  DROP TYPE "public"."enum_press_releases_blocks_heading_level";
  DROP TYPE "public"."enum_press_releases_blocks_heading_align";
  DROP TYPE "public"."enum_press_releases_blocks_list_kind";
  DROP TYPE "public"."enum_success_stories_blocks_heading_level";
  DROP TYPE "public"."enum_success_stories_blocks_heading_align";
  DROP TYPE "public"."enum_success_stories_blocks_list_kind";
  DROP TYPE "public"."enum_public_notices_blocks_heading_level";
  DROP TYPE "public"."enum_public_notices_blocks_heading_align";
  DROP TYPE "public"."enum_public_notices_blocks_list_kind";`)
}
