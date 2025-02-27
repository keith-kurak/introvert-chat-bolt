import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Persona, Message } from '@/types';
import { generateId } from '@/utils/helpers';

// Default personas to add when app is first launched
const defaultPersonas: Omit<Persona, 'id' | 'messages'>[] = [
  {
    name: 'Creative',
    color: '#3B82F6', // blue-500
    favorite: false,
    emoji: '🎨'
  },
  {
    name: 'Work',
    color: '#EF4444', // red-500
    favorite: false,
    emoji: '👔'
  },
  {
    name: 'Home Improvement',
    color: '#8B5CF6', // purple-500
    favorite: false,
    emoji: '🏠'
  },
  {
    name: 'Bookworm',
    color: '#22C55E', // green-500
    favorite: false,
    emoji: '📚'
  },
];

interface PersonaState {
  personas: Persona[];
  initialized: boolean;
  addPersona: (personaData: Omit<Persona, 'id' | 'messages'>) => void;
  updatePersona: (id: string, updates: Partial<Persona>) => void;
  deletePersona: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addMessage: (personaId: string, messageData: Omit<Message, 'id'>) => void;
  updateMessage: (personaId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (personaId: string, messageId: string) => void;
  initializeDefaultPersonas: () => void;
}

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set, get) => ({
      personas: [],
      initialized: false,
      
      addPersona: (personaData) => set((state) => ({
        personas: [
          ...state.personas,
          {
            id: generateId(),
            ...personaData,
            messages: [],
          },
        ],
      })),
      
      updatePersona: (id, updates) => set((state) => ({
        personas: state.personas.map((persona) =>
          persona.id === id ? { ...persona, ...updates } : persona
        ),
      })),
      
      deletePersona: (id) => set((state) => ({
        personas: state.personas.filter((persona) => persona.id !== id),
      })),
      
      toggleFavorite: (id) => set((state) => ({
        personas: state.personas.map((persona) =>
          persona.id === id ? { ...persona, favorite: !persona.favorite } : persona
        ),
      })),
      
      addMessage: (personaId, messageData) => set((state) => ({
        personas: state.personas.map((persona) => {
          if (persona.id === personaId) {
            return {
              ...persona,
              messages: [
                ...(persona.messages || []),
                {
                  id: generateId(),
                  ...messageData,
                },
              ],
            };
          }
          return persona;
        }),
      })),
      
      updateMessage: (personaId, messageId, updates) => set((state) => ({
        personas: state.personas.map((persona) => {
          if (persona.id === personaId) {
            return {
              ...persona,
              messages: (persona.messages || []).map((message) =>
                message.id === messageId ? { ...message, ...updates } : message
              ),
            };
          }
          return persona;
        }),
      })),
      
      deleteMessage: (personaId, messageId) => set((state) => ({
        personas: state.personas.map((persona) => {
          if (persona.id === personaId) {
            return {
              ...persona,
              messages: (persona.messages || []).filter(
                (message) => message.id !== messageId
              ),
            };
          }
          return persona;
        }),
      })),

      initializeDefaultPersonas: () => {
        const { personas, initialized } = get();
        
        // Only add default personas if there are none and we haven't initialized before
        if (personas.length === 0 && !initialized) {
          defaultPersonas.forEach(persona => {
            get().addPersona(persona);
          });
          
          // Mark as initialized so we don't add defaults again
          set({ initialized: true });
        }
      },
    }),
    {
      name: 'introvert-chat-personas',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // When storage is rehydrated, check if we need to initialize default personas
        if (state) {
          setTimeout(() => {
            state.initializeDefaultPersonas();
          }, 100);
        }
      },
    }
  )
);