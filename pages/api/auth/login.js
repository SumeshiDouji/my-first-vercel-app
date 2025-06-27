import bcrypt from 'bcryptjs';
import { getUser } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    
    if (!user) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが間違っています' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが間違っています' });
    }

    res.status(200).json({
      message: 'ログイン成功！',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'ログインに失敗しました' });
  }
}
