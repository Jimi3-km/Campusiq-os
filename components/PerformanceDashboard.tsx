
import React, { useState, useEffect } from 'react';
import { AcademicProfile, PerformanceCoachInsight } from '../types';
import { getAcademicProfile } from '../services/resultsService';
import { getPerformanceCoachInsight } from '../services/geminiService';
import ResultsTable from './performance/ResultsTable';
import PerformanceChart from './performance/PerformanceChart';
import AiCoachCard from './performance/AiCoachCard';

const PerformanceDashboard: React.FC = () => {
    const [profile, setProfile] = useState<AcademicProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>('');
    const [coachInsight, setCoachInsight] = useState<PerformanceCoachInsight | null>(null);
    const [isCoachLoading, setIsCoachLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getAcademicProfile();
                setProfile(data);
                // Default to the most recent semester
                if (data.semesters.length > 0) {
                    setSelectedSemesterId(data.semesters[data.semesters.length - 1].id);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleCoachAnalysis = async () => {
        if (!profile) return;
        setIsCoachLoading(true);
        try {
            const insight = await getPerformanceCoachInsight(profile);
            setCoachInsight(insight);
        } catch (e) {
            console.error(e);
        } finally {
            setIsCoachLoading(false);
        }
    };

    if (isLoading || !profile) {
        return <div className="p-8 text-center text-brand-gray-500">Loading academic data...</div>;
    }

    const currentSemester = profile.semesters.find(s => s.id === selectedSemesterId);

    return (
        <div className="space-y-6 animate-fade-in">
             {/* Header Card */}
             <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">{profile.studentName}</h2>
                        <p className="text-brand-blue-light text-sm">{profile.program}</p>
                        <p className="text-brand-blue-light text-xs mt-1">Year {profile.year} Student</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-brand-blue-light uppercase tracking-wider">Current GPA</p>
                        <p className="text-4xl font-bold">{profile.currentGPA}</p>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20 flex justify-between text-sm">
                    <div>
                        <span className="opacity-75">Credits Earned: </span>
                        <span className="font-bold">{profile.creditsEarned}</span>
                    </div>
                    <div>
                        <span className="opacity-75">Required: </span>
                        <span className="font-bold">{profile.creditsRequired}</span>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-black/20 h-1.5 rounded-full mt-2">
                    <div 
                        className="bg-brand-emerald h-1.5 rounded-full" 
                        style={{ width: `${(profile.creditsEarned / profile.creditsRequired) * 100}%` }}
                    ></div>
                </div>
             </div>

             {/* Performance Chart */}
             <PerformanceChart semesters={profile.semesters} />

             {/* AI Coach */}
             <AiCoachCard 
                insight={coachInsight} 
                isLoading={isCoachLoading} 
                onGenerate={handleCoachAnalysis} 
            />

             {/* Detailed Results */}
             <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-brand-gray-800">Semester Results</h3>
                    <select 
                        value={selectedSemesterId} 
                        onChange={(e) => setSelectedSemesterId(e.target.value)}
                        className="bg-white border border-brand-gray-200 text-brand-gray-700 text-sm rounded-lg focus:ring-brand-blue focus:border-brand-blue block p-2"
                    >
                        {profile.semesters.map(sem => (
                            <option key={sem.id} value={sem.id}>{sem.name}</option>
                        ))}
                    </select>
                </div>
                
                {currentSemester ? (
                    <div className="space-y-2">
                         <div className="flex justify-between text-sm text-brand-gray-600 px-2">
                             <span>Term GPA: <span className="font-bold text-brand-gray-800">{currentSemester.gpa}</span></span>
                             <span>Units: <span className="font-bold text-brand-gray-800">{currentSemester.courses.length}</span></span>
                         </div>
                        <ResultsTable courses={currentSemester.courses} />
                    </div>
                ) : (
                    <p className="text-center text-brand-gray-400">No data for selected semester.</p>
                )}
             </div>
        </div>
    );
};

export default PerformanceDashboard;
