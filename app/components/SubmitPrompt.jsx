import { useState } from 'react';

export default function SubmitPrompt() {
  const [prompt, setPrompt] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText: prompt }),
      });

      if (!response.ok) throw new Error('Failed to analyze the prompt');

      const data = await response.json();
      setExpandedPrompt(data.expandedPrompt);
    } catch (error) {
      setError('Failed to expand the prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="prompt" className="text-lg">Enter Prompt:</label>
        <input
          type="text"
          id="prompt"
          className="border p-2 rounded"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Prompt'}
        </button>
      </form>
  
      {expandedPrompt && (
        <div className="mt-6">
          <h3 className="font-semibold text-xl">Expanded Prompt:</h3>
          <p className="p-4 bg-gray-100 border rounded">{expandedPrompt}</p>
        </div>
      )}
  
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
  
}
