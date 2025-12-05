
import React, { useState, useRef, useEffect } from 'react';
import { EditorFilter } from '../../types';

interface PostEditorProps {
    imageUrl: string;
    onPost: (caption: string, finalImageUrl: string) => void;
    onCancel: () => void;
}

const filters: { name: EditorFilter, label: string, style: string }[] = [
    { name: 'none', label: 'Normal', style: 'filter-none' },
    { name: 'vintage', label: 'Vintage', style: 'filter sepia(0.5) contrast(0.9) brightness(1.1) saturate(1.2)' },
    { name: 'vivid', label: 'Vivid', style: 'filter saturate(1.5) contrast(1.1)' },
    { name: 'mono', label: 'Mono', style: 'filter grayscale(1)' },
];

const PostEditor: React.FC<PostEditorProps> = ({ imageUrl, onPost, onCancel }) => {
    const [step, setStep] = useState(1); // 1: Edit, 2: Caption
    const [caption, setCaption] = useState('');
    const [activeFilter, setActiveFilter] = useState<EditorFilter>('none');
    
    // For simplicity, we're not implementing full crop/rotate logic.
    // This state is a placeholder for a real implementation.
    const [cropData, setCropData] = useState({}); 

    const filterStyle = filters.find(f => f.name === activeFilter)?.style || 'filter-none';

    const handlePost = () => {
        // In a real app, you'd apply the crop/filter to the image on a canvas
        // and upload the result. For this mock, we'll just pass the original URL.
        onPost(caption, imageUrl);
    };

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-brand-gray-200">
                <button onClick={step === 1 ? onCancel : () => setStep(1)} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-lg font-bold text-brand-gray-800">{step === 1 ? 'Edit' : 'New Post'}</h2>
                <button 
                    onClick={step === 1 ? () => setStep(2) : handlePost} 
                    className="text-lg font-bold text-brand-blue disabled:text-brand-gray-400">
                    {step === 1 ? 'Next' : 'Share'}
                </button>
            </div>

            {/* Main Content */}
            {step === 1 ? (
                // --- Edit Step ---
                <div className="flex-grow flex flex-col">
                    <div className="bg-black flex-grow flex items-center justify-center">
                        <img src={imageUrl} alt="Editing preview" className={`max-w-full max-h-full ${filterStyle}`} />
                    </div>
                    <div className="flex-shrink-0 p-4 bg-white">
                        <p className="text-sm font-bold mb-2">Filters</p>
                        <div className="flex space-x-3 overflow-x-auto pb-2">
                            {filters.map(filter => (
                                <div key={filter.name} onClick={() => setActiveFilter(filter.name)} className="flex-shrink-0 text-center cursor-pointer">
                                    <img src={imageUrl} alt={filter.label} className={`w-20 h-20 object-cover rounded-md border-2 ${activeFilter === filter.name ? 'border-brand-blue' : 'border-transparent'} ${filter.style}`} />
                                    <p className={`text-xs mt-1 font-semibold ${activeFilter === filter.name ? 'text-brand-blue' : 'text-brand-gray-600'}`}>{filter.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // --- Caption Step ---
                <div className="p-4 flex flex-col md:flex-row md:space-x-4">
                    <img src={imageUrl} alt="Final preview" className={`w-24 h-24 md:w-32 md:h-32 object-cover rounded-md ${filterStyle}`} />
                    <textarea
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                        className="w-full h-24 mt-4 md:mt-0 md:h-32 text-base p-2 focus:outline-none text-brand-gray-800"
                    />
                </div>
            )}
        </div>
    );
};

export default PostEditor;