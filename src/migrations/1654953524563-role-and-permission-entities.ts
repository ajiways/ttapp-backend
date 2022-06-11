import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleAndPermissionEntities1654953524563
  implements MigrationInterface
{
  name = 'roleAndPermissionEntities1654953524563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."permissions_type_enum" AS ENUM(
                'GROUP_CREATE',
                'GROUP_EDIT',
                'GROUP_DELETE',
                'WEEK_CREATE',
                'WEEK_UPDATE',
                'WEEK_DELETE',
                'DAY_CREATE',
                'DAY_UPDATE',
                'DAY_DELETE',
                'LESSON_CREATE',
                'LESSON_UPDATE',
                'LESSON_DELETE',
                'USER_CREATE',
                'USER_UPDATE',
                'USER_DELETE',
                'USER_SELF_UPDATE'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."permissions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "type" "public"."permissions_type_enum" NOT NULL,
                CONSTRAINT "PK_f0f9bb265f21bfc7ad206ad2e97" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "title" character varying(16) NOT NULL,
                CONSTRAINT "PK_130f0eec948cd435a779de3a4f0" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."permission_roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "permission_id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                CONSTRAINT "PK_da0ca1ee59c6acd9574391b86bd" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "public"."user_roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "creator_id" uuid,
                "edited_at" TIMESTAMP NOT NULL DEFAULT now(),
                "editor_id" uuid,
                "deleted_at" TIMESTAMP,
                "deleter_id" uuid,
                "user_id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                CONSTRAINT "PK_2f708d6869058302a83e1f373fa" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions"
            ADD CONSTRAINT "FK_6b34496a27bc8025b5036281f0b" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions"
            ADD CONSTRAINT "FK_cf00487bc763fa65534e9d44789" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions"
            ADD CONSTRAINT "FK_2990c459936e7995cec6cd7fd85" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles"
            ADD CONSTRAINT "FK_c3d03f6c36f61750229976a2521" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles"
            ADD CONSTRAINT "FK_03b107b685b7f49f000d6346ec9" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles"
            ADD CONSTRAINT "FK_f6cd621fce56c3805d6350721a7" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles"
            ADD CONSTRAINT "FK_45ae2ef8627578e451cfad96747" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles"
            ADD CONSTRAINT "FK_8a9c1eccb4c065cecf1dbc13141" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles"
            ADD CONSTRAINT "FK_56f4131fbbc932eddf3b7814589" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles"
            ADD CONSTRAINT "FK_476305ba97f1c49dbf8c054a823" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles"
            ADD CONSTRAINT "FK_cb7d4ce1a73c28c8e082148b6f5" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_6ff00c2c303d2e7c0af8ac07b7f" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_152c62aabf03ec4b94b52cf7182" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_b4f7fcb35f78562b7f8a816fbf8" FOREIGN KEY ("deleter_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_c9c1a14db69da53f26fc4330102" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles"
            ADD CONSTRAINT "FK_2571274dc6390295cbd14b5338b" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_2571274dc6390295cbd14b5338b"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_c9c1a14db69da53f26fc4330102"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_b4f7fcb35f78562b7f8a816fbf8"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_152c62aabf03ec4b94b52cf7182"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_6ff00c2c303d2e7c0af8ac07b7f"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles" DROP CONSTRAINT "FK_cb7d4ce1a73c28c8e082148b6f5"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles" DROP CONSTRAINT "FK_476305ba97f1c49dbf8c054a823"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles" DROP CONSTRAINT "FK_56f4131fbbc932eddf3b7814589"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles" DROP CONSTRAINT "FK_8a9c1eccb4c065cecf1dbc13141"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permission_roles" DROP CONSTRAINT "FK_45ae2ef8627578e451cfad96747"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles" DROP CONSTRAINT "FK_f6cd621fce56c3805d6350721a7"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles" DROP CONSTRAINT "FK_03b107b685b7f49f000d6346ec9"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."roles" DROP CONSTRAINT "FK_c3d03f6c36f61750229976a2521"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions" DROP CONSTRAINT "FK_2990c459936e7995cec6cd7fd85"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions" DROP CONSTRAINT "FK_cf00487bc763fa65534e9d44789"
        `);
    await queryRunner.query(`
            ALTER TABLE "public"."permissions" DROP CONSTRAINT "FK_6b34496a27bc8025b5036281f0b"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."user_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."permission_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."roles"
        `);
    await queryRunner.query(`
            DROP TABLE "public"."permissions"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."permissions_type_enum"
        `);
  }
}
