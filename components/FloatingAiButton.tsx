import React, { useState } from 'react';

const FloatingAiButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey Alex! I'm CampusGPT. How can I help you with your schedule, finances, or finding deals on the market?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        setTimeout(() => {
            const aiResponse = { id: Date.now() + 1, text: "That's a great question! Let me check on that for you.", sender: 'ai' };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 bg-brand-blue text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-blue-dark transition-transform active:scale-95 z-40"
                aria-label="Open AI Chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 000 2h2a1 1 0 100-2H5zm4 0a1 1 0 000 2h2a1 1 0 100-2H9zm4 0a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-end" onClick={() => setIsOpen(false)}>
            <div className="bg-brand-gray-50 w-full max-w-lg h-[70vh] rounded-t-2xl shadow-2xl flex flex-col mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
                {/* Header */}
                 <div className="p-4 border-b border-brand-gray-200 flex-shrink-0 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-brand-gray-800">CampusGPT Assistant</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-brand-gray-100">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-grow bg-white p-4 overflow-y-auto space-y-4">
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
                <div className="p-4 bg-white border-t border-brand-gray-200">
                    <div className="flex items-center bg-brand-gray-100 rounded-xl p-2">
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
                               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                           </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingAiButton;