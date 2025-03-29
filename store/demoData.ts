import { Persona } from '@/types';

export const demoPersonas: Persona[] = [
  {
    id: 'demo-creative',
    name: 'Creative',
    color: '#3B82F6',
    emoji: '🎨',
    favorite: true,
    messages: [
      {
        id: 'msg-1',
        content: 'What song should I learn next on guitar?',
        type: 'question',
        timestamp: Date.now() - 3600000,
      },
      {
        id: 'msg-2',
        content: 'I\'ve been thinking about learning "Wonderwall" by Oasis. It\'s a classic and has some great chord progressions to practice.',
        type: 'answer',
        timestamp: Date.now() - 3500000,
      },
      {
        id: 'msg-3',
        content: 'Practice schedule',
        type: 'header1',
        timestamp: Date.now() - 3400000,
      },
      {
        id: 'msg-4',
        content: 'Practice chord transitions for 15 minutes',
        type: 'checkbox',
        checked: true,
        timestamp: Date.now() - 3300000,
      },
      {
        id: 'msg-5',
        content: 'Work on strumming pattern',
        type: 'checkbox',
        checked: false,
        timestamp: Date.now() - 3200000,
      },
    ],
  },
  {
    id: 'demo-work',
    name: 'Work',
    color: '#EF4444',
    emoji: '👔',
    favorite: true,
    messages: [
      {
        id: 'msg-6',
        content: 'Project Ideas',
        type: 'header1',
        timestamp: Date.now() - 7200000,
      },
      {
        id: 'msg-7',
        content: '1. Implement dark mode',
        type: 'listItem',
        timestamp: Date.now() - 7100000,
      },
      {
        id: 'msg-8',
        content: '2. Add offline support',
        type: 'listItem',
        timestamp: Date.now() - 7000000,
      },
      {
        id: 'msg-9',
        content: '3. Optimize performance',
        type: 'listItem',
        timestamp: Date.now() - 6900000,
      },
      {
        id: 'msg-13',
        content: 'Write that TPS report',
        type: 'checkbox',
        checked: false,
        timestamp: Date.now() - 3200000,
      },
    ],
  },
  {
    id: 'demo-home',
    name: 'Home Improvement',
    color: '#8B5CF6',
    emoji: '🏠',
    favorite: false,
    messages: [
      {
        id: 'msg-10',
        content: 'Home Projects',
        type: 'header1',
        timestamp: Date.now() - 10800000,
      },
      {
        id: 'msg-11',
        content: 'Need to repaint the living room. Should I go with a light gray or keep it white?',
        type: 'question',
        timestamp: Date.now() - 10700000,
      },
      {
        id: 'msg-12',
        content: 'Light gray would add more warmth and character to the space while still keeping it neutral.',
        type: 'answer',
        timestamp: Date.now() - 10600000,
      },
    ],
  },
]; 