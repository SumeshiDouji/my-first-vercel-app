import bcrypt from 'bcryptjs';
import { createUser } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: '全ての項目を入力してください' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser(username, email, passwordHash);
    
    res.status(201).json({ 
      message: 'ユーザー登録成功！',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      res.status(400).json({ message: 'このメールアドレスは既に使用されています' });
    } else {
      res.status(500).json({ message: '登録に失敗しました' });
    }
  }
}
