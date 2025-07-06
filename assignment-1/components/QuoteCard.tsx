import { motion } from "framer-motion"

type QuoteCardText= { text: string }

export default function QuoteCard({ text }: QuoteCardText) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="bg-white/10 p-4 rounded-lg text-white italic backdrop-blur-sm shadow-md max-w-xl"
    >
      “{text}”
    </motion.div>
  )
}
