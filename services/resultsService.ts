
import { AcademicProfile } from '../types';
import { mockAcademicProfile } from './resultsMockData';

// This service abstracts the data fetching. 
// In a real app, this would call the university's LMS or SIS API.

export const getAcademicProfile = async (): Promise<AcademicProfile> => {
    // Simulate API network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockAcademicProfile;
};
