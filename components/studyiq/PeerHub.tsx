import React from 'react';
import { StudyIQView, StudyGroup } from '../../types';

interface PeerHubProps {
    groups: StudyGroup[];
    onNavigate: (view: StudyIQView, data?: any) => void;
    onJoinGroup: (groupId: string) => void;
}

const PeerHub: React.FC<PeerHubProps> = ({ groups, onNavigate, onJoinGroup }) => {
    return (
        <div className="space-y-6">
             <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Discover Study Groups</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groups.map(group => (
                        <div key={group.id} className="p-4 bg-brand-gray-50 rounded-lg flex flex-col text-center items-center">
                            <img src={group.avatarUrl} alt={group.name} className="w-16 h-16 rounded-full" />
                            <p className="font-bold text-brand-gray-800 mt-2">{group.name}</p>
                            <p className="text-xs font-semibold bg-brand-emerald-light text-brand-emerald-dark px-2 py-0.5 rounded-full mt-1">{group.subject}</p>
                            <p className="text-sm text-brand-gray-500 mt-2">{group.members}/{group.capacity} members</p>
                            {group.isJoined ? (
                                <button 
                                    onClick={() => onNavigate('studyRoom', group)}
                                    className="w-full mt-3 py-1.5 rounded-lg text-sm font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-all duration-200 active:scale-95"
                                >
                                    Enter Room
                                </button>
                            ) : (
                                <button 
                                    onClick={() => onJoinGroup(group.id)}
                                    className={`w-full mt-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 ${
                                        group.members >= group.capacity 
                                            ? 'bg-brand-gray-200 text-brand-gray-500 cursor-not-allowed' 
                                            : 'bg-brand-emerald-light text-brand-emerald-dark hover:bg-emerald-200'
                                    }`}
                                    disabled={group.members >= group.capacity}
                                >
                                    {group.members >= group.capacity ? 'Full' : 'Join Group'}
                                </button>
                            )}
                        </div>
                    ))}
                    <div onClick={() => alert('Creating new groups is coming soon!')} className="p-4 border-2 border-dashed border-brand-gray-200 rounded-lg flex flex-col text-center items-center justify-center cursor-pointer hover:border-brand-emerald hover:text-brand-emerald-dark transition-colors">
                        <span className="text-3xl font-light text-brand-gray-400">+</span>
                         <p className="text-sm font-semibold mt-1">Create a New Group</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeerHub;