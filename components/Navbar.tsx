'use client';
{/* Navbar for landing page */}


import React from 'react'
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Link } from 'lucide-react';
interface NavLinks {
    label: string;
    href: string;
 }

 const navLinks: NavLinks[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/signup' }
 ]

const Navbar = () => {   

    const currentPath = usePathname();

    {/* Pill shaped navigation bar at the top of the page */}
  return (
    <div className='bg-background text-foreground flex'>
        <nav>
            {navLinks.map(({label, href}) =>  {
                const isActive = currentPath === href;
                const name = label;
                const to = href;
                return (
                    <Link key={href}
                    href={to}
                    className={`flex items-center px-3 py-3 rounded-none transition-all ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                        <span>{name}</span>
                    </Link>
                    
                ) 
            })}
        </nav>
    </div>
  )
}

export default Navbar