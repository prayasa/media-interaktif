import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // Gunakan 'gemini-1.5-flash' langsung
      model: google('gemini-1.5-flash'), 
      messages,
      system: 'Kamu adalah asisten pintar untuk media pembelajaran interaktif. Jawab dengan ringkas, jelas, dan menyemangati siswa.',
    });

    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Terjadi kesalahan pada server AI', { status: 500 });
  }
}