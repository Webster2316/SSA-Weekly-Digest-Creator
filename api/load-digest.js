import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const rows = await sql`SELECT value FROM digest_data WHERE key = 'ssa-digest-data'`;
    res.status(200).json(rows[0]?.value ?? null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}