import React from 'react';
import { StudyIQView } from '../../types';

interface StudyIQNavProps {
    activeView: StudyIQView;
    onNavigate: (view: StudyIQView) => void;
}

const navItems: { view: StudyIQView, label: string }[] = [
    { view: 'home', label: 'Dashboard' },
    { view: 'notes', label: 'Notes Hub' },
    { view: 'ai', label: 'AI Assistant' },
    { view: 'peer', label: 'Peer Hub' },
];

const StudyIQNav: React.FC<StudyIQNavProps> = ({ activeView, onNavigate }) => {
    return (
         <div className="bg-white/80 backdrop-blur-sm sticky top-[68px] z-10 rounded-xl shadow-sm p-2">
            <div className="flex justify-around items-center">
                {navItems.map(item => (
                    <button
                        key={item.view}
                        onClick={() => onNavigate(item.view)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 w-full ${
                            activeView === item.view 
                                ? 'bg-brand-emerald text-white shadow' 
                                : 'text-brand-gray-600 hover:bg-brand-gray-100 active:bg-brand-gray-200'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudyIQNav;