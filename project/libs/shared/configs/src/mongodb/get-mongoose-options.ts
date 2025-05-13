import { getMongoConnectionString } from '@project/helpers';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get('db.user') as string,
          password: config.get('db.password') as string,
          host: config.get('db.host') as string,
          port: config.get('db.port') as string,
          authDatabase: config.get('db.authBase') as string,
          databaseName: config.get('db.name') as string,
        }),
      };
    },
    inject: [ConfigService],
  };
}
