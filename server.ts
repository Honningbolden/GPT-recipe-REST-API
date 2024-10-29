import '@std/dotenv/load';
import OpenAI from 'openai';

const port = 8000;
console.log(`Server running on http://localhost:${port}`);

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});
const DAILY_PROMPT = 'What color is the sun?';
let savedResponse: string | null = null;

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a poet who writes single-sentence poems.',
      },
      {
        role: 'user',
        content: DAILY_PROMPT,
      },
    ],
  });

  savedResponse = response.choices[0].message.content;
  console.log(savedResponse);
}

main();

Deno.serve(
  {
    onListen: ({ port }) => {
      console.log(`Deno server listening on ${port}`);
    },
  },
  (req: Request, conn: Deno.ServeHandlerInfo) => {
    // Get information about the incoming request
    const method = req.method;
    const ip = (conn.remoteAddr as Deno.NetAddr).hostname;
    console.log(`${ip} just made an HTTP ${method} request.`);

    // Return a web standard Response object
    return new Response(savedResponse);
  },
);
