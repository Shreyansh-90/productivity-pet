'use client';

import { usePetStore } from '@/store/usePetStore';
import { useState, useEffect } from 'react';

const Profile = () => {

    const { pet, updateName } = usePetStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Don't render until we're sure we're on the client

  return (
    <main className= "p-8" >
        <div>
            <h1 className="text-3xl font-bold ">Fluffys Profile</h1>
            <p className="text-lg font-semibold">Name: {pet.name}</p>
            <input 
                type='text'
                value={pet.name}
                onChange={(e) => updateName(e.target.value)}
            />
            <p className="text-lg font-semibold">Age: {pet.age}</p>
            <p className="text-lg font-semibold">XP: {pet.xp}</p>
            <p className="text-lg font-semibold">Sleeping Habits: {pet.sleepingHabits}</p>
            <p className="text-lg font-semibold">Eating Habits: {pet.eatingHabits}</p>
            <p className="text-lg font-semibold">Evolution Stage: {pet.evolutionStage}</p>
            <p className="text-lg font-semibold">Allergies: {pet.allergies}</p>
        </div>
    </main>
  )
}

export default Profile