'use client';

import LogoutButton from '../components/LogoutButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function AnalyzePageClient() {
  const [promptText, setPromptText] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // Add auth loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?message=login-required');
      } else {
        setAuthLoading(false); // Stop loading if authenticated
      }
    };

    checkAuth();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText }),
      });

      const data = await response.json();
      setExpandedPrompt(data.expandedPrompt);
    } catch (error) {
      console.error('Error analyzing prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">What Will OpenAI Say?</h1>
      <textarea
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter your prompt"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading || !promptText}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {expandedPrompt && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Expanded Prompt:</h2>
          <pre className="whitespace-pre-wrap">{expandedPrompt}</pre>
        </div>
      )}
      <div className="p-4">
        <LogoutButton />
      </div>
    </main>
  );
}