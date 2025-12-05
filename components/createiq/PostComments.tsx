
import React, { useState } from 'react';
import { CreateIQPost, CreateIQComment, CreateIQUser } from '../../types';

const CommentCard: React.FC<{ comment: CreateIQComment }> = ({ comment }) => (
    <div className="flex space-x-3">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-8 h-8 rounded-full flex-shrink-0"/>
        <div className="w-full">
            <p className="text-sm">
                <span className="font-bold text-brand-gray-800 mr-1">{comment.user.handle}</span>
                <span className="text-brand-gray-800">{comment.text}</span>
            </p>
        </div>
    </div>
);

interface PostCommentsProps {
    post: CreateIQPost;
    currentUser: CreateIQUser;
    onBack: () => void;
    onAddComment: (postId: string, commentText: string) => void;
}

const PostComments: React.FC<PostCommentsProps> = ({ post, currentUser, onBack, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment);
            setNewComment('');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center p-3 border-b border-brand-gray-200">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-lg font-bold text-brand-gray-800 ml-4">Comments</h2>
            </div>
            
            {/* Comments List */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                 {/* Original Post Caption */}
                 <div className="flex space-x-3 border-b border-brand-gray-100 pb-4">
                    <img src={post.user.avatarUrl} alt={post.user.name} className="w-8 h-8 rounded-full flex-shrink-0"/>
                    <div className="w-full">
                         <p className="text-sm">
                            <span className="font-bold text-brand-gray-800 mr-1">{post.user.handle}</span>
                            <span className="text-brand-gray-800">{post.caption}</span>
                         </p>
                    </div>
                </div>
                {/* Replies */}
                {post.comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>

            {/* Add Comment */}
            <div className="flex-shrink-0 p-3 border-t border-brand-gray-200">
                 <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <img src={currentUser.avatarUrl} alt="Your avatar" className="w-10 h-10 rounded-full"/>
                    <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder={`Add a comment as ${currentUser.handle}...`}
                        className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-brand-gray-800"
                    />
                    <button type="submit" className="text-sm font-bold text-brand-blue disabled:text-brand-gray-400" disabled={!newComment.trim()}>
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostComments;