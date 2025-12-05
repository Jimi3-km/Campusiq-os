import React, { useState } from 'react';
import { type MarketItem } from '../../types';

// --- Wishlist Helper Functions ---
const getWishlist = (): string[] => {
    try {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
        return [];
    }
};

const updateWishlist = (wishlist: string[]) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};
// ------------------------------------

interface MarketItemCardProps {
    item: MarketItem;
    onChat: (item: MarketItem) => void;
}

const MarketItemCard: React.FC<MarketItemCardProps> = ({ item, onChat }) => {
    const [isWishlisted, setIsWishlisted] = useState<boolean>(() => {
        const wishlist = getWishlist();
        return wishlist.includes(item.id);
    });

    const handleWishlistToggle = () => {
        const currentWishlist = getWishlist();
        if (isWishlisted) {
            const newWishlist = currentWishlist.filter(id => id !== item.id);
            updateWishlist(newWishlist);
            setIsWishlisted(false);
        } else {
            const newWishlist = [...currentWishlist, item.id];
            updateWishlist(newWishlist);
            setIsWishlisted(true);
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <img src={item.imageUrls[0]} alt={item.title} className="w-full h-32 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-brand-gray-800 truncate flex-grow">{item.title}</p>
                <p className="text-lg font-bold text-brand-blue mt-1">KSH {item.price.toLocaleString()}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-brand-gray-500">{item.category}</span>
                    <div className="flex items-center space-x-2">
                         <button
                            onClick={handleWishlistToggle}
                            className={`transition-colors p-1 rounded-full ${isWishlisted ? 'text-red-500 hover:text-red-600' : 'text-brand-gray-500 hover:text-red-500'} active:scale-95`}
                            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                {isWishlisted ? (
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                ) : (
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656zM6 6.757a2 2 0 00-2.828 2.829L10 16.243l6.828-6.657a2 2 0 00-2.828-2.829L10 8.172 6.828 6.757z" clipRule="evenodd" />
                                )}
                            </svg>
                        </button>
                        <button onClick={() => onChat(item)} className="text-xs font-bold text-brand-blue hover:underline transition-transform active:scale-95">Chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketItemCard;