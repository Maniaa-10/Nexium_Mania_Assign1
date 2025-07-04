"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotes } from "@/lib/quotes"  // added quotes

export default function HomePage() 
{
  const [topic, setTopic] = useState("")                // user input
  const [results, setResults] = useState<string[]>([])  // filtered quotes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const matched = quotes
      .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map((q) => q.text)
      
    setResults(matched)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-teal-400">
      <h1 className="text-2xl font-bold text-white hover:text-blue-900 mb-4">Quote Generator</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-64 bg-white border-blue-800 rounded-lg px-4 py-2"
        />
        <Button
          type="submit"
          className="bg-blue-800 hover:bg-teal-300 text-white hover:text-black font-medium rounded-lg px-6 py-2 transition-colors"
        >
          Get Quotes
        </Button>
      </form>

      {/* Display quotes */}
      <div className="mt-8 space-y-2 max-w-md text-center">
        {results.length > 0 ? (
          results.map((quote, index) => (
            <p key={index} className="text-white italic">“{quote}”</p>
          ))
        ) : (
          <p className="text-white text-opacity-60">No quotes found.</p> //incase of no quote in quote lib
        )}
      </div>
    </main>
  )
}
