import React, { useState } from 'react';
import { StudyNote } from '../../types';

interface NoteEditorProps {
    note: StudyNote | null;
    onSave: (noteData: Omit<StudyNote, 'id' | 'lastEdited'> & { id?: string }) => void;
    onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onBack }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [folder, setFolder] = useState(note?.folder || 'General');
    const [tags, setTags] = useState(note?.tags.join(', ') || '');
    const [content, setContent] = useState(note?.content || '');

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            alert('Title and content cannot be empty.');
            return;
        }
        onSave({
            id: note?.id,
            title,
            folder,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            content,
        });
    };

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-brand-gray-200">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-brand-gray-100 active:scale-95">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-lg font-bold text-brand-gray-800">{note ? 'Edit Note' : 'Create Note'}</h2>
                <button 
                    onClick={handleSave} 
                    className="text-lg font-bold text-brand-emerald-dark disabled:text-brand-gray-400 active:scale-95">
                    Save
                </button>
            </div>

            {/* Editor Fields */}
            <div className="flex-grow p-4 md:p-6 space-y-4 overflow-y-auto">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Note Title..."
                    className="w-full text-3xl font-bold focus:outline-none text-brand-gray-800"
                />
                <div className="flex items-center space-x-4">
                     <input
                        type="text"
                        value={folder}
                        onChange={e => setFolder(e.target.value)}
                        placeholder="Folder"
                        className="text-sm bg-brand-gray-100 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand-emerald text-brand-gray-800"
                    />
                     <input
                        type="text"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        placeholder="Tags, comma, separated"
                        className="flex-grow text-sm bg-brand-gray-100 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand-emerald text-brand-gray-800"
                    />
                </div>
                 <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Start writing your notes here..."
                    className="w-full h-full min-h-[50vh] text-base focus:outline-none resize-none text-brand-gray-800"
                />
            </div>
        </div>
    );
};

export default NoteEditor;