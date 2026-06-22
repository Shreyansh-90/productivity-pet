'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePetStore } from '@/store/usePetStore';
import { LayoutDashboard, User, Store, ChevronLeft, ChevronRight, Settings } from 'lucide-react'; // 🌙 Add Sun and Moon


export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div className={`relative flex flex-col bg-card border-r border-border h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-card border border-border rounded-full p-1.5 hover:bg-muted transition-colors z-10"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-muted-foreground" /> : <ChevronLeft className="w-4 h-4 text-muted-foreground" />}
      </button>

      <div className="flex items-center h-20 px-6 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <span className="text-primary-foreground font-bold text-xl">
            P
          </span>
        </div>
        {!isCollapsed && 
        <span className="ml-3 font-bold text-foreground text-lg whitespace-nowrap">
          Productivity Pet
        </span>}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map(({ to, label, icon}) =>{
          const isActive = currentPath === to;
          const Icon = icon;
          const item = { name: label, to, icon };
          return (
            <Link
              key={to}
              href={to}
              className={`flex items-center px-3 py-3 rounded-none transition-all ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon size={22} strokeWidth={2} className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              {!isCollapsed && 
              <span className="ml-3 font-medium whitespace-nowrap">
                {item.name}
              </span>}
            </Link>
          );
        })}
      </nav>

      {isMounted && (
        <div className="px-4 py-2 mt-auto">
          {!isCollapsed ? (
            <div className="bg-background rounded-none p-3 border border-border">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-muted-foreground">Level {currentLevel}</span>
                <span className="text-primary">{pet.xp % 100}/100 XP</span>
              </div>
              <div className="w-full h-2 bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${xpPercentage}%` }} />
              </div>
            </div>
          ) : (
            <div className="w-full h-2 bg-muted overflow-hidden mt-2" title={`${pet.xp % 100}/100 XP`}>
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${xpPercentage}%` }} />
            </div>
          )}
        </div>
      )}

      <div className="p-4 border-t border-border flex flex-col gap-1">

        {/* Existing Settings Button */}
        <button className="flex items-center w-full px-3 py-3 rounded-none text-muted-foreground hover:bg-muted hover:text-foreground transition-all" title={isCollapsed ? 'Settings' : ''}>
          <Settings className="w-5 h-5 shrink-0 text-muted-foreground" />
          {!isCollapsed && <span className="ml-3 font-medium whitespace-nowrap">Settings</span>}
        </button>
      </div>
    </div>
  );
}