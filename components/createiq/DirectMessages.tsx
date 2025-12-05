
import React from 'react';
import { DirectMessage } from '../../types';

interface DirectMessagesProps {
    dms: DirectMessage[];
    onBack: () => void;
    onChatSelect: (dmId: string) => void;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ dms, onBack, onChatSelect }) => {
    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col bg-white">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center p-3 border-b border-brand-gray-200">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-lg font-bold text-brand-gray-800 ml-4">Direct Messages</h2>
            </div>

            {/* DM List */}
            <div className="flex-grow overflow-y-auto">
                {dms.map(dm => (
                    <div key={dm.id} onClick={() => onChatSelect(dm.id)} className="flex items-center p-3 space-x-4 hover:bg-brand-gray-50 cursor-pointer">
                        <img src={dm.user.avatarUrl} alt={dm.user.name} className="w-14 h-14 rounded-full" />
                        <div className="flex-grow min-w-0">
                            <p className="font-semibold text-brand-gray-800">{dm.user.name}</p>
                            <p className={`text-sm truncate ${dm.unreadCount > 0 ? 'text-brand-gray-800 font-bold' : 'text-brand-gray-500'}`}>
                                {dm.lastMessage}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-xs text-brand-gray-400">{dm.time}</p>
                            {dm.unreadCount > 0 && (
                                <span className="mt-1 inline-block bg-brand-blue text-white text-xs font-bold w-5 h-5 rounded-full text-center leading-5">
                                    {dm.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DirectMessages;