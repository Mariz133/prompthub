'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

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
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Send Login Link
          </button>
        </form>
      </div>
      <main className="p-6 max-w-md mx-auto text-center">
        {message === 'login-required' && (
          <p className="text-red-600 mb-4">You must be logged in to use the Prompt Analyzer.</p>
        )}
        {/* your login form/button here */}
       <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </main>
    </>
  );
}
