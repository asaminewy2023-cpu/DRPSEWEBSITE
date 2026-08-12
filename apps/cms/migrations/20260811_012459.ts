import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "announcements" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "programs" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "gallery_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "shorts" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "announcements" ADD CONSTRAINT "announcements_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shorts" ADD CONSTRAINT "shorts_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "announcements_featured_image_idx" ON "announcements" USING btree ("featured_image_id");
  CREATE INDEX "programs_featured_image_idx" ON "programs" USING btree ("featured_image_id");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "shorts_thumbnail_idx" ON "shorts" USING btree ("thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "announcements" DROP CONSTRAINT "announcements_featured_image_id_media_id_fk";
  
  ALTER TABLE "programs" DROP CONSTRAINT "programs_featured_image_id_media_id_fk";
  
  ALTER TABLE "gallery_items" DROP CONSTRAINT "gallery_items_image_id_media_id_fk";
  
  ALTER TABLE "shorts" DROP CONSTRAINT "shorts_thumbnail_id_media_id_fk";
  
  DROP INDEX "announcements_featured_image_idx";
  DROP INDEX "programs_featured_image_idx";
  DROP INDEX "gallery_items_image_idx";
  DROP INDEX "shorts_thumbnail_idx";
  ALTER TABLE "announcements" DROP COLUMN "featured_image_id";
  ALTER TABLE "programs" DROP COLUMN "featured_image_id";
  ALTER TABLE "gallery_items" DROP COLUMN "image_id";
  ALTER TABLE "shorts" DROP COLUMN "thumbnail_id";`)
}
