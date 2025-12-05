
import React from 'react';
import { CreateIQUser, CreateIQPost } from '../../types';
import PostCard from './PostCard';

interface CreateIQFeedProps {
    users: CreateIQUser[];
    posts: CreateIQPost[];
    onLike: (postId: string) => void;
    onSave: (postId: string) => void;
    onCommentClick: (postId: string) => void;
    onOpenStory: (userId: string) => void;
    onNavigateToDMs: () => void;
    onPostCreateClick: () => void;
}

const CreateIQFeed: React.FC<CreateIQFeedProps> = ({ users, posts, onLike, onSave, onCommentClick, onOpenStory, onNavigateToDMs, onPostCreateClick }) => {
    const usersWithStories = users.filter(u => u.hasStory);
    const usersWithoutStories = users.filter(u => !u.hasStory);
    const sortedUsers = [...usersWithStories, ...usersWithoutStories];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-brand-gray-200 bg-white/80 backdrop-blur-sm sticky top-[68px] z-10">
                <h2 className="text-2xl font-bold text-brand-gray-800 tracking-tighter">CreateIQ</h2>
                <button onClick={onNavigateToDMs} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>

            {/* Stories */}
            <div className="p-3 border-b border-brand-gray-200 bg-white">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {sortedUsers.slice(0, 8).map(user => (
                        <div key={user.id} onClick={() => user.hasStory && onOpenStory(user.id)} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                            <div className={`relative w-16 h-16 rounded-full p-0.5 ${user.hasStory ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-brand-gray-200'}`}>
                                <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover border-2 border-white" />
                            </div>
                            <p className="text-xs mt-1 text-brand-gray-600 truncate w-16 text-center">{user.handle}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Posts */}
            <div className="space-y-3 bg-brand-gray-100/50">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} onLike={onLike} onSave={onSave} onCommentClick={onCommentClick} />
                ))}
            </div>
             <div className="fixed bottom-24 right-6 z-20">
                <button 
                    onClick={onPostCreateClick}
                    className="bg-brand-blue text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-3xl font-light hover:bg-brand-blue-dark transition-transform active:scale-95" 
                    aria-label="Create new post"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
            </div>
        </div>
    );
};

export default CreateIQFeed;