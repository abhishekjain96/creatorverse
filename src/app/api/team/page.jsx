// File: src/app/dashboard/team/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchMembers = async () => {
      // This is a complex query to get member details from the profiles table
      const { data, error } = await supabase.rpc('get_team_members');
      if (data) setMembers(data);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail }),
    });
    const result = await response.json();
    if (response.ok) {
      alert('Invite sent successfully!');
      // Optimistically add to UI or re-fetch
      setMembers([...members, { email: inviteEmail, role: 'editor', full_name: 'Pending...' }]);
      setInviteEmail('');
    } else {
      alert('Error: ' + result.error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Team</h1>
      
      {/* Invite Member Form */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Invite New Member</h2>
        <form onSubmit={handleInvite} className="flex gap-4">
          <input
            type="email"
            placeholder="Enter member's email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-grow p-3 bg-gray-900 border border-gray-700 rounded-md text-white"
            required
          />
          <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500">
            Invite
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2">Note: The invited user must already have a CreatorVerse account.</p>
      </div>

      {/* Team Members List */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Current Members</h2>
        <div className="space-y-4">
          {members.map(member => (
            <div key={member.email} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg">
              <div>
                <p className="font-semibold text-white">{member.full_name || member.email}</p>
                <p className="text-sm text-gray-400 capitalize">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}