
import React, { useState } from 'react';

const AiChat: React.FC = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey Alex! I'm CampusGPT. How can I help you with your schedule, finding deals on the market, or seeing what's up on campus?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        // Mock AI response
        setTimeout(() => {
            const aiResponse = { id: Date.now() + 1, text: "That's a great question! Let me check on that for you.", sender: 'ai' };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in">
             <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">CampusGPT Assistant</h2>
                <p className="text-brand-gray-600 mb-4">Your personal AI companion.</p>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow bg-white rounded-xl shadow-sm p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'ai' 
                                ? 'bg-brand-gray-100 text-brand-gray-800' 
                                : 'bg-brand-blue text-white'
                        }`}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="mt-4">
                <div className="flex items-center bg-white rounded-xl shadow-sm p-2">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-grow bg-transparent p-2 focus:outline-none text-brand-gray-800"
                        placeholder="Ask me anything..."
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-brand-blue text-white rounded-lg p-2 hover:bg-brand-blue-dark transition-transform active:scale-95"
                        aria-label="Send message"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiChat;