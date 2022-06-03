import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedUserEntityAgain1654253969932 implements MigrationInterface {
  name = 'updatedUserEntityAgain1654253969932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "password"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "password" character varying(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "password"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "password" character varying(32) NOT NULL
        `);
  }
}
