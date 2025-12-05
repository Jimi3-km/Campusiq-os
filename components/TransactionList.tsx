
import React from 'react';
import { type Transaction, TransactionType } from '../types';

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isIncome = transaction.type === TransactionType.INCOME;
    const amountColor = isIncome ? 'text-green-500' : 'text-red-500';
    const amountPrefix = isIncome ? '+' : '-';

    return (
        <li className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className={`text-xl ${amountColor}`}>{isIncome ? '↓' : '↑'}</span>
                </div>
                <div>
                    <p className="font-medium text-brand-gray-800">{transaction.description}</p>
                    <p className="text-sm text-brand-gray-500">{transaction.category}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold ${amountColor}`}>{amountPrefix}KSH {transaction.amount.toLocaleString()}</p>
                <p className="text-xs text-brand-gray-500">{transaction.date.toLocaleDateString()}</p>
            </div>
        </li>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-brand-gray-800 mb-2">Recent Transactions</h3>
            {transactions.length > 0 ? (
                <ul className="divide-y divide-brand-gray-100">
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </ul>
            ) : (
                <p className="text-center text-brand-gray-400 py-4">No transactions yet.</p>
            )}
        </div>
    );
};

export default TransactionList;