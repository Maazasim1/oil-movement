import React, { useEffect, useState, useRef } from 'react'
import { useSession, getSession } from "next-auth/react"
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAlldataFromServer, postAllDatatoServer } from '../lib/shipping-in/utils'
export default function ShippingOut() {
    const { data: session, status } = useSession()
    console.log("session", session);

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [asc, setAsc] = useState(true)

    const [showDiv, setShowDiv] = useState(false)

    const [ascArrow, setAscArrow] = useState({
        TLNumber: true,
        products: true,
        token: true,
        quantity: true,
        customer: true,
        transferType: true,
        dateIn: true,
        timIn: true,
        tareWeight: true,

    })

    const [inputDisable, setInputDisable] = useState(true)

    //Sort data
    const sortString = (dataArg, column) => {
        const dataCopy = [...dataArg];
        dataCopy.sort((a, b) => {
            let fa = a[column].toLowerCase(),
                fb = b[column].toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        if (asc) {
            setData(dataCopy)
        }
        else {
            setData(dataCopy.reverse())
        }
    }

    const sortNumbers = (dataArg, column) => {
        const dataCopy = [...dataArg];
        dataCopy.sort((a, b) => {
           
                return a[column] - b[column]
        });
        if (asc) {
            setData(dataCopy)
        }
        else {
            setData(dataCopy.reverse())
        }

    }

    const handleSort = (type, column) => {
        setAsc(!asc)
        setAscArrow(prevState => ({ ...prevState, [column]: !prevState[column] }))
        console.log(ascArrow)
        if (type === "number") {
            sortNumbers(data, column)


        }
        if (type === "string") {
            sortString(data, column)
        }
    }


    useEffect(() => {
        async function fetchData() {
            const dataFromServer = await getAlldataFromServer();
            console.log(dataFromServer);
            setData(dataFromServer);
        }



        fetchData();
        setRefresh(false);
    }, [refresh]);

    const tlInputRef = useRef();
    const productsInputRef = useRef();
    const tokenInputRef = useRef();
    const quantityInputRef = useRef();
    const customerInputRef = useRef();
    const transferTypeInputRef = useRef();
    const dateInInputRef = useRef();
    const timeInInputRef = useRef();
    const tareWeightInputRef = useRef();
    const sourceInputRef = useRef();
    const remarksInputRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const payLoad = {
            tlnum: tlInputRef.current.value,
            products: productsInputRef.current.value,
            token: tokenInputRef.current.value,
            quantity: quantityInputRef.current.value,
            shift: "A",
            customer: customerInputRef.current.value,
            transfertype: transferTypeInputRef.current.value,
            date_in: dateInInputRef.current.value,
            time_in: `"${timeInInputRef.current.value}"`,
            tare_weight: tareWeightInputRef.current.value,
            //source:sourceInputRef.current.value,
            remarks: `"${remarksInputRef.current.value}"`
        }

        async function sendData(payLoad) {
            console.log(JSON.stringify(payLoad))
            const response = await postAllDatatoServer(payLoad);
            console.log(response)
            setRefresh(true);
        }

        sendData(payLoad);


    }


    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }


    if (status === "authenticated" && session.user.name === "maaz") {


        return (
            <div>
                <Sidebar level="Shipping Out" shift="SHIFT: A" hidden="none" />
                <Navbar />
                {
                    showDiv
                        ? (
                            <div>
                                <div className="pl-[20%] pt-[70px] w-full pb-20">


                                    <div className='bg-white pl-20 shadow-sm rounded-xl mr-[60px] pt-20 pb-20'>

                                        <h1 className='text-5xl text-headBlue font-normal pb-10'>New Entry</h1>

                                        <form className="w-full max-w-[90%]" onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap -mx-3 mb-10 formContainer">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="grid-T/L-no">
                                                        T/L No.
                                                    </label>
                                                    <input disabled={inputDisable} ref={tlInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray" id="grid-T/L no" type="text" placeholder="ABC123" />
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="grid-Products">
                                                        Products
                                                    </label>
                                                    <select ref={productsInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray" id="grid-Products">
                                                        <option>HSD</option>
                                                    </select>
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Token">
                                                        Token

                                                    </label>
                                                    <input disabled={inputDisable} ref={tokenInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Token" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Quantity">
                                                        Quantity

                                                    </label>
                                                    <input disabled={inputDisable} ref={quantityInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Quantity" type="number" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="customer">
                                                        Customer

                                                    </label>
                                                    <input disabled={inputDisable} ref={customerInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="customer" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Transfer-Type">
                                                        Transfer Type

                                                    </label>
                                                    <input disabled={inputDisable} ref={transferTypeInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Transfer-Type" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="date-in">
                                                        Date In

                                                    </label>
                                                    <input disabled={inputDisable} ref={dateInInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="date-in" type="date" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="time-in">
                                                        Time In

                                                    </label>
                                                    <input disabled={inputDisable} ref={timeInInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="time" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="tare-weight">
                                                        Tare Weight(KG)
                                                    </label>
                                                    <input disabled={inputDisable} ref={tareWeightInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="number" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="source">
                                                        Source
                                                    </label>
                                                    <select disabled={inputDisable} ref={sourceInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="number" >
                                                        <option>ORC #1</option>
                                                    </select>
                                                </div>
                                                {/*Shipping Out Fields 
                                                  + indicates calculated varibales where user input is not required.


                                                    Filled date
                                                    arrival at gantry
                                                    time filled
                                                    temperature
                                                    density
                                                    gross weight
                                                    net weight
                                                    weight by density
                                                    WBD - NW
                                                    invoice Date
                                                    date out
                                                    time out
                                                    point number
                                                    filled by
                                                    checked by
                                                    sealed by
                                                    tank no
                                                    lab cert number
                                                    volume 85
                                                    arrival to gantry duration
                                                    filling duration
                                                    filling to out duration
                                                    remarks
                                                    source plant
                                            


                                                */}


                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="tare-weight">
                                                        Tare Weight(KG)
                                                    </label>
                                                    <input disabled={inputDisable} ref={tareWeightInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="number" />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="remarks">
                                                        Shipping In Remarks
                                                    </label>
                                                    <textarea disabled={inputDisable} ref={remarksInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="remarks" type="textarea" />

                                                </div>
                                            </div>



                                            <button className='bg-Orange text-white rounded-lg h-10 w-[120px]' type='submit'>SUBMIT</button>
                                            <button onClick={() => setShowDiv(!showDiv)} className='bg-White text-black rounded-lg h-10 w-[120px] border-Orange border-2 ml-10'>Show Data</button>
                                            {inputDisable ? (

                                                <button onClick={() => setInputDisable(!inputDisable)} className='bg-white text-black rounded-lg h-10 w-[120px] border-Orange border-2 ml-10'>Toggle Control</button>
                                            ) :
                                                (
                                                    <button onClick={() => setInputDisable(!inputDisable)} className='bg-Orange text-white rounded-lg h-10 w-[120px] border-Orange border-2 ml-10'>Toggle Control</button>

                                                )

                                            }

                                        </form>
                                    </div>
                                </div>

                            </div>
                        )
                        : (<div>


                            <div className='pl-[20%] pr-[5%]'>
                                <hr className='border-none h-[1px] text-white bg-buttonWhite' />

                            </div>

                            <div className='pl-[20%] w-[95%] pt-10 pb-20'>
                                <h1 className='text-5xl text-headBlue font-normal pb-10'>Past Records</h1>
                                <div className="overflow-x-hidden relative shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-white uppercase bg-Orange ">
                                            <tr >
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6 cursor-pointer">
                                                    T/L No.
                                                    {
                                                        ascArrow.TLNumber ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "products")} scope="col" className="py-3 px-6">
                                                    PRODUCTS
                                                    {
                                                        ascArrow.products ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("number", "token")} scope="col" className="py-3 px-6">
                                                    TOKEN #
                                                    {
                                                        ascArrow.token ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("number", "quantity")} scope="col" className="py-3 px-6">
                                                    QUANTITY
                                                    {
                                                        ascArrow.quantity ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "customer")} scope="col" className="py-3 px-6">
                                                    CUSTOMER
                                                    {
                                                        ascArrow.customer ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "transferType")} scope="col" className="py-3 px-6">
                                                    TRANSFER TYPE
                                                    {
                                                        ascArrow.transferType ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "dateIn")} scope="col" className="py-3 px-6">
                                                    DATE IN
                                                    {
                                                        ascArrow.dateIn ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "timIn")} scope="col" className="py-3 px-6">
                                                    TIME IN
                                                    {
                                                        ascArrow.timIn ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("number", "tareWeight")} scope="col" className="py-3 px-6">
                                                    TARE WEIGHT(KG)
                                                    {
                                                        ascArrow.tareWeight ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th scope="col" className="py-3 px-6">
                                                    EDIT
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((responses, key) => (
                                                <tr className="bg-white text-buttonWhite border-b " key={responses.serialNumber}>
                                                    <th scope="row" className="py-4 px-6 font-medium text-black whitespace-nowrap">
                                                        {responses.TLNumber}
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {responses.productCode}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.tokenNumber}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.quantity}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.customer}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.transferType}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.dateIn}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.timeIn}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {responses.tareWeight}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button onClick={() => setShowDiv(!showDiv)} className='bg-White text-black rounded-lg h-10 w-[120px] border-Orange border-2 m-10'>Show Form</button>
                                </div>
                            </div>
                        </div>)
                }

                <Footer />



            </div>
        )
    }
}
