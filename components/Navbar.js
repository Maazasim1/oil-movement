import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='sticky top-0 bg-white z-10' >

    <div className='flex flex-row sm:w-full shadow-lg justify-end pl-[10vw] pr-10 bg-slate-800 sticky top-0' id='navbar'>
       
        <Link href="#home">
            <a>
                Date: 25 July 2022
            </a>
        </Link>
        <Link href="#business">
            <a>
                Time: 9:21 PM
            </a>
        </Link>
       
        

    </div>
    </div>
  )
}
