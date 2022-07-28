import React from 'react'
import { useSession, getSession } from "next-auth/react"
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function Shippingin() {
    const { data: session, status } = useSession()
    console.log("session",session);

    if (status === "loading") {
        return <p>Loading...</p>
      }
    
      if (status === "unauthenticated") {
        return <p>Access Denied</p>
      }
    
    
      if(status==="authenticated" && session.user.name==="maaz"){
        
          
          return (
              <div>
            <Sidebar level="Shipping In" shift="SHIFT: A" />
            <Navbar />
            <div className="pl-[20%] pt-[100px] w-full">
                <form className="w-full max-w-[90%]">
                    <div className="flex flex-wrap -mx-3 mb-10 formContainer">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-T/L-no">
                                T/L No.
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-T/L no" type="text" placeholder="ABC123" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-Products">
                                Products
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-Products">
                                <option>HSD</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Token">
                                Token

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Token" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Quantity">
                                Quantity

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Quantity" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customer">
                                Customer

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="customer" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Transfer-Type">
                                Transfer Type

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Transfer-Type" type="text" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date-in">
                                Date In

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date-in" type="date" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="time-in">
                                Time In

                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="time-in" type="time" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tare-weight">
                                Tare Weight(KG)
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="time-in" type="number" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="remarks">
                                Remarks
                            </label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="remarks" type="textarea" />

                        </div>
                    </div>

                </form>
            </div>
            <div className='pl-[20%] pr-[5%]'>
                <hr className='border-none h-[1px] text-slate-700 bg-slate-700' />

            </div>

            <div className='pl-[20%] w-[95%] pt-10 pb-20'>
                <div className="overflow-x-hidden relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-slate-700 ">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    T/L No.
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    PRODUCTS
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    TOKEN #
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    QUANTITY
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    CUSTOMER
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    TRANSFER TYPE
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    DATE IN
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    TIME IN
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    TARE WEIGHT(KG)
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    EDIT
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    TMC447
                                </th>
                                <td className="py-4 px-6">
                                    FO
                                </td>
                                <td className="py-4 px-6">
                                    077062632
                                </td>
                                <td className="py-4 px-6">
                                    50000
                                </td>
                                <td className="py-4 px-6">
                                    MEYDAN ENERGY
                                </td>
                                <td className="py-4 px-6">
                                    STF
                                </td>
                                <td className="py-4 px-6">
                                    21-JUL-22
                                </td>
                                <td className="py-4 px-6">
                                    1:21
                                </td>
                                <td className="py-4 px-6">
                                    19750
                                </td>
                                <td className="py-4 px-6">
                                    <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />



        </div>
    )
}
}
