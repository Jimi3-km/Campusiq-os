
import React, { useState } from 'react';
import { type Transaction, TransactionType, Category } from '../types';

interface TransactionFormProps {
    onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
    const [category, setCategory] = useState<Category>(Category.FOOD);
    
    const incomeCategories = [Category.ALLOWANCE, Category.SIDE_HUSTLE, Category.OTHER];
    const expenseCategories = [Category.FOOD, Category.TRANSPORT, Category.HOUSING, Category.ENTERTAINMENT, Category.ACADEMICS, Category.OTHER];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount) return;
        
        onAddTransaction({
            description,
            amount: parseFloat(amount),
            type,
            category,
        });

        setDescription('');
        setAmount('');
        setType(TransactionType.EXPENSE);
        setCategory(Category.FOOD);
    };
    
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as TransactionType;
        setType(newType);
        // Reset category to default for the new type
        setCategory(newType === TransactionType.INCOME ? Category.ALLOWANCE : Category.FOOD);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="description" className="text-sm font-medium text-brand-gray-600">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800"
                    placeholder="e.g., Lunch"
                    required
                />
            </div>
            <div>
                <label htmlFor="amount" className="text-sm font-medium text-brand-gray-600">Amount (KSH)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800"
                    placeholder="e.g., 250"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label htmlFor="type" className="text-sm font-medium text-brand-gray-600">Type</label>
                  <select
                      id="type"
                      value={type}
                      onChange={handleTypeChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-200 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md text-brand-gray-800"
                  >
                      <option value={TransactionType.EXPENSE}>Expense</option>
                      <option value={TransactionType.INCOME}>Income</option>
                  </select>
              </div>
              <div>
                  <label htmlFor="category" className="text-sm font-medium text-brand-gray-600">Category</label>
                  <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-200 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md text-brand-gray-800"
                  >
                      {(type === TransactionType.EXPENSE ? expenseCategories : incomeCategories).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>
              </div>
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;