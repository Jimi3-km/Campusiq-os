import React, { useState, useRef, useMemo } from 'react';
import { type CampusPulsePost, type Comment, type UserProfile } from '../types';
import CommentSection from './pulse/CommentSection';

const mockUsers: { [key: string]: UserProfile } = {
    'user1': { name: 'Anonymous Lion', handle: 'kingofthejungle', avatarUrl: 'https://picsum.photos/seed/lion/100/100' },
    'user2': { name: 'Anonymous Gazelle', handle: 'swift_runner', avatarUrl: 'https://picsum.photos/seed/gazelle/100/100' },
    'user3': { name: 'Anonymous Owl', handle: 'night_scholar', avatarUrl: 'https://picsum.photos/seed/owl/100/100' },
    'user4': { name: 'CampusIQ Bot', handle: 'campus_ai', avatarUrl: 'https://picsum.photos/seed/robot/100/100' },
    'you': { name: 'Alex Doe', handle: 'alex_doe', avatarUrl: 'https://picsum.photos/id/237/100/100' },
};

const mockPosts: CampusPulsePost[] = [
    {
        id: '1', user: mockUsers.user1, time: '2h',
        content: "Is anyone else finding the new library hours super inconvenient? Can't get any late-night studying done. #UoNLife #ExamSzn",
        stats: { comments: 2, reposts: 5, likes: 42 },
        comments: [
            { id: 'c1', user: mockUsers.user2, text: 'Totally agree!', time: '1h' },
            { id: 'c2', user: mockUsers.user3, text: 'I heard they might change it back if enough people complain.', time: '30m' },
        ]
    },
    {
        id: '2', user: mockUsers.user2, time: '5h',
        content: "Shoutout to the cafeteria for the improved ugali today. It was actually good! 🔥",
        stats: { comments: 1, reposts: 2, likes: 89 },
        comments: [{id: 'c3', user: mockUsers.user1, text: 'Facts!', time: '4h'}]
    },
    {
        id: '3', user: mockUsers.user3, time: '8h',
        content: 'Found this cool spot to study near the engineering block! Super quiet.',
        imageUrl: 'https://picsum.photos/seed/studyspot/800/600',
        stats: { comments: 6, reposts: 12, likes: 112 },
        comments: []
    },
    {
        id: '4', user: mockUsers.user2, time: '1d', content: '',
        poll: {
            question: 'Which outfit for the campus event this Friday?',
            options: [{ text: 'Casual Jeans & Tee', votes: 102 }, { text: 'Smart Casual Dress', votes: 88 }]
        },
        stats: { comments: 4, reposts: 1, likes: 190 },
        comments: []
    },
    {
        id: '5', user: mockUsers.user4, time: '1d',
        content: 'Reminder: The #Calculus101 CAT is scheduled for this Wednesday at 10 AM in Lecture Hall 3. Good luck with your preparations!',
        stats: { comments: 0, reposts: 55, likes: 150 },
        comments: []
    },
    {
        id: '6', user: mockUsers.user1, time: '2d',
        content: 'Selling my slightly used "Advanced Engineering Mathematics" textbook. DM if interested. Check it out on the Smart Market! #Textbooks #ForSale',
        stats: { comments: 3, reposts: 4, likes: 25 },
        comments: []
    },
];

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

const Poll: React.FC<{ post: CampusPulsePost; onVote: (postId: string, optionIndex: number) => void }> = ({ post, onVote }) => {
    if (!post.poll) return null;
    const totalVotes = post.poll.options.reduce((sum, option) => sum + option.votes, 0);
    const hasVoted = post.poll.voted !== undefined;

    return (
        <div className="space-y-2 mt-3 border border-brand-gray-200 rounded-xl p-3">
            <p className="font-semibold text-brand-gray-800">{post.poll.question}</p>
            {post.poll.options.map((option, index) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                    <button 
                        key={index} 
                        onClick={() => !hasVoted && onVote(post.id, index)}
                        disabled={hasVoted}
                        className={`relative w-full text-left bg-brand-gray-100 rounded-full h-8 overflow-hidden transition-all duration-200 ${hasVoted ? 'cursor-not-allowed' : 'hover:ring-2 hover:ring-brand-blue'}`}
                    >
                        <div 
                            className={`absolute top-0 left-0 h-full bg-brand-blue-light rounded-full transition-all duration-300 ${post.poll?.voted === index ? 'ring-2 ring-brand-blue ring-inset' : ''}`}
                            style={{ width: hasVoted ? `${percentage}%` : `0%` }}
                        />
                        <div className="absolute inset-0 flex justify-between items-center px-3 text-sm">
                            <span className="font-medium text-brand-blue-dark">{option.text}</span>
                            {hasVoted && <span className="text-xs font-bold text-brand-blue-dark">{percentage}%</span>}
                        </div>
                    </button>
                )
            })}
        </div>
    );
}

