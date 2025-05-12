type MongoParams = {
  username: string;
  password: string;
  host: string;
  port: number | string;
  databaseName: string;
  authDatabase: string;
};

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}: MongoParams): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
