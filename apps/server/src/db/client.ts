import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// クエリ用のクライアント
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });

// マイグレーション用のクライアント
export const migrationClient = postgres(connectionString, { max: 1 }); 