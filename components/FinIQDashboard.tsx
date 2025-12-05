import React, { useState, useEffect, useCallback } from 'react';
import { type Transaction, TransactionType, Category, type AiInsight } from '../types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import SpendingChart from './SpendingChart';
import AiInsightCard from './AiInsightCard';
import { getFinancialInsight } from '../services/geminiService';

const seedData: Transaction[] = [
    { id: '1', description: 'HELB Loan', amount: 25000, type: TransactionType.INCOME, category: Category.ALLOWANCE, date: new Date('2024-07-20T10:00:00Z') },
    { id: '2', description: 'Lunch at Cafeteria', amount: 250, type: TransactionType.EXPENSE, category: Category.FOOD, date: new Date('2024-07-21T13:00:00Z') },
    { id: '3', description: 'Bus fare to town', amount: 100, type: TransactionType.EXPENSE, category: Category.TRANSPORT, date: new Date('2024-07-22T08:30:00Z') },
    { id: '4', description: 'Photocopying notes', amount: 50, type: TransactionType.EXPENSE, category: Category.ACADEMICS, date: new Date('2024-07-22T11:00:00Z') },
    { id: '5', description: 'Graphic design gig', amount: 3000, type: TransactionType.INCOME, category: Category.SIDE_HUSTLE, date: new Date('2024-07-23T18:00:00Z') },
];

const FinIQDashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(seedData);
    const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);
    const [isLoadingInsight, setIsLoadingInsight] = useState<boolean>(true);

    const fetchInsights = useCallback(async () => {
        setIsLoadingInsight(true);
        try {
            const insight = await getFinancialInsight(transactions);
            setAiInsight(insight);
        } catch (error) {
            console.error("Failed to fetch AI insight:", error);
            setAiInsight({ summary: "Could not load insight.", tip: "Please try again later." });
        } finally {
            setIsLoadingInsight(false);
        }
    }, [transactions]);
    
    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);

    const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: new Date().toISOString(),
            date: new Date(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const totalIncome = transactions
        .filter(t => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);
        
    const balance = totalIncome - totalExpense;

    return (
        <div className="space-y-6 animate-fade-in">
             <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">FinIQ</h2>
                <p className="text-brand-gray-600">Your personal finance manager.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-brand-blue to-sky-400 rounded-xl shadow-lg text-white">
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="text-4xl font-bold tracking-tight">KSH {balance.toLocaleString()}</p>
                <div className="flex justify-between mt-4 text-sm">
                    <div>
                        <p className="opacity-80">Income</p>
                        <p className="font-semibold">KSH {totalIncome.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="opacity-80">Expenses</p>
                        <p className="font-semibold">KSH {totalExpense.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <AiInsightCard insight={aiInsight} isLoading={isLoadingInsight} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpendingChart transactions={transactions} />
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Add Transaction</h3>
                    <TransactionForm onAddTransaction={handleAddTransaction} />
                </div>
            </div>
            
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default FinIQDashboard;