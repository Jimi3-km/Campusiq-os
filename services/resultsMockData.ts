
import { AcademicProfile } from '../types';

export const mockAcademicProfile: AcademicProfile = {
    studentId: 'S12345',
    studentName: 'Alex Doe',
    program: 'BSc. Computer Science',
    year: 2,
    currentGPA: 3.4,
    creditsEarned: 65,
    creditsRequired: 120,
    semesters: [
        {
            id: 'sem1',
            name: 'Year 1 Sem 1',
            gpa: 3.2,
            courses: [
                { id: 'c1', code: 'CCS 101', name: 'Intro to Programming', grade: 'A', score: 85, credits: 4, status: 'Pass' },
                { id: 'c2', code: 'SMA 103', name: 'Calculus I', grade: 'B', score: 68, credits: 4, status: 'Pass' },
                { id: 'c3', code: 'HNS 101', name: 'HIV/AIDS Awareness', grade: 'A', score: 90, credits: 2, status: 'Pass' },
                { id: 'c4', code: 'PHY 112', name: 'Basic Physics', grade: 'C', score: 55, credits: 4, status: 'Pass' },
            ]
        },
        {
            id: 'sem2',
            name: 'Year 1 Sem 2',
            gpa: 3.5,
            courses: [
                { id: 'c5', code: 'CCS 102', name: 'Object Oriented Programming', grade: 'A', score: 82, credits: 4, status: 'Pass' },
                { id: 'c6', code: 'SMA 104', name: 'Calculus II', grade: 'B', score: 72, credits: 4, status: 'Pass' },
                { id: 'c7', code: 'CCS 103', name: 'Database Systems', grade: 'A', score: 88, credits: 4, status: 'Pass' },
                { id: 'c8', code: 'COM 110', name: 'Communication Skills', grade: 'B', score: 75, credits: 3, status: 'Pass' },
            ]
        },
        {
            id: 'sem3',
            name: 'Year 2 Sem 1',
            gpa: 3.6,
            courses: [
                { id: 'c9', code: 'CCS 201', name: 'Data Structures & Algorithms', grade: 'A', score: 80, credits: 4, status: 'Pass' },
                { id: 'c10', code: 'CCS 202', name: 'Computer Networks', grade: 'B', score: 74, credits: 4, status: 'Pass' },
                { id: 'c11', code: 'SMA 201', name: 'Linear Algebra', grade: 'B', score: 71, credits: 4, status: 'Pass' },
                { id: 'c12', code: 'CCS 203', name: 'Web Development', grade: 'A', score: 92, credits: 4, status: 'Pass' },
            ]
        }
    ]
};
