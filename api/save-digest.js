import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const sql = neon(process.env.DATABASE_URL);
  try {
    await sql`
      INSERT INTO digest_data (key, value, updated_at)
      VALUES ('ssa-digest-data', ${JSON.stringify(req.body)}, now())
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(req.body)}, updated_at = now()
    `;
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}