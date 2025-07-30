// File: src/app/dashboard/ai-tools/page.jsx (Updated)
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tools = [
  {
    title: "AI YouTube Title Generator",
    description: "Generate 10 viral titles for your next video.",
    href: "/dashboard/ai-tools/title-generator" // We will create this page later
  },
  {
    title: "AI Comment Gold Miner",
    description: "Analyze your YouTube comments to find what your audience truly wants.",
    href: "/dashboard/ai-tools/comment-analyzer"
  }
];

export default function AIToolsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold text-white mb-2">AI Tools</h1>
      <p className="text-gray-400 mb-8">Your creative co-pilot. Powered by AI.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <Link href={tool.href} key={tool.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 h-full hover:border-indigo-500/50 hover:bg-white/10 transition-colors"
            >
              <h2 className="text-xl font-bold text-white">{tool.title}</h2>
              <p className="text-gray-400 mt-2">{tool.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}