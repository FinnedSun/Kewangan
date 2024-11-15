import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from './schema';

import postgres from 'postgres'
import { Pool } from 'pg';

// const sql = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// });

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema, logger: true });