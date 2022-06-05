import { MigrationInterface, QueryRunner } from 'typeorm';

export class studentGroupEntity1654441015569 implements MigrationInterface {
  name = 'studentGroupEntity1654441015569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."student_groups" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "student_id" uuid NOT NULL,
                "group_id" uuid NOT NULL,
                CONSTRAINT "PK_b9a45eb40117fff4117d656cf3a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups"
            ADD CONSTRAINT "FK_b3fc68e2dcb406545dc79696add" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups"
            ADD CONSTRAINT "FK_3f99202182779a8b0c2291a3cf2" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups"
            ADD CONSTRAINT "FK_2cb94984b9b7b5ba2b8f8c10326" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups"
            ADD CONSTRAINT "FK_73c81ace0ecb92065f027efb28c" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups" DROP CONSTRAINT "FK_73c81ace0ecb92065f027efb28c"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups" DROP CONSTRAINT "FK_2cb94984b9b7b5ba2b8f8c10326"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups" DROP CONSTRAINT "FK_3f99202182779a8b0c2291a3cf2"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."student_groups" DROP CONSTRAINT "FK_b3fc68e2dcb406545dc79696add"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."student_groups"
        `);
  }
}
