import {NextRequest, NextResponse} from 'next/server'
import OpenAI from 'openai'

// this enables Edge Functions in Vercel
// see https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
// and updated here: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const runtime = "edge";

// post a new message and stream OpenAI Assistant response
export async function POST(request:NextRequest) {
    // parse message from post
    const newMessage = await request.json();

    // create OpenAI client
    const openai = new OpenAI();

    // if no thread id then create a new openai thread
    if (newMessage.threadId == null) {
        const thread = await openai.beta.threads.create();
        newMessage.threadId = thread.id;
    }

    // add new message to thread
    await openai.beta.threads.messages.create(
        newMessage.threadId,
        {
            role: "user",
            content: newMessage.content
        }
    );

    // create a run
    const stream = await openai.beta.threads.runs.create(
        newMessage.threadId, 
        {assistant_id: newMessage.assistantId, stream:true}
    );
    
    return new Response(stream.toReadableStream());
}
