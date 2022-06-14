import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixedLessonEntity1655202165786 implements MigrationInterface {
  name = 'fixedLessonEntity1655202165786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP COLUMN "cabinet_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD "cabinet_number" character varying
        `);
    await queryRunner.query(`
            UPDATE "public"."lessons" SET cabinet_number='303'
        `);
    await queryRunner.query(`
        ALTER TABLE "public"."lessons"
        ALTER COLUMN "cabinet_number" set NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."lessons" DROP COLUMN "cabinet_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."lessons"
            ADD "cabinet_number" integer NOT NULL
        `);
  }
}
