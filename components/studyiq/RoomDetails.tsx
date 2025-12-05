import React, { useState, useEffect } from 'react';
import { StudyGroup, SharedFile } from '../../types';

interface RoomDetailsProps {
    group: StudyGroup;
    onClose: () => void;
    onSummarizeFile: (groupId: string, file: SharedFile) => void;
}

const PomodoroTimer: React.FC = () => {
    const [time, setTime] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
             if (interval) clearInterval(interval);
             alert("Pomodoro session finished! Time for a short break.");
             setIsActive(false);
             setTime(25 * 60);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time]);
    
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return [minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
    };

    return (
        <div className="bg-brand-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-bold text-brand-gray-800">Group Pomodoro</h4>
            <p className="text-4xl font-mono font-bold text-brand-gray-800 my-2">{formatTime(time)}</p>
            <div className="flex justify-center space-x-2">
                <button onClick={() => setIsActive(!isActive)} className={`w-20 py-1.5 rounded-lg text-sm font-semibold transition-transform active:scale-95 ${isActive ? 'bg-red-100 text-red-700' : 'bg-brand-emerald-light text-brand-emerald-dark'}`}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => { setTime(25 * 60); setIsActive(false); }} className="w-20 py-1.5 bg-brand-gray-200 text-brand-gray-600 rounded-lg text-sm font-semibold transition-transform active:scale-95">
                    Reset
                </button>
            </div>
        </div>
    );
};


const RoomDetails: React.FC<RoomDetailsProps> = ({ group, onClose, onSummarizeFile }) => {

    const handleSummarize = (file: SharedFile) => {
        onSummarizeFile(group.id, file);
        onClose(); // Close details panel to see summary in chat
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end animate-fade-in" onClick={onClose}>
            <div className="bg-brand-gray-50 w-full max-w-sm h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                 <div className="p-4 border-b border-brand-gray-200 flex-shrink-0 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-brand-gray-800">Room Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-gray-100">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto space-y-6">
                    {/* Members */}
                    <div>
                        <h3 className="font-bold text-brand-gray-700 mb-2">Members ({group.members})</h3>
                        <div className="space-y-2">
                            {/* Mock members */}
                             <div className="flex items-center space-x-2">
                                <img src="https://picsum.photos/id/237/100/100" className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-medium text-brand-gray-800">Alex (You)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src="https://picsum.photos/seed/jane/100/100" className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-medium text-brand-gray-800">Jane</span>
                            </div>
                        </div>
                    </div>
                    
                     {/* Files */}
                    <div>
                        <h3 className="font-bold text-brand-gray-700 mb-2">Shared Files ({group.sharedFiles.length})</h3>
                        {group.sharedFiles.length > 0 ? (
                             <div className="space-y-2">
                                {group.sharedFiles.map(file => (
                                    <div key={file.id} className="bg-white p-3 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm text-brand-gray-800">{file.name}</p>
                                            <p className="text-xs text-brand-gray-500">{file.type} • {file.size}</p>
                                        </div>
                                        <button onClick={() => handleSummarize(file)} className="text-xs font-bold text-brand-emerald-dark hover:underline">Summarize (AI)</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-brand-gray-500">No files shared yet.</p>
                        )}
                    </div>

                    {/* Pomodoro Timer */}
                    <div>
                         <PomodoroTimer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;