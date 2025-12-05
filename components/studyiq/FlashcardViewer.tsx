import React, { useState } from 'react';
import { Flashcard } from '../../types';

interface FlashcardViewerProps {
    noteTitle: string;
    flashcards: Flashcard[];
    onBack: () => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ noteTitle, flashcards, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex(prev => (prev + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
    };

    const currentCard = flashcards[currentIndex];
    const progress = ((currentIndex + 1) / flashcards.length) * 100;

    if (flashcards.length === 0) {
        return (
             <div className="text-center p-8">
                 <h2 className="text-2xl font-bold mb-2">No Flashcards</h2>
                 <p>AI couldn't generate flashcards for this note.</p>
                 <button onClick={onBack} className="mt-4 text-brand-emerald-dark font-semibold">← Go Back</button>
             </div>
        )
    }

    return (
        <div className="space-y-4">
             <div className="flex items-center space-x-2">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-brand-gray-800">Flashcards</h2>
                    <p className="text-sm text-brand-gray-600">From "{noteTitle}"</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-brand-gray-200 rounded-full h-2">
                <div className="bg-brand-emerald h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Flashcard */}
            <div 
                className="w-full h-80 rounded-xl cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: '1000px' }}
            >
                <div 
                    className="relative w-full h-full text-center transition-transform duration-500"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full bg-white shadow-lg rounded-xl flex flex-col justify-center items-center p-6" style={{ backfaceVisibility: 'hidden' }}>
                        <p className="text-xs text-brand-gray-500 mb-4">Question</p>
                        <p className="text-2xl font-semibold text-brand-gray-800">{currentCard.question}</p>
                    </div>
                    {/* Back */}
                    <div className="absolute w-full h-full bg-brand-emerald text-white shadow-lg rounded-xl flex flex-col justify-center items-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         <p className="text-xs text-white/80 mb-4">Answer</p>
                         <p className="text-2xl font-semibold">{currentCard.answer}</p>
                    </div>
                </div>
            </div>

             {/* Navigation */}
            <div className="flex justify-between items-center">
                 <button onClick={handlePrev} className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50">
                    <span>←</span>
                    <span>Prev</span>
                 </button>
                 <p className="font-semibold text-brand-gray-600">{currentIndex + 1} / {flashcards.length}</p>
                 <button onClick={handleNext} className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-brand-gray-700 hover:bg-brand-gray-50">
                    <span>Next</span>
                    <span>→</span>
                 </button>
            </div>

        </div>
    );
};

export default FlashcardViewer;
