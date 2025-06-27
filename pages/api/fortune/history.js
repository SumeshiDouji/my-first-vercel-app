import { getUserFortunes } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;

  try {
    const fortunes = await getUserFortunes(parseInt(userId));
    res.status(200).json({ fortunes });
  } catch (error) {
    res.status(500).json({ message: '履歴取得に失敗しました' });
  }
}
