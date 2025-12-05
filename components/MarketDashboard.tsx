import React, { useState } from 'react';
import { type MarketItem } from '../types';
import MarketFeed from './market/MarketFeed';
import ProductPostForm from './market/ProductPostForm';
import VendorChat from './market/VendorChat';

const mockItems: MarketItem[] = [
    { id: '1', title: 'Advanced Calculus Textbook', price: 1500, category: 'Books', imageUrls: ['https://picsum.photos/seed/book/300/200'], seller: 'Jane Doe', location: 'Main Campus', description: 'Slightly used, no markings.' },
    { id: '2', title: 'HP Laptop (Used)', price: 25000, category: 'Electronics', imageUrls: ['https://picsum.photos/seed/laptop/300/200'], seller: 'John Smith', location: 'Qwetu Hostel', description: 'Good condition, comes with charger.' },
    { id: '3', title: 'Lab Coat (Size M)', price: 800, category: 'Essentials', imageUrls: ['https://picsum.photos/seed/labcoat/300/200'], seller: 'Alex Ray', location: 'Library', description: 'Barely worn.' },
    { id: '4', title: 'Acoustic Guitar', price: 5000, category: 'Other', imageUrls: ['https://picsum.photos/seed/guitar/300/200'], seller: 'Sam B.', location: 'Student Center', description: 'Comes with a bag.' },
    { id: '5', title: 'Scientific Calculator', price: 1200, category: 'Electronics', imageUrls: ['https://picsum.photos/seed/calculator/300/200'], seller: 'Jane Doe', location: 'Main Campus', description: 'FX-82, approved for exams.' },
    { id: '6', title: 'Intro to Psychology', price: 1000, category: 'Books', imageUrls: ['https://picsum.photos/seed/psychology/300/200'], seller: 'Alex Ray', location: 'Library', description: 'Latest edition.' },
];

type MarketView = 'feed' | 'posting' | 'chat';

const MarketDashboard: React.FC = () => {
    const [view, setView] = useState<MarketView>('feed');
    const [items, setItems] = useState<MarketItem[]>(mockItems);
    const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

    const handleStartChat = (item: MarketItem) => {
        setSelectedItem(item);
        setView('chat');
    };

    const handlePostItemClick = () => {
        setView('posting');
    };

    const handleBackToFeed = () => {
        setView('feed');
        setSelectedItem(null);
    };

    const handleAddItem = (newItem: Omit<MarketItem, 'id' | 'seller'>) => {
        const fullNewItem: MarketItem = {
            ...newItem,
            id: new Date().toISOString(),
            seller: 'You' // In a real app, this would be the logged-in user
        };
        setItems(prevItems => [fullNewItem, ...prevItems]);
        setView('feed');
    };

    const renderView = () => {
        switch (view) {
            case 'posting':
                return <ProductPostForm onPostSubmit={handleAddItem} onBack={handleBackToFeed} />;
            case 'chat':
                if (selectedItem) {
                    return <VendorChat item={selectedItem} onBack={handleBackToFeed} />;
                }
                return null; // Or some error state
            case 'feed':
            default:
                return <MarketFeed items={items} onPostItemClick={handlePostItemClick} onStartChat={handleStartChat} />;
        }
    }

    return (
        <div className="animate-fade-in">
             {renderView()}
        </div>
    );
};

export default MarketDashboard;
