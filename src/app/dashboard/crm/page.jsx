// File: src/app/dashboard/crm/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const statuses = ['Pitched', 'Negotiating', 'Invoice Sent', 'Paid', 'Lost'];

export default function CRMPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setDeals(data);
      setLoading(false);
    };
    fetchDeals();
  }, []);

  const handleStatusChange = async (dealId, newStatus) => {
    const { data, error } = await supabase
        .from('deals')
        .update({ status: newStatus })
        .eq('id', dealId)
        .select()
        .single();
    
    if (data) {
        setDeals(deals.map(d => d.id === dealId ? data : d));
    } else {
        console.error('Error updating status:', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Brand Deal CRM</h1>
          <p className="text-gray-400 mt-1">Track your brand collaborations from pitch to payment.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg"
        >
          + Add New Deal
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-white/10">
                    <tr>
                        <th className="p-4 font-semibold text-white">Brand Name</th>
                        <th className="p-4 font-semibold text-white">Value</th>
                        <th className="p-4 font-semibold text-white">Status</th>
                        <th className="p-4 font-semibold text-white">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {deals.map(deal => (
                        <tr key={deal.id} className="border-b border-white/10 hover:bg-white/5 text-gray-300">
                            <td className="p-4 font-medium text-white">{deal.brand_name}</td>
                            <td className="p-4">₹{deal.deal_value || 'N/A'}</td>
                            <td className="p-4">
                                <select 
                                    value={deal.status}
                                    onChange={(e) => handleStatusChange(deal.id, e.target.value)}
                                    className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                                >
                                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </td>
                            <td className="p-4">{deal.contact_email || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deals.length === 0 && !loading && (
                <div className="text-center py-8">
                    <p className="text-gray-500">You haven't added any deals yet.</p>
                </div>
            )}
        </div>
      </div>
      
      <AnimatePresence>
        {isModalOpen && <AddDealModal setIsModalOpen={setIsModalOpen} setDeals={setDeals} />}
      </AnimatePresence>
    </motion.div>
  );
}

// Modal for adding a new deal
const AddDealModal = ({ setIsModalOpen, setDeals }) => {
    const [brandName, setBrandName] = useState('');
    const [dealValue, setDealValue] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
        if (!brandName || !user) return;

        const { data: newDeal, error } = await supabase
            .from('deals')
            .insert({ brand_name: brandName, deal_value: parseFloat(dealValue) || null, contact_email: contactEmail, user_id: user.id, status: 'Pitched' })
            .select()
            .single();

        if (newDeal) {
            setDeals(prev => [newDeal, ...prev]);
            setIsModalOpen(false);
        } else {
            console.error(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Add New Brand Deal</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" required />
                        <input type="number" placeholder="Deal Value (e.g., 50000)" value={dealValue} onChange={(e) => setDealValue(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" />
                        <input type="email" placeholder="Contact Email (optional)" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" />
                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500">Add Deal</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};