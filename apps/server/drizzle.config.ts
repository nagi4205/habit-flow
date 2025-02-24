import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export default {
  schema: './src/db/schema.ts',
  out: isProduction ? './drizzle/prod' : './drizzle/dev',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config; 