import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres'

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema, logger: true });