'use client';

import { usePetStore } from '@/store/usePetStore';
import { useState, useEffect } from 'react';

import React from 'react'

const Shop = () => {

    const {pet, buyFood} = usePetStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

  return (
    <div>
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className='text-lg my-4 font-semibold'>Current XP: {pet.xp}</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={() => buyFood(50, 'Premium Kibble')}>Buy Premium Kibble (50 XP)</button>
    </div>
  )
}

export default Shop