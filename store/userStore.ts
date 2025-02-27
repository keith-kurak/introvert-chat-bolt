import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name?: string;
  avatar?: string;
}

interface UserState {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      
      updateUser: (updates) => set((state) => ({
        user: {
          ...state.user,
          ...updates,
        },
      })),
    }),
    {
      name: 'introvert-chat-user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);