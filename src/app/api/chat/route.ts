import { NextResponse } from 'next/server';
import { generateChatbotResponse } from '../../../lib/rag';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const answer = await generateChatbotResponse(question);

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("API Error in /api/chat:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
