// File: src/app/[username]/page.jsx
import { createClient } from "@/lib/supabase";

export default async function LinkInBioPage({ params }) {
  const supabase = createClient();

  // 1. Fetch the profile based on the username in the URL
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single();

  if (!profile) {
    return <div className="text-center p-8">Profile not found.</div>;
  }

  // 2. Fetch the products for that profile
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', profile.id);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-2xl mx-auto p-4 sm:p-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{profile.full_name || profile.username}</h1>
          <p className="text-gray-600 mt-2">{profile.bio}</p>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <h2 className="text-center text-xl font-semibold text-gray-800">My Products</h2>
          {products && products.length > 0 ? (
            products.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.id}`}
                className="block w-full text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-lg font-medium text-gray-800">{product.name}</span>
              </a>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}