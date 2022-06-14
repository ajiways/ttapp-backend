import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAdminRoles1655208154533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='headman'), (SELECT id FROM users WHERE login='admin'));
        INSERT INTO user_roles ("role_id", "user_id") VALUES ((SELECT id FROM roles WHERE title='student'), (SELECT id FROM users WHERE login='admin'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
