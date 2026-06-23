import { Link, Music } from 'lucide-react'
import React from 'react'

const Spotify = () => {
  return (
    <div className="bg-linear-to-br from-emerald-400 to-emerald-600 p-6 rounded-4xl shadow-xl shadow-emerald-200/50 text-white flex flex-col ml-auto items-center justify-between w-65 h-60">

      <Music className="w-26 h-16 opacity-50 text-white/60 strokeWidth-{2.5}" />

          <div className='flex flex-col items-center' >

            <h3 className="font-bold text-2xl mb-1 text-center leading-tight">Connect your Spotify Account</h3>
            <p className="text-sm text-emerald-50 opacity-90 mb-4 flex text-center justify-center">A good habits needs good music</p>

            <button className="bg-black text-slate-100 text-md font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform shadow-sm flex w-full gap-3 justify-center">
                <span className='flex gap-3 items-center text-center'><Link className='w-4 h-4 text-white'/></span>
                <span className='flex flex-col'>Link Spotify</span>
            </button>

        </div>    
    </div>
  )
}

export default Spotify