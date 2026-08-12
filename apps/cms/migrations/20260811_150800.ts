import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_social_links_label" AS ENUM('Facebook', 'Twitter', 'YouTube', 'Telegram', 'Other');
  CREATE TABLE "site_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" "enum_site_settings_social_links_label" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"branding_site_name" varchar DEFAULT 'South Ethiopia Regional State' NOT NULL,
  	"branding_site_subtitle" varchar DEFAULT 'Deputy Regional President',
  	"branding_logo_id" integer,
  	"organization_title_line1" varchar DEFAULT 'Deputy Regional President of the',
  	"organization_title_line2" varchar DEFAULT 'South Ethiopia Regional State',
  	"meta_title_template" varchar DEFAULT '%s | Deputy Regional President of the South Ethiopia Regional State',
  	"meta_description" varchar,
  	"footer_description" varchar,
  	"footer_copyright" varchar,
  	"footer_developed_by" varchar,
  	"contact_emergency_hotline" varchar DEFAULT 'Emergency Hotline: 911',
  	"contact_email" varchar DEFAULT 'emergency@southethiopia.gov.et',
  	"contact_address" varchar DEFAULT 'Regional HQ: Hawassa, Ethiopia',
  	"contact_office_hours" varchar DEFAULT 'Office Hours: Mon-Fri 8:00-17:00',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_id_media_id_fk" FOREIGN KEY ("branding_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_branding_branding_logo_idx" ON "site_settings" USING btree ("branding_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_nav_links" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_site_settings_social_links_label";`)
}
