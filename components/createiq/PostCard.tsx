
import React, { useState } from 'react';
import { CreateIQPost } from '../../types';

interface PostCardProps {
    post: CreateIQPost;
    onLike: (postId: string) => void;
    onSave: (postId: string) => void;
    onCommentClick: (postId: string) => void;
}

const ExpandableCaption: React.FC<{ text: string; userHandle: string }> = ({ text, userHandle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const charLimit = 100;

    if (text.length <= charLimit) {
        return (
            <p className="text-sm mt-1 text-brand-gray-800">
                <span className="font-bold mr-1">{userHandle}</span>
                {text}
            </p>
        );
    }

    return (
        <p className="text-sm mt-1 text-brand-gray-800">
            <span className="font-bold mr-1">{userHandle}</span>
            {isExpanded ? text : `${text.substring(0, charLimit)}... `}
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-brand-gray-400">
                {isExpanded ? 'less' : 'more'}
            </button>
        </p>
    );
};


const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave, onCommentClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);

    const handleNextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % post.imageUrls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(prev => (prev - 1 + post.imageUrls.length) % post.imageUrls.length);
    };
    
    const handleDoubleClick = () => {
        if (!post.isLiked) {
            onLike(post.id);
        }
        setShowLikeAnimation(true);
        setTimeout(() => setShowLikeAnimation(false), 800);
    };

    return (
        <div className="bg-white border-b border-brand-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                    <img src={post.user.avatarUrl} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <p className="font-bold text-sm text-brand-gray-800">{post.user.handle}</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-brand-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </button>
            </div>

            {/* Image Carousel */}
            <div className="relative" onDoubleClick={handleDoubleClick}>
                <img src={post.imageUrls[currentImageIndex]} alt={`Post by ${post.user.handle}`} className="w-full h-auto max-h-[600px] object-cover" />
                {post.imageUrls.length > 1 && (
                    <>
                        {currentImageIndex > 0 && 
                            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center z-10">‹</button>
                        }
                        {currentImageIndex < post.imageUrls.length - 1 &&
                            <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center z-10">›</button>
                        }
                    </>
                )}
                 {showLikeAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" style={{ animation: 'like-pop 0.8s ease-out' }} viewBox="0 0 24 24" fill="currentColor">
                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <style>{`@keyframes like-pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 0; } }`}</style>
                    </div>
                )}
            </div>
            
            {/* Actions */}
            <div className="flex justify-between items-center p-3">
                <div className="flex items-center space-x-4">
                    <button onClick={() => onLike(post.id)} className="active:scale-90 transition-transform">
                       <svg className={`h-7 w-7 ${post.isLiked ? 'text-red-500' : 'text-brand-gray-800'}`} viewBox="0 0 24 24" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                       </svg>
                    </button>
                    <button onClick={() => onCommentClick(post.id)} className="active:scale-90 transition-transform">
                        <svg className="h-7 w-7 text-brand-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </button>
                    <button className="active:scale-90 transition-transform">
                        <svg className="h-7 w-7 text-brand-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                </div>
                <div className="flex items-center">
                    {post.imageUrls.length > 1 && (
                        <div className="flex space-x-1 mr-4">
                            {post.imageUrls.map((_, index) => (
                                <div key={index} className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-brand-blue' : 'bg-brand-gray-200'}`}></div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => onSave(post.id)} className="active:scale-90 transition-transform">
                        <svg className="h-7 w-7 text-brand-gray-800" viewBox="0 0 24 24" fill={post.isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className="px-3 pb-3">
                <p className="font-bold text-sm text-brand-gray-800">{post.stats.likes.toLocaleString()} likes</p>
                <ExpandableCaption text={post.caption} userHandle={post.user.handle} />
                {post.stats.comments > 0 &&
                    <button onClick={() => onCommentClick(post.id)} className="text-sm text-brand-gray-400 mt-1">
                        View all {post.stats.comments} comments
                    </button>
                }
                 <p className="text-xs text-brand-gray-400 mt-2 uppercase">{post.time} • {post.stats.views.toLocaleString()} views</p>
            </div>
        </div>
    );
};

export default PostCard;
