'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([]) // New state for products
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // 1. Check for logged-in user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }
      
      setUser(user)

      // 2. Fetch products for the logged-in user
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*') // RLS ensures only this user's products are fetched

      if (productError) {
        console.error('Error fetching products:', productError)
      } else {
        setProducts(productData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Navigation Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">CreatorVerse</h1>
            <div className="flex items-center space-x-4">
              <a href="/dashboard/settings" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-bold">{user.email}</span>!
          </p>
          {/* Main Navigation */}
          <nav className="mt-6 border-t pt-4">
            <ul className="flex space-x-6">
              <li><a href="/dashboard" className="font-semibold text-indigo-600">Overview</a></li>
              <li><a href="/dashboard/content" className="font-semibold text-gray-600 hover:text-indigo-600">Content</a></li>
            </ul>
          </nav>
        </div>

        {/* Products Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">My Products</h2>
            <a
              href="/dashboard/products"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              + Add New Product
            </a>
          </div>
          
          {/* Product List */}
          <div className="space-y-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg bg-white">
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description || 'No description'}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold">
                      ₹{product.price}
                    </div>
                    <a 
                      href={`/products/${product.id}`} 
                      target="_blank" 
                      className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View Page
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">You haven't added any products yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}