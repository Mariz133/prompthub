'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SubmitPrompt({ onSubmit }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !category) return;

    const { error } = await supabase.from('prompts').insert([{ text, category }]);

    if (error) {
      console.error('Insert error:', error);
      alert('Failed to save prompt.');
    } else {
      setText('');
      setCategory('');
      onSubmit(); // 👈 refetch prompts
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">🧠 PromptHub</h1>
      <input
        className="w-full border p-2"
        placeholder="Enter your AI prompt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-full border p-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Submit
      </button>
    </form>
  );
}
