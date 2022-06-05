import { MigrationInterface, QueryRunner } from 'typeorm';

export class adminUserSeed1654442801912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO users ("login", "password") VALUES ('admin', '$2a$07$STJCvrBJVbDG2JivUYWkIuLeSf/S4b177mizRQ3FagLvKy9WzwKmO')
      `);

    //admin1Q!
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //lazy zzz..
  }
}
