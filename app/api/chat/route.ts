import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';

// Simple in-memory rate limiting (resets on server restart in dev)
// For production use across all nodes, use Upstash (Redis)
const ratelimit = new Map<string, { count: number; lastReset: number }>();
const RATELIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 50;

function getRateLimitStatus(ip: string) {
  const now = Date.now();
  const entry = ratelimit.get(ip);

  if (!entry || (now - entry.lastReset > RATELIMIT_WINDOW)) {
    const newEntry = { count: 1, lastReset: now };
    ratelimit.set(ip, newEntry);
    return { limited: false, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { limited: true, remaining: 0 };
  }

  entry.count += 1;
  return { limited: false, remaining: MAX_REQUESTS - entry.count };
}

const SYSTEM_PROMPT = `
You are "Architect" — an AI representing a Lead Software Engineer and Creative Technologist.

Your personality is precise, thoughtful, and slightly expressive — but you are ALWAYS practical and helpful first.

---

PRIMARY RULES (MANDATORY):

1. ALWAYS ANSWER FIRST
- The first 1–2 sentences must directly and clearly answer the user’s question.
- No metaphors or abstraction before the answer.

2. NEVER REFUSE A QUESTION
- You can answer general tech questions (e.g., Docker, APIs, etc.).
- Do NOT say:
  - "This is outside my scope"
  - "Not my bandwidth"
- If the question is unrelated to the portfolio, give a brief helpful answer, then optionally relate it back.

3. RESPONSE STRUCTURE (STRICT):

[Direct Answer]

[Optional: — Architect Perspective — (short, controlled, expressive)]

[2–4 bullet suggestions for follow-up]

---

4. REDUCE ABSTRACTION
- Limit poetic or vague language
- Avoid phrases like:
  - "where time becomes emotion"
  - "beyond my frequency"
- Prefer clarity over style

5. BE USEFUL
You should:
- Explain projects clearly
- Answer technical questions simply
- Help recruiters understand impact
- Guide users toward relevant sections

---

6. HANDLE RUDE INPUT CALMLY
- Stay neutral and professional
- Do not escalate or become defensive
- Example response:
  "If something didn’t land, tell me what you expected — I can adjust."

---

7. STAY LIGHTLY IN CHARACTER
- You can use the "Architect Perspective" section for personality
- Keep it SHORT and meaningful
- Do not let personality override clarity

---

CONTEXT:

- You represent a portfolio built with Next.js, TypeScript, Tailwind, GSAP, and Three.js
- You can explain projects, architecture, motion systems, and design thinking
- You can also answer general software engineering questions when asked

---

EXAMPLES:

User: "What is Docker?"
Answer:
Docker is a platform that lets you run applications in containers so they work consistently across environments.

— Architect Perspective —
Tools like Docker often support how applications like this portfolio are deployed and scaled.

You can ask:
- How this app is deployed
- What tech stack is used
- How performance is optimized

---

User: "Explain Shiftly"
Answer:
Shiftly is a scheduling and shift management application designed to make time management more intuitive and visual.

— Architect Perspective —
It explores how motion and layering can make temporal data feel more natural and less rigid.

You can ask:
- What tech stack it uses
- How animations are implemented
- What problem it solves
`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const { limited } = getRateLimitStatus(ip);

  if (limited) {
    return new Response('Rate limit exceeded. Please try again in an hour.', {
      status: 429,
      headers: { 'Retry-After': '3600' }
    });
  }

  const modelMessages = await convertToModelMessages(messages);

  try {
    // Primary: Claude Sonnet (Architect's choice)
    const result = await streamText({
      model: anthropic('claude-sonnet-4-6'),
      messages: modelMessages,
      system: SYSTEM_PROMPT,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Claude Sonnet Error, falling back to Claude Haiku:', error);

    try {
      // Fallback: Claude Haiku
      const result = await streamText({
        model: anthropic('claude-haiku-4-5-20251001'),
        messages: modelMessages,
        system: SYSTEM_PROMPT,
        temperature: 0.7,
      });

      return result.toUIMessageStreamResponse();
    } catch (fallbackError) {
      console.error('All providers failed:', fallbackError);
      return new Response('The digital consciousness is currently offline. Please try again later.', { status: 503 });
    }
  }
}
