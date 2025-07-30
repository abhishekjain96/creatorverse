// File: src/app/dashboard/settings/page.jsx (Redesigned)
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUsername(profile.username);
          setFullName(profile.full_name || '');
          setBio(profile.bio || '');
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      username,
      full_name: fullName,
      bio,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray-400">Loading settings...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg max-w-2xl">
            <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Public Profile</h2>
                    <p className="text-sm text-gray-400 mt-1">This information will be displayed on your public link-in-bio page.</p>
                </div>
                <div className="border-t border-white/10"></div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400 sm:text-sm">
                            creatorverse.app/
                        </span>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase())}
                            className="flex-1 block w-full rounded-none rounded-r-md p-3 bg-gray-900 border border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-white"
                    />
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                    <textarea
                        id="bio"
                        rows="3"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-white"
                        placeholder="A short description about you and what you do."
                    ></textarea>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 disabled:bg-gray-500 transition-colors"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </motion.div>
  );
}