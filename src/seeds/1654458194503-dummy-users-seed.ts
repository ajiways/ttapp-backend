import { MigrationInterface, QueryRunner } from 'typeorm';

export class dummyUsersSeed1654458194503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO users ("login", "password", "group_id") VALUES ('dummy1', '$2a$07$STJCvrBJVbDG2JivUYWkIuLeSf/S4b177mizRQ3FagLvKy9WzwKmO', (SELECT id FROM groups WHERE title='Admin group'));
      `);
    await queryRunner.query(`
      INSERT INTO users ("login", "password", "group_id") VALUES ('dummy2', '$2a$07$STJCvrBJVbDG2JivUYWkIuLeSf/S4b177mizRQ3FagLvKy9WzwKmO', (SELECT id FROM groups WHERE title='Admin group'));
    `);
    await queryRunner.query(`
        INSERT INTO users ("login", "password", "group_id") VALUES ('dummy3', '$2a$07$STJCvrBJVbDG2JivUYWkIuLeSf/S4b177mizRQ3FagLvKy9WzwKmO', (SELECT id FROM groups WHERE title='Admin group'));
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
