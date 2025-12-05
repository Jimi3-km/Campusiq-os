
export type AppTab = 'Pulse' | 'Market' | 'StudyIQ' | 'FinIQ' | 'Performance';

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum Category {
    ALLOWANCE = 'Allowance',
    SIDE_HUSTLE = 'Side Hustle',
    FOOD = 'Food',
    TRANSPORT = 'Transport',
    HOUSING = 'Housing',
    ENTERTAINMENT = 'Entertainment',
    ACADEMICS = 'Academics',
    OTHER = 'Other',
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: Category;
    date: Date;
}

export interface AiInsight {
    summary: string;
    tip: string;
}

export interface UserProfile {
    name: string;
    handle: string;
    avatarUrl: string;
}

// --- Market Types ---
export interface MarketItem {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrls: string[];
  seller: string;
  location: string;
  description: string;
}

// --- Pulse Types ---
export interface Comment {
    id: string;
    user: UserProfile;
    text: string;
    time: string;
}

export interface CampusPulsePost {
  id: string;
  user: UserProfile;
  time: string;
  content: string;
  imageUrl?: string;
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    voted?: number; // index of the voted option
  };
  stats: {
      comments: number;
      reposts: number;
      likes: number;
  };
  comments: Comment[];
  isLiked?: boolean;
  isReposted?: boolean;
}

// --- StudyIQ Types ---
export type StudyIQView = 'home' | 'notes' | 'ai' | 'flashcards' | 'peer' | 'noteEditor' | 'studyRoom';

export interface SchedulerEvent {
  id: string;
  title: string;
  time: string;
  type: 'class' | 'exam' | 'assignment';
  completed: boolean;
}

export interface StudyNote {
  id: string;
  title: string;
  folder: string;
  tags: string[];
  lastEdited: string;
  content: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface AiAssistantMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  suggestions?: string[];
}

export interface SharedFile {
  id: string;
  name: string;
  type: 'PDF' | 'Image' | 'Note';
  size: string;
  uploader: string;
}

export interface RoomChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  userName?: string;
  userAvatar?: string;
  text?: string;
  file?: SharedFile;
  timestamp: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: number;
  capacity: number;
  avatarUrl: string;
  isJoined?: boolean;
  chatHistory: RoomChatMessage[];
  sharedFiles: SharedFile[];
}

// --- Performance (Results) Types ---
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface CourseRecord {
    id: string;
    code: string;
    name: string;
    grade: Grade;
    score: number;
    credits: number;
    status: 'Pass' | 'Fail';
}

export interface SemesterResult {
    id: string;
    name: string; // e.g., "2023/2024 Sem 1"
    gpa: number;
    courses: CourseRecord[];
}

export interface AcademicProfile {
    studentId: string;
    studentName: string;
    program: string; // e.g., "BSc. Computer Science"
    year: number;
    currentGPA: number;
    creditsEarned: number;
    creditsRequired: number;
    semesters: SemesterResult[];
}

export interface PerformanceCoachInsight {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    actionableTips: string[];
}

// --- CreateIQ Types ---
export interface CreateIQUser {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    hasStory: boolean;
}

export interface CreateIQComment {
    id: string;
    user: {
        name: string;
        handle: string;
        avatarUrl: string;
    };
    text: string;
}

export interface CreateIQPost {
    id: string;
    user: CreateIQUser;
    imageUrls: string[];
    caption: string;
    time: string;
    stats: {
        likes: number;
        comments: number;
        views: number;
    };
    comments: CreateIQComment[];
    isLiked: boolean;
    isSaved: boolean;
}

export interface CreateIQStory {
    id: string;
    type: 'image' | 'video';
    url: string;
    duration: number;
}

export interface ChatMessage {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
}

export interface DirectMessage {
    id: string;
    user: CreateIQUser;
    lastMessage: string;
    time: string;
    unreadCount: number;
    messages: ChatMessage[];
}

export type EditorFilter = 'none' | 'vintage' | 'vivid' | 'mono';
