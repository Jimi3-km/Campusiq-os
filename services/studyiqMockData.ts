import { StudyNote, Flashcard, AiAssistantMessage, StudyGroup, RoomChatMessage, SharedFile } from '../types';

const initialNotes: StudyNote[] = [
    {
        id: 'n1',
        title: 'Calculus I - Lecture 3 Notes',
        folder: 'Maths',
        tags: ['calculus', 'derivatives'],
        lastEdited: '2h ago',
        content: 'Derivatives represent the rate of change of a function. The power rule is d/dx(x^n) = nx^(n-1). The chain rule is used for composite functions.'
    },
    {
        id: 'n2',
        title: 'Photosynthesis Process',
        folder: 'Biology',
        tags: ['biology', 'cellular respiration'],
        lastEdited: '1d ago',
        content: 'Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight into chemical energy. It occurs in two stages: light-dependent reactions and the Calvin cycle.'
    },
    {
        id: 'n3',
        title: 'Intro to Python - Variables',
        folder: 'Computer Science',
        tags: ['python', 'programming'],
        lastEdited: '3d ago',
        content: 'In Python, variables are created when you assign a value to it. E.g., x = 5, y = "John". Variables do not need to be declared with any particular type.'
    }
];

const flashcardDecks: { [noteId: string]: Flashcard[] } = {
    'n1': [
        { id: 'fc1-1', question: 'What do derivatives represent?', answer: 'The rate of change of a function.' },
        { id: 'fc1-2', question: 'What is the Power Rule?', answer: 'd/dx(x^n) = nx^(n-1)' },
        { id: 'fc1-3', question: 'When is the Chain Rule used?', answer: 'For differentiating composite functions.' },
    ],
    'n2': [
        { id: 'fc2-1', question: 'What is Photosynthesis?', answer: 'The process of converting light energy into chemical energy.' },
        { id: 'fc2-2', question: 'What are the two stages of photosynthesis?', answer: 'Light-dependent reactions and the Calvin cycle.' },
    ],
     'n3': [
        { id: 'fc3-1', question: 'How are variables created in Python?', answer: 'They are created when a value is assigned to them.' },
        { id: 'fc3-2', question: 'Give an example of creating a variable in Python.', answer: 'x = 5 or name = "Alex"' },
    ]
};

const initialConversation: AiAssistantMessage[] = [
    { id: 'm1', sender: 'ai', text: 'Hi Alex! I\'m your AI Study Assistant. How can I help you prepare for your exams today?' },
    { id: 'm2', sender: 'user', text: 'Explain the chain rule in simple terms' },
    { 
      id: 'm3', 
      sender: 'ai', 
      text: 'Of course! Imagine you have a function nested inside another, like peeling an onion. The Chain Rule says you first differentiate the "outer" function, leaving the "inner" function untouched, then you multiply that by the derivative of the "inner" function. \n\nWant me to give you an example problem or quiz you on it?',
      suggestions: ['Give me an example', 'Quiz me', 'Summarize my notes on derivatives']
    },
];

const initialGroups: StudyGroup[] = [
    { 
      id: 'g1', 
      name: 'Calculus Crew', 
      subject: 'Maths', 
      members: 4, 
      capacity: 5, 
      avatarUrl: 'https://picsum.photos/seed/calculus/100/100', 
      isJoined: false,
      chatHistory: [
          { id: 'g1m1', sender: 'user', userName: 'Jane', userAvatar: 'https://picsum.photos/seed/jane/100/100', text: 'Hey everyone, ready to tackle derivatives?', timestamp: '10:30 AM'},
          { id: 'g1m2', sender: 'ai', text: 'Welcome to the Calculus Crew room! I\'m here to help. Try asking me to `/quiz` you on a topic.', timestamp: '10:31 AM'},
      ],
      sharedFiles: [],
    },
    { 
      id: 'g2', 
      name: 'Bio Buffs', 
      subject: 'Biology', 
      members: 2, 
      capacity: 4, 
      avatarUrl: 'https://picsum.photos/seed/biology/100/100', 
      isJoined: true,
      chatHistory: [
          { id: 'g2m1', sender: 'system', text: 'Alex uploaded Photosynthesis_Summary.pdf', timestamp: 'Yesterday'},
      ],
      sharedFiles: [
          { id: 'f1', name: 'Photosynthesis_Summary.pdf', type: 'PDF', size: '1.2MB', uploader: 'Alex'}
      ],
    },
    { 
      id: 'g3', 
      name: 'Python Programmers', 
      subject: 'CompSci', 
      members: 5, 
      capacity: 5, 
      avatarUrl: 'https://picsum.photos/seed/python/100/100', 
      isJoined: false,
      chatHistory: [],
      sharedFiles: [],
    },
];

