import { MigrationInterface, QueryRunner } from 'typeorm';

export class lessonEntity1654534672020 implements MigrationInterface {
  name = 'lessonEntity1654534672020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."lessons_type_enum" AS ENUM('ПЗ', 'ЛК', 'ЛБ')
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."lessons" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "title" character varying NOT NULL,
                "type" "public"."lessons_type_enum" NOT NULL,
                "teacher" character varying NOT NULL,
                "cabinet_number" integer NOT NULL,
                "start_date" character varying NOT NULL,
                "end_date" character varying NOT NULL,
                "order" integer NOT NULL,
                "day_id" uuid NOT NULL,
                CONSTRAINT "PK_a296c097c7a941fd8575e1202c6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD CONSTRAINT "FK_70fb2f68d970db0b49823a2af44" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD CONSTRAINT "FK_0540913e0c8279ea43b747449ae" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD CONSTRAINT "FK_6b8cd82919cd0957767fe85f031" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD CONSTRAINT "FK_5738465d5de4447f688404b985c" FOREIGN KEY ("day_id") REFERENCES "public"."days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP CONSTRAINT "FK_5738465d5de4447f688404b985c"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP CONSTRAINT "FK_6b8cd82919cd0957767fe85f031"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP CONSTRAINT "FK_0540913e0c8279ea43b747449ae"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP CONSTRAINT "FK_70fb2f68d970db0b49823a2af44"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."lessons"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."lessons_type_enum"
        `);
  }
}
