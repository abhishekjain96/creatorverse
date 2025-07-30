// File: src/app/products/[id]/page.jsx (Updated)
import { createClient } from "@/lib/supabase";
import BuyButton from "@/components/BuyButton"; // Import the new component

export default async function ProductPage({ params }) {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    return <div className="text-center p-8">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">₹{product.price}</p>
          <div className="prose lg:prose-xl text-gray-700 mb-6">
            <p>{product.description}</p>
          </div>
          {/* Use the new BuyButton component */}
          <BuyButton product={product} />
        </div>
      </div>
    </div>
  );
}