import { useState, useEffect } from 'react'

export default function FortuneApp() {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [fortune, setFortune] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fortuneHistory, setFortuneHistory] = useState([])

  // ログイン状態をローカルストレージから復元
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      fetchFortuneHistory(userData.id)
    }
  }, [])

  // 運勢データ
  const fortunes = [
    {
      level: "大吉",
      message: "今日は最高の一日になりそうです！新しいことにチャレンジしてみましょう。",
      color: "from-yellow-400 to-orange-500",
      icon: "🌟",
      advice: "積極的に行動することで、素晴らしい結果が得られるでしょう。"
    },
    {
      level: "中吉", 
      message: "良いことが待っています。周りの人との関係を大切にしましょう。",
      color: "from-green-400 to-blue-500",
      icon: "🍀",
      advice: "人との出会いが幸運の鍵となります。"
    },
    {
      level: "小吉",
      message: "穏やかな一日になりそうです。小さな幸せを見つけてみて。",
      color: "from-blue-400 to-purple-500", 
      icon: "🌸",
      advice: "焦らずゆっくりと物事を進めることが大切です。"
    },
    {
      level: "吉",
      message: "今日は学びの日。新しい知識が運を開いてくれます。",
      color: "from-purple-400 to-pink-500",
      icon: "📚", 
      advice: "読書や勉強に時間を使うと良いことがありそうです。"
    },
    {
      level: "末吉",
      message: "地道な努力が実を結ぶ日。コツコツと頑張りましょう。",
      color: "from-gray-400 to-gray-600",
      icon: "💪",
      advice: "小さな積み重ねが大きな成果につながります。"
    },
    {
      level: "凶",
      message: "今日は慎重に。でも心配しないで、明日はきっと良い日です！",
      color: "from-gray-500 to-gray-700",
      icon: "🌧️",
      advice: "無理をせず、リラックスして過ごしましょう。"
    }
  ]

  const luckyColors = ["赤", "青", "緑", "黄", "紫", "オレンジ", "ピンク", "水色"]
  const getLuckyNumber = () => Math.floor(Math.random() * 99) + 1

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"]
    const day = dayNames[today.getDay()]
    return `${year}年${month}月${date}日（${day}）`
  }

  // 占い履歴取得
  const fetchFortuneHistory = async (userId) => {
    try {
      const response = await fetch(`/api/fortune/history?userId=${userId}`)
      const data = await response.json()
      setFortuneHistory(data.fortunes || [])
    } catch (error) {
      console.error('履歴取得エラー:', error)
    }
  }

  // 占い実行
  const drawFortune = async () => {
    setIsLoading(true)
    
    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * fortunes.length)
      const selectedFortune = fortunes[randomIndex]
      const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)]
      const luckyNumber = getLuckyNumber()
      
      const newFortune = {
        ...selectedFortune,
        luckyColor,
        luckyNumber,
        date: getTodayDate()
      }
      
      setFortune(newFortune)
      setIsLoading(false)

      // ログインしている場合は履歴に保存
      if (user) {
        try {
          await fetch('/api/fortune/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, fortune: newFortune })
          })
          fetchFortuneHistory(user.id) // 履歴を再取得
        } catch (error) {
          console.error('保存エラー:', error)
        }
      }
    }, 1500)
  }

  // ログイン処理
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        setShowLogin(false)
        fetchFortuneHistory(data.user.id)
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('ログインに失敗しました')
    }
  }

  // 登録処理
  const handleRegister = async (username, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert(data.message)
        setShowRegister(false)
        setShowLogin(true)
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('登録に失敗しました')
    }
  }

  // ログアウト
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setFortune(null)
    setFortuneHistory([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔮 今日の運勢占い
          </h1>
          <p className="text-purple-200">
            {getTodayDate()}
          </p>
          
          {/* ユーザー情報 */}
          {user ? (
            <div className="mt-4 bg-white/10 rounded-lg p-3">
              <p className="text-white">ようこそ、{user.username}さん！</p>
              <button 
                onClick={handleLogout}
                className="text-purple-200 text-sm hover:text-white"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="mt-4 space-x-2">
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
              >
                ログイン
              </button>
              <button 
                onClick={() => setShowRegister(true)}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700"
              >
                新規登録
              </button>
            </div>
          )}
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
          {!fortune && !isLoading && (
            <div className="text-center">
              <div className="text-6xl mb-4">🌙</div>
              <p className="text-white/80 mb-6">
                今日のあなたの運勢を占ってみましょう
              </p>
              <button
                onClick={drawFortune}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                ✨ 占ってみる
              </button>
            </div>
          )}

          {isLoading && (
            <div className="text-center">
              <div className="animate-spin text-6xl mb-4">🔮</div>
              <p className="text-white/80">占い中...</p>
              <div className="mt-4">
                <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-full rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {fortune && !isLoading && (
            <div className="text-center space-y-4">
              <div className={`bg-gradient-to-r ${fortune.color} rounded-2xl p-4 text-white`}>
                <div className="text-4xl mb-2">{fortune.icon}</div>
                <h2 className="text-2xl font-bold">{fortune.level}</h2>
              </div>

              <div className="text-white/90 leading-relaxed">
                <p className="mb-3">{fortune.message}</p>
                <p className="text-sm text-purple-200">{fortune.advice}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-white/80">
                  <span>🎨 ラッキーカラー:</span>
                  <span className="font-bold">{fortune.luckyColor}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>🔢 ラッキーナンバー:</span>
                  <span className="font-bold">{fortune.luckyNumber}</span>
                </div>
              </div>

              <button
                onClick={drawFortune}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transform hover:scale-105 transition-all duration-200 mt-4"
              >
                🔄 もう一度占う
              </button>
            </div>
          )}
        </div>

        {/* 占い履歴 */}
        {user && fortuneHistory.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 className="text-white text-lg font-bold mb-4">📜 占い履歴</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {fortuneHistory.map((h, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{h.fortune_level}</span>
                    <span className="text-purple-200">
                      {new Date(h.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs mt-1">{h.fortune_message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-6 text-purple-300 text-sm">
          <p>Made with ❤️ by Vercel + AI + PostgreSQL</p>
        </div>
      </div>

      {/* ログインモーダル */}
      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      
      {/* 登録モーダル */}
      {showRegister && <RegisterModal onRegister={handleRegister} onClose={() => setShowRegister(false)} />}
    </div>
  )
}

// ログインモーダルコンポーネント
function LoginModal({ onLogin, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">ログイン</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            ログイン
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-600 hover:text-gray-800"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

// 登録モーダルコンポーネント
function RegisterModal({ onRegister, onClose }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(username, email, password)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">新規登録</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            minLength={6}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700"
          >
            登録
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-600 hover:text-gray-800"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}
