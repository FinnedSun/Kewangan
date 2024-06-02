//09:31
import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema";

config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const SEED_USER_ID = 'user_2gSfb6mYchVIifpXlBGLvZ1gu9Z'
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food" }
]
//https://kewangan.site