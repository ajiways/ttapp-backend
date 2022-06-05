import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillUserGroups1654461157809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE users SET group_id = (SELECT id FROM groups WHERE title='Admin group') WHERE group_id IS NULL  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzzz
  }
}
