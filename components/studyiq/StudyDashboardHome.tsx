import React, { useState, useEffect } from 'react';
import { StudyIQView, StudyGroup, StudyNote } from '../../types';

interface StudyDashboardHomeProps {
    notes: StudyNote[];
    groups: StudyGroup[];
    onNavigate: (view: StudyIQView, data?: any) => void;
    onJoinGroup: (groupId: string) => void;
}

const StudyDashboardHome: React.FC<StudyDashboardHomeProps> = ({ notes, groups, onNavigate, onJoinGroup }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    
    // Mocked stats, in a real app this would come from a service/props
     const stats = {
        focusTime: '3h 45m',
        streak: 5,
        badges: ['Early Bird', 'Night Owl', 'Focused Finisher']
    };


    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time]);

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
    };

    return (
        <div className="space-y-6">
            {/* AI Plan Card */}
            <div className="bg-brand-emerald-light border-l-4 border-brand-emerald p-5 rounded-r-lg shadow-sm">
                <h3 className="text-lg font-bold text-brand-emerald-dark mb-2">Today's AI Plan</h3>
                <ul className="space-y-1 list-disc list-inside text-sm text-brand-gray-800">
                    <li>Review 'Derivatives' flashcards (Calculus I).</li>
                    <li>Read Chapter 4 of Biology textbook.</li>
                    <li>Take a practice quiz on Python variables.</li>
                </ul>
                 <button onClick={() => onNavigate('ai')} className="mt-3 text-sm font-bold text-brand-emerald-dark hover:underline">
                    Chat with AI Assistant →
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Study Tracker */}
                <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <h3 className="text-lg font-bold text-brand-gray-800">Study Tracker</h3>
                     <p className="text-5xl font-mono font-bold text-brand-gray-800 my-3">{formatTime(time)}</p>
                    <div className="flex justify-center space-x-3">
                         <button onClick={() => setIsActive(!isActive)} className={`w-24 py-2 rounded-lg font-semibold transition-transform active:scale-95 ${isActive ? 'bg-red-100 text-red-700' : 'bg-brand-emerald-light text-brand-emerald-dark'}`}>
                            {isActive ? 'Pause' : 'Start'}
                        </button>
                         <button onClick={() => { setTime(0); setIsActive(false); }} className="w-24 py-2 bg-brand-gray-100 text-brand-gray-600 rounded-lg font-semibold transition-transform active:scale-95">
                            Reset
                        </button>
                    </div>
                    <div className="mt-4 flex justify-around items-center text-center">
                        <div>
                            <p className="text-2xl font-bold">{stats.streak} 🔥</p>
                            <p className="text-xs text-brand-gray-500">Day Streak</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{stats.focusTime}</p>
                            <p className="text-xs text-brand-gray-500">Total Focus</p>
                        </div>
                    </div>
                </div>

                {/* Recent Notes */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Recent Notes</h3>
                    <div className="space-y-2">
                        {notes.slice(0, 3).map(note => (
                            <div key={note.id} onClick={() => onNavigate('noteEditor', note)} className="p-3 bg-brand-gray-50 rounded-lg cursor-pointer hover:bg-brand-gray-100">
                                <p className="font-semibold text-brand-gray-800 truncate">{note.title}</p>
                                <p className="text-xs text-brand-gray-500">{note.folder} • {note.lastEdited}</p>
                            </div>
                        ))}
                    </div>
                     <button onClick={() => onNavigate('notes')} className="mt-3 text-sm font-bold text-brand-emerald-dark hover:underline w-full text-left">
                        View All Notes →
                    </button>
                </div>
            </div>

            {/* Peer Hub */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Peer Hub</h3>
                 <div className="space-y-3">
                    {groups.slice(0, 3).map((group: StudyGroup) => (
                        <div key={group.id} className="flex items-center space-x-3 p-2 bg-brand-gray-50 rounded-lg">
                            <img src={group.avatarUrl} alt={group.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-grow">
                                <p className="font-semibold text-brand-gray-800">{group.name}</p>
                                <p className="text-xs text-brand-gray-500">{group.subject}</p>
                            </div>
                            <div className="text-right">
                                 <p className="text-sm font-medium">{group.members}/{group.capacity}</p>
                                 <button 
                                     onClick={() => onJoinGroup(group.id)}
                                     disabled={group.isJoined || group.members >= group.capacity}
                                     className="text-xs font-bold text-brand-emerald-dark disabled:text-brand-gray-400 disabled:cursor-not-allowed hover:underline"
                                >
                                     {group.isJoined ? 'Joined' : 'Join'}
                                 </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={() => onNavigate('peer')} className="mt-3 text-sm font-bold text-brand-emerald-dark hover:underline w-full text-left">
                    Discover More Groups →
                </button>
            </div>

            <button onClick={() => onNavigate('noteEditor')} className="fixed bottom-24 right-6 bg-brand-emerald text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-3xl font-light hover:bg-brand-emerald-dark transition-transform active:scale-95 z-20">
                +
            </button>
        </div>
    );
};

export default StudyDashboardHome;