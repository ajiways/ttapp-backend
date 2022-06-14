import { MigrationInterface, QueryRunner } from 'typeorm';

export class notNullHeadmanAndGroup1655213614172 implements MigrationInterface {
  name = 'notNullHeadmanAndGroup1655213614172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ALTER COLUMN "group_id" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."groups"
            ALTER COLUMN "headman_id" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."groups"
            ALTER COLUMN "headman_id"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ALTER COLUMN "group_id"
            SET NOT NULL
        `);
  }
}
