import "server-only"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

export const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
})

export const db = drizzle(pool, { schema })
