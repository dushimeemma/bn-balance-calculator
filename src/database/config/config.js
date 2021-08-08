import { config } from 'dotenv';

config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    sslmode: 'require',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    sslmode: 'require',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
