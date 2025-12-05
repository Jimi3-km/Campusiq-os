
import React, { useState, useEffect, useRef } from 'react';
import { CreateIQUser, CreateIQStory } from '../../types';

interface StoryViewerProps {
    user: CreateIQUser;
    stories: CreateIQStory[];
    onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ user, stories, onClose }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    // FIX: Replaced NodeJS.Timeout with browser-compatible types and initialized useRef with null.
    // This fixes "Cannot find namespace 'NodeJS'" and "Expected 1 arguments, but got 0" errors.
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentStory = stories[currentStoryIndex];

    const goToNextStory = () => {
        setCurrentStoryIndex(prev => {
            if (prev < stories.length - 1) {
                return prev + 1;
            }
            onClose(); // Close if it's the last story
            return prev;
        });
    };

    const goToPrevStory = () => {
        setCurrentStoryIndex(prev => Math.max(0, prev - 1));
    };

    useEffect(() => {
        setProgress(0); // Reset progress on story change

        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);

        timerRef.current = setTimeout(goToNextStory, currentStory.duration * 1000);

        const startTime = Date.now();
        progressRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = (elapsedTime / (currentStory.duration * 1000)) * 100;
            if (newProgress <= 100) {
                setProgress(newProgress);
            } else {
                // FIX: Added a check for null before clearing interval to satisfy TypeScript with the new ref type.
                if (progressRef.current) {
                    clearInterval(progressRef.current);
                }
            }
        }, 30);

        return () => {
            // FIX: Added checks for null before clearing timeout/interval to satisfy TypeScript with the new ref type.
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (progressRef.current) {
                clearInterval(progressRef.current);
            }
        };
    }, [currentStoryIndex, stories]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full max-w-sm h-full max-h-[95vh] bg-neutral-900 rounded-lg overflow-hidden">
                {/* Story Image */}
                <img src={currentStory.url} alt={`Story by ${user.handle}`} className="w-full h-full object-cover" />

                {/* Progress Bars */}
                <div className="absolute top-2 left-2 right-2 flex space-x-1">
                    {stories.map((_, index) => (
                        <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-[30ms] linear"
                                style={{ width: `${index < currentStoryIndex ? 100 : (index === currentStoryIndex ? progress : 0)}%` }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-5 left-4 right-4 flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                         <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full"/>
                         <span className="text-white font-bold text-sm">{user.handle}</span>
                     </div>
                    <button onClick={onClose} className="text-white text-2xl">&times;</button>
                </div>
                
                {/* Navigation */}
                <div className="absolute inset-0 flex">
                    <div className="w-1/3 h-full" onClick={goToPrevStory}></div>
                    <div className="w-2/3 h-full" onClick={goToNextStory}></div>
                </div>

            </div>
        </div>
    );
};

export default StoryViewer;
