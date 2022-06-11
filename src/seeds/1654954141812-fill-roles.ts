import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillRoles1654954141812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO roles ("title") VALUES ('admin');
        INSERT INTO roles ("title") VALUES ('student');
        INSERT INTO roles ("title") VALUES ('headman');
    `);
    await queryRunner.query(`
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='GROUP_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='GROUP_EDIT'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='GROUP_DELETE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='WEEK_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='WEEK_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='WEEK_DELETE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='DAY_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='DAY_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='DAY_DELETE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='LESSON_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='LESSON_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='LESSON_DELETE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='USER_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='USER_DELETE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='USER_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM permissions WHERE type='USER_SELF_UPDATE'));
    `);
    await queryRunner.query(`
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM permissions WHERE type='DAY_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM permissions WHERE type='LESSON_CREATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM permissions WHERE type='LESSON_UPDATE'));
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM permissions WHERE type='LESSON_DELETE'));
    `);
    await queryRunner.query(`
        INSERT INTO permission_roles ("role_id", "permission_id") VALUES ((SELECT id FROM roles WHERE title='student'), (SELECT id FROM permissions WHERE type='USER_SELF_UPDATE'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
