'use client'
import React from 'react'
import { P2PCard } from '../_components/P2PCard'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
const P2PTransaction = () => {
  const isMobile = useMediaQuery('(max-width: 768px')
  return (
    <div className={cn(' px-10 py-5  bg ',
    )}>
        <h1 className="text-4xl font-bold text-magnolia-900 mb-8">Send Money to Peers</h1>
        <div className=' w-full h-[80%] flex items-center justify-center'>
            <P2PCard />
            </div>
    </div>
  )
}

export default P2PTransaction