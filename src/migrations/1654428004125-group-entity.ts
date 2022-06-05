import { MigrationInterface, QueryRunner } from 'typeorm';

export class groupEntity1654428004125 implements MigrationInterface {
  name = 'groupEntity1654428004125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."groups" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "headman_id" uuid NOT NULL,
                "title" character varying NOT NULL,
                CONSTRAINT "PK_dbdeb86e50882d20da55843e87a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups"
            ADD CONSTRAINT "FK_a2d104446045b1e595b65070c01" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups"
            ADD CONSTRAINT "FK_2c9d95e4dd031bafe391f5f6fff" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups"
            ADD CONSTRAINT "FK_04c1b8e374d65b63dc89920b885" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."groups" DROP CONSTRAINT "FK_04c1b8e374d65b63dc89920b885"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups" DROP CONSTRAINT "FK_2c9d95e4dd031bafe391f5f6fff"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups" DROP CONSTRAINT "FK_a2d104446045b1e595b65070c01"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."groups"
        `);
  }
}
