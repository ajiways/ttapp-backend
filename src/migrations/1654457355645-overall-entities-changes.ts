import { MigrationInterface, QueryRunner } from 'typeorm';

export class overallEntitiesChanges1654457355645 implements MigrationInterface {
  name = 'overallEntitiesChanges1654457355645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "group_id" uuid
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "group_id"
        `);
  }
}
