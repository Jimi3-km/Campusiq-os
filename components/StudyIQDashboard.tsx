import React, { useState, useEffect, useCallback } from 'react';
import { type StudyIQView, type StudyNote, type Flashcard, type StudyGroup, type AiAssistantMessage, RoomChatMessage } from '../types';
import { studyIQService } from '../services/studyiqMockData';

import StudyDashboardHome from './studyiq/StudyDashboardHome';
import NotesHub from './studyiq/NotesHub';
import AiAssistant from './studyiq/AiAssistant';
import FlashcardViewer from './studyiq/FlashcardViewer';
import PeerHub from './studyiq/PeerHub';
import NoteEditor from './studyiq/NoteEditor';
import StudyIQNav from './studyiq/StudyIQNav';
import StudyRoom from './studyiq/StudyRoom';


const StudyIQDashboard: React.FC = () => {
    const [view, setView] = useState<StudyIQView>('home');
    
    // Centralized state management
    const [notes, setNotes] = useState<StudyNote[]>(() => studyIQService.getNotes());
    const [groups, setGroups] = useState<StudyGroup[]>(() => studyIQService.getGroups());
    const [conversation, setConversation] = useState<AiAssistantMessage[]>(() => studyIQService.getConversation());

    const [activeNote, setActiveNote] = useState<StudyNote | null>(null);
    const [activeFlashcards, setActiveFlashcards] = useState<Flashcard[]>([]);
    const [activeGroup, setActiveGroup] = useState<StudyGroup | null>(null);
    
    // Poll for AI assistant responses
    useEffect(() => {
        const interval = setInterval(() => {
            const serviceMessages = studyIQService.getConversation();
            if (serviceMessages.length !== conversation.length) {
                setConversation([...serviceMessages]);
            }
            // Poll for group chat AI responses
            if (activeGroup) {
                const serviceGroup = studyIQService.getGroupById(activeGroup.id);
                if (serviceGroup && serviceGroup.chatHistory.length !== activeGroup.chatHistory.length) {
                    setGroups(prev => prev.map(g => g.id === activeGroup.id ? serviceGroup : g));
                    setActiveGroup(serviceGroup);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [conversation.length, activeGroup]);


    const handleNavigate = (newView: StudyIQView, data?: any) => {
        if (newView === 'flashcards' && data) {
            const note = data as StudyNote;
            setActiveNote(note);
            setActiveFlashcards(studyIQService.getFlashcardsForNote(note.id));
        } else if (newView === 'noteEditor') {
             setActiveNote(data || null); // data can be a note to edit, or null for a new note
        } else if (newView === 'studyRoom' && data) {
            setActiveGroup(data as StudyGroup);
        }
        else {
            setActiveNote(null);
            setActiveFlashcards([]);
            setActiveGroup(null);
        }
        setView(newView);
    };
    
    const handleSaveNote = useCallback((noteData: Omit<StudyNote, 'id' | 'lastEdited'> & { id?: string }) => {
        studyIQService.saveNote(noteData);
        setNotes([...studyIQService.getNotes()]); // Update state from service
        handleNavigate('notes');
    }, []);

    const handleJoinGroup = useCallback((groupId: string) => {
        studyIQService.joinGroup(groupId);
        setGroups([...studyIQService.getGroups()]); // Update state from service
    }, []);

    const handleSendMessage = useCallback((text: string) => {
        studyIQService.sendMessage(text);
        setConversation([...studyIQService.getConversation()]); // Show user message immediately
    }, []);

    const handleSendMessageToGroup = useCallback((groupId: string, text: string) => {
        studyIQService.sendMessageToGroup(groupId, text);
        const updatedGroups = [...studyIQService.getGroups()];
        setGroups(updatedGroups);
        const updatedActiveGroup = updatedGroups.find(g => g.id === groupId);
        if (updatedActiveGroup) setActiveGroup(updatedActiveGroup);
    }, []);
    
    const handleUploadFileToGroup = useCallback((groupId: string) => {
        studyIQService.uploadFileToGroup(groupId);
        const updatedGroups = [...studyIQService.getGroups()];
        setGroups(updatedGroups);
         const updatedActiveGroup = updatedGroups.find(g => g.id === groupId);
        if (updatedActiveGroup) setActiveGroup(updatedActiveGroup);
    }, []);

    const handleSummarizeFileInGroup = useCallback((groupId: string, file: any) => {
        studyIQService.triggerAiActionInGroup(groupId, 'summarize', file);
        const updatedGroups = [...studyIQService.getGroups()];
        setGroups(updatedGroups);
        const updatedActiveGroup = updatedGroups.find(g => g.id === groupId);
        if (updatedActiveGroup) setActiveGroup(updatedActiveGroup);
    }, []);

    const renderView = () => {
        switch (view) {
            case 'noteEditor':
                return <NoteEditor note={activeNote} onSave={handleSaveNote} onBack={() => handleNavigate('notes')} />;
            case 'notes':
                return <NotesHub notes={notes} onNavigate={handleNavigate} />;
            case 'ai':
                return <AiAssistant conversation={conversation} onSendMessage={handleSendMessage} />;
            case 'flashcards':
                return activeNote && (
                    <FlashcardViewer 
                        noteTitle={activeNote.title} 
                        flashcards={activeFlashcards} 
                        onBack={() => handleNavigate('notes')} 
                    />
                );
            case 'peer':
                 return <PeerHub groups={groups} onNavigate={handleNavigate} onJoinGroup={handleJoinGroup} />;
            case 'studyRoom':
                return activeGroup && (
                    <StudyRoom
                        group={activeGroup}
                        onBack={() => handleNavigate('peer')}
                        onSendMessage={handleSendMessageToGroup}
                        onUploadFile={handleUploadFileToGroup}
                        onSummarizeFile={handleSummarizeFileInGroup}
                    />
                );
            case 'home':
            default:
                return <StudyDashboardHome notes={notes} groups={groups} onNavigate={handleNavigate} onJoinGroup={handleJoinGroup} />;
        }
    };
    
    const focusedViews: StudyIQView[] = ['noteEditor', 'flashcards', 'studyRoom'];

    return (
        <div className="animate-fade-in space-y-4">
            {!focusedViews.includes(view) && (
                 <StudyIQNav activeView={view} onNavigate={setView} />
            )}
            {renderView()}
        </div>
    );
};

export default StudyIQDashboard;