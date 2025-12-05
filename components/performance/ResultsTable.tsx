
import React from 'react';
import { CourseRecord } from '../../types';

interface ResultsTableProps {
    courses: CourseRecord[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ courses }) => {
    
    const getGradeColor = (grade: string) => {
        switch(grade) {
            case 'A': return 'bg-green-100 text-green-700';
            case 'B': return 'bg-blue-100 text-blue-700';
            case 'C': return 'bg-yellow-100 text-yellow-700';
            case 'D': return 'bg-orange-100 text-orange-700';
            default: return 'bg-red-100 text-red-700';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-brand-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-brand-gray-200">
                    <thead className="bg-brand-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Unit</th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Credits</th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Score</th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-brand-gray-200">
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm font-bold text-brand-gray-800">{course.code}</div>
                                    <div className="text-xs text-brand-gray-500 truncate max-w-[150px]">{course.name}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-brand-gray-600">
                                    {course.credits}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-brand-gray-800">
                                    {course.score}%
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getGradeColor(course.grade)}`}>
                                        {course.grade}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsTable;
