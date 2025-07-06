"use client"

import { useRef, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import QuoteCard from "@/components/QuoteCard" //custom component to display quotes
import { quotes } from "@/lib/quotes"  // added quotes


export default function HomePage() 
{
  const [topic, setTopic] = useState("")                // user input
  const [results, setResults] = useState<{ text: string }[]>([])  // filtered quotes
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false); 

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()    // prevent from reloading 

      if (!topic.trim())  // prevent from searching if input string is empty
        {
          setResults([]);  // clear previous results
          return;
        }

      setResults([]);
      setLoading(true);
      setTimeout(() => {
        const matched = quotes
          .filter((q) => q.text.toLowerCase().includes(topic.toLowerCase()))
          .slice(0, 3);
        setResults(matched);
        setLoading(false);
      }, 250);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-teal-400">
      <h1 className="text-2xl font-bold text-white hover:text-blue-900 mb-4">Quote Generator</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          ref={inputRef}
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
      <div className="mt-8 flex flex-col items-center space-y-2 max-w-full ">
        {loading ?
          (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          ) : results.length > 0 ?
          (
            results.map((quote, index) => <QuoteCard key={index} text={quote.text} />)
          ) : 
          (
            <p className="text-white text-opacity-60">No quotes found.</p>
          )
        }

      </div>
    </main>
  )
}
