'use client';

import { supabase } from '../../lib/supabase';

export default function PromptList({ prompts, onDelete }) {
  const handleDelete = async (id) => {
    const { error } = await supabase.from('prompts').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      alert('Failed to delete prompt.');
    } else {
      onDelete(); // Refresh prompt list
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="border p-4 rounded relative">
          <p className="text-lg">{prompt.text}</p>
          <p className="text-sm text-gray-500">{prompt.category}</p>
          <button
            onClick={() => handleDelete(prompt.id)}
            className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
