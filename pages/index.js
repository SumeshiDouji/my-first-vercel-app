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
      message: "今日は学びの日。新しい知識が運
