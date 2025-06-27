import { sql } from '@vercel/postgres';

// テーブル作成関数
export async function createTables() {
  try {
    // ユーザーテーブル
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 占い履歴テーブル
    await sql`
      CREATE TABLE IF NOT EXISTS fortune_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        fortune_level VARCHAR(20) NOT NULL,
        fortune_message TEXT NOT NULL,
        fortune_advice TEXT NOT NULL,
        lucky_color VARCHAR(20) NOT NULL,
        lucky_number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// ユーザー登録
export async function createUser(username, email, passwordHash) {
  try {
    const result = await sql`
      INSERT INTO users (username, email, password_hash)
      VALUES (${username}, ${email}, ${passwordHash})
      RETURNING id, username, email;
    `;
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// ユーザー取得
export async function getUser(email) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// 占い履歴保存
export async function saveFortune(userId, fortune) {
  try {
    const result = await sql`
      INSERT INTO fortune_history (
        user_id, fortune_level, fortune_message, 
        fortune_advice, lucky_color, lucky_number
      ) VALUES (
        ${userId}, ${fortune.level}, ${fortune.message},
        ${fortune.advice}, ${fortune.luckyColor}, ${fortune.luckyNumber}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// ユーザーの占い履歴取得
export async function getUserFortunes(userId) {
  try {
    const result = await sql`
      SELECT * FROM fortune_history 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 10;
    `;
    return result.rows;
  } catch (error) {
    throw error;
  }
}
