
import React, { useState, useRef } from 'react';
import { type MarketItem } from '../../types';

interface ProductPostFormProps {
    onPostSubmit: (item: Omit<MarketItem, 'id' | 'seller'>) => void;
    onBack: () => void;
}

const ProductPostForm: React.FC<ProductPostFormProps> = ({ onPostSubmit, onBack }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Books');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...imageUrls].slice(0, 5)); // Limit to 5 images
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const urlToRevoke = images[indexToRemove];
        URL.revokeObjectURL(urlToRevoke); // Free up memory
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !price || images.length === 0) {
            alert('Please fill in title, price, and add at least one image.');
            return;
        }
        onPostSubmit({
            title,
            description,
            price: parseFloat(price),
            category,
            location,
            imageUrls: images,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-2">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-brand-gray-800">Post an Item</h2>
                    <p className="text-brand-gray-600">Fill in the details to sell your item.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-sm space-y-4">
                <div>
                    <label htmlFor="title" className="text-sm font-medium text-brand-gray-600">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800" placeholder="e.g., Advanced Calculus Textbook" />
                </div>
                
                <div>
                    <label className="text-sm font-medium text-brand-gray-600">Photos (up to 5)</label>
                    <div className="mt-1 flex items-center space-x-2">
                        <div className="flex space-x-2 overflow-x-auto pb-1">
                           {images.map((imgSrc, i) => (
                               <div key={i} className="relative flex-shrink-0">
                                   <img src={imgSrc} className="h-16 w-16 rounded-md object-cover"/>
                                   <button
                                       type="button"
                                       onClick={() => handleRemoveImage(i)}
                                       className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                       aria-label="Remove image"
                                   >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                       </svg>
                                   </button>
                               </div>
                           ))}
                        </div>
                        {images.length < 5 && (
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-shrink-0 h-16 w-16 border-2 border-dashed border-brand-gray-200 rounded-md flex items-center justify-center text-brand-gray-400 hover:border-brand-blue hover:text-brand-blue text-2xl font-light">
                               +
                            </button>
                        )}
                    </div>
                    <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                </div>

                <div>
                    <label htmlFor="description" className="text-sm font-medium text-brand-gray-600">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800" placeholder="e.g., Slightly used, no markings."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="text-sm font-medium text-brand-gray-600">Price (KSH)</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800" placeholder="e.g., 1500" />
                    </div>
                    <div>
                        <label htmlFor="category" className="text-sm font-medium text-brand-gray-600">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-200 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md text-brand-gray-800">
                            <option>Books</option>
                            <option>Electronics</option>
                            <option>Essentials</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                 <div>
                    <label htmlFor="location" className="text-sm font-medium text-brand-gray-600">Location</label>
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm text-brand-gray-800" placeholder="e.g., Main Campus Library" />
                </div>
                
                <button type="submit" className="w-full py-2.5 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none transition-transform active:scale-95">Post Product</button>
            </form>
        </div>
    );
};

export default ProductPostForm;