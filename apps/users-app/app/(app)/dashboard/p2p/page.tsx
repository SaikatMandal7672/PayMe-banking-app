'use client'
import React from 'react'
import { P2PForm } from '../_components/p2p'

const P2PTransaction = () => {
  return (
    <div className="min-h-screen px-4 md:px-10 py-5 md:py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Send Money</h1>
      <div className="flex items-center justify-center">
        <P2PForm />
      </div>
    </div>
  )
}

export default P2PTransaction