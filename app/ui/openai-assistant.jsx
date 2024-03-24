'use client'
import {useState} from "react";
import {AiOutlineUser, AiOutlineRobot, AiOutlineSend} from "react-icons/ai";
import Markdown from 'react-markdown';


export default function OpenAIAssistant({
    assistantId,
    greeting = "I am a helpful chat assistant. How can I help you?"
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // set default greeting Message
    const greetingMessage = {
        role: "assistant",
        content: greeting,
    };


    async function handleSubmit(e) {
        e.preventDefault();

        // add busy indicator
        setIsLoading(true);
   
        // post new message and fetch messages
        const response = await fetch('/api/openai-assistant', {
            method: 'POST',
            body: JSON.stringify({
                assistantId: assistantId,
                threadId: threadId,
                content: message,
            }),
        });
        let newMessages = await response.json();


        // remove busy indicator
        setIsLoading(false);

        // trigger rendering of new messages
        setMessage("");
        setThreadId(newMessages.threadId);
        setMessages(newMessages.messages);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
      }

    return (
        <div className="flex flex-col bg-slate-200 shadow-md relative">
            <OpenAIAssistantMessage
                message={greetingMessage}
            />
            {messages.map(m => 
                <OpenAIAssistantMessage
                    key={m.id}
                    message={m}
                />
            )}
            <form onSubmit={handleSubmit} className="m-2 flex">
                <input 
                    disabled={isLoading}
                    className="border rounded w-full py-2 px-3 text-gray-70" 
                    onChange={handleMessageChange}
                    value={message}
                    placeholder="message" />
                {isLoading ? 
                    <button 
                        disabled
                        className="ml-2  bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">   
                        <OpenAISpinner /> 
                    </button>
                    : 
                    <button 
                        disabled={message.length == 0}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">   
                        <AiOutlineSend /> 
                    </button>
                }
            </form>
        </div>
    )
}

export function OpenAIAssistantMessage({message}) {

    function displayRole(roleName) {
        switch (roleName) {
            case "user":
                return <AiOutlineUser />;
            case "assistant":
                return <AiOutlineRobot />;
        }
    }
    return (
        <div className="flex rounded text-gray-700 text-center bg-white px-4 py-2 m-2 shadow-md">
            <div className="text-4xl">
                {displayRole(message.role)}
            </div>
            <div className="mx-4 text-left overflow-auto openai-text">
                <Markdown>
                    {message.content}
                </Markdown>
            </div>
        </div>
    )
}

// Based on https://flowbite.com/docs/components/spinner/
function OpenAISpinner() {
    return (
        <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>    
    )
}