'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, HeartPulse, Zap, Music, Link } from 'lucide-react';
import { Calendar } from '@/components/shadcnUI/calendar';
import { Button } from '@/components/shadcnUI/button';
import Spotify from '@/components/spotify';

// Mock data for the hover effect
const dailyHabits = [
  { id: 1, title: "Meditation", completed: true, time: "07:00 AM" },
  { id: 2, title: "Skincare routine", completed: false, time: "07:45 AM" },
  { id: 3, title: "Journaling", completed: true, time: "08:00 AM" },
  { id: 4, title: "Wake up & drink water", completed: false, time: "08:30 AM" },
];

export default function DashboardLayout() {
  // State to track which date is currently being hovered/clicked
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    setFormattedDate(today.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="min-h-screen border-2 border-amber-600 bg-white p-4 font-sans text-slate-800">
      <div className="max-w-350 mx-3 my-auto grid grid-cols-1 lg:grid-cols-13 gap-8">
        
        {/* ================= LEFT COLUMN (Col Span 3) ================= */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Header & Actions */}
          <div className=''>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Happy Tuesday <span className="text-3xl">👋</span></h1>
            <p className="text-sm text-slate-500 mb-6">{formattedDate || 'Loading date...'}</p>
            
            <Button variant='default'>
              + New Habits
            </Button>
          </div>

          {/* Interactive Calendar Widget */}
          <div className="bg-white p-2 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              classNames={{
                month: "w-full",
                month_grid: "w-68", 
                day: "w-full aspect-square flex justify-center overflow-visible",
              }}
              components={{
                DayButton: ({ day, modifiers, ...buttonProps }) => {
                  const dateInfo = day.date;
                  const isHovered = activeDate?.getTime() === dateInfo.getTime();
                  
                  return (
                    <div 
                      className="relative flex justify-center items-center w-full h-full"
                      onMouseEnter={() => setActiveDate(dateInfo)}
                      onMouseLeave={() => setActiveDate(null)}
                      onClick={() => setActiveDate(isHovered ? null : dateInfo)} // For Mobile
                    >
                      <button 
                        {...buttonProps}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          modifiers.today 
                            ? 'bg-orange-400 text-white shadow-md shadow-orange-200' 
                            : 'hover:bg-orange-50 text-slate-700'
                        }`}
                      >
                        {dateInfo.getDate()}
                      </button>

                      {/* ✨ THE HOVER POPOVER ✨ */}
                      {isHovered && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 p-4 z-50 animate-in fade-in zoom-in duration-200">
                          <h4 className="font-bold text-slate-800 mb-3 text-left">
                            {dateInfo.toLocaleDateString('en-US', { month: 'short' })} {dateInfo.getDate()}
                          </h4>
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
                }
              }}
            />
          </div>
          <Spotify />
        </div>

        {/* ================= MAIN DASHBOARD (Col Span 9) ================= */}
        <div className="lg:col-span-9 space-y-6">

          {/* Top Half: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Middle Column: Stats */}
            <div className="space-y-6">
              {/* Sleep Stats */}
              <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="font-bold text-lg mb-4">Sleep time</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8F9FA] p-4 rounded-2xl hover:bg-orange-400/5 transition-transform hover:scale-103">
                    <span className="font-bold text-xl">7h 20m</span>
                    <span className="text-sm text-slate-500 block mb-1">Total sleep</span>
                  </div>

                  <div className='bg-[#F8f9fa] p-4 rounded-2xl hover:bg-orange-400/5 transition-transform hover:scale-103'>
                    <span className='font-bold text-xl'>1h 9m</span>
                    <span className='text-sm text-slate-500 block mb-1'>Deep sleep</span>
                  </div>

                  <div className='bg-[#f8f9fa] p-4 rounded-2xl hover:bg-orange-400/5 transition-transform hover:scale-103'>
                    <span className='font-bold text-xl'>7h 28m</span>
                    <span className='text-sm text-slate-500 block mb-1'>Average Sleep</span>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded-2xl hover:bg-orange-400/5 transition-transform hover:scale-103">
                    <span className="font-bold text-xl text-indigo-500">82%</span>
                    <span className="text-sm text-slate-500 block mb-1">Quality</span>
                  </div>

                  
                </div>
              </div>

              {/* Vitals Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:scale-105 hover:bg-orange-400/5">
                   <HeartPulse className="w-6 h-6 text-rose-400 mb-3" />
                   <span className="text-sm text-slate-500 block">Heart rate</span>
                   <span className="font-bold text-2xl">72 <span className="text-sm font-normal text-slate-400">Bpm</span></span>
                </div>
                <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:scale-105 hover:bg-orange-400/5">
                   <Zap className="w-6 h-6 text-orange-400 mb-3" />
                   <span className="text-sm text-slate-500 block">Energy</span>
                   <span className="font-bold text-2xl">85 <span className="text-sm font-normal text-slate-400">/100</span></span>
                </div>
              </div>
            </div>


            {/* Right Column: Tasks & Integrations */}
            <div className="space-y-6">
              {/* Task List */}
              <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Today's Todos</h3>
                  <Button variant='outline' className='bg-slate-400/5 rounded-2xl'>
                    + Add Tasks
                  </Button>
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
              
              
            </div>

          </div>

          {/* Bottom Half: Habit Streak (Spans full width of the right container) */}
          <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                Habit streak <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-md ml-2">This month ▾</span>
              </h3>
            </div>
            
            {/* Horizontal Scrollable Streak Bar */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {[...Array(15)].map((_, i) => {
                const today = new Date().getDate();;
                const day = new Date().getDate() - 7 + i;;
                const isToday = new Date().getDate() === day;;
                const isMissed = day === 19 || day === 22 || day === 23;
                
                return (
                  <div key={i} className="flex flex-col items-center gap-2 min-w-12">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${isToday ? 'border-4 border-orange-400 text-orange-500' : 
                        isMissed ? 'bg-rose-50 text-rose-400' : 
                        day < today ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300'}`}
                    >
                      {isToday ? '🔥' : isMissed ? '!' : day < today  ? '✓' : ''}
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