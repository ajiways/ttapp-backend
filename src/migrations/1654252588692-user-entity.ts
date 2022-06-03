import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEntity1654252588692 implements MigrationInterface {
  name = 'userEntity1654252588692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "public"."users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying(16) NOT NULL,
                "password" character varying(32) NOT NULL,
                CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "public"."users"
        `);
  }
}
