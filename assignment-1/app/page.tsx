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
  const [loading, setLoading] = useState(false);        //loading state
  const [hasSearched, setHasSearched] = useState(false) // to track the searching


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
          .slice(0, 3);    // resticting to limit 3
        setResults(matched);
        setLoading(false);
      }, 350);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 p-6 bg-gradient-to-br from-indigo-500 to-teal-400">
      <h1 className="text-4xl font-extrabold text-white hover:text-blue-900 mb-2 mt-12">Quote Generator</h1>
      <h2 className="text-blue text-opacity-80 mb-6 text-sm text-center max-w-md mb-8">
                     One click away from the boost you need</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          ref={inputRef}
          type="text"
          autoComplete="on"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-[90vw] max-w-xs bg-white border-blue-800 rounded-lg px-4 py-2"
        />
        <Button
          type="submit"
          className="bg-blue-800 hover:bg-teal-400 text-white hover:text-black font-medium rounded-lg px-6 py-2 transition-colors transition-transform hover:scale-105"
          onClick={() => setHasSearched(true) }
        >
          Get Quotes
        </Button>
      </form>

      {/* Displaying quotes */}
      <div className="mt-8 flex flex-col items-center space-y-2 max-w-full ">
        {loading ?
          (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          ) : results.length > 0 ?
          (
            results.map((quote, index) => <QuoteCard key={index} text={quote.text} />)
          ) : hasSearched ?
          (
            <p className="text-white text-opacity-60">No quotes found.</p>
          ) : null
        }

      </div>
      <button
        onClick={() => 
          {setResults([])
          setTopic("")
          setHasSearched(false)
        }
          }
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-teal-400 text-white rounded-full px-4 py-2 shadow-lg transition-all"
      >
        Home
    </button>
    </main>
  )
}
