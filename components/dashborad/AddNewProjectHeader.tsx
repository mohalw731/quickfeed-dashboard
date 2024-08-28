'use client'
import { useUser } from '@clerk/nextjs';
import { DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function AddNewProjectHeader() {
    const { user } = useUser();

  return (
    <header className="flex items-center justify-between mt-5">
    <h1 className='text-3xl'>Welcome, <span className='text-blue-500'>{user?.firstName}</span></h1>

    <DialogTrigger asChild>
      <Button className=" flex items-center gap-2 bg-blue-500 hover:bg-blue-600 hover:scale-105">
        <Plus className="w-4 h-4" /> Create Project
      </Button>
    </DialogTrigger>
  </header>
  )
}
