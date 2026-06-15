import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define the blueprint for our store
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
  gainXp: () => void;
  updateName: (newName: string) => void;
  buyFood: (cost: number, newFood: string) => void; 
}

export const usePetStore = create<PetStore>()(
  persist (
    (set) => ({
      pet: {
        xp: 0,
        name: 'Fluffy',
        age: 0,
        sleepingHabits: 'Sleeps 6 hours a day',
        eatingHabits: 'Eats 4 times a day',
        evolutionStage: 'Just installed',
        allergies: 'None',
    },
    // gainXp increases the xp by 10 and when certain xp reached it updates the evolution stage.
      gainXp: () => set((state) => {
        const newXp = state.pet.xp + 10;
        let newEvolutionStage = state.pet.evolutionStage;

        if (newXp >= 100) {
          newEvolutionStage = "Baby Monster";
        } else if (newXp >= 30) {
          newEvolutionStage = "Optimizing according to environment";
        } else {
          newEvolutionStage = "Just installed";
        }

        return {
          pet: {
            ...state.pet,
            xp:newXp,
            evolutionStage: newEvolutionStage,
          }
        };
      }),
      updateName: (newName: string) => set((state) => ({ pet: { ...state.pet, name: newName }})),

       buyFood: (cost: number, newFood: string)  => set((state) => {
      if (state.pet.xp >= cost) {
        return {
          pet: {
            ...state.pet,
            xp: state.pet.xp - cost,
            eatingHabits: `${state.pet.eatingHabits}, ${newFood}`,
          }
        }
      }
      else {
          alert("Not enough XP to buy this food!");
          return state;
        }
    }),
    }),
    {
      name: 'pet-storage', // name of the localstorage key
    }
  )
);