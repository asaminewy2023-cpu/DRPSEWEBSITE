import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_settings_default_language" AS ENUM('en', 'am');
  CREATE TYPE "public"."enum_settings_list_image_size" AS ENUM('card', 'thumbnail', 'original');
  CREATE TYPE "public"."enum_settings_card_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_tagline" varchar DEFAULT 'Inspiring stories of impact and achievement',
  	"default_language" "enum_settings_default_language" DEFAULT 'en',
  	"timezone" varchar DEFAULT 'Africa/Addis_Ababa',
  	"default_author" varchar DEFAULT 'Regional Communications Bureau',
  	"default_category_id" integer,
  	"default_excerpt_length" numeric DEFAULT 160,
  	"posts_per_page" numeric DEFAULT 9,
  	"show_latest_articles" boolean DEFAULT true,
  	"show_related_posts" boolean DEFAULT true,
  	"enable_comments" boolean DEFAULT false,
  	"comment_moderation" boolean DEFAULT true,
  	"list_image_size" "enum_settings_list_image_size" DEFAULT 'card',
  	"card_aspect_ratio" "enum_settings_card_aspect_ratio" DEFAULT '16/9',
  	"post_base" varchar DEFAULT '/blog',
  	"success_story_base" varchar DEFAULT '/success-stories',
  	"use_trailing_slash" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "settings" ADD CONSTRAINT "settings_default_category_id_news_categories_id_fk" FOREIGN KEY ("default_category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_default_category_idx" ON "settings" USING btree ("default_category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_settings_default_language";
  DROP TYPE "public"."enum_settings_list_image_size";
  DROP TYPE "public"."enum_settings_card_aspect_ratio";`)
}
