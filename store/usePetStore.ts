import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Habit {
  id: string;
  title: string;
  xpReward: number;
}

interface PetStore {
  pet: {
    xp: number;
    name: string;
    age: number;
    sleepingHabits: string;
    eatingHabits: string;
    evolutionStage: string;
    allergies: string;
  };
  habits: Habit[];
  gainXp: (amount: number) => void;
  updateName: (newName: string) => void;
  buyFood: (cost: number, newFood: string) => void;
  addHabit: (title: string, xpReward: number) => void;
  setHabits: (habits: Habit[]) => void;
}

export const usePetStore = create<PetStore>()(
  persist(
    (set) => ({
      pet: {
        xp: 0,
        name: 'Jarvis',
        age: 0,
        sleepingHabits: 'Sleeps 6 hours a day',
        eatingHabits: 'Eats 4 times a day',
        evolutionStage: 'System Initialized',
        allergies: 'None',
      },
      habits: [],

      gainXp: (amount: number) => set((state) => {
        const newXp = state.pet.xp + amount;
        let newEvolutionStage = state.pet.evolutionStage;

        if (newXp === 100) { 
          newEvolutionStage = "Baby Monster";
          // when xp reaches 100, reset it to 0.
          setTimeout(() => {
            set((state) => ({ pet: { ...state.pet, xp: 0 } }));
          }, 1000); // Reset after 1 second
        }
        else if (newXp >= 30) newEvolutionStage = "Optimizing according to environment";

        return { pet: { ...state.pet, xp: newXp, evolutionStage: newEvolutionStage } };
      }),

      updateName: (newName: string) => set((state) => ({ pet: { ...state.pet, name: newName } })),
      
      buyFood: (cost: number, newFood: string) => set((state) => {
        if (state.pet.xp >= cost) {
          return { pet: { ...state.pet, xp: state.pet.xp - cost, eatingHabits: `${state.pet.eatingHabits}, ${newFood}` } }; 
        }
        return state;
      }),

      addHabit: (title: string, xpReward: number) => set((state) => ({
        habits: [{ id: Date.now().toString(), title, xpReward }, ...state.habits]
      })),

      
      setHabits: (habits: Habit[]) => set({ habits }),
    }),
    { name: 'pet-storage' }
  )
);