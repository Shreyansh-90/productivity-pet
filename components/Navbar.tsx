'use client';
{/* Navbar for landing page */}


import React from 'react'
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/app/globals.css';

interface NavLinks {
    label: string;
    href: string;
 }

 const navLinks: NavLinks[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/signup' }
 ]

const Navbar = () => {   

    const currentPath = usePathname();

    {/* Pill shaped navigation bar at the top of the page */}
    {/* https://dribbble.com/shots/24287189-Defi-Landing-Page */}

  return (
    <div className='fixed top-6 left-0 w-full flex justify-center z-40 px-4 '>
        <nav className='flex items-center gap-8 bg-white/80 backdrop-blur-md shadow-sm border border-slate-200 rounded-full px-8 py-3'>
            {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={`text-sm font-semibold transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                            {link.label}
                        </Link>
                )
            })}
        </nav>
    </div>
  ) 
}

export default Navbar