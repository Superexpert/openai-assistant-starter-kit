import {NextRequest, NextResponse} from 'next/server'
import OpenAI from 'openai'

// const ASSISTANT_ID = "asst_gx3Htc0gLVNlpBQKLoefkXZZ";

// post a new message and return thread of messages
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
    let run = await openai.beta.threads.runs.create(
        newMessage.threadId,
        { 
          assistant_id: newMessage.assistantId
        }
    );

    // wait patiently for a response
    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 1/2 second
        run = await openai.beta.threads.runs.retrieve(
          run.thread_id,
          run.id
        );
    }

    // get all of the messages
    let messageList;
    if (run.status === 'completed') {
        messageList = await openai.beta.threads.messages.list(
          run.thread_id
        );
    } else {
        console.log(run.status);
    }

    // remove extra info from the messages
    const cleanMessages = messageList?.data.map(m => {
        return {
            id: m.id,
            role : m.role,
            content: m.content[0].text.value
        }
    });

    // reverse the order of the messages
    cleanMessages?.reverse();

    // return messages as JSON
    return Response.json({
        threadId: newMessage.threadId,
        messages: cleanMessages,
    });

}