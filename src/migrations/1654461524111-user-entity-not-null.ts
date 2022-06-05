import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEntityNotNull1654461524111 implements MigrationInterface {
  name = 'userEntityNotNull1654461524111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ALTER COLUMN "group_id"
            SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ALTER COLUMN "group_id" DROP NOT NULL
        `);
  }
}
