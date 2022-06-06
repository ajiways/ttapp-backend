import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillWeekDays1654527501020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true)), 7);
    `);

    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false)), 7);
    `);
    await queryRunner.query(`
        INSERT INTO days ("title", "week_id", "order") VALUES ('Понедельник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 1);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Вторник', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 2);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Среда', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 3);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Четверг', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 4);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Пятница', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 5);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Суббота', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 6);
        INSERT INTO days ("title", "week_id", "order") VALUES ('Воскресенье', (SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false)), 7);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
