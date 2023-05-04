import React, { useEffect, useState, useRef,useImperativeHandle } from 'react'
import { useSession } from "next-auth/react"

import Footer from '../components/Footer'
import { getAlldataFromServer, postAllDatatoServer,deleteDataShipin,updateDataShipin } from '../lib/shipping-in/utils'
import Find from '../components/Find'
export default function ShippinginAdmin(props) {
    const { data: session, status } = useSession()
    console.log("session", session);

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [asc, setAsc] = useState(true)
    const [update,setUpdate]=useState({})
    const [updateorsubmit,setUpdateOrSubmit]=useState(false)

    const [showDiv, setShowDiv] = useState(false)
    //delete data
   async function deleteData(serialNumber){
        console.log(serialNumber)
        const data=await deleteDataShipin(serialNumber);
        console.log(data);
        setRefresh(!refresh)
    }

    //Update data

    async function updateData(updateData){
        console.log(updateData);
        const data=await updateDataShipin(updateData);
        console.log(data);
        setRefresh(!refresh)

    }

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

    const handleSort = (type, column) => {
        setAsc(!asc)
        if (type === "number") {

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
    const myForm=useRef();


    function handleSubmit(event) {
        event.preventDefault();
        const payLoad = {
            serialNumber:update?.serialNumber,
            TLNumber: tlInputRef.current.value,
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
        console.log(myForm.current.buttonId)

        if(myForm.current.buttonId==="submit")
        {


        async function sendData(payLoad) {
            console.log(JSON.stringify(payLoad))
            const response = await postAllDatatoServer(payLoad);
            console.log(response)
            setRefresh(true);
        }

        sendData(payLoad).then(()=>console.log("data sent to server"));
        }

        if(myForm.current.buttonId==="update")
        {
            console.log("inside update")
            updateData(payLoad).then(()=>console.log("data updated successfully"))
            setUpdateOrSubmit(false)
            const emptyObject=emptyState()
            console.log(emptyObject)
            setUpdate(emptyObject)
            console.log(update)
            event.target.reset();
        }

    }

    function emptyState(){
        let updateCopy=update;
        Object.keys(updateCopy).forEach(key => {
            updateCopy[key] = "-";
        });

        return updateCopy
    }

    function handleUpdate(response){
        setUpdateOrSubmit(true)
        setUpdate(response);
        console.log(response)

            console.log(response.TLNumber);



        setShowDiv(!showDiv);



    }



    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }


    if (status === "authenticated" && session.user.name === "Admin") {


        return (
            <div>
                
                
                {
                    showDiv
                        ? (
                            <div>

                                <div className="pl-[20%] pt-[70px] w-full pb-20">


                                    <div className='bg-white pl-20 shadow-sm rounded-xl mr-[60px] pt-20 pb-20'>

                                        <h1 className='text-5xl text-headBlue font-normal pb-10'>New Entry</h1>

                                        <form className="w-full max-w-[90%]" onSubmit={handleSubmit} ref={myForm}>
                                            <div className="flex flex-wrap -mx-3 mb-10 formContainer">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="grid-T/L-no">
                                                        T/L No.
                                                    </label>
                                                    <input defaultValue={update?.TLNumber} ref={tlInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray" id="grid-T/L no" type="text" placeholder="ABC123" />
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="grid-Products">
                                                        Products
                                                    </label>
                                                    <select ref={productsInputRef} defaultValue={update?.productCode} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray" id="grid-Products">
                                                        <option>HSD</option>
                                                    </select>
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Token">
                                                        Token

                                                    </label>
                                                    <input ref={tokenInputRef} defaultValue={update?.tokenNumber} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Token" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Quantity">
                                                        Quantity

                                                    </label>
                                                    <input ref={quantityInputRef} defaultValue={update?.quantity} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Quantity" type="number" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="customer">
                                                        Customer

                                                    </label>
                                                    <input ref={customerInputRef} defaultValue={update?.customer} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="customer" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="Transfer-Type">
                                                        Transfer Type

                                                    </label>
                                                    <input ref={transferTypeInputRef} defaultValue={update?.transferType} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="Transfer-Type" type="text" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="date-in">
                                                        Date In

                                                    </label>
                                                    <input ref={dateInInputRef} defaultValue={update?.dateIn?.toString().slice(0,10)} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="date-in" type="date" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="time-in">
                                                        Time In

                                                    </label>
                                                    <input ref={timeInInputRef} defaultValue={update?.timeIn} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="time" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="tare-weight">
                                                        Tare Weight(KG)
                                                    </label>
                                                    <input ref={tareWeightInputRef} defaultValue={update?.tareWeight} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="number" />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="source">
                                                        Source
                                                    </label>
                                                    <select ref={sourceInputRef} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="time-in" type="number" >
                                                        <option>ORC #1</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2" htmlFor="remarks">
                                                        Remarks
                                                    </label>
                                                    <textarea ref={remarksInputRef} defaultValue={update?.remarks} className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray" id="remarks" type="textarea" />

                                                </div>
                                            </div>
                                            {!updateorsubmit?<button onClick={e => myForm.current.buttonId=e.target.id} id="submit" className='bg-Orange text-white rounded-lg h-10 w-[120px]' type='submit' >SUBMIT</button>:
                                            <button onClick={e => myForm.current.buttonId=e.target.id} id="update" className='bg-Orange text-white rounded-lg h-10 w-[120px]' type='submit'>UPDATE DATA</button>}

                                            <button id="update" onClick={() => setShowDiv(!showDiv)} className='bg-White text-black rounded-lg h-10 w-[120px] border-Orange border-2 ml-10'>Show Data</button>

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
                                <Find data={data} />
                                <h2 className="py-10">
                                    Please click the below arrows to sort the columns
                                </h2>

                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-white uppercase bg-Orange ">
                                            <tr >
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6 cursor-pointer">
                                                    T/L No.
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    PRODUCTS
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    TOKEN #
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    QUANTITY
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    CUSTOMER
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    TRANSFER TYPE
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    DATE IN
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    TIME IN
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th onClick={() => handleSort("string", "TLNumber")} scope="col" className="py-3 px-6">
                                                    TARE WEIGHT(KG)
                                                    {
                                                        asc ? <img className="h-4" src='images/sort-down-solid.svg' /> : <img className="h-4" src="images/sort-up-solid.svg" />

                                                    }
                                                </th>
                                                <th>

                                                </th>
                                                <th>

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
                                                    {props.access?<><td className="py-4 px-6">
                                                        <a href="#" className="font-medium text-blue-600  hover:underline" onClick={()=>handleUpdate(responses)}>Edit</a>
                                                    </td><td className="py-4 px-6">
                                                            <a href="#" className="font-medium text-blue-600  hover:underline" onClick={() => deleteData(responses.serialNumber)}>DELETE</a>
                                                        </td></>:null}
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
