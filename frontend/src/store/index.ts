import { create } from "zustand";

interface User {
  id: string;
  grade?: number;
  fullName?: string;
}

interface UserStats {
  totalQuizzes: 0;
  averageScore: 0;
  topScore: 0;
  completedToday: 0;
  streakDays: 0
}

interface UserStore {
  user: User | null;
  userStats?: UserStats | null;
  setUser: (user: User | null) => void;
  updateUserGrade: (grade: number) => void;
  setUserStats: (stats: UserStats) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  setUserStats: (userStats) => set({ userStats }),
  updateUserGrade: (grade) =>
    set((state) => ({
      user: state.user ? { ...state.user, grade } : null,
    })),
}));
