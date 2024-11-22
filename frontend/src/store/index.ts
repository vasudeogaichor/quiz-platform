import { create } from "zustand";

interface User {
  id: string;
  grade?: number;
  fullName?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserGrade: (grade: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUserGrade: (grade) =>
    set((state) => ({
      user: state.user ? { ...state.user, grade } : null,
    })),
}));
