import { saveFortune } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, fortune } = req.body;

  try {
    const savedFortune = await saveFortune(userId, fortune);
    res.status(201).json({ message: '占い結果を保存しました！', fortune: savedFortune });
  } catch (error) {
    res.status(500).json({ message: '保存に失敗しました' });
  }
}
