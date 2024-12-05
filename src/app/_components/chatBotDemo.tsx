'use client';

import React from 'react'
import { Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  content: string
  sender: 'user' | 'ai'
}

export default function ChatBot() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, content: "こんにちは！何かお手伝いできることはありますか？", sender: 'ai' },
    { id: 2, content: "はい、天気予報を教えてください。", sender: 'user' },
    { id: 3, content: "申し訳ありませんが、私はリアルタイムの天気情報にアクセスできません。代わりに、地域の気象庁のウェブサイトをチェックすることをお勧めします。他に何かお手伝いできることはありますか？", sender: 'ai' },
  ])
  const [input, setInput] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: input, sender: 'user' }])
      setInput('')
      // ここでAIの応答を処理します（この例ではダミーの応答を使用）
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, content: "申し訳ありませんが、私は限られた機能しか持っていないデモ用のチャットボットです。実際のAIアシスタントではありません。", sender: 'ai' }])
      }, 1000)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI チャットアシスタント</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh] pr-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.sender === 'user' ? "/placeholder.svg?height=32&width=32" : "/placeholder.svg?height=32&width=32"} alt={message.sender === 'user' ? "ユーザー" : "AI"} />
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">送信</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}