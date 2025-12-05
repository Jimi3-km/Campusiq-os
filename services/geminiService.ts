
import { type Transaction, type AiInsight, type AcademicProfile, type PerformanceCoachInsight } from '../types';

// This is a mock service that simulates calling the Gemini API.

const MOCK_INSIGHTS = {
    summaries: [
        "Your spending seems balanced this week, with most of it going towards essentials like food.",
        "Looks like transport was a major expense recently. Consider planning trips to save costs.",
        "Great job on adding some income from your side hustle! Keep up the momentum.",
        "Entertainment spending is a bit high. Maybe look for some free campus events?",
        "You're managing your academic expenses well. Smart spending on books and supplies."
    ],
    tips: [
        "Try packing lunch twice a week to save money on food.",
        "Keep an eye out for student discounts on public transport.",
        "Set a small, achievable savings goal for this month, like saving for a new textbook.",
        "Review your subscriptions. Are there any you don't use anymore?",
        "Categorizing every expense helps you see exactly where your money goes. Keep it up!"
    ]
};

const MOCK_PERFORMANCE_INSIGHT: PerformanceCoachInsight = {
    summary: "You are performing exceptionally well in practical, code-heavy units like Web Development and Programming, but theoretical math units (Physics, Calculus) are slightly dragging down your average. Your overall GPA trend is positive, moving from 3.2 to 3.6.",
    strengths: ["Software Engineering (A average)", "Web Technologies (A average)", "Database Systems"],
    weaknesses: ["Physics (C grade)", "Pure Mathematics (B/C range)"],
    actionableTips: [
        "Join a peer study group specifically for Linear Algebra to boost your confidence in math.",
        "Dedicate 30 mins extra per day to review Physics concepts.",
        "Apply for a Teaching Assistant role in Intro to Programming given your high score."
    ]
};

export const getFinancialInsight = async (transactions: Transaction[]): Promise<AiInsight> => {
    console.log("Simulating Gemini API call with transactions:", transactions);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (transactions.length === 0) {
        return {
            summary: "No transactions yet. Add your first income or expense to get started!",
            tip: "Start by logging your daily coffee or bus fare to see how small amounts add up."
        };
    }

    const randomSummary = MOCK_INSIGHTS.summaries[Math.floor(Math.random() * MOCK_INSIGHTS.summaries.length)];
    const randomTip = MOCK_INSIGHTS.tips[Math.floor(Math.random() * MOCK_INSIGHTS.tips.length)];
    
    return {
        summary: randomSummary,
        tip: randomTip
    };
};

export const getPerformanceCoachInsight = async (profile: AcademicProfile): Promise<PerformanceCoachInsight> => {
    console.log("Simulating Gemini API call for academic coaching...");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Slightly longer delay for "complex analysis"
    return MOCK_PERFORMANCE_INSIGHT;
};
