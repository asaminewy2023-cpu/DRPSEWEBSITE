import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_category" AS ENUM('Announcements', 'Press Releases', 'Success Stories', 'Public Notices');
  ALTER TABLE "posts" ALTER COLUMN "category" SET DEFAULT 'Announcements'::"public"."enum_posts_category";
  ALTER TABLE "posts" ALTER COLUMN "category" SET DATA TYPE "public"."enum_posts_category" USING "category"::"public"."enum_posts_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "category" SET DATA TYPE varchar;
  ALTER TABLE "posts" ALTER COLUMN "category" DROP DEFAULT;
  DROP TYPE "public"."enum_posts_category";`)
}
