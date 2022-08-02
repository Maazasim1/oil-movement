import React from 'react'

export default function ModalChange(props) {
    const [showModal, setShowModal] = React.useState(false);
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
                                    <form  className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                        <div  className="mb-4">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmFor="number">
                                                Current Username
                                            </label>
                                            <input  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="number" type="text" placeholder="T/L Number" />
                                        </div>
                                        <div  className="mb-6">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                                New Username
                                            </label>
                                            <input  className="appearance-none border border-Orange rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="remarks" placeholder="Leave blank if not required" />
                                        
                                        </div>
                                        <div  className="mb-6">
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                                New Password
                                            </label>
                                            <input  className="appearance-none border border-Orange rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="remarks" placeholder="Leave blank if not required" />
                                        
                                        </div>
                                    
                                    </form>
                                </div>
                                {/*footer*/}
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
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
