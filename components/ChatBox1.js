"use client";

import React, {
    useRef,

    useEffect,

    useState

} from "react";

export default function ChatBox() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [typing, setTyping] = useState(false);

    const chatContainerRef=useRef(null);

    // =========================
    // LOAD CHATS ON START
    // =========================

    useEffect(() => {

        if (chatContainerRef.current){
            chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight;
        }
    }, [messages, typing]);

    useEffect(()=>{
        loadChats();
    },[]);

    async function loadChats() {

        try {

            const email =
                localStorage.getItem(
                    "userEmail"
                );

            if (!email) return;

            let response = await fetch(
                `http://127.0.0.1:8000/get-chat/${email}`
            );

            let data = await response.json();

            // FORMAT DATABASE CHATS

            const formattedChats =
                data.flatMap((chat) => [

                    {
                        sender: "user",

                        text: chat.user_message
                    },

                    {
                        sender: "ai",

                        text: chat.ai_response
                    }
                ]);

            setMessages(formattedChats);

        } catch (error) {

            console.log(error);
        }
    }

    // =========================
    // SEND MESSAGE
    // =========================

    async function sendMessage() {

        if (!message.trim()) return;

        const email =
            localStorage.getItem(
                "userEmail"
            );

        const currentMessage =
            message;

        // SHOW USER MESSAGE

        setMessages((prev) => [

            ...prev,

            {
                sender: "user",

                text: currentMessage
            }
        ]);

        setMessage("");
        setTyping(true);
        try {
            
            let response = await fetch(
                "http://127.0.0.1:8000/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        email,

                        message:
                        currentMessage
                    })
                }
            );

            let data = await response.json();
            setTyping(false);
            // SHOW AI MESSAGE

            setMessages((prev) => [

                ...prev,

                {
                    sender: "ai",

                    text: data.reply
                }
            ]);

        } catch (error) {
            setTyping(false)
            alert("Chat Error");
        }
    }

    async function clearChats() {
        try{
            const email =localStorage.getItem("userEmail");
            await fetch(`http://127.0.0.1:8000/clear-chat/${email}`,
                {
                    method: "DELETE"
                }
            );
            setMessages([]);
        }
        catch (error) 
        {
            console.log(error);
        }
    
    }


    return (

    <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-3xl shadow-xl">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-5">

            <h1 className="text-2xl font-bold text-white">

                🤖 AI Fitness Coach

            </h1>
            <span className="ml-3 text-green-400 text-sm">Online</span>

            <button
                onClick={clearChats}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white font-semibold transition-all"
            >
                Clear Chat
            </button>

        </div>

        {/* CHAT AREA */}

        <div
            ref={chatContainerRef}
            className="h-[550px] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-5 scroll-smooth"
        >
            {messages.length === 0 && !typing && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <div className="text-6xl mb-4">🤖</div>
                    <p>Start a conversation with your AI fitness coach!</p>
                </div>
            )}

            {messages.map((msg, index) => (

                <div
                    key={index}
                    className={`mb-4 flex ${
                        msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >

                    <div
                        className={`p-4 rounded-2xl max-w-[80%] shadow-md ${
                            msg.sender === "user"
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                                : "bg-slate-800 text-white border border-slate-700"
                        }`}
                    >

                        {msg.text}

                    </div>

                </div>

            ))}

            {typing && (

                <div className="flex justify items-center gap-2">

                    <span className="animate-pulse">🤖</span>

                     <span>AI is thinking...</span>

                    

                </div>

            )}

        </div>

        {/* INPUT */}

        <div className="flex flex-col md:flex-row gap-3 mt-5">

            <input
                type="text"
                placeholder="Ask your AI fitness coach..."
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                className="flex-1 bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105  px-8 py-2 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg"
            >
                Send
            </button>

        </div>

    </div>

);
}