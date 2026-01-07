import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Set durasi timeout lebih lama karena model Pro butuh waktu berpikir
export const maxDuration = 60;

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API Key hilang" }), { status: 500 });
  }

  try {
    const { messages } = await req.json();

    // GANTI MODEL DI SINI
    // 'gemini-1.5-pro' adalah model tier atas (lebih pintar dari Flash)
    // Jika masih error, coba 'gemini-1.0-pro' (versi lama yang sangat stabil)
    const result = await streamText({
      model: google('models/gemini-pro'), 
      messages,
      system: 'Kamu adalah asisten AI untuk mahasiswa mata kuliah Sistem Media Interaktif. Jawab dengan ramah, singkat, dan jelas dalam bahasa Indonesia.',
    });

    return result.toTextStreamResponse();
    
  } catch (error: any) {
    console.error('SERVER ERROR (Gemini):', error);
    
    // Ambil pesan error detail untuk dikirim ke frontend
    const errorMessage = error?.message || "Terjadi kesalahan pada AI";
    
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
