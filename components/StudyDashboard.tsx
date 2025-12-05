import React from 'react';

const StudyDashboard: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const timetable = {
        Mon: [{ time: '10-12', subject: 'Calculus' }],
        Tue: [{ time: '2-4', subject: 'Physics' }],
        Wed: [{ time: '9-11', subject: 'Calculus' }, { time: '1-3', subject: 'Lab' }],
        Thu: [],
        Fri: [{ time: '11-1', subject: 'Physics' }],
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">AI Study Companion</h2>
                <p className="text-brand-gray-600">Organize your academic life effortlessly.</p>
            </div>

            {/* Timetable */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-4">My Weekly Timetable</h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                    {days.map(day => (
                        <div key={day}>
                            <p className="font-semibold text-brand-gray-600 mb-2">{day}</p>
                            <div className="space-y-2">
                                {(timetable[day] as any[]).length > 0 ? (
                                    (timetable[day] as any[]).map(slot => (
                                        <div key={slot.subject} className="bg-brand-blue-light text-brand-blue-dark p-2 rounded-lg text-xs">
                                            <p className="font-bold">{slot.subject}</p>
                                            <p>{slot.time}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-12 flex items-center justify-center">
                                        <p className="text-gray-400 text-xs">-</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full text-sm text-brand-blue font-semibold hover:underline">
                    Upload or Edit Timetable
                </button>
            </div>

            {/* AI Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <h3 className="text-lg font-bold text-brand-gray-800">Flashcard Generator</h3>
                    <p className="text-sm text-brand-gray-600 my-2">Turn your notes into smart flashcards instantly.</p>
                    <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none">
                        Upload Notes
                    </button>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <h3 className="text-lg font-bold text-brand-gray-800">Smart Reminders</h3>
                    <p className="text-sm text-brand-gray-600 my-2">Get reminders for CATs, exams, and assignments.</p>
                     <button className="w-full py-2 px-4 border border-brand-blue rounded-md shadow-sm text-sm font-medium text-brand-blue bg-white hover:bg-brand-gray-50 focus:outline-none">
                        Set a Reminder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyDashboard;