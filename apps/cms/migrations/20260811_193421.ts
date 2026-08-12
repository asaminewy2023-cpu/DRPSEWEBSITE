import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "posts" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "announcements" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "programs" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "gallery_items" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "shorts" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "media" ADD CONSTRAINT "media_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements" ADD CONSTRAINT "announcements_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shorts" ADD CONSTRAINT "shorts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_created_by_idx" ON "media" USING btree ("created_by_id");
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "posts_created_by_idx" ON "posts" USING btree ("created_by_id");
  CREATE INDEX "announcements_created_by_idx" ON "announcements" USING btree ("created_by_id");
  CREATE INDEX "programs_created_by_idx" ON "programs" USING btree ("created_by_id");
  CREATE INDEX "gallery_items_created_by_idx" ON "gallery_items" USING btree ("created_by_id");
  CREATE INDEX "shorts_created_by_idx" ON "shorts" USING btree ("created_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP CONSTRAINT "media_created_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_created_by_id_users_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_created_by_id_users_id_fk";
  
  ALTER TABLE "announcements" DROP CONSTRAINT "announcements_created_by_id_users_id_fk";
  
  ALTER TABLE "programs" DROP CONSTRAINT "programs_created_by_id_users_id_fk";
  
  ALTER TABLE "gallery_items" DROP CONSTRAINT "gallery_items_created_by_id_users_id_fk";
  
  ALTER TABLE "shorts" DROP CONSTRAINT "shorts_created_by_id_users_id_fk";
  
  DROP INDEX "media_created_by_idx";
  DROP INDEX "pages_created_by_idx";
  DROP INDEX "posts_created_by_idx";
  DROP INDEX "announcements_created_by_idx";
  DROP INDEX "programs_created_by_idx";
  DROP INDEX "gallery_items_created_by_idx";
  DROP INDEX "shorts_created_by_idx";
  ALTER TABLE "media" DROP COLUMN "created_by_id";
  ALTER TABLE "pages" DROP COLUMN "created_by_id";
  ALTER TABLE "posts" DROP COLUMN "created_by_id";
  ALTER TABLE "announcements" DROP COLUMN "created_by_id";
  ALTER TABLE "programs" DROP COLUMN "created_by_id";
  ALTER TABLE "gallery_items" DROP COLUMN "created_by_id";
  ALTER TABLE "shorts" DROP COLUMN "created_by_id";`)
}
