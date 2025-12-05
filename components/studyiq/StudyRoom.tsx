import React, { useState, useEffect, useRef } from 'react';
import { StudyGroup, RoomChatMessage, SharedFile } from '../../types';
import RoomDetails from './RoomDetails';

interface StudyRoomProps {
    group: StudyGroup;
    onBack: () => void;
    onSendMessage: (groupId: string, text: string) => void;
    onUploadFile: (groupId: string) => void;
    onSummarizeFile: (groupId: string, file: SharedFile) => void;
}

const ChatMessage: React.FC<{ message: RoomChatMessage }> = ({ message }) => {
    if (message.sender === 'system') {
        return (
            <div className="text-center my-2">
                <p className="text-xs text-brand-gray-500 bg-brand-gray-100 rounded-full inline-block px-3 py-1">
                    {message.text}
                </p>
            </div>
        );
    }

    const isAI = message.sender === 'ai';
    const isUser = message.sender === 'user';
    const avatar = isAI ? 'https://picsum.photos/seed/ai-bot/100/100' : message.userAvatar;
    const name = isAI ? 'StudyIQ AI' : (isUser ? 'You' : message.userName);

    return (
        <div className="flex items-start space-x-3 p-2 hover:bg-brand-gray-50/50 rounded-lg">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <div className="flex items-baseline space-x-2">
                    <p className={`font-bold ${isAI ? 'text-brand-emerald-dark' : 'text-brand-gray-800'}`}>{name}</p>
                    <p className="text-xs text-brand-gray-400">{message.timestamp}</p>
                </div>
                <p className="text-sm text-brand-gray-700">{message.text}</p>
            </div>
        </div>
    );
};

const StudyRoom: React.FC<StudyRoomProps> = ({ group, onBack, onSendMessage, onUploadFile, onSummarizeFile }) => {
    const [input, setInput] = useState('');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [group.chatHistory.length]);

    const handleSend = () => {
        if (input.trim() === '') return;
        onSendMessage(group.id, input);
        setInput('');
    };

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-brand-gray-200">
                <div className="flex items-center space-x-2">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-brand-gray-800">{group.name}</h2>
                        <p className="text-xs text-brand-gray-500">{group.members} members online</p>
                    </div>
                </div>
                <button onClick={() => setIsDetailsOpen(true)} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-1">
                {group.chatHistory.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-brand-gray-200">
                <div className="flex items-center bg-brand-gray-100 rounded-lg p-1">
                     <button onClick={() => onUploadFile(group.id)} className="p-2 text-brand-gray-500 hover:text-brand-emerald-dark hover:bg-brand-gray-200 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    </button>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-grow bg-transparent px-3 py-1.5 text-sm focus:outline-none text-brand-gray-800"
                        placeholder={`Message #${group.name.toLowerCase().replace(' ', '-')}`}
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-brand-emerald text-white rounded-lg p-2 hover:bg-brand-emerald-dark transition-transform active:scale-95 disabled:bg-emerald-300"
                        aria-label="Send message"
                        disabled={!input.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </div>
            </div>
            
            {isDetailsOpen && <RoomDetails group={group} onClose={() => setIsDetailsOpen(false)} onSummarizeFile={onSummarizeFile} />}
        </div>
    );
};

export default StudyRoom;