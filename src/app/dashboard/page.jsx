// File: src/app/dashboard/page.jsx (Amazing UI)
'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg"
  >
    <div className="flex items-center">
      <div className="p-3 bg-indigo-500/20 rounded-lg mr-4 border border-indigo-500/30">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

const ChartPlaceholder = () => (
    <div className="w-full h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Sales Chart Coming Soon</p>
    </div>
);

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      
      const { data: profileData } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      setProfile(profileData);

      const { data: productData } = await supabase.from('products').select('*');
      if (productData) setProducts(productData);

      setLoading(false);
    };
    fetchData();
  }, []);

  const welcomeName = profile?.full_name?.split(' ')[0] || 'Creator';

  if (loading) {
    return <div className="flex items-center justify-center h-full text-gray-400">Loading your universe...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome back, {welcomeName}!</h1>
          <p className="text-gray-400 mt-2">Let's see how your creator empire is doing.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue" value="₹0" icon={<svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path></svg>} delay={0.1} />
        <StatCard title="Total Sales" value="0" icon={<svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} delay={0.2} />
        <StatCard title="Products" value={products.length} icon={<svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Sales Analytics</h2>
          <ChartPlaceholder />
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
                <Link href="/dashboard/products" className="block w-full text-center py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors">
                    Add New Product
                </Link>
                <Link href="/dashboard/content" className="block w-full text-center py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
                    Plan Content
                </Link>
            </div>
        </div>
      </div>
    </motion.div>
  );
}