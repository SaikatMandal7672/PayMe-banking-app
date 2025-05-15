import React from 'react'
import { P2PCard } from '../_components/P2PCard'
const P2PTransaction = () => {
  return (
    <div className='ml-48 px-10 py-5 h-[92vh] w-full '>
        <h1 className="text-4xl  font-bold text-magnolia-900 mb-8">Send Money to Peers</h1>
        <div className=' w-full h-[80%] flex items-center justify-center'>
            <P2PCard />
            </div>
    </div>
  )
}

export default P2PTransaction