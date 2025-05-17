'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  
  useEffect(() => {
    // Immediately check if session exists
    const checkLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ✅ Already logged in, redirect
        router.replace('/analyze');
      }
    };

    checkLogin();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);
    setMsg(error ? 'Login failed: ' + error.message : 'Check your email for the login link.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {message === 'login-required' && (
          <p className="mb-3 text-center text-red-600 font-medium">
            You must be logged in to use the Prompt Analyzer.
          </p>
        )}

        {msg && (
          <p className="mb-3 text-center text-red-500">{msg}</p>
        )}

        {loading && <p className="mb-3 text-center">Processing login...</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Send Magic Link
          </button>
        </form>
      </div>
    </div>
  );
}