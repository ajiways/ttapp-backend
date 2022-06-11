import { MigrationInterface, QueryRunner } from 'typeorm';

export class adminGroupSeed1654458040491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO groups ("headman_id", "title") VALUES ((SELECT id FROM users WHERE login='admin'), 'Admin group');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
