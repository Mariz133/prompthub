'use client';

import LogoutButton from '../components/LogoutButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import PromptSidebar from '@/app/components/PromptSidebar';

export default function AnalyzePageClient() {
  const [promptText, setPromptText] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);


  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?message=login-required');
      } else {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Handle analyze
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

      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('prompts').insert([
        {
          text: promptText,
          category: 'analyzed',
          user_id: user.id,
          response: data.expandedPrompt, // Save the OpenAI response too!
          
        },
      ]);
      setRefreshTrigger((prev) => prev + 1); // 👈 trigger sidebar re-fetch


      if (error) {
        console.error('Error saving prompt to Supabase:', error.message);
      }
    } catch (error) {
      console.error('Error analyzing prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  // While loading auth
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // UI
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <PromptSidebar
        refreshTrigger={refreshTrigger}
        onSelect={(item) => {
         setSelectedHistory(item);
          setPromptText(item.text);
          setExpandedPrompt(item.response);
       }}
      />



      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">What Will OpenAI Say?</h1>
          <LogoutButton />
        </div>

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
      </main>
    </div>
  );
}
