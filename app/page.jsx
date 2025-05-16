'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PromptList from './components/PromptList';

export default function Home() {
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPrompts(data);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6">
      {/* Landing Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Get answers. Find inspiration. Be more productive.
        </h1>
        <p className="text-gray-700 mb-4">
          Free to use. Easy to try. Just ask and PromptHub can help with writing,
          learning, brainstorming, and more.
        </p>

        {/* Buttons stacked vertically and centered */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="/analyze"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Prompt Analyzer
          </a>
          <a
            href="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Login
          </a>
        </div>
        </section>

      {/* Main App Functionality */}
      {/* <SubmitPrompt onSubmit={fetchPrompts} /> */}
      <PromptList prompts={prompts} onDelete={fetchPrompts} />

      <footer className="mt-10 text-center text-sm text-gray-500">
  Built with ❤️ using Next.js, Tailwind CSS & Supabase
</footer>

    </main>
  );
}
