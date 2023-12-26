import { logger } from '@/logger';
import { MongoClient, Db } from 'mongodb';

class DbClient {
  private client: MongoClient;
  private db!: Db;

  constructor(
    private connectionString: string,
    private dbName: string
  ) {
    this.client = new MongoClient(this.connectionString, {
      appName: 'app',
      connectTimeoutMS: 5 * 1000,
      maxIdleTimeMS: 5 * 60 * 1000,
      maxPoolSize: 20,
      minPoolSize: 5,
      compressors: 'zlib',
      zlibCompressionLevel: 6,
      readPreference: 'secondaryPreferred'
    });
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    logger.info('Connected to the database.');
  }

  async disconnect() {
    await this.client.close();
    logger.info('Disconnected from the database.');
  }

  collection(collectionName: string): unknown {
    return this.db.collection(collectionName);
  }
}

const dbInstance = new DbClient(process.env.MONGO_URI!, process.env.MONGO_DATABASE!);

export default dbInstance;
