// 'use client';

// import { usePetStore } from '@/store/usePetStore';
// import { useState, useEffect } from 'react';
// import { Circle, Flame, Trophy, Plus } from 'lucide-react';
// // 📥 Import your new Server Actions!
// import { getHabits, createHabit } from '@/actions/habits'; 

// export default function Home() {
//   // Grab the new setHabits function
//   const { pet, habits, gainXp, addHabit, setHabits } = usePetStore();
  
//   const [newHabitText, setNewHabitText] = useState('');
//   const [newHabitXp, setNewHabitXp] = useState(10);
//   const [isSubmitting, setIsSubmitting] = useState(false); // Add a loading state

//   // Load habits from PostgreSQL on mount
//   useEffect(() => {
    
//     async function loadDatabase() {
//       try {
//         const dbHabits = await getHabits();
//         setHabits(dbHabits);
//       } catch (error) {
//         console.error("Failed to load habits:", error);
//       }
//     }
    
//     loadDatabase();
//   }, [setHabits]);

//   // The new Database-powered submission
//   const handleAddHabit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newHabitText.trim() === '' || isSubmitting) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // 1. Optimistically update the UI instantly so it feels fast
//       addHabit(newHabitText, newHabitXp);
      
//       // 2. Actually save it to the PostgreSQL Database
//       await createHabit(newHabitText, newHabitXp);
      
//       // 3. Clear the form
//       setNewHabitText('');
//       setNewHabitXp(10);
//     } catch (error) {
//       console.error("Failed to save habit to database:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const xpPercentage = Math.min((pet.xp % 100), 100);
//   const currentLevel = Math.floor(pet.xp / 100) + 1;

//   return (
//     <div className="flex flex-col gap-8">
//       <header>
//         <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
//         <p className="text-muted-foreground mt-1">System status and daily objectives.</p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-card p-6 border border-border shadow-md">
//             <h2 className="text-lg font-semibold text-foreground mb-4">Initialize Objective</h2>
//             <form onSubmit={handleAddHabit} className="flex gap-3">
//               <input 
//                 type="text" 
//                 value={newHabitText}
//                 onChange={(e) => setNewHabitText(e.target.value)}
//                 placeholder="e.g. Extract Data"
//                 disabled={isSubmitting}
//                 className="flex-1 p-3 bg-background border border-input text-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
//               />
//               <div className="flex items-center gap-2 bg-background border border-input px-3">
//                 <span className="text-sm font-semibold text-muted-foreground">XP:</span>
//                 <input 
//                   type="number" 
//                   value={newHabitXp}
//                   onChange={(e) => setNewHabitXp(Number(e.target.value))}
//                   disabled={isSubmitting}
//                   className="w-16 p-2 bg-transparent focus:outline-none font-bold text-primary disabled:opacity-50"
//                   min="1"
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={isSubmitting}
//                 className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 transition-colors flex items-center justify-center disabled:opacity-50"
//               >
//                 <Plus className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
//               </button>
//             </form>
//           </div>

//           <div className="bg-card p-6 border border-border shadow-md">
//             <h2 className="text-xl font-semibold text-foreground mb-4">Active Objectives</h2>
//             <div className="flex flex-col gap-3">
//               {habits.length === 0 ? (
//                 <div className="text-center py-8 text-muted-foreground font-medium">
//                   No objectives initialized.
//                 </div>
//               ) : (
//                 habits.map((habit) => (
//                   <button 
//                     key={habit.id}
//                     onClick={() => gainXp(habit.xpReward)}
//                     className="group flex items-center justify-between p-4 bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all text-left active:scale-[0.99]"
//                   >
//                     <div className="flex items-center gap-4">
//                       <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
//                       {/* 🔄 Updated to display habit.title */}
//                       <span className="font-medium text-foreground group-hover:text-primary transition-colors">
//                         {habit.title} 
//                       </span>
//                     </div>
//                     <span className="text-sm font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       +{habit.xpReward} XP
//                     </span>
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ... Right Column (Pet Status) remains exactly the same! ... */}
//         <div className="space-y-6">
          
