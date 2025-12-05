
import React from 'react';
import { PerformanceCoachInsight } from '../../types';

interface AiCoachCardProps {
    insight: PerformanceCoachInsight | null;
    isLoading: boolean;
    onGenerate: () => void;
}

const AiCoachCard: React.FC<AiCoachCardProps> = ({ insight, isLoading, onGenerate }) => {
    if (!insight && !isLoading) {
        return (
            <div className="bg-brand-blue-light border border-brand-blue rounded-xl p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold text-brand-blue-dark mb-2">CampusIQ Performance Coach</h3>
                <p className="text-brand-gray-600 mb-4 text-sm">Get an AI-powered analysis of your grades, strengths, and areas for improvement.</p>
                <button 
                    onClick={onGenerate}
                    className="bg-brand-blue text-white px-4 py-2 rounded-full font-bold shadow-md hover:bg-brand-blue-dark transition-transform active:scale-95"
                >
                    Analyze My Results
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
             {/* Decorative Background Icon */}
             <div className="absolute top-0 right-0 -mt-2 -mr-2 opacity-10">
                <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
             </div>

            <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🤖</span>
                    <h3 className="text-lg font-bold text-indigo-900">Performance Coach</h3>
                </div>

                {isLoading ? (
                     <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                        <div className="h-4 bg-indigo-200 rounded w-full"></div>
                        <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-brand-gray-700 leading-relaxed">{insight?.summary}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xs font-bold uppercase text-green-700 tracking-wide mb-2">💪 Strengths</h4>
                                <ul className="space-y-1">
                                    {insight?.strengths.map((str, i) => (
                                        <li key={i} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded border border-green-100">{str}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase text-red-700 tracking-wide mb-2">🚧 Weaknesses</h4>
                                <ul className="space-y-1">
                                    {insight?.weaknesses.map((weak, i) => (
                                        <li key={i} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded border border-red-100">{weak}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-indigo-100/50 rounded-lg p-3 border border-indigo-100">
                             <h4 className="text-xs font-bold uppercase text-indigo-800 tracking-wide mb-2">🚀 Action Plan</h4>
                             <ul className="list-disc list-inside space-y-1">
                                {insight?.actionableTips.map((tip, i) => (
                                    <li key={i} className="text-xs text-indigo-900">{tip}</li>
                                ))}
                             </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiCoachCard;
