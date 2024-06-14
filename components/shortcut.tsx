"use client"
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'

export const Shortcut = () => {
  const newTransactino = useNewTransaction()
  return (
    <div className='fixed xl:hidden h-screen top-96 right-0 z-50'>
      <Button
        className='rounded-r-none'
        size={"sm"}
        onClick={newTransactino.onOpen}
      >
        <ArrowLeft />
      </Button>
    </div>
  )
}
