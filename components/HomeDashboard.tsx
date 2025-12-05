import React from 'react';

const HomeDashboard: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">Good Morning, Alex!</h2>
                <p className="text-brand-gray-600">Here’s your daily snapshot at CampusIQ.</p>
            </div>

            {/* Today's Schedule Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Today's Schedule</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-3 bg-brand-blue-light rounded-lg">
                        <div className="text-center w-16">
                            <p className="font-bold text-brand-blue-dark">10:00</p>
                            <p className="text-xs text-brand-blue-dark">AM</p>
                        </div>
                        <div className="border-l-2 border-brand-blue pl-4">
                            <p className="font-semibold text-brand-gray-800">Advanced Calculus</p>
                            <p className="text-sm text-brand-gray-600">Lecture Hall 3</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                        <div className="text-center w-16">
                            <p className="font-bold text-gray-700">02:00</p>
                            <p className="text-xs text-gray-700">PM</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-4">
                            <p className="font-semibold text-brand-gray-800">Group Study Session</p>
                            <p className="text-sm text-brand-gray-600">Library, Floor 2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Smart Market Deals */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Smart Market Deals</h3>
                    <p className="text-sm text-brand-gray-600">Calculus Textbook</p>
                    <p className="text-3xl font-bold text-green-600">KSH 1,500</p>
                    <p className="text-xs text-brand-gray-500 mt-2">Check out the latest listings in the Market tab.</p>
                </div>

                {/* Campus Pulse */}
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Campus Pulse</h3>
                    <p className="text-sm text-brand-gray-600">Trending Topic:</p>
                    <p className="text-lg font-semibold text-brand-blue mt-1">#ExamProcrastination</p>
                     <p className="text-xs text-brand-gray-500 mt-2">Join the conversation in the Pulse tab.</p>
                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;