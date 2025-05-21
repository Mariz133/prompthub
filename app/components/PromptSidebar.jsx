'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PromptSidebar({ onSelect }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('prompts')
      .select('id, text, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from('prompts').delete().eq('id', id);
    fetchHistory();
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Your Prompt History</h2>
      <ul className="space-y-3">
        {history.map((item) => (
          <li
            key={item.id}
            className="bg-white p-2 rounded shadow flex justify-between items-center"
          >
            <button
              onClick={() => onSelect(item.text)}
              className="text-sm text-left text-gray-800 hover:underline flex-1"
            >
              {item.text.slice(0, 30)}...
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 text-xs ml-2"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
