
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { type Transaction, TransactionType, Category } from '../types';

interface SpendingChartProps {
    transactions: Transaction[];
}

const COLORS = ['#0EA5E9', '#67E8F9', '#38BDF8', '#7DD3FC', '#A5B4FC', '#C7D2FE'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-2 border border-brand-gray-200 rounded-md shadow-sm">
        <p className="font-bold">{`${payload[0].name}`}</p>
        <p className="text-sm">{`Amount: KSH ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};


const SpendingChart: React.FC<SpendingChartProps> = ({ transactions }) => {
    const chartData = useMemo(() => {
        const expenseData = transactions.filter(t => t.type === TransactionType.EXPENSE);
        const spendingByCategory = expenseData.reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {} as Record<Category, number>);

        return Object.entries(spendingByCategory).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    if (chartData.length === 0) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center h-full min-h-[300px]">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-2">Spending Breakdown</h3>
                <p className="text-brand-gray-400">No expenses logged yet.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-brand-gray-800 mb-2">Spending Breakdown</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingChart;
