'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function HistoryPageClient() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not logged in');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prompts:', error);
      } else {
        setPrompts(data);
      }

      setLoading(false);
    };

    fetchPrompts();
  }, []);

  if (loading) return <p className="p-4">Loading prompt history...</p>;
  if (prompts.length === 0) return <p className="p-4">No prompts found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Prompt History</h1>
      <ul className="space-y-4">
        {prompts.map((prompt) => (
          <li
            key={prompt.id}
            className="bg-white p-4 rounded-xl shadow border border-gray-200"
          >
            <p className="text-gray-800 font-medium">{prompt.text}</p>
            {prompt.category && (
              <p className="text-sm text-gray-500 mt-1">
                Category: {prompt.category}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Submitted: {new Date(prompt.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
