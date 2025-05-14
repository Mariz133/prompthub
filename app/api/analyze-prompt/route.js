import openai from '../../../lib/openai';


export async function POST(request) {
  const { promptText } = await request.json();
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Or whichever model you're using
      messages: [{ role: 'user', content: promptText }],
    });

    const expandedPrompt = response.choices[0].message.content;
    return new Response(JSON.stringify({ expandedPrompt }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to analyze the prompt' }), { status: 500 });
  }
}