class StudyIQService {
    private notes: StudyNote[] = initialNotes;
    private conversation: AiAssistantMessage[] = initialConversation;
    private groups: StudyGroup[] = initialGroups;

    public stats = {
        focusTime: '3h 45m',
        streak: 5,
        badges: ['Early Bird', 'Night Owl', 'Focused Finisher']
    };
    
    // --- Notes ---
    getNotes() { return this.notes; }
    getNoteById(id: string) { return this.notes.find(n => n.id === id); }
    
    saveNote(noteData: Omit<StudyNote, 'id' | 'lastEdited'> & { id?: string }) {
        if (noteData.id) { // Update existing note
            this.notes = this.notes.map(n => n.id === noteData.id ? { ...n, ...noteData, lastEdited: 'Just now' } : n);
        } else { // Create new note
            const newNote: StudyNote = {
                ...noteData,
                id: new Date().toISOString(),
                lastEdited: 'Just now',
            };
            this.notes = [newNote, ...this.notes];
        }
        return this.notes;
    }

    // --- Flashcards ---
    getFlashcardsForNote(noteId: string): Flashcard[] {
        return flashcardDecks[noteId] || [];
    }

    // --- AI Assistant ---
    getConversation() { return this.conversation; }
    
    sendMessage(text: string) {
        const userMessage: AiAssistantMessage = { id: new Date().toISOString(), text, sender: 'user' };
        this.conversation = [...this.conversation, userMessage];

        setTimeout(() => {
            const aiResponse: AiAssistantMessage = {
                id: new Date().toISOString() + '_ai',
                text: "That's a fascinating question. Based on your notes, here's what I found...",
                sender: 'ai'
            };
            this.conversation = [...this.conversation, aiResponse];
        }, 1000);
        
        return this.conversation;
    }

    // --- Peer Hub / Study Rooms ---
    getGroups() { return this.groups; }
    getGroupById(id: string) { return this.groups.find(g => g.id === id); }
    
    joinGroup(groupId: string) {
        this.groups = this.groups.map(g => {
            if (g.id === groupId && !g.isJoined && g.members < g.capacity) {
                return { ...g, isJoined: true, members: g.members + 1 };
            }
            return g;
        });
        return this.groups;
    }

    sendMessageToGroup(groupId: string, text: string) {
        const group = this.getGroupById(groupId);
        if (!group) return;

        const userMessage: RoomChatMessage = {
            id: new Date().toISOString(),
            sender: 'user',
            userName: 'Alex',
            userAvatar: 'https://picsum.photos/id/237/100/100',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        group.chatHistory.push(userMessage);

        // AI command simulation
        if (text.startsWith('/')) {
            setTimeout(() => {
                let aiResponse: RoomChatMessage;
                if (text.startsWith('/quiz')) {
                    aiResponse = { id: new Date().toISOString() + '_ai', sender: 'ai', text: 'Okay, starting a quick quiz! What is the power rule for derivatives?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};
                } else if (text.startsWith('/summarize')) {
                     aiResponse = { id: new Date().toISOString() + '_ai', sender: 'ai', text: 'Based on our recent chat, the key topics are: the Power Rule, the Chain Rule, and Photosynthesis stages. I can elaborate on any of these.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};
                } else {
                     aiResponse = { id: new Date().toISOString() + '_ai', sender: 'ai', text: `I don't recognize that command. Try /quiz or /summarize.`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};
                }
                group.chatHistory.push(aiResponse);
            }, 1000);
        }
    }
    
    uploadFileToGroup(groupId: string) {
        const group = this.getGroupById(groupId);
        if (!group) return;

        const newFile: SharedFile = { id: new Date().toISOString(), name: 'Lecture_Notes_Week4.pdf', type: 'PDF', size: '2.5MB', uploader: 'Alex' };
        group.sharedFiles.push(newFile);

        const systemMessage: RoomChatMessage = {
            id: newFile.id + '_msg',
            sender: 'system',
            file: newFile,
            text: `Alex uploaded ${newFile.name}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        group.chatHistory.push(systemMessage);
    }
    
    triggerAiActionInGroup(groupId: string, action: 'summarize', file: SharedFile) {
         const group = this.getGroupById(groupId);
         if (!group) return;
         
         if (action === 'summarize') {
             const aiSummary: RoomChatMessage = {
                 id: new Date().toISOString() + '_ai',
                 sender: 'ai',
                 text: `Okay, here is a summary of "${file.name}": The document covers the main stages of Photosynthesis, focusing on the Calvin Cycle and light-dependent reactions. Key takeaways include the role of ATP and NADPH.`,
                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
             };
             group.chatHistory.push(aiSummary);
         }
    }
}

export const studyIQService = new StudyIQService();