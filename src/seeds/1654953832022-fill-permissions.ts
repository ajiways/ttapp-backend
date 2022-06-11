import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillPermissions1654953832022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO permissions ("type") VALUES ('GROUP_CREATE');
        INSERT INTO permissions ("type") VALUES ('GROUP_EDIT');
        INSERT INTO permissions ("type") VALUES ('GROUP_DELETE');
        INSERT INTO permissions ("type") VALUES ('WEEK_CREATE');
        INSERT INTO permissions ("type") VALUES ('WEEK_UPDATE');
        INSERT INTO permissions ("type") VALUES ('WEEK_DELETE');
        INSERT INTO permissions ("type") VALUES ('DAY_CREATE');
        INSERT INTO permissions ("type") VALUES ('DAY_UPDATE');
        INSERT INTO permissions ("type") VALUES ('DAY_DELETE');
        INSERT INTO permissions ("type") VALUES ('LESSON_CREATE');
        INSERT INTO permissions ("type") VALUES ('LESSON_UPDATE');
        INSERT INTO permissions ("type") VALUES ('LESSON_DELETE');
        INSERT INTO permissions ("type") VALUES ('USER_CREATE');
        INSERT INTO permissions ("type") VALUES ('USER_DELETE');
        INSERT INTO permissions ("type") VALUES ('USER_UPDATE');
        INSERT INTO permissions ("type") VALUES ('USER_SELF_UPDATE');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