const PostCard: React.FC<{ 
    post: CampusPulsePost; 
    onAction: (postId: string, action: 'like' | 'repost' | 'comment' | 'share', data?: any) => void;
    onVote: (postId: string, optionIndex: number) => void;
}> = ({ post, onAction, onVote }) => (
    <div className="bg-white p-4 border-b border-brand-gray-100 flex space-x-3">
        <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="w-full">
            <div className="flex items-center space-x-1">
                <p className="font-bold text-brand-gray-800">{post.user.name}</p>
                <p className="text-sm text-brand-gray-500">@{post.user.handle}</p>
                <p className="text-sm text-brand-gray-500">·</p>
                <p className="text-sm text-brand-gray-500">{post.time}</p>
            </div>

            {post.content && <p className="my-1 text-brand-gray-800 whitespace-pre-wrap">{renderContentWithTags(post.content)}</p>}
            
            {post.imageUrl && <img src={post.imageUrl} alt="User post" className="mt-2 rounded-xl w-full h-auto object-cover max-h-80 border border-brand-gray-200" />}

            {post.poll && <Poll post={post} onVote={onVote} />}

            <div className="flex items-center justify-between text-brand-gray-500 mt-3 max-w-sm">
                <button onClick={() => onAction(post.id, 'comment')} className="flex items-center space-x-2 hover:text-brand-blue group">
                    <div className="p-2 group-hover:bg-brand-blue-light rounded-full transition-colors"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>
                    <span className="text-sm">{post.stats.comments}</span>
                </button>
                <button onClick={() => onAction(post.id, 'repost')} className={`flex items-center space-x-2 hover:text-green-500 group ${post.isReposted ? 'text-green-500' : ''}`}>
                    <div className="p-2 group-hover:bg-green-100 rounded-full transition-colors"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></div>
                    <span className="text-sm">{post.stats.reposts}</span>
                </button>
                <button onClick={() => onAction(post.id, 'like')} className={`flex items-center space-x-2 hover:text-red-500 group ${post.isLiked ? 'text-red-500' : ''}`}>
                    <div className="p-2 group-hover:bg-red-100 rounded-full transition-colors"><svg className="h-5 w-5" viewBox="0 0 24 24" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
                    <span className="text-sm">{post.stats.likes}</span>
                </button>
                <button onClick={() => onAction(post.id, 'share')} className="flex items-center space-x-2 hover:text-brand-blue group">
                    <div className="p-2 group-hover:bg-brand-blue-light rounded-full transition-colors"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></div>
                </button>
            </div>
        </div>
    </div>
);

