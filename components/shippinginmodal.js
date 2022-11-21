import React, { useState } from "react";
import { Portal } from "react-portal";
import Shippingin from "../pages/shippingin";
import ShippinginAdmin from "./shippingInAdminAccess";



export default function ShippingModal(props) {
    const [modal, setModal] = useState(false)

    return (
        <>
         <button style={{ display: props.hidden }}
        className="text-buttonWhite active:bg-Orange font-bold uppercase text-sm px-6 py-3 rounded hover:bg-Orange hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          setModal(true)
        }}
      >SHIPPING IN</button>
    {modal?
            <Portal>
                <div className='h-full w-full  absolute left-0 top-0 z-40 flex justify-center items-center z-20'>
                    <div className='bg-white rounded-xl w-[90vw] h-[80vh] border-2 border-Orange shadow-xl overflow-x-hidden'>
                        <button className='rounded-full bg-black text-white w-6 m-5' onClick={() => setModal(!modal)}>
                            X
                        </button>
                        <ShippinginAdmin access={true}/>
                    </div>
                </div>
            </Portal>
            :null}
        </>
    )

}