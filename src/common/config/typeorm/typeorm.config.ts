import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DEFAULT_CONNECTION } from '../../typeorm/connections';

const settingsObj = {
  entities: [join(process.cwd(), '/dist/**/*.entity.js')],
  migrations: ['dist/migrations/*.js', 'dist/seeds/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

if (process.env.STAGE === 'PROD') {
  settingsObj.entities = [join(process.cwd(), '/**/*.entity.js')];
  settingsObj.cli.migrationsDir = `${join(process.cwd())}/migrations`;
  settingsObj.migrations = [
    `${join(process.cwd())}/migrations/*.js`,
    `${join(process.cwd())}/seeds/*.js`,
  ];
}

const getBaseConfigPart = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: settingsObj.entities,
  migrations: settingsObj.migrations,
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  schema: 'public',
  logging: 'all',
  migrationsRun: true,
  cli: {
    migrationsDir: settingsObj.cli.migrationsDir,
  },
});

export default registerAs('typeorm', function (): PostgresConnectionOptions[] {
  return [
    {
      name: DEFAULT_CONNECTION,
      ...getBaseConfigPart(),
    },
    {
      name: 'migrations:create-run-revert',
      ...getBaseConfigPart(),
    },
    {
      name: 'migrations:generate',
      ...getBaseConfigPart(),
    },
    {
      name: 'seeds:create',
      ...getBaseConfigPart(),
      cli: {
        migrationsDir: 'src/seeds',
      },
    },
  ];
});
