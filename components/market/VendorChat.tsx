
import React, { useState } from 'react';
import { type MarketItem } from '../../types';

interface VendorChatProps {
    item: MarketItem;
    onBack: () => void;
}

const VendorChat: React.FC<VendorChatProps> = ({ item, onBack }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! Is this still available?", sender: 'user' }
    ]);
    const [input, setInput] = useState('');

    const quickReplies = ["Is this available?", "Can we meet at campus?", "Is the price negotiable?"];

    const handleSend = (text: string) => {
        if (text.trim() === '') return;

        const userMessage = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        
        // Mock AI/Vendor response
        setTimeout(() => {
            const aiResponse = { id: Date.now() + 1, text: `Yes, the ${item.title} is still available!`, sender: 'vendor' };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)]">
            {/* Header */}
            <div className="flex-shrink-0 p-2 flex items-center space-x-2">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex-shrink-0">
                    <img src={item.imageUrls[0]} alt={item.title} className="w-10 h-10 rounded-md object-cover" />
                </div>
                <div>
                    <p className="font-bold text-brand-gray-800 truncate">{item.title}</p>
                    <p className="text-sm text-brand-gray-600">Chat with {item.seller}</p>
                </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow bg-white rounded-xl shadow-sm p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'vendor' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'vendor' 
                                ? 'bg-brand-gray-100 text-brand-gray-800' 
                                : 'bg-brand-blue text-white'
                        }`}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="mt-4 flex-shrink-0">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {quickReplies.map(reply => (
                        <button key={reply} onClick={() => { setInput(reply); handleSend(reply); setInput(''); }} className="px-3 py-1 text-sm font-semibold rounded-full flex-shrink-0 bg-brand-blue-light text-brand-blue-dark active:scale-95">
                            {reply}
                        </button>
                    ))}
                </div>
                <div className="flex items-center bg-white rounded-xl shadow-sm p-2 mt-2">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (handleSend(input), setInput(''))}
                        className="flex-grow bg-transparent p-2 focus:outline-none text-brand-gray-800"
                        placeholder="Type your message..."
                    />
                    <button 
                        onClick={() => { handleSend(input); setInput(''); }}
                        className="bg-brand-blue text-white rounded-lg p-2 hover:bg-brand-blue-dark transition-transform active:scale-95"
                        aria-label="Send message"
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

export default VendorChat;