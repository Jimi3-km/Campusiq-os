
import React, { useState } from 'react';
import { users, posts as initialPosts, stories, dms as initialDms } from '../services/createiqMockData';
import { type CreateIQPost, type CreateIQUser, type DirectMessage, type CreateIQComment } from '../types';

import CreateIQFeed from './createiq/CreateIQFeed';
import StoryViewer from './createiq/StoryViewer';
import DirectMessages from './createiq/DirectMessages';
import ChatView from './createiq/ChatView';
import PostEditor from './createiq/PostEditor';
import PostComments from './createiq/PostComments';


type CreateIQView = 'feed' | 'story' | 'dms' | 'chat' | 'editor' | 'comments';

const CreateIQDashboard: React.FC = () => {
    const [view, setView] = useState<CreateIQView>('feed');
    const [posts, setPosts] = useState<CreateIQPost[]>(initialPosts);
    const [dms, setDms] = useState<DirectMessage[]>(initialDms);

    const [activeStoryUser, setActiveStoryUser] = useState<CreateIQUser | null>(null);
    const [activeChat, setActiveChat] = useState<DirectMessage | null>(null);
    const [activePostForComments, setActivePostForComments] = useState<CreateIQPost | null>(null);
    const [imageToEdit, setImageToEdit] = useState<string | null>(null);
    
    const currentUser = users.find(u => u.handle === 'alex_doe')!;

    // --- Interaction Handlers ---
    const handleLike = (postId: string) => {
        setPosts(currentPosts => 
            currentPosts.map(p => {
                if (p.id === postId) {
                    const isLiked = !p.isLiked;
                    return {
                        ...p,
                        isLiked,
                        stats: { ...p.stats, likes: isLiked ? p.stats.likes + 1 : p.stats.likes - 1 }
                    };
                }
                return p;
            })
        );
    };
    
    const handleSave = (postId: string) => {
        setPosts(currentPosts => currentPosts.map(p => p.id === postId ? { ...p, isSaved: !p.isSaved } : p));
    };
    
    const handleAddComment = (postId: string, commentText: string) => {
        const newComment: CreateIQComment = {
            id: new Date().toISOString(),
            user: {
                handle: currentUser.handle,
                name: currentUser.name,
                avatarUrl: currentUser.avatarUrl
            },
            text: commentText,
        };
        
        const updatePost = (post: CreateIQPost) => {
             const updatedComments = [...post.comments, newComment];
             return {
                ...post,
                comments: updatedComments,
                stats: { ...post.stats, comments: updatedComments.length }
             };
        };

        setPosts(posts.map(p => p.id === postId ? updatePost(p) : p));
        if (activePostForComments && activePostForComments.id === postId) {
            setActivePostForComments(p => p ? updatePost(p) : null);
        }
    };

    const handleSendMessage = (dmId: string, messageText: string) => {
        const newMessage = {
            id: new Date().toISOString(),
            text: messageText,
            senderId: currentUser.id,
            timestamp: 'Just now'
        };
        
        const updateDm = (dm: DirectMessage) => {
             return {
                ...dm,
                messages: [...dm.messages, newMessage],
                lastMessage: messageText,
                time: 'Just now'
             };
        };
        
        setDms(dms.map(dm => dm.id === dmId ? updateDm(dm) : dm));
        if (activeChat && activeChat.id === dmId) {
            setActiveChat(dm => dm ? updateDm(dm) : null);
        }
    };

    const handleCreatePost = (caption: string, imageUrl: string) => {
        const newPost: CreateIQPost = {
            id: new Date().toISOString(),
            user: currentUser,
            imageUrls: [imageUrl],
            caption: caption,
            time: 'Just now',
            stats: { likes: 0, comments: 0, views: 0 },
            comments: [],
            isLiked: false,
            isSaved: false
        };
        setPosts([newPost, ...posts]);
        setImageToEdit(null);
        setView('feed');
    };


    // --- View Navigation ---
    const handleNavigate = (newView: CreateIQView, data?: any) => {
        switch (newView) {
            case 'story':
                const user = users.find(u => u.id === data);
                if (user) {
                    setActiveStoryUser(user);
                    setView('story');
                }
                break;
            case 'chat':
                const chat = dms.find(d => d.id === data);
                if (chat) {
                    setActiveChat(chat);
                    setView('chat');
                }
                break;
            case 'comments':
                const post = posts.find(p => p.id === data);
                if (post) {
                    setActivePostForComments(post);
                    setView('comments');
                }
                break;
            case 'editor':
                // For simplicity, we'll use a placeholder image. In a real app, this would come from a file upload.
                setImageToEdit('https://picsum.photos/seed/newpost/1080/1080');
                setView('editor');
                break;
            case 'dms':
                setView('dms');
                break;
            case 'feed':
            default:
                setActiveStoryUser(null);
                setActiveChat(null);
                setImageToEdit(null);
                setActivePostForComments(null);
                setView('feed');
        }
    };
    
    const renderView = () => {
        switch (view) {
            case 'story':
                return activeStoryUser && stories[activeStoryUser.id] && (
                    <StoryViewer user={activeStoryUser} stories={stories[activeStoryUser.id]} onClose={() => handleNavigate('feed')} />
                );
            case 'dms':
                return <DirectMessages dms={dms} onBack={() => handleNavigate('feed')} onChatSelect={(dmId) => handleNavigate('chat', dmId)} />;
            case 'chat':
                return activeChat && <ChatView chat={activeChat} currentUser={currentUser} onBack={() => handleNavigate('dms')} onSendMessage={handleSendMessage} />;
            case 'editor':
                 return imageToEdit && <PostEditor imageUrl={imageToEdit} onPost={handleCreatePost} onCancel={() => handleNavigate('feed')} />;
            case 'comments':
                 return activePostForComments && <PostComments post={activePostForComments} onBack={() => handleNavigate('feed')} onAddComment={handleAddComment} currentUser={currentUser} />;
            default:
                return (
                    <CreateIQFeed
                        users={users}
                        posts={posts}
                        onLike={handleLike}
                        onSave={handleSave}
                        onOpenStory={(userId) => handleNavigate('story', userId)}
                        onNavigateToDMs={() => handleNavigate('dms')}
                        onCommentClick={(postId) => handleNavigate('comments', postId)}
                        onPostCreateClick={() => handleNavigate('editor')}
                    />
                );
        }
    };

    return <div className="animate-fade-in">{renderView()}</div>;
};

export default CreateIQDashboard;