import { ConfigType, registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

import { MongoConfiguration } from '@project/configs';

const DEFAULT_MONGO_PORT = 27017;

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToInstance(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT
      ? parseInt(process.env.MONGO_PORT, 10)
      : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await config.validate();

  return config;
}

const mongoConfig = registerAs(
  'db',
  async (): Promise<ConfigType<typeof getDbConfig>> => {
    return getDbConfig();
  }
);

export { mongoConfig };
