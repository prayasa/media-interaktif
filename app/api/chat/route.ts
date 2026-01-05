import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      // GANTI KE SINI: Gunakan 'gemini-pro' dulu untuk tes koneksi
      model: google('gemini-pro'), 
      messages,
      system: 'Kamu adalah asisten pintar. Jawab dengan ringkas dan jelas.',
    });

    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error('SERVER ERROR:', error);
    return new Response(JSON.stringify({ error: 'Gagal memproses AI' }), { status: 500 });
  }
}
