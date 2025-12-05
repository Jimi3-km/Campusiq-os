
import { CreateIQUser, CreateIQPost, CreateIQStory, DirectMessage, CreateIQComment } from '../types';

export const users: CreateIQUser[] = [
    { id: 'u1', name: 'Creative Lion', handle: 'liondesigns', avatarUrl: 'https://picsum.photos/seed/lion/100/100', hasStory: true },
    { id: 'u2', name: 'Artsie Gazelle', handle: 'gazelleart', avatarUrl: 'https://picsum.photos/seed/gazelle/100/100', hasStory: true },
    { id: 'u3', name: 'Wise Owl Studios', handle: 'owlstudios', avatarUrl: 'https://picsum.photos/seed/owl/100/100', hasStory: false },
    { id: 'u4', name: 'Campus Photographer', handle: 'uon_snaps', avatarUrl: 'https://picsum.photos/seed/photographer/100/100', hasStory: true },
    { id: 'u5', name: 'Nairobi Foodie', handle: 'nairobites', avatarUrl: 'https://picsum.photos/seed/foodie/100/100', hasStory: false },
    { id: 'u6', name: 'Fashion Student', handle: 'campus_style', avatarUrl: 'https://picsum.photos/seed/fashion/100/100', hasStory: true },
    { id: 'u7', name: 'Alex Doe', handle: 'alex_doe', avatarUrl: 'https://picsum.photos/id/237/100/100', hasStory: false },
    { id: 'u8', name: 'Travel Bug', handle: 'tembea_kenya', avatarUrl: 'https://picsum.photos/seed/travel/100/100', hasStory: true },
    { id: 'u9', name: 'Gym Enthusiast', handle: 'campus_fit', avatarUrl: 'https://picsum.photos/seed/gym/100/100', hasStory: false },
    { id: 'u10', name: 'Tech Bro', handle: 'code_master', avatarUrl: 'https://picsum.photos/seed/tech/100/100', hasStory: false },
];

const currentUser = users[6]; // Alex Doe

export const stories: { [key: string]: CreateIQStory[] } = {
    'u1': [{ id: 's1', type: 'image', url: 'https://picsum.photos/seed/lionstory1/1080/1920', duration: 5 }],
    'u2': [
        { id: 's2', type: 'image', url: 'https://picsum.photos/seed/gazellestory1/1080/1920', duration: 5 },
        { id: 's3', type: 'image', url: 'https://picsum.photos/seed/gazellestory2/1080/1920', duration: 5 },
    ],
    'u4': [{ id: 's4', type: 'image', url: 'https://picsum.photos/seed/photostory1/1080/1920', duration: 5 }],
    'u6': [{ id: 's5', type: 'image', url: 'https://picsum.photos/seed/fashionstory1/1080/1920', duration: 5 }],
    'u8': [
        { id: 's6', type: 'image', url: 'https://picsum.photos/seed/travelstory1/1080/1920', duration: 5 },
        { id: 's7', type: 'image', url: 'https://picsum.photos/seed/travelstory2/1080/1920', duration: 5 },
    ],
};

const sampleComments: { [key: string]: CreateIQComment[] } = {
    p1: [
        {id: 'c1', user: users[1], text: 'Such a vibe!'},
        {id: 'c2', user: users[2], text: 'Amazing shot!'},
    ],
    p2: [
        {id: 'c3', user: users[0], text: 'I need to go there!'},
    ],
    p3: [
        {id: 'c4', user: users[4], text: 'Definitely look 1!'},
        {id: 'c5', user: users[0], text: 'Look 2 is more my style'},
        {id: 'c6', user: users[1], text: 'Both are 🔥'},
    ]
}

export const posts: CreateIQPost[] = [
    {
        id: 'p1', user: users[3], imageUrls: ['https://picsum.photos/seed/campusview/1080/1080'],
        caption: 'Golden hour at the main tower. This campus never gets old. ✨ #UoNLife #NairobiVibes',
        time: '2h', stats: { likes: 1204, comments: 2, views: 10500 }, comments: sampleComments.p1, isLiked: false, isSaved: false,
    },
    {
        id: 'p2', user: users[4], imageUrls: ['https://picsum.photos/seed/chapati/1080/1080'],
        caption: 'Finally tried the famous chapati wraps near the student center. 10/10 would recommend!',
        time: '5h', stats: { likes: 891, comments: 1, views: 7200 }, comments: sampleComments.p2, isLiked: true, isSaved: false,
    },
    {
        id: 'p3', user: users[5], imageUrls: ['https://picsum.photos/seed/outfit1/1080/1350', 'https://picsum.photos/seed/outfit2/1080/1350'],
        caption: 'Exam week fit check. Keeping it comfy but stylish. Which look is better, 1 or 2? 🤔 #CampusStyle #OOTD. This is a much longer caption to test the expandability of the text area to see if the "more" button appears and functions as expected on mobile and larger screens.',
        time: '1d', stats: { likes: 2345, comments: 3, views: 15200 }, comments: sampleComments.p3, isLiked: false, isSaved: true,
    },
    {
        id: 'p4', user: users[0], imageUrls: ['https://picsum.photos/seed/designproject/1080/1080'],
        caption: 'Late night grind on my final design project. The hustle is real but so rewarding. #Studentpreneur #GraphicDesign',
        time: '1d', stats: { likes: 782, comments: 0, views: 5600 }, comments: [], isLiked: false, isSaved: false,
    },
    {
        id: 'p5', user: users[7], imageUrls: ['https://picsum.photos/seed/karura/1080/1080'],
        caption: 'Weekend escape to Karura Forest. Much needed break from the books. 🌳 #TembeaKenya #Nature',
        time: '2d', stats: { likes: 1560, comments: 0, views: 12300 }, comments: [], isLiked: true, isSaved: true,
    },
];

export const dms: DirectMessage[] = [
    { 
        id: 'dm1', 
        user: users[0], 
        lastMessage: 'Hey, love your latest design!', 
        time: '1h', 
        unreadCount: 1,
        messages: [
            { id: 'm1-1', text: 'Hey, love your latest design!', senderId: currentUser.id, timestamp: '1h ago' },
            { id: 'm1-2', text: 'Thanks so much! I appreciate it.', senderId: users[0].id, timestamp: '1h ago' },
        ]
    },
    { 
        id: 'dm2', 
        user: users[1], 
        lastMessage: 'Sure, I can send you the details.', 
        time: '3h', 
        unreadCount: 0,
        messages: [
            { id: 'm2-1', text: 'Hey! Are you free to work on the project this afternoon?', senderId: currentUser.id, timestamp: '4h ago' },
            { id: 'm2-2', text: 'Hey! I have a class until 3, but free after that. I can send you the details of what I have so far.', senderId: users[1].id, timestamp: '3h ago' },
            { id: 'm2-3', text: 'Perfect, sounds good.', senderId: currentUser.id, timestamp: '3h ago' },
        ]
    },
    { 
        id: 'dm3', 
        user: users[4], 
        lastMessage: 'You have to try their new recipe!', 
        time: '1d', 
        unreadCount: 0,
        messages: [
            { id: 'm3-1', text: 'That wrap looks amazing! Where did you get it?', senderId: currentUser.id, timestamp: '1d ago' },
            { id: 'm3-2', text: 'It\'s from the small kiosk behind the main library. You have to try their new recipe!', senderId: users[4].id, timestamp: '1d ago' },
        ]
    },
];