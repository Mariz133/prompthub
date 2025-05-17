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

  // 🔑 Handle magic link callback with ?code=
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setLoading(true);

      supabase.auth.exchangeCodeForSession()

        .then(({ data, error }) => {
          if (error) {
            console.error('Session exchange failed:', error.message);
            setMsg('Login failed. Please try again.');
            setLoading(false);
          } else {
            router.replace('/analyze');
          }
        });
    }
  }, [searchParams, router]);

  // 🔐 Send magic link
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

    if (error) {
      setMsg('Login failed: ' + error.message);
    } else {
      setMsg('Check your email for the login link.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {msg && <p className="mb-4 text-red-500">{msg}</p>}
      {loading && <p>Processing login...</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Send Magic Link
        </button>
      </form>
    </div>
  );
}
