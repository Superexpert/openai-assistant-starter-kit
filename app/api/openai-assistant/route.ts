import {NextRequest, NextResponse} from 'next/server'
import OpenAI from 'openai'





// post a new message and return thread of messages
export async function POST(request:NextRequest) {
    // parse message from post
    const message = await request.json();

    // create OpenAI client
    const openai = new OpenAI();

    // if no thread id then create a new openai thread
    if (message.threadId == null) {
        console.log("no thread id");
        const thread = await openai.beta.threads.create();
        message.threadId = thread.id;
    }
    console.log("threadId=" + message.threadId);

    // add new message to thread
    const newMessage = await openai.beta.threads.messages.create(
        message.threadId,
        {
            role: "user",
            content: message.content
        }
    );

    // create a run
    let run = await openai.beta.threads.runs.create(
        message.threadId,
        { 
          assistant_id: ASSISTANT_ID
        }
    );

    // wait patiently for a response
    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
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
        // for (const message of messageList.data.reverse()) {
        //   console.log(`${message.role} > ${message.content[0].text.value}`);
        // }
      } else {
        console.log(run.status);
      }


    const cleanMessages = messageList?.data.map(m => {
        return {
            id: m.id,
            role : m.role,
            content: m.content[0].text.value
        }
    });

    // reverse the order of the messages
    cleanMessages?.reverse();

    return Response.json({
        threadId: message.threadId,
        messages: cleanMessages,
    });

}