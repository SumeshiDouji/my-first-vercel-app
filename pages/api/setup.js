import { createTables } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await createTables();
    res.status(200).json({ message: 'データベースセットアップ完了！' });
  } catch (error) {
    res.status(500).json({ message: 'セットアップに失敗しました', error: error.message });
  }
}
