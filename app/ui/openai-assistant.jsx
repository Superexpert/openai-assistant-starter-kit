'use client'
import {useState} from "react";
import {AiOutlineUser, AiOutlineRobot, AiOutlineSend} from "react-icons/ai";


const initialMessages = [
    {
        id: "msg_23",
        role: "assistant",
        content: "I am a helpful chat assistant"
    },
    {
        id: "msg_29",
        role: "user",
        content: "Hello, how are you today?"
    },
];


export default function OpenAIAssistant() {
    const [messages, setMessages] = useState(initialMessages);

    function handleSubmit(e) {
        e.preventDefault();
        alert(messages);
    }

    return (
        <div className="flex flex-col bg-slate-200 shadow-md">
            {messages.map(m => 
                <OpenAIAssistantMessage
                    key={m.id}
                    message={m}
                />
            )}
            <form onSubmit={handleSubmit} className="m-2 flex">
                <input className="border rounded w-full py-2 px-3 text-gray-70" placeholder="message" />
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"><AiOutlineSend /></button>
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
            <div className="mx-4">
                {message.content}
            </div>
        </div>
    )
}