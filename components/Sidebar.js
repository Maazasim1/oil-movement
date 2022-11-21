import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'
import ModalChange from './ModalChange';
import ModalNew from './ModalNew';
import HTMLtoReport from './Report/HTMLtoReport';
import ShippingModal from './shippinginmodal';


export default function Sidebar(props) {
    const { data: session } = useSession();
    console.log("session", session);
    return (
        <div className='h-[85%] w-[13%] fixed z-20 top-0 left-0 bg-white rounded-xl overflow-x-hidden ml-5 mt-[100px] mb-[50px]'>
            <div className='block w-full text-center divide-y-1 pb-10'>



            </div>
            <div className='flex flex-col justify-center items-center w-full'>

                <Link href={"/" + props.level}>
                    <a className='text-white  block p-4 text-center w-[80%]  m-4 bg-Orange hover:text-slate-400 rounded-xl'>{props.level}</a>
                </Link>

                <Link href='/'>
                    <a className='text-buttonWhite p-4 text-center m-4 rounded-xl hover:text-slate-400' style={{ display: props.hidden }}>{props.shift}</a>
                </Link>
                <div className=' text-center'>
                    <ModalNew stlye={{ display: props.hidden }} title="New User" hidden={props.hidden} header="New User" />
                </div>
                <div className=' text-center'>

                    <ModalChange stlye={{ display: props.hidden }} title="Change Credentials" hidden={props.hidden} header="Change Credentials" />
                </div>
                <div className='text-center'>

                    <HTMLtoReport stlye={{ display: props.hidden }} hidden={props.hidden} title="Generate Report" />
                </div>
                <div className='text-center'>

                    <ShippingModal />
                </div>

            </div>




            <button onClick={() => { signOut({ callbackUrl: '/' }).then() }} className='text-buttonWhite absolute bottom-3 inline-block rounded-0 p-4 w-full text-center '><img src='/images/logout.svg' className='h-5 w-5 inline-block align-middle mb-1 mr-5 text-buttonWhite' alt="logout" /><span>Logout</span></button>




        </div>
    )
}
