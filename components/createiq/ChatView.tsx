
import React, { useState, useEffect, useRef } from 'react';
import { DirectMessage, CreateIQUser } from '../../types';

interface ChatViewProps {
    chat: DirectMessage;
    currentUser: CreateIQUser;
    onBack: () => void;
    onSendMessage: (dmId: string, messageText: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, currentUser, onBack, onSendMessage }) => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);
    
    useEffect(() => {
         // Mock typing indicator
        if(chat.messages[chat.messages.length - 1]?.senderId === currentUser.id) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [chat.messages, currentUser.id]);

    const handleSend = () => {
        if (input.trim() === '') return;
        onSendMessage(chat.id, input);
        setInput('');
    };

    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col bg-white">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center p-3 border-b border-brand-gray-200">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-10 h-10 rounded-full ml-2" />
                <div className="ml-3">
                    <p className="font-bold text-brand-gray-800">{chat.user.name}</p>
                    <p className="text-xs text-brand-gray-500">@{chat.user.handle}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-brand-gray-50 space-y-4">
                {chat.messages.map((msg, index) => {
                    const isCurrentUser = msg.senderId === currentUser.id;
                    const isFirst = index === 0 || chat.messages[index-1].senderId !== msg.senderId;
                    const isLast = index === chat.messages.length - 1 || chat.messages[index+1].senderId !== msg.senderId;

                    return (
                        <div key={msg.id} className={`flex items-end space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                             {!isCurrentUser && isLast && <img src={chat.user.avatarUrl} className="w-6 h-6 rounded-full" />}
                             <div className={`max-w-xs lg:max-w-md px-4 py-2 text-sm ${isCurrentUser ? 'bg-brand-blue text-white' : 'bg-brand-gray-200 text-brand-gray-800'} 
                                ${isFirst && isLast ? 'rounded-2xl' : ''}
                                ${isCurrentUser && !isFirst && isLast ? 'rounded-t-2xl rounded-bl-2xl' : ''}
                                ${isCurrentUser && isFirst && !isLast ? 'rounded-b-2xl rounded-tl-2xl' : ''}
                                ${isCurrentUser && !isFirst && !isLast ? 'rounded-l-2xl rounded-r-md' : ''}
                                ${!isCurrentUser && !isFirst && isLast ? 'rounded-t-2xl rounded-br-2xl' : ''}
                                ${!isCurrentUser && isFirst && !isLast ? 'rounded-b-2xl rounded-tr-2xl' : ''}
                                ${!isCurrentUser && !isFirst && !isLast ? 'rounded-r-2xl rounded-l-md' : ''}
                             `}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    )
                })}
                {isTyping && (
                     <div className="flex items-end space-x-2 justify-start">
                         <img src={chat.user.avatarUrl} className="w-6 h-6 rounded-full" />
                         <div className="px-4 py-2 text-sm bg-brand-gray-200 text-brand-gray-800 rounded-2xl">
                            <div className="flex items-center space-x-1">
                                <span className="h-1.5 w-1.5 bg-brand-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-1.5 w-1.5 bg-brand-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-1.5 w-1.5 bg-brand-gray-400 rounded-full animate-bounce"></span>
                            </div>
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-3 border-t border-brand-gray-200">
                <div className="flex items-center bg-brand-gray-100 rounded-full p-1">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Message..."
                        className="flex-grow bg-transparent px-3 py-2 text-sm focus:outline-none text-brand-gray-800"
                    />
                    <button onClick={handleSend} disabled={!input.trim()} className="text-sm font-bold text-brand-blue px-3 disabled:text-brand-gray-400">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatView;