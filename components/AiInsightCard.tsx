
import React from 'react';
import { type AiInsight } from '../types';

interface AiInsightCardProps {
    insight: AiInsight | null;
    isLoading: boolean;
}

const AiInsightCard: React.FC<AiInsightCardProps> = ({ insight, isLoading }) => {
    return (
        <div className="bg-brand-blue-light border-l-4 border-brand-blue rounded-r-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-brand-blue-dark">CampusGPT Financial Insight</h3>
                    {isLoading ? (
                        <div className="space-y-2 mt-1 animate-pulse">
                           <div className="h-4 bg-sky-200 rounded w-3/4"></div>
                           <div className="h-4 bg-sky-200 rounded w-full"></div>
                        </div>
                    ) : (
                        <>
                           <p className="text-sm text-brand-gray-800 mt-1">{insight?.summary}</p>
                           <p className="text-sm text-brand-gray-600 font-medium mt-1 italic">✨ Tip: {insight?.tip}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AiInsightCard;
