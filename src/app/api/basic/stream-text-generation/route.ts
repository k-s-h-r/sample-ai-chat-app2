import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'あなたは親切なアシスタントです',
    prompt,
  });

  return result.toDataStreamResponse();
}
