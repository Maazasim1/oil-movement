import React from 'react'
import { useSession,signOut } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';



export default function Sidebar (props) {
    const {data:session} = useSession();
    const router=useRouter();
    console.log("session",session);
    return (
        <div className='h-[85%] w-[13%] fixed z-20 top-0 left-0 bg-white rounded-xl overflow-x-hidden ml-5 mt-[100px] mb-[50px]'>
            <div className='block w-full text-center divide-y-1 pb-10'>
         
            

            </div>
            <Link href='/'>
            <a className='text-white  block p-4 text-center  m-4 bg-Orange hover:text-slate-400 rounded-xl'>{props.level}</a>
            </Link>
            
            <Link href='/'>
            <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{display:props.hidden}}>{props.shift}</a>
            </Link>
            <Link href='/'>
            <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{display:props.hidden}}>BlackList</a>
            </Link>
            <Link href='/'>
            <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{display:props.hidden}}>Add User</a>
            </Link>
            <Link href='/'>
            <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{display:props.hidden}}>Generate Report</a>
            </Link>
            <Link href='/'>
            <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{display:props.hidden}}>Change Passwords</a>
            </Link>
         
          
           
           <button onClick={()=>{signOut({callbackUrl:'/'})}} className='text-buttonWhite absolute bottom-3 inline-block rounded-0 p-4 w-full text-center '><img src='/images/logout.svg' className='h-5 w-5 inline-block align-middle mb-1 mr-5 text-buttonWhite' /><span>Logout</span></button>
            
          


        </div>
    )
}
