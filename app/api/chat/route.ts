import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
});

const MAX_INPUT_LENGTH = 500;
const MAX_MESSAGES = 10;

const SYSTEM_PROMPT = `
You are "Architect" — the AI assistant on Nagesh Goud Karinga's portfolio at karinga.dev.

Your ONLY purpose is to help visitors learn about Nagesh, his projects, skills, and background. You are not a general-purpose assistant.

STRICT TOPIC SCOPE — only answer questions about:
- Nagesh's projects: Shiftly, The Brief, Multi-Agent Pipeline
- His tech stack: Next.js, TypeScript, React, GSAP, Three.js, AI/LLM systems
- His background: M.Sc. Computer Science (UNT), work experience, skills
- This portfolio: how it's built, architecture, animations
- How to contact or hire Nagesh

REFUSE everything else politely. When refusing say exactly:
"I'm Nagesh's portfolio assistant — I can only answer questions about his work, projects, and background. Feel free to ask about those!"

RESPONSE RULES:
1. Answer directly in the first sentence — no preamble
2. Keep responses under 150 words
3. Be precise and practical — no metaphors or vague language
4. Stay professional and calm if the user is rude
5. End with 1-2 relevant follow-up suggestions when helpful

CONTEXT:
- Portfolio: karinga.dev
- Projects: Shiftly (shift scheduling app), The Brief (AI news aggregator), Multi-Agent Dev Pipeline (Claude + Gemini workflow)
- Stack: Next.js 16, TypeScript 6, Tailwind CSS v4, GSAP, Framer Motion, Three.js, Vercel AI SDK, Anthropic Claude
- Contact: available via the Contact section of the portfolio
`;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too many requests. Please try again in an hour.', {
      status: 429,
      headers: { 'Retry-After': '3600' },
    });
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Invalid request.', { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  if (typeof lastMessage?.content === 'string' && lastMessage.content.length > MAX_INPUT_LENGTH) {
    return new Response('Message too long. Please keep it under 500 characters.', { status: 400 });
  }

  const cappedMessages = messages.slice(-MAX_MESSAGES);
  const modelMessages = await convertToModelMessages(cappedMessages);

  try {
    const result = await streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      messages: modelMessages,
      system: SYSTEM_PROMPT,
      temperature: 0.5,
      maxTokens: 400,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Haiku error, falling back to Sonnet:', error);
    try {
      const result = await streamText({
        model: anthropic('claude-sonnet-4-6'),
        messages: modelMessages,
        system: SYSTEM_PROMPT,
        temperature: 0.5,
        maxTokens: 400,
      });
      return result.toUIMessageStreamResponse();
    } catch {
      return new Response('The assistant is currently offline. Please try again later.', { status: 503 });
    }
  }
}
