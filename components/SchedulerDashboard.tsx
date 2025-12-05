
import React, { useState, useMemo, useRef } from 'react';
import { type SchedulerEvent } from '../types';

const initialEvents: { [key: string]: SchedulerEvent[] } = {
    Mon: [{ id: '1', title: 'Calculus', time: '10-12pm', type: 'class', completed: false }],
    Tue: [{ id: '2', title: 'Physics', time: '2-4pm', type: 'class', completed: false }],
    Wed: [
        { id: '3', title: 'Calculus CAT', time: '9am', type: 'exam', completed: false },
        { id: '4', title: 'Submit Lab Report', time: 'by 5pm', type: 'assignment', completed: true },
        { id: '6', title: 'Group Study', time: '7pm', type: 'class', completed: false },
    ],
    Thu: [],
    Fri: [{ id: '5', title: 'Physics', time: '11-1pm', type: 'class', completed: false }],
};

const motivationalQuotes = [
    "The secret to getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
];

const EventIcon: React.FC<{type: SchedulerEvent['type']}> = ({ type }) => {
    switch (type) {
        case 'class': return <span className="text-lg">🎓</span>;
        case 'exam': return <span className="text-lg">❗</span>;
        case 'assignment': return <span className="text-lg">📝</span>;
        default: return null;
    }
}

const ProgressCircle: React.FC<{ progress: number }> = ({ progress }) => {
    const strokeWidth = 8;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-brand-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-brand-blue"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-brand-blue-dark">
                {Math.round(progress)}%
            </span>
        </div>
    );
};


const SchedulerDashboard: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const today = 'Wed'; // Mock today for demonstration
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [todaysTasks, setTodaysTasks] = useState<SchedulerEvent[]>(initialEvents[today]);

    const handleToggleTask = (id: string) => {
        setTodaysTasks(tasks => 
            tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            alert(`File "${file.name}" selected. Ready for upload!`);
            // In a real app, you would handle the file upload here.
        }
    };

    const progress = useMemo(() => {
        const completedCount = todaysTasks.filter(t => t.completed).length;
        return todaysTasks.length > 0 ? (completedCount / todaysTasks.length) * 100 : 0;
    }, [todaysTasks]);

    const dailyQuote = useMemo(() => motivationalQuotes[new Date().getDate() % motivationalQuotes.length], []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">Smart Scheduler</h2>
                <p className="text-brand-gray-600">Your academic week at a glance.</p>
            </div>

            {/* Weekly Timetable */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-4">Weekly View</h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                    {days.map(day => (
                        <div key={day} className={`p-2 rounded-lg ${day === today ? 'bg-brand-blue-light' : ''}`}>
                            <p className="font-semibold text-brand-gray-600 mb-2 text-sm">{day}</p>
                            <div className="space-y-1">
                                {initialEvents[day].length > 0 ? (
                                    initialEvents[day].map(event => (
                                        <div key={event.id} className="bg-sky-100 text-sky-800 p-1.5 rounded-md text-xs">
                                            <p className="font-bold truncate">{event.title}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-8"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Today's Agenda + Progress */}
                <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center space-x-4">
                        <ProgressCircle progress={progress} />
                        <div>
                            <h3 className="text-lg font-bold text-brand-gray-800">Today's Agenda</h3>
                            <p className="text-sm text-brand-gray-600">Let's get it done!</p>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {todaysTasks.map(event => (
                             <li key={event.id} onClick={() => handleToggleTask(event.id)} className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${event.completed ? 'bg-green-50' : 'bg-brand-gray-50'}`}>
                                <input type="checkbox" checked={event.completed} readOnly className="form-checkbox h-5 w-5 text-brand-blue rounded-full focus:ring-0"/>
                                <div className={event.completed ? 'text-gray-500 line-through' : ''}>
                                    <p className={`font-semibold ${event.completed ? '' : 'text-brand-gray-800'}`}>{event.title}</p>
                                    <p className="text-sm">{event.time}</p>
                                </div>
                                <div className="ml-auto">
                                     <EventIcon type={event.type} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* AI Focus & Countdown */}
                <div className="space-y-6">
                    <div className="bg-brand-blue-light border-l-4 border-brand-blue p-5 rounded-r-lg shadow-sm">
                        <h3 className="text-lg font-bold text-brand-blue-dark mb-2">Today's Focus (AI)</h3>
                         <ul className="space-y-1 list-disc list-inside text-sm text-brand-gray-800">
                            <li>Priority 1: Prepare for Calculus CAT.</li>
                            <li>Priority 2: Finalize and submit Lab Report.</li>
                            <li>Review notes from Monday's lecture.</li>
                        </ul>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                        <h3 className="text-lg font-bold text-brand-gray-800">Exam Countdown</h3>
                        <p className="text-4xl font-bold text-red-500 my-2">12</p>
                        <p className="text-sm text-brand-gray-600">days until Final Physics Exam</p>
                    </div>
                </div>
            </div>
            
             {/* Flashcard & Motivation Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <h3 className="text-lg font-bold text-brand-gray-800">Flashcard Generator</h3>
                    <p className="text-sm text-brand-gray-600 my-2">Upload your notes to instantly create study flashcards.</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.md,.pdf,.docx" />
                    <button 
                        onClick={handleUploadClick}
                        className="w-full py-2 px-4 border border-brand-blue rounded-md shadow-sm text-sm font-medium text-brand-blue bg-white hover:bg-brand-gray-50 focus:outline-none transition-transform active:scale-95">
                        Upload Notes
                    </button>
                </div>
                <div className="bg-white flex flex-col justify-center items-center text-center p-5 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-brand-gray-800">Daily Motivation</h3>
                    <p className="text-sm text-brand-gray-600 italic mt-2">"{dailyQuote}"</p>
                </div>
            </div>
        </div>
    );
};

export default SchedulerDashboard;