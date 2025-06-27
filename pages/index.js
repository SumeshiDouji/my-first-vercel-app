import { useState, useEffect } from 'react'

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
    
    // ローディング演出
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
    }, 1500) // 1.5秒のローディング
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold
