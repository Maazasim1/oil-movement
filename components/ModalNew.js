import React,{useRef} from 'react'
import axios from 'axios';
import { newCredentials } from '../lib/shipping-in/utils';

export default function ModalNew(props) {
    const [showModal, setShowModal] = React.useState(false);
    const userName=useRef()
    const password=useRef()
    const access=useRef()

    function handleSubmit(event){
        event.preventDefault();
        const payload={
            userName:userName.current.value,
            password:password.current.value,
            access:access.current.value
        }
        async function sendData(payLoad) {
            console.log(JSON.stringify(payLoad));
            const response = await newCredentials(payLoad);
            console.log(response);}

            sendData(payload)





    }

    return (
        <>
            <button style={{display:props.hidden}}
                className="text-buttonWhite active:bg-Orange font-bold uppercase text-sm px-6 py-3 rounded hover:bg-Orange hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {props.title}
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-lastGray rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {props.header}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form  className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                        <div  className="mb-4">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                                                Access level
                                            </label>
                                            <select ref={access} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="number" type="text" placeholder="Shipping In" >
                                                <option>
                                                    Shipping In
                                                </option>
                                                <option>
                                                    Shipping Out
                                                </option>
                                                <option>
                                                    Admin
                                                </option>
                                            </select>
                                        </div>
                                        <div  className="mb-6">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                                UserName
                                            </label>
                                            <input ref={userName}  className="appearance-none border border-Orange rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="remarks" placeholder="Unique Username" />
                                        
                                        </div>
                                        <div  className="mb-6">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                                Password
                                            </label>
                                            <input ref={password} className="appearance-none border border-Orange rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="remarks" placeholder="************" />
                                        
                                        </div>
                                    
                                <div className="flex items-center justify-end p-6 border-t border-solid border-lastGray rounded-b">
                                    <button
                                        className="text-loginPage background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-Orange text-white active:bg-Orange font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        
                                    >
                                        Submit
                                    </button>
                                </div>
                                    </form>
                                </div>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
