// File: src/app/dashboard/products/page.jsx (Redesigned)
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (!error) {
        setProducts(products.filter(p => p.id !== productId));
        alert('Product deleted successfully!');
      } else {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Products</h1>
          <p className="text-gray-400 mt-1">Manage your digital products and sales.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg"
        >
          + Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-white/10">
                    <tr>
                        <th className="p-4 font-semibold text-white">Product Name</th>
                        <th className="p-4 font-semibold text-white">Price</th>
                        <th className="p-4 font-semibold text-white">Created At</th>
                        <th className="p-4 font-semibold text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b border-white/10 hover:bg-white/5">
                            <td className="p-4 text-gray-300">{product.name}</td>
                            <td className="p-4 text-gray-300">₹{product.price}</td>
                            <td className="p-4 text-gray-300">{new Date(product.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400 text-sm font-semibold">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {products.length === 0 && !loading && (
                <div className="text-center py-8">
                    <p className="text-gray-500">You haven't added any products yet.</p>
                </div>
            )}
        </div>
      </div>
      
      <AnimatePresence>
        {isModalOpen && <AddProductModal setIsModalOpen={setIsModalOpen} setProducts={setProducts} />}
      </AnimatePresence>
    </motion.div>
  );
}


// Modal Component for adding new products
const AddProductModal = ({ setIsModalOpen, setProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!name || !price || !file || !user) {
            alert('Please fill all fields.');
            setUploading(false);
            return;
        }

        const filePath = `${user.id}/${file.name}`;
        const { error: uploadError } = await supabase.storage.from('products').upload(filePath, file);
        if (uploadError) {
            alert('Error uploading file: ' + uploadError.message);
            setUploading(false);
            return;
        }

        const { data: newProduct, error: insertError } = await supabase
            .from('products')
            .insert({ name, description, price: parseFloat(price), user_id: user.id, file_path: filePath })
            .select()
            .single();

        if (newProduct) {
            setProducts(prev => [newProduct, ...prev]);
            setIsModalOpen(false);
        } else {
            alert('Error adding product: ' + insertError.message);
        }
        setUploading(false);
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
                    <h2 className="text-xl font-bold text-white mb-4">Add New Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" required />
                        <textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" rows="3"></textarea>
                        <input type="number" placeholder="Price (in ₹)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white" required />
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" required />
                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">Cancel</button>
                            <button type="submit" disabled={uploading} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 disabled:bg-gray-500">
                                {uploading ? 'Uploading...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};