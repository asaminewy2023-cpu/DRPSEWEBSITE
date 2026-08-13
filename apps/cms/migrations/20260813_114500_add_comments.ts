import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "comments" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"post_id" integer NOT NULL,
   	"name" varchar NOT NULL,
   	"email" varchar,
   	"content" varchar NOT NULL,
   	"approved" boolean DEFAULT false,
   	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
   	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );
   
   ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "comments_post_idx" ON "comments" USING btree ("post_id");
   CREATE INDEX "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
   CREATE INDEX "comments_created_at_idx" ON "comments" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "comments" CASCADE;`)
}