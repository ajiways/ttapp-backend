import { MigrationInterface, QueryRunner } from 'typeorm';

export class dummyGroups1654458352375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO student_groups ("student_id", "group_id") VALUES ((SELECT id FROM users WHERE login='dummy1'), (SELECT id FROM groups WHERE title='Admin group'))
      `);
    await queryRunner.query(`
        INSERT INTO student_groups ("student_id", "group_id") VALUES ((SELECT id FROM users WHERE login='dummy2'), (SELECT id FROM groups WHERE title='Admin group'))
    `);
    await queryRunner.query(`
        INSERT INTO student_groups ("student_id", "group_id") VALUES ((SELECT id FROM users WHERE login='dummy3'), (SELECT id FROM groups WHERE title='Admin group'))
      `);
    await queryRunner.query(`
        INSERT INTO groups ("headman_id", "title") VALUES ((SELECT id FROM users WHERE login='dummy1'), 'ПЗ-1')
    `);
    await queryRunner.query(`
        INSERT INTO groups ("headman_id", "title") VALUES ((SELECT id FROM users WHERE login='dummy2'), 'ХУ-32')
    `);
    await queryRunner.query(`
        INSERT INTO groups ("headman_id", "title") VALUES ((SELECT id FROM users WHERE login='dummy3'), 'ПИ-3')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
