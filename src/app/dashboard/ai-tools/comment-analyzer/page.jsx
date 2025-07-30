// File: src/app/dashboard/ai-tools/comment-analyzer/page.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CommentAnalyzerPage() {
  const [comments, setComments] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysis(null);
    try {
      const response = await fetch('/api/analyze-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments }),
      });
      const data = await response.json();
      if (response.ok) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setIsLoading(false);
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold text-white mb-2">AI Comment Gold Miner</h1>
      <p className="text-gray-400 mb-8">Find out what your audience truly wants from your YouTube comments.</p>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-2">
            Step 1: Use a browser extension (like "YouTube Comment Exporter") to get your video comments.
          </label>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-2">
            Step 2: Paste the comments here.
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Paste all your YouTube comments here..."
            className="w-full h-48 p-3 bg-gray-900 border border-gray-700 rounded-md text-white"
            required
          />
          <button type="submit" disabled={isLoading} className="mt-4 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 disabled:bg-gray-500">
            {isLoading ? 'Mining for Gold...' : '⛏️ Analyze Comments'}
          </button>
        </form>
      </div>

      {analysis && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Render analysis in cards */}
          {Object.entries(analysis).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white capitalize mb-4">{key.replace(/_/g, ' ')}</h2>
              <ul className="space-y-2">
                {value.map((item, index) => (
                  <li key={index} className="bg-gray-900/50 p-3 rounded-md text-gray-300 text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}