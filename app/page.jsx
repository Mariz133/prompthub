'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SubmitPrompt from './components/SubmitPrompt';
import PromptList from './components/PromptList';

export default function Home() {
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const { data, error } = await supabase.from('prompts').select('*').order('created_at', { ascending: false });
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
      <SubmitPrompt onSubmit={fetchPrompts} />
      <PromptList prompts={prompts} onDelete={fetchPrompts} />

    </main>
  );
}
