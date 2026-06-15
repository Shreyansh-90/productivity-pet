'use client';

import { usePetStore } from '@/store/usePetStore';
import { useState, useEffect } from 'react';

interface HabitButtonProps {
  label: string;
  action: () => void;
}

// 💅 Upgraded Button Component
const HabitButton: React.FC<HabitButtonProps> = ({ label, action }) => (
  <button 
    onClick={action}
    className="flex items-center gap-4 w-full p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left active:scale-95 shadow-sm"
  >
    {/* Fake Checkbox Circle */}
    <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white flex-shrink-0" />
    
    <span className="font-semibold text-slate-700 text-lg">{label}</span>
    
    {/* XP Reward Badge */}
    <span className="ml-auto text-sm font-bold text-emerald-500 bg-emerald-100 px-3 py-1 rounded-full">
      +10 XP
    </span>
  </button>
);

const habits = [
  { id: 1, label: "Drink Water 💧" },
  { id: 2, label: "Read 10 Pages 📚" },
  { id: 3, label: "Exercise 🏃" }
];

export default function Home() {
  const { pet, gainXp } = usePetStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="flex flex-col gap-8">
      
      {/* 👑 Title Section */}
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Productivity Pet</h1>
        <p className="text-slate-500 font-medium">Complete daily habits to evolve your companion!</p>
      </div>

      {/* 📊 Pet Status Card */}
      <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 flex flex-col gap-3 shadow-inner">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{pet.name}</h2>
        
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-sm">Current XP</span>
          <span className="font-black text-blue-600 text-xl">{pet.xp} {pet.xp >= 100 ? "🏆" : "⭐"}</span>
        </div>
        
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-sm">Stage</span>
          <span className="font-bold text-emerald-600 text-lg">{pet.evolutionStage}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Daily Tasks</h3>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitButton key={habit.id} label={habit.label} action={gainXp} />
          ))}
        </div>
      </div>

    </main>
  );
}