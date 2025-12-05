import React, { useState } from 'react';
import { type CampusPulsePost, type Comment, type UserProfile } from '../../types';

const renderContentWithTags = (content: string) => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, index) => 
        part.startsWith('#') ? (
            <span key={index} className="text-brand-blue hover:underline cursor-pointer">{part}</span>
        ) : (
            part
        )
    );
};

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="flex space-x-3">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full flex-shrink-0"/>
        <div className="w-full">
            <div className="bg-brand-gray-100 rounded-xl p-3">
                <div className="flex items-center space-x-1">
                    <p className="font-bold text-brand-gray-800 text-sm">{comment.user.name}</p>
                    <p className="text-xs text-brand-gray-500">@{comment.user.handle}</p>
                    <p className="text-xs text-brand-gray-500">·</p>
                    <p className="text-xs text-brand-gray-500">{comment.time}</p>
                </div>
                <p className="text-sm text-brand-gray-800 mt-1">{comment.text}</p>
            </div>
        </div>
    </div>
);

interface CommentSectionProps {
    post: CampusPulsePost;
    onClose: () => void;
    onAddComment: (postId: string, commentText: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ post, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const currentUser: UserProfile = { name: 'Alex Doe', handle: 'alex_doe', avatarUrl: 'https://picsum.photos/id/237/100/100' };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment);
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-brand-gray-50 rounded-xl shadow-2xl w-full max-w-lg h-[80vh] flex flex-col mx-4" onClick={e => e.stopPropagation()}>
                {/* Header */}
                 <div className="p-4 border-b border-brand-gray-200 flex-shrink-0 flex items-center space-x-4">
                     <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-gray-100">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h2 className="text-xl font-bold">Thread</h2>
                </div>

                {/* Original Post */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="flex space-x-3">
                        <div className="flex flex-col items-center">
                            <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                            <div className="w-0.5 grow bg-brand-gray-200 my-2"></div>
                        </div>
                        <div className="w-full pb-4">
                            <div className="flex items-center space-x-1">
                                <p className="font-bold text-brand-gray-800">{post.user.name}</p>
                                <p className="text-sm text-brand-gray-500">@{post.user.handle}</p>
                            </div>
                            <p className="mt-1 text-brand-gray-800">{renderContentWithTags(post.content)}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mt-2 rounded-lg w-full max-h-48 object-cover border border-brand-gray-200"/>}
                            <p className="text-sm text-brand-gray-500 mt-2">Replying to <span className="text-brand-blue">@{post.user.handle}</span></p>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                    {post.comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
                    </div>
                </div>

                {/* Add Comment Form */}
                <div className="p-4 border-t border-brand-gray-200 flex-shrink-0 bg-white">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <img src={currentUser.avatarUrl} alt="Your avatar" className="w-10 h-10 rounded-full"/>
                        <input
                            type="text"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Post your reply"
                            className="flex-grow bg-brand-gray-100 border border-brand-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-gray-800"
                        />
                        <button type="submit" className="bg-brand-blue text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-brand-blue-dark transition-transform active:scale-95 disabled:bg-sky-300" disabled={!newComment.trim()}>
                           Reply
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;