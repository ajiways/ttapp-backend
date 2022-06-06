import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillDaysLessons1654534702964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='Admin group' AND is_even=false))));
    `);

    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПЗ-1' AND is_even=false))));
    `);

    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ХУ-32' AND is_even=false))));
    `);

    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Понедельник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Вторник' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Среда' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Четверг' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физ-ра', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Пятница' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
    await queryRunner.query(`
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=true))));
        INSERT INTO lessons ("title", "type", "teacher", "cabinet_number", "start_date", "end_date", "order", "day_id") VALUES ('Физика', 'ЛК', 'Петров Иван Павлович', '303', '08:30', '10:05', 1, (SELECT id FROM days WHERE title='Суббота' AND week_id=(SELECT id FROM weeks WHERE group_id=(SELECT id FROM groups WHERE title='ПИ-3' AND is_even=false))));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //zzz
  }
}
