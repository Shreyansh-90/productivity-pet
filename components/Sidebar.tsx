'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePetStore } from '@/store/usePetStore';
import { LayoutDashboard, User, Store, Settings } from 'lucide-react';

export default function Sidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const currentPath = usePathname();
  const { pet } = usePetStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/shop', label: 'Shop', icon: Store },
  ] as const;

  const currentLevel = isMounted ? Math.floor(pet.xp / 100) + 1 : 1;
  const xpPercentage = isMounted ? Math.min((pet.xp % 100), 100) : 0;

  return (
    <div className="fixed left-0 w-full flex justify-center z-40">
      <nav className="flex items-center justify-between w-full gap-4 bg-transparent backdrop-blur-[5px] backdrop-saturate-100 border border-white px-6  py-3">
        
        {/* Left: Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-slate-800 text-lg hidden md:block whitespace-nowrap">
            Productivity Pet
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-6">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = currentPath === to;
            return (
              <Link
                key={to}
                href={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={label}
              >
                <Icon strokeWidth={2} className="w-5 h-5 shrink-0" />
                <span className="hidden sm:block whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Pet Stats & Settings */}
        <div className="flex items-center gap-20">
          {isMounted && (
            <div className="hidden lg:flex flex-col w-32">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Level {currentLevel}</span>
                <span className="text-blue-600">{pet.xp % 100}/100 XP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500" 
                  style={{ width: `${xpPercentage}%` }} 
                />
              </div>
            </div>
          )}
          
          <button 
            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full transition-colors shrink-0" 
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

      </nav>
    </div>
  );
}