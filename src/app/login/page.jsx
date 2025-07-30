// File: src/app/login/page.jsx (Final Correct Code)
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleOAuthSignIn = async (provider) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        // We add the redirectTo option here to ensure Vercel knows where to go
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert('Error: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleAuthAction = async (actionType) => {
    setIsLoading(true);
    let error = null;
    if (actionType === 'signup') {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      error = signUpError;
      if (!error) alert('Signup successful! Please check your email for a verification link.');
    } else if (actionType === 'signin') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      error = signInError;
      if (!error) router.push('/dashboard');
    }
    if (error) {
      alert('Error: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 text-white font-bold opacity-70 hover:opacity-100">&larr; Back to Home</Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center text-white">Welcome</h1>
        <motion.button onClick={() => handleOAuthSignIn('google')} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-white/30 rounded-md text-lg font-medium text-white bg-white/10 hover:bg-white/20">
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.417 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
          </svg>
          Continue with Google
        </motion.button>
        <div className="flex items-center"><div className="flex-grow border-t border-white/20"></div><span className="flex-shrink mx-4 text-gray-300">OR</span><div className="flex-grow border-t border-white/20"></div></div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAuthAction('signin'); }}>
          <input id="email" type="email" required className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com"/>
          <input id="password" type="password" required className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••"/>
          <div className="flex flex-col space-y-4">
            <motion.button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </motion.button>
            <motion.button onClick={() => handleAuthAction('signup')} className="w-full py-3 px-4 border border-white/30 rounded-md text-lg font-medium text-white bg-white/10 hover:bg-white/20">
              Sign Up
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}