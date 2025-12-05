
import React, { useState, useMemo } from 'react';
import { type MarketItem } from '../../types';
import MarketItemCard from './MarketItemCard';

interface MarketFeedProps {
    items: MarketItem[];
    onPostItemClick: () => void;
    onStartChat: (item: MarketItem) => void;
}

const MarketFeed: React.FC<MarketFeedProps> = ({ items, onPostItemClick, onStartChat }) => {
    const categories = ['All', 'Books', 'Electronics', 'Essentials', 'Other'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [items, activeCategory, searchTerm]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-brand-gray-800">Smart Market</h2>
                <p className="text-brand-gray-600">Peer-to-peer trading, made easy and safe.</p>
            </div>

            {/* Search and Filters */}
            <div className="sticky top-[68px] bg-brand-gray-50/80 backdrop-blur-sm pt-2 pb-3 z-10">
                <input
                    type="text"
                    placeholder="Search for items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-brand-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue text-brand-gray-800"
                />
                <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1 text-sm font-semibold rounded-full flex-shrink-0 transition-all duration-200 active:scale-95 ${activeCategory === cat ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-brand-gray-600 hover:bg-brand-gray-100'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                    <MarketItemCard key={item.id} item={item} onChat={() => onStartChat(item)} />
                ))}
            </div>

             <button
                onClick={onPostItemClick}
                className="fixed bottom-24 right-6 bg-brand-blue text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl font-light hover:bg-brand-blue-dark transition-transform active:scale-95"
                aria-label="Add new item"
             >
                +
            </button>
        </div>
    );
};

export default MarketFeed;