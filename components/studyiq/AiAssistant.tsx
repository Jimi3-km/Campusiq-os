import React, { useState, useEffect, useRef } from 'react';
import { AiAssistantMessage } from '../../types';

interface AiAssistantProps {
    conversation: AiAssistantMessage[];
    onSendMessage: (text: string) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ conversation, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const handleSend = (text: string) => {
        if (text.trim() === '') return;
        onSendMessage(text);
        setInput('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-240px)] bg-white rounded-xl shadow-lg">
            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {conversation.map((message, index) => (
                    <div key={message.id || index} className={`flex flex-col ${message.sender === 'ai' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'ai' 
                                ? 'bg-brand-gray-100 text-brand-gray-800 rounded-bl-none' 
                                : 'bg-brand-emerald text-white rounded-br-none'
                        }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                        {message.suggestions && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {message.suggestions.map(suggestion => (
                                    <button 
                                        key={suggestion}
                                        onClick={() => handleSend(suggestion)}
                                        className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-emerald-light text-brand-emerald-dark transition-transform active:scale-95"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-brand-gray-200">
                <div className="flex items-center bg-brand-gray-100 rounded-full p-1">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                        className="flex-grow bg-transparent px-3 py-1.5 text-sm focus:outline-none text-brand-gray-800"
                        placeholder="Ask a question or type a command..."
                    />
                    <button 
                        onClick={() => handleSend(input)}
                        className="bg-brand-emerald text-white rounded-full p-2 hover:bg-brand-emerald-dark transition-transform active:scale-95 disabled:bg-emerald-300"
                        aria-label="Send message"
                        disabled={!input.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;