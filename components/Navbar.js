import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    var [date,setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });


  return (
    <div className='sticky top-0 bg-white z-10' >

    <div className='flex flex-row sm:w-full h-[75px] justify-end pl-[10vw] pr-10 bg-Orange sticky top-0' id='navbar'>
    <div className='absolute left-20 pt-2'>
        
    <Image
                src='/images/CnergyicoLogo.png'
                height={60}
                width={110}
                alt='Company Logo'
                className='absolute left-0'
                />
                </div>
        <Link href="#home">
            <a className=''>
                Date: {date.toLocaleDateString()}
            </a>
        </Link>
        <Link href="#business">
            <a>
                Time: {date.toLocaleTimeString()}
            </a>
        </Link>
       
        

    </div>
    </div>
  )
}
