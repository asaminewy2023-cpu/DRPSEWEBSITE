import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "subscribers" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"email" varchar NOT NULL,
   	"name" varchar,
   	"subscribed" boolean DEFAULT true,
   	"created_by_id" integer,
   	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
   	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );
   
   ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
   CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
   CREATE INDEX "subscribers_created_by_idx" ON "subscribers" USING btree ("created_by_id");
   CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
   CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "subscribers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "subscribers" CASCADE;`)
}