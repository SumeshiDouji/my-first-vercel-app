import { useState } from 'react'

export default function FortuneApp() {
  const [fortune, setFortune] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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

  // ラッキーカラーとナンバー
  const luckyColors = ["赤", "青", "緑", "黄", "紫", "オレンジ", "ピンク", "水色"]
  const getLuckyNumber = () => Math.floor(Math.random() * 99) + 1

  // 今日の日付を取得
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"]
    const day = dayNames[today.getDay()]
    return `${year}年${month}月${date}日（${day}）`
  }

  // 運勢を占う
  const drawFortune = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length)
      const selectedFortune = fortunes[randomIndex]
      const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)]
      const luckyNumber = getLuckyNumber()
      
      setFortune({
        ...selectedFortune,
        luckyColor,
        luckyNumber,
        date: getTodayDate()
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔮 今日の運勢占い
          </h1>
          <p className="text-purple-200">
            {getTodayDate()}
          </p>
        </div>

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

        <div className="text-center mt-6 text-purple-300 text-sm">
          <p>Made with ❤️ by Vercel + AI</p>
        </div>
      </div>
    </div>
  )
}
