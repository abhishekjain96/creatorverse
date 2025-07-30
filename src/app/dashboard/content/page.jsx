// File: src/app/dashboard/content/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function ContentPlannerPage() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setContent(data);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleAddContent = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!title || !user) return;

    const { data: newContent, error } = await supabase
      .from('content')
      .insert({ title, description, user_id: user.id })
      .select()
      .single();

    if (newContent) {
      setContent([newContent, ...content]);
      setTitle('');
      setDescription('');
    } else {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Content Planner</h1>
        
        {/* Add New Content Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Add a New Idea</h2>
          <form onSubmit={handleAddContent}>
            <input
              type="text"
              placeholder="Content Title or Idea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              required
            />
            <textarea
              placeholder="A brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows="2"
            ></textarea>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
              Add Idea
            </button>
          </form>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Your Content Pipeline</h2>
          {loading ? (
            <p>Loading content...</p>
          ) : content.length > 0 ? (
            content.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No content ideas yet. Add one above to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}