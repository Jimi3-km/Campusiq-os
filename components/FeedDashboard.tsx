
import React from 'react';

const PostCard: React.FC<{ user: string; time: string; content: string; likes: number; comments: number; }> = ({ user, time, content, likes, comments }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-brand-gray-800">{user}</p>
                <p className="text-xs text-brand-gray-400">{time}</p>
            </div>
             <div className="text-xs font-semibold bg-brand-blue-light text-brand-blue-dark px-2 py-1 rounded-full">
                Sentiment: Positive
            </div>
        </div>
        <p className="my-3 text-brand-gray-800">{content}</p>
        <div className="flex items-center space-x-4 text-sm text-brand-gray-600">
            <span>👍 {likes}</span>
            <span>💬 {comments}</span>
        </div>
    </div>
);

const FeedDashboard: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">Campus Pulse</h2>
                <p className="text-brand-gray-600">What's the word on campus?</p>
            </div>

            {/* Create Post */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <textarea 
                    className="w-full p-2 border border-brand-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-gray-800"
                    rows={2}
                    placeholder="What's on your mind? (Posts are anonymous)"
                ></textarea>
                <button className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none">
                    Post Anonymously
                </button>
            </div>
            
            {/* AI Summary Card */}
            <div className="bg-brand-blue-light border-l-4 border-brand-blue rounded-r-lg p-4 shadow-sm">
                <h3 className="text-sm font-bold text-brand-blue-dark">AI Trend Summary</h3>
                <p className="text-sm text-brand-gray-800 mt-1">
                    Students are mostly discussing upcoming exams and the quality of cafeteria food. Sentiment is mixed but leaning positive.
                </p>
            </div>

            {/* Posts */}
            <div className="space-y-4">
                <PostCard 
                    user="Anonymous Lion"
                    time="2 hours ago"
                    content="Is anyone else finding the new library hours super inconvenient? I can't get any late-night studying done."
                    likes={42}
                    comments={15}
                />
                <PostCard 
                    user="Anonymous Gazelle"
                    time="5 hours ago"
                    content="Shoutout to the cafeteria for the improved ugali today. It was actually good!"
                    likes={89}
                    comments={22}
                />
            </div>

        </div>
    );
};

export default FeedDashboard;