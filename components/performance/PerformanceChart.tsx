
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SemesterResult } from '../../types';

interface PerformanceChartProps {
    semesters: SemesterResult[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ semesters }) => {
    const data = semesters.map(sem => ({
        name: sem.name.replace('Year ', 'Y').replace('Sem ', 'S'), // Shorten name for chart
        gpa: sem.gpa
    }));

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-gray-200">
            <h3 className="text-lg font-bold text-brand-gray-800 mb-4">GPA Trend</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                        <YAxis domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="gpa" 
                            stroke="#0EA5E9" 
                            strokeWidth={3} 
                            dot={{ fill: '#0EA5E9', r: 4, strokeWidth: 2, stroke: '#fff' }} 
                            activeDot={{ r: 6 }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;