const CampusPulseDashboard: React.FC = () => {
    const [posts, setPosts] = useState<CampusPulsePost[]>(mockPosts);
    const [newPostContent, setNewPostContent] = useState('');
    const [postImage, setPostImage] = useState<string | null>(null);
    const [selectedPostForComments, setSelectedPostForComments] = useState<CampusPulsePost | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreatePost = () => {
        if (newPostContent.trim() === '' && !postImage) return;

        const newPost: CampusPulsePost = {
            id: new Date().toISOString(),
            user: mockUsers.you,
            time: 'Just now',
            content: newPostContent,
            imageUrl: postImage || undefined,
            stats: { comments: 0, reposts: 0, likes: 0 },
            comments: []
        };
        
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setNewPostContent('');
        setPostImage(null);
    };
    
    const handlePostAction = (postId: string, action: 'like' | 'repost' | 'comment' | 'share', data?: any) => {
        if (action === 'comment') {
            const post = posts.find(p => p.id === postId);
            if(post) setSelectedPostForComments(post);
            return;
        }
        if (action === 'share') {
             alert('Share functionality is not implemented yet.');
             return;
        }

        setPosts(currentPosts => 
            currentPosts.map(post => {
                if (post.id === postId) {
                    const newStats = { ...post.stats };
                    let { isLiked, isReposted } = post;
                    
                    if(action === 'like') {
                        isLiked = !isLiked;
                        newStats.likes = isLiked ? newStats.likes + 1 : newStats.likes - 1;
                    }
                    if(action === 'repost') {
                        isReposted = !isReposted;
                        newStats.reposts = isReposted ? newStats.reposts + 1 : newStats.reposts - 1;
                    }

                    return { ...post, stats: newStats, isLiked, isReposted };
                }
                return post;
            })
        );
    };
    
    const handleVote = (postId: string, optionIndex: number) => {
         setPosts(currentPosts => 
            currentPosts.map(post => {
                if (post.id === postId && post.poll && post.poll.voted === undefined) {
                    const newOptions = [...post.poll.options];
                    newOptions[optionIndex].votes += 1;
                    return { ...post, poll: { ...post.poll, options: newOptions, voted: optionIndex } };
                }
                return post;
            })
        );
    }
    
    const handleAddComment = (postId: string, commentText: string) => {
        const newComment: Comment = {
            id: new Date().toISOString(),
            user: mockUsers.you,
            text: commentText,
            time: 'Just now'
        };
        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id === postId) {
                    const updatedPost = { ...post, comments: [...post.comments, newComment] };
                    updatedPost.stats.comments = updatedPost.comments.length;
                    return updatedPost;
                }
                return post;
            })
        );
         setSelectedPostForComments(prev => {
             if (!prev) return null;
             const updatedPost = { ...prev, comments: [...prev.comments, newComment] };
             updatedPost.stats.comments = updatedPost.comments.length;
             return updatedPost;
         });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPostImage(reader.result as string);
            reader.readAsDataURL(file);
        }
         if(event.target) event.target.value = '';
    };

    return (
        <div className="animate-fade-in">
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
             <div className="p-4 border-b border-brand-gray-200">
                <h2 className="text-xl font-bold text-brand-gray-800">Campus Pulse</h2>
             </div>
            {/* Create Post */}
            <div className="bg-white p-4 border-b border-brand-gray-200 flex space-x-3">
                 <img src={mockUsers.you.avatarUrl} alt="Your avatar" className="w-12 h-12 rounded-full" />
                 <div className="w-full">
                    <textarea 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full p-2 text-lg focus:outline-none text-brand-gray-800"
                        rows={2}
                        placeholder="What's happening?!"
                    ></textarea>
                     {postImage && (
                        <div className="relative mt-2">
                            <img src={postImage} alt="Preview" className="rounded-xl w-full h-auto max-h-48 object-cover border border-brand-gray-200" />
                            <button
                                onClick={() => setPostImage(null)}
                                className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                                aria-label="Remove image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}
                     <div className="flex items-center justify-between mt-2 border-t border-brand-gray-100 pt-2">
                        <div className="flex items-center space-x-1 text-brand-blue">
                            <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-brand-blue-light transition-colors" aria-label="Add photo">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </button>
                             <button className="p-2 rounded-full hover:bg-brand-blue-light transition-colors" aria-label="Create poll">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                            </button>
                        </div>
                        <button 
                            onClick={handleCreatePost}
                            disabled={!newPostContent.trim() && !postImage}
                            className="py-2 px-5 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none transition-transform active:scale-95 disabled:bg-sky-300 disabled:cursor-not-allowed">
                            Post
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="bg-white">
                {posts.map(post => <PostCard key={post.id} post={post} onAction={handlePostAction} onVote={handleVote} />)}
            </div>

            {selectedPostForComments && (
                <CommentSection 
                    post={selectedPostForComments} 
                    onClose={() => setSelectedPostForComments(null)}
                    onAddComment={handleAddComment}
                />
            )}
        </div>
    );
};

export default CampusPulseDashboard;