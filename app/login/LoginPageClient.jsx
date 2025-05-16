'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'login-required') {
      setErrorMsg('You must be logged in to use the Prompt Analyzer.');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert('Login error: ' + error.message);
    } else {
      alert('Check your email for the login link!');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {errorMsg && (
        <p className="text-red-600 mb-4 text-center">{errorMsg}</p>
      )}

      <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">
        <input
          type="email"
          className="p-2 border rounded w-64"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Login Link
        </button>
      </form>
    </main>
  );
}
