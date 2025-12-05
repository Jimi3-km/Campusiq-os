import React from 'react';
import { StudyIQView, StudyNote } from '../../types';

interface NotesHubProps {
    notes: StudyNote[];
    onNavigate: (view: StudyIQView, data?: any) => void;
}

const NotesHub: React.FC<NotesHubProps> = ({ notes, onNavigate }) => {
    return (
        <div className="space-y-6">
            {/* Uploader / Creator */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                 <h3 className="text-lg font-bold text-brand-gray-800 mb-3">Add New Notes</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <button onClick={() => onNavigate('noteEditor')} className="p-4 bg-brand-gray-50 rounded-lg hover:bg-brand-gray-100 transition-transform active:scale-95">
                        <span className="text-3xl">📝</span>
                        <p className="text-sm font-semibold mt-1">Create New Note</p>
                    </button>
                     <button onClick={() => alert('File upload not implemented yet.')} className="p-4 bg-brand-gray-50 rounded-lg hover:bg-brand-gray-100 transition-transform active:scale-95">
                        <span className="text-3xl">📄</span>
                        <p className="text-sm font-semibold mt-1">Upload Document</p>
                    </button>
                     <button onClick={() => alert('Pasting a link is not implemented yet.')} className="p-4 bg-brand-gray-50 rounded-lg hover:bg-brand-gray-100 transition-transform active:scale-95">
                        <span className="text-3xl">🔗</span>
                        <p className="text-sm font-semibold mt-1">Paste a Link</p>
                    </button>
                 </div>
            </div>

            {/* Notes List */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-brand-gray-800 mb-3">All Notes</h3>
                <div className="space-y-3">
                    {notes.map(note => (
                        <div key={note.id} className="p-4 bg-brand-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-brand-gray-800">{note.title}</p>
                                    <p className="text-xs text-brand-gray-500">{note.folder} • Edited {note.lastEdited}</p>
                                </div>
                                <div className="flex space-x-2">
                                     {note.tags.map(tag => <span key={tag} className="text-xs font-semibold bg-brand-emerald-light text-brand-emerald-dark px-2 py-0.5 rounded-full">{tag}</span>)}
                                </div>
                            </div>
                            <p className="text-sm text-brand-gray-600 mt-2 truncate">{note.content}</p>
                            <div className="mt-3 pt-3 border-t border-brand-gray-200 flex items-center space-x-3 text-sm font-semibold">
                                 <button onClick={() => onNavigate('noteEditor', note)} className="text-brand-gray-600 hover:text-brand-blue active:scale-95">Edit</button>
                                 <span className="text-brand-gray-300">|</span>
                                 <button onClick={() => alert(`Generating summary for "${note.title}"...`)} className="text-brand-gray-600 hover:text-brand-blue active:scale-95">Summarize (AI)</button>
                                  <span className="text-brand-gray-300">|</span>
                                 <button onClick={() => onNavigate('flashcards', note)} className="text-brand-gray-600 hover:text-brand-blue active:scale-95">Flashcards (AI)</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <button onClick={() => onNavigate('noteEditor')} className="fixed bottom-24 right-6 bg-brand-emerald text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-3xl font-light hover:bg-brand-emerald-dark transition-transform active:scale-95 z-20">
                +
            </button>
        </div>
    );
};

export default NotesHub;