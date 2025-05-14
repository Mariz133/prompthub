'use client';

import { useState } from 'react';

export default function AnalyzePage() {
  const [promptText, setPromptText] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Try the Prompt Analyzer</h1>
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
  );
}

