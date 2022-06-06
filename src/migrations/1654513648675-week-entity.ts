import { MigrationInterface, QueryRunner } from 'typeorm';

export class weekEntity1654513648675 implements MigrationInterface {
  name = 'weekEntity1654513648675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."weeks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "is_even" boolean NOT NULL,
                "group_id" uuid NOT NULL,
                CONSTRAINT "PK_89425bfcfb0cd8e5af2ceb9982c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks"
            ADD CONSTRAINT "FK_8d60aae90a583c9d42b304a5406" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks"
            ADD CONSTRAINT "FK_cc2f6e2da3d296509a32fe3d24c" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks"
            ADD CONSTRAINT "FK_05ce4fc44d4ebc405cb6b369169" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks"
            ADD CONSTRAINT "FK_8b5097cbae858c327a7d0640586" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."weeks" DROP CONSTRAINT "FK_8b5097cbae858c327a7d0640586"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks" DROP CONSTRAINT "FK_05ce4fc44d4ebc405cb6b369169"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks" DROP CONSTRAINT "FK_cc2f6e2da3d296509a32fe3d24c"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."weeks" DROP CONSTRAINT "FK_8d60aae90a583c9d42b304a5406"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."weeks"
        `);
  }
}
