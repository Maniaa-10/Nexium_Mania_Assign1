"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [topic, setTopic] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("User typed:", topic)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-teal-400">
      <h1 className="text-2xl font-bold text-white mb-4">Quote Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-64 bg-white border-blue-800 rounded-lg px-4 py-2"
        />
        <Button type="submit"
                className="bg-blue-800 hover:bg-teal-600 text-white font-medium rounded-lg px-6 py-2 transition-colors"
        >Get Quotes</Button>
      </form>
    </main>
  )
}
