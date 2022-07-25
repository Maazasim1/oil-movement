import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function () {
    return (
        <div className=' h-full w-[15%] fixed z-20 top-0 left-0 bg-slate-800 overflow-x-hidden pt-[20px]'>
            <div className='block w-full text-center divide-y-1 pb-10'>
            <Image
                src='/images/CnergyicoLogo.png'
                height={50}
                width={100}
                alt='Company Logo'
            />
            

            </div>
            <Link href='/'>
            <a className='text-white  block p-5 text-center bg-slate-900 m-5 rounded-full hover:text-slate-400'>SHIPPING-IN PANEL</a>
            </Link>
            <Link href='/'>
            <a className='text-white  block p-5 text-center bg-slate-900 m-5 rounded-full hover:text-slate-400'>SHIFT A</a>
            </Link>
           
           
            <Link href='/'>
            <a className='text-white bg-slate-900 absolute bottom-0 inline-block rounded-0 p-4 w-full text-center '><img src='/images/logout.svg' className='h-5 w-5 inline-block align-middle mb-1 mr-5' /><span>Logout</span></a>
            </Link>
          


        </div>
    )
}
