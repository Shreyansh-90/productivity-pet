'use client';

import { usePetStore } from '@/store/usePetStore';
import { useState, useEffect } from 'react';
import { Circle, Flame, Trophy, Plus } from 'lucide-react';
// 📥 Import your new Server Actions!
import { getHabits, createHabit } from '@/actions/habits'; 

export default function Home() {
  // Grab the new setHabits function
  const { pet, habits, gainXp, addHabit, setHabits } = usePetStore();
  const [isMounted, setIsMounted] = useState(false);
  
  const [newHabitText, setNewHabitText] = useState('');
  const [newHabitXp, setNewHabitXp] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a loading state

  // Load habits from PostgreSQL on mount
  useEffect(() => {
    setIsMounted(true);
    
    async function loadDatabase() {
      try {
        const dbHabits = await getHabits();
        setHabits(dbHabits);
      } catch (error) {
        console.error("Failed to load habits:", error);
      }
    }
    
    loadDatabase();
  }, [setHabits]);

  if (!isMounted) return null;

  // The new Database-powered submission
  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitText.trim() === '' || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Optimistically update the UI instantly so it feels fast
      addHabit(newHabitText, newHabitXp);
      
      // 2. Actually save it to the PostgreSQL Database
      await createHabit(newHabitText, newHabitXp);
      
      // 3. Clear the form
      setNewHabitText('');
      setNewHabitXp(10);
    } catch (error) {
      console.error("Failed to save habit to database:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const xpPercentage = Math.min((pet.xp % 100), 100);
  const currentLevel = Math.floor(pet.xp / 100) + 1;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">System status and daily objectives.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 border border-border shadow-md">
            <h2 className="text-lg font-semibold text-foreground mb-4">Initialize Objective</h2>
            <form onSubmit={handleAddHabit} className="flex gap-3">
              <input 
                type="text" 
                value={newHabitText}
                onChange={(e) => setNewHabitText(e.target.value)}
                placeholder="e.g. Extract Data"
                disabled={isSubmitting}
                className="flex-1 p-3 bg-background border border-input text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <div className="flex items-center gap-2 bg-background border border-input px-3">
                <span className="text-sm font-semibold text-muted-foreground">XP:</span>
                <input 
                  type="number" 
                  value={newHabitXp}
                  onChange={(e) => setNewHabitXp(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="w-16 p-2 bg-transparent focus:outline-none font-bold text-primary disabled:opacity-50"
                  min="1"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Plus className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
              </button>
            </form>
          </div>

          <div className="bg-card p-6 border border-border shadow-md">
            <h2 className="text-xl font-semibold text-foreground mb-4">Active Objectives</h2>
            <div className="flex flex-col gap-3">
              {habits.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground font-medium">
                  No objectives initialized.
                </div>
              ) : (
                habits.map((habit) => (
                  <button 
                    key={habit.id}
                    onClick={() => gainXp(habit.xpReward)}
                    className="group flex items-center justify-between p-4 bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all text-left active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      {/* 🔄 Updated to display habit.title */}
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {habit.title} 
                      </span>
                    </div>
                    <span className="text-sm font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      +{habit.xpReward} XP
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ... Right Column (Pet Status) remains exactly the same! ... */}
        <div className="space-y-6">
          
          <div className="bg-card p-6 border border-border shadow-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-background border border-border flex items-center justify-center">
                <span className="text-3xl">👾</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">{pet.name}</h2>
                <p className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 inline-block mt-1 uppercase">
                  {pet.evolutionStage}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">LVL {currentLevel}</span>
                <span className="text-primary">{pet.xp % 100} / 100 XP</span>
              </div>
              <div className="w-full h-2 bg-muted overflow-hidden border border-border/50">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_var(--primary)]"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-5 border border-border shadow-md flex flex-col items-center justify-center text-center">
              <Flame className="w-8 h-8 text-accent mb-2" />
              <span className="text-2xl font-bold text-foreground font-mono">12</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Streak</span>
            </div>
            <div className="bg-card p-5 border border-border shadow-md flex flex-col items-center justify-center text-center">
              <Trophy className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground font-mono">{pet.xp}</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Total XP</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}