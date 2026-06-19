'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 🛠️ Helper: Get or create a default user to attach habits to
async function getDefaultUser() {
  let user = await prisma.user.findFirst();
  
  if (!user) {
    user = await prisma.user.create({
      data: { 
        email: 'admin@productivitypet.com', 
        petName: 'Jarvis',
        evolutionStage: 'System Initialized'
      }
    });
  }
  return user;
}

// 📥 FETCH: Get all habits from the database
export async function getHabits() {
  const user = await getDefaultUser();
  
  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' } // Newest habits at the top
  });
  
  return habits;
}

// 📤 CREATE: Save a new habit to the database
export async function createHabit(title: string, xpReward: number) {
  const user = await getDefaultUser();
  
  const newHabit = await prisma.habit.create({
    data: {
      title,
      xpReward,
      userId: user.id
    }
  });
  
  // Refreshes the page's data cache so the new habit shows up instantly
  revalidatePath('/'); 
  
  return newHabit;
}