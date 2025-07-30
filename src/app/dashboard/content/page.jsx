// File: src/app/dashboard/content/page.jsx (New Kanban Board UI)
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

// The columns for our Kanban board
const columns = [
  { id: 'Idea', title: '💡 Ideas' },
  { id: 'Scripting', title: '✍️ Scripting' },
  { id: 'Filming', title: '🎬 Filming' },
  { id: 'Published', title: '🚀 Published' },
];

export default function ContentPlannerPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, []);

  const contentByStatus = columns.reduce((acc, col) => {
    acc[col.id] = content.filter(item => item.status === col.id);
    return acc;
  }, {});
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Planner</h1>
          <p className="text-gray-400 mt-1">Organize your ideas and workflow.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg"
        >
          + Add New Idea
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div key={column.id} className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">{column.title}</h2>
            <div className="space-y-4">
              {contentByStatus[column.id]?.map((item, index) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-700"
                >
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </motion.div>
              ))}
              {contentByStatus[column.id]?.length === 0 && !loading && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No items here.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {isModalOpen && <AddContentModal setIsModalOpen={setIsModalOpen} setContent={setContent} />}
      </AnimatePresence>
    </motion.div>
  );
}

// Modal Component for adding new content
const AddContentModal = ({ setIsModalOpen, setContent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
        if (!title || !user) return;

        const { data: newContent, error } = await supabase
            .from('content')
            .insert({ title, description, user_id: user.id, status: 'Idea' })
            .select()
            .single();

        if (newContent) {
            setContent(prevContent => [newContent, ...prevContent]);
            setIsModalOpen(false);
        } else {
            console.error(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Add a New Content Idea</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Content Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white mb-4"
                            required
                        />
                        <textarea
                            placeholder="A brief description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white mb-6"
                            rows="3"
                        ></textarea>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500">Add Idea</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};