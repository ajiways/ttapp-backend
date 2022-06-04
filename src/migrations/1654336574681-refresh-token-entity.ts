import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshTokenEntity1654336574681 implements MigrationInterface {
  name = 'refreshTokenEntity1654336574681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."refresh_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "user_id" uuid NOT NULL,
                "refresh_token" character varying NOT NULL,
                CONSTRAINT "PK_31be789dd2de8b435f059b18a57" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens"
            ADD CONSTRAINT "FK_32ae808ad2ccbb2ac157c006d52" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens"
            ADD CONSTRAINT "FK_321c85ebaf84574b7e40125621d" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens"
            ADD CONSTRAINT "FK_925c280b45e723eea4f31c1253c" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "FK_925c280b45e723eea4f31c1253c"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "FK_321c85ebaf84574b7e40125621d"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "FK_32ae808ad2ccbb2ac157c006d52"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."refresh_tokens"
        `);
  }
}