//           <div className="bg-card p-6 border border-border shadow-md">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-16 h-16 bg-background border border-border flex items-center justify-center">
//                 <span className="text-3xl">👾</span>
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-foreground tracking-tight">{pet.name}</h2>
//                 <p className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 inline-block mt-1 uppercase">
//                   {pet.evolutionStage}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between text-xs font-mono">
//                 <span className="text-muted-foreground">LVL {currentLevel}</span>
//                 <span className="text-primary">{pet.xp % 100} / 100 XP</span>
//               </div>
//               <div className="w-full h-2 bg-muted overflow-hidden border border-border/50">
//                 <div 
//                   className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_var(--primary)]"
//                   style={{ width: `${xpPercentage}%` }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-card p-5 border border-border shadow-md flex flex-col items-center justify-center text-center">
//               <Flame className="w-8 h-8 text-accent mb-2" />
//               <span className="text-2xl font-bold text-foreground font-mono">12</span>
//               <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Streak</span>
//             </div>
//             <div className="bg-card p-5 border border-border shadow-md flex flex-col items-center justify-center text-center">
//               <Trophy className="w-8 h-8 text-primary mb-2" />
//               <span className="text-2xl font-bold text-foreground font-mono">{pet.xp}</span>
//               <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Total XP</span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, HeartPulse, Zap, Music } from 'lucide-react';

// Mock data for the hover effect
const dailyHabits = [
  { id: 1, title: "Meditation", completed: true, time: "07:00 AM" },
  { id: 2, title: "Skincare routine", completed: false, time: "07:45 AM" },
  { id: 3, title: "Journaling", completed: true, time: "08:00 AM" },
  { id: 4, title: "Wake up & drink water", completed: false, time: "08:30 AM" },
];

