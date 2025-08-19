import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  const { message } = await req.json();

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

  try {
    const result = await genAI.models.generateContentStream({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result) {
          const chunkText = chunk.text;
          if (chunkText) {
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error generating content', { status: 500 });
  }
}
