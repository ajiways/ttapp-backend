import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillGroupsWithWeeks1654517693049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='Admin group'), true);
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='Admin group'), false);
    `);
    await queryRunner.query(`
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ПЗ-1'), true);
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ПЗ-1'), false);
    `);
    await queryRunner.query(`
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ХУ-32'), true);
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ХУ-32'), false);
    `);
    await queryRunner.query(`
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ПИ-3'), true);
        INSERT INTO weeks ("group_id","is_even") VALUES ((SELECT id FROM groups WHERE title='ПИ-3'), false);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