export default function DashboardLayout() {
  // State to track which date is currently being hovered/clicked
  const [activeDate, setActiveDate] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 lg:p-8 font-sans text-slate-800">
      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= LEFT COLUMN (Col Span 3) ================= */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Header & Actions */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">Happy Tuesday <span className="text-3xl">👋</span></h1>
            <p className="text-sm text-slate-500 mb-6">30 Dec 2023, 10:03 am</p>
            
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 mb-3">
              + New Habits
            </button>
          </div>

          {/* Interactive Calendar Widget */}
          <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">December, 2023</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-400">&lt;</button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-400 text-white shadow-md shadow-orange-200">&gt;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
              {/* Day Headers */}
              {['S','M','T','W','T','F','S'].map((day, i) => (
                <div key={i} className="text-slate-400 font-medium">{day}</div>
              ))}
              
              {/* Dates */}
              {[...Array(31)].map((_, i) => {
                const date = i + 1;
                const isToday = date === 16; // Mock today
                
                return (
                  <div key={date} className="relative flex justify-center">
                    <button 
                      onMouseEnter={() => setActiveDate(date)}
                      onMouseLeave={() => setActiveDate(null)}
                      onClick={() => setActiveDate(activeDate === date ? null : date)} // For Mobile
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        isToday 
                          ? 'bg-orange-400 text-white shadow-md shadow-orange-200' 
                          : 'hover:bg-orange-50 text-slate-700'
                      }`}
                    >
                      {date}
                    </button>

                    {/* ✨ THE HOVER POPOVER ✨ */}
                    {activeDate === date && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 p-4 z-50 animate-in fade-in zoom-in duration-200">
                        <h4 className="font-bold text-slate-800 mb-3 text-left">Dec {date} Habits</h4>
                        <div className="space-y-3">
                          {dailyHabits.map(habit => (
                            <div key={habit.id} className="flex items-center justify-between group text-left">
                              <div className="flex items-center gap-3">
                                {habit.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                                )}
                                <div className="flex flex-col">
                                  <span className={`text-sm font-medium ${habit.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                    {habit.title}
                                  </span>
                                  <span className="text-[10px] text-slate-400">{habit.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= MAIN DASHBOARD (Col Span 9) ================= */}
        <div className="lg:col-span-9 space-y-6">

          {/* Top Half: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Middle Column: Stats */}
            <div className="space-y-6">
              {/* Sleep Stats */}
              <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
                <h3 className="font-bold text-lg mb-4">Sleep time</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8F9FA] p-4 rounded-2xl">
                    <span className="font-bold text-xl">7h 20m</span>
                    <span className="text-sm text-slate-500 block mb-1">Total sleep</span>
                  </div>

                  <div className='bg-[#F8f9fa] p-4 rounded-2xl'>
                    <span className='font-bold text-xl'>1h 9m</span>
                    <span className='text-sm text-slate-500 block mb-1'>Deep sleep</span>
                  </div>

                  <div className='bg-[#f8f9fa] p-4 rounded-2xl'>
                    <span className='font-bold text-xl'>7h 28m</span>
                    <span className='text-sm text-slate-500 block mb-1'>Average Sleep</span>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded-2xl">
                    <span className="font-bold text-xl text-indigo-500">82%</span>
                    <span className="text-sm text-slate-500 block mb-1">Quality</span>
                  </div>

                  
                </div>
              </div>

              {/* Vitals Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
                   <HeartPulse className="w-6 h-6 text-rose-400 mb-3" />
                   <span className="text-sm text-slate-500 block">Heart rate</span>
                   <span className="font-bold text-2xl">72 <span className="text-sm font-normal text-slate-400">Bpm</span></span>
                </div>
                <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
                   <Zap className="w-6 h-6 text-orange-400 mb-3" />
                   <span className="text-sm text-slate-500 block">Energy</span>
                   <span className="font-bold text-2xl">85 <span className="text-sm font-normal text-slate-400">/100</span></span>
                </div>
              </div>
            </div>

            {/* Right Column: Tasks & Integrations */}
            <div className="space-y-6">
              {/* Task List */}
              <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Today's Todos</h3>
                  <button className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors">
                    + Add Tasks
                  </button>
                </div>
                
                <div className="space-y-4">
                  {dailyHabits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                           <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-semibold ${habit.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{habit.title}</p>
                          <p className="text-xs text-slate-400">{habit.time}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${habit.completed ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
                        {habit.completed ? '✓ Done' : 'Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spotify Card styled with the energetic theme */}
              <div className="bg-linear-to-br from-emerald-400 to-emerald-600 p-6 rounded-4xl shadow-xl shadow-emerald-200/50 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Focus Music</h3>
                  <p className="text-sm text-emerald-50 opacity-90 mb-4">Enhance your deep work.</p>
                  <button className="bg-white text-emerald-600 text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform shadow-sm">
                    Connect Spotify
                  </button>
                </div>
                <Music className="w-16 h-16 opacity-50" />
              </div>
            </div>

          </div>

          {/* Bottom Half: Habit Streak (Spans full width of the right container) */}
          <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-100/50 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                Habit streak <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-md ml-2">This month ▾</span>
              </h3>
            </div>
            
            {/* Horizontal Scrollable Streak Bar */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {[...Array(15)].map((_, i) => {
                const day = i + 12;
                const isToday = day === 22;
                const isMissed = day === 15 || day === 16 || day === 17;
                
                return (
                  <div key={i} className="flex flex-col items-center gap-2 min-w-12">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${isToday ? 'border-4 border-orange-400 text-orange-500' : 
                        isMissed ? 'bg-rose-50 text-rose-400' : 
                        day < 22 ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300'}`}
                    >
                      {isToday ? '🔥' : isMissed ? '!' : day < 22 ? '✓' : ''}
                    </div>
                    <span className={`text-xs ${isToday ? 'font-bold text-slate-800' : 'text-slate-400'}`}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}