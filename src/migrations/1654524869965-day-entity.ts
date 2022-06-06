import { MigrationInterface, QueryRunner } from 'typeorm';

export class dayEntity1654524869965 implements MigrationInterface {
  name = 'dayEntity1654524869965';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."days_title_enum" AS ENUM(
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
                'Воскресенье'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."days" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "title" "public"."days_title_enum" NOT NULL,
                "order" integer NOT NULL,
                "week_id" uuid NOT NULL,
                CONSTRAINT "PK_35bb429bcef3fc0909b2ef70830" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days"
            ADD CONSTRAINT "FK_a6b9067f7b9b5cca6b3cbf3225e" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days"
            ADD CONSTRAINT "FK_b0e864123d7635a1728cba8a546" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days"
            ADD CONSTRAINT "FK_cc8d4058fbd29e33508b2df7549" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days"
            ADD CONSTRAINT "FK_e439087e92f881a5471bf02a5c7" FOREIGN KEY ("week_id") REFERENCES "public"."weeks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."days" DROP CONSTRAINT "FK_e439087e92f881a5471bf02a5c7"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days" DROP CONSTRAINT "FK_cc8d4058fbd29e33508b2df7549"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days" DROP CONSTRAINT "FK_b0e864123d7635a1728cba8a546"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."days" DROP CONSTRAINT "FK_a6b9067f7b9b5cca6b3cbf3225e"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."days"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."days_title_enum"
        `);
  }
}
