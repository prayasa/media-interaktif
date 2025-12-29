import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // PERBAIKAN: Tambahkan 'await' di depan streamText
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages,
      system: 'Kamu adalah asisten pintar untuk media pembelajaran interaktif. Jawab dengan ringkas, jelas, dan menyemangati siswa.',
    });

    // Sekarang result sudah bukan Promise lagi, jadi method ini bisa dipanggil
    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Terjadi kesalahan pada server AI', { status: 500 });
  }
}