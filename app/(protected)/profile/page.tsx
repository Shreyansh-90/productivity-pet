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
    <main className="p-6 bg-gray-500/10 flex flex-col rounded-xl top-15 left-auto w-full">
      <h1 className="text-3xl font-bold flex mb-5 p-2">Profile</h1>
      <div className="bg-white flex gap-10 flex-auto rounded-2xl p-5 w-full ">
        <div className="bg-gray-500 rounded-full w-32 h-32 text-center flex">
          User&apos;s Photo here
        </div>
        <div className="flex flex-col gap-1">
          <h1 className='text-xl font-semibold'>{pet.name}</h1>
          <h1 className='text-sm text-gray-600'>email123@classic.com</h1>
        </div>
      </div>
    </main>
  );
}

export default Profile