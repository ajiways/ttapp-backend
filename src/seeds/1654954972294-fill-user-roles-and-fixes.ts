import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillUserRolesAndFixes1654954972294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO student_groups ("student_id", "group_id") VALUES ((SELECT id FROM users WHERE login='admin'), (SELECT id FROM groups WHERE title='Admin group'))
    `);
    await queryRunner.query(`
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='admin'), (SELECT id FROM users WHERE login='admin'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM users WHERE login='dummy1'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='student'), (SELECT id FROM users WHERE login='dummy1'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM users WHERE login='dummy2'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='student'), (SELECT id FROM users WHERE login='dummy2'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM users WHERE login='dummy3'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='student'), (SELECT id FROM users WHERE login='dummy3'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
