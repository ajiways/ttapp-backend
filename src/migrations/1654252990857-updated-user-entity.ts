import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedUserEntity1654252990857 implements MigrationInterface {
  name = 'updatedUserEntity1654252990857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "edited_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "editor_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "deleted_at" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "deleter_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD "creator_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD CONSTRAINT "FK_1705043a16a8b741acd81d5adea" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD CONSTRAINT "FK_abd5e5fe550836ade0be227c74b" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users"
            ADD CONSTRAINT "FK_5c0a8e1ff1ec47802a694d21567" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP CONSTRAINT "FK_5c0a8e1ff1ec47802a694d21567"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP CONSTRAINT "FK_abd5e5fe550836ade0be227c74b"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP CONSTRAINT "FK_1705043a16a8b741acd81d5adea"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "creator_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "deleter_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "deleted_at"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "editor_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "edited_at"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."users" DROP COLUMN "created_at"
        `);
  }
}
