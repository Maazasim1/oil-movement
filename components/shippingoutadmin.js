import React, { useEffect, useState, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getAlldataFromServershipOut,
  postAllDatatoServerShipOut,
} from "../lib/shipping-in/utils";
import FindOut from "../components/FindOut";

const initialState = {
  TLNumber: true,
  products: true,
  token: true,
  quantity: true,
  customer: true,
  transferType: true,
  dateIn: true,
  timIn: true,
  tareWeight: true,
};
export default function ShippingOutAdmin() {
  const { data: session, status } = useSession();
  console.log("session", session);

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [asc, setAsc] = useState(true);

  const [showDiv, setShowDiv] = useState(false);

  const [ascArrow, setAscArrow] = useState(initialState);

  const [inputDisable, setInputDisable] = useState(true);

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
      setData(dataCopy);
    } else {
      setData(dataCopy.reverse());
    }
  };

  const sortNumbers = (dataArg, column) => {
    const dataCopy = [...dataArg];
    dataCopy.sort((a, b) => {
      return a[column] - b[column];
    });
    if (asc) {
      setData(dataCopy);
    } else {
      setData(dataCopy.reverse());
    }
  };

  const handleSort = (type, column) => {
    setAsc(!asc);
    setAscArrow({ ...initialState });
    setAscArrow((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
    console.log(ascArrow);
    if (type === "number") {
      sortNumbers(data, column);
    }
    if (type === "string") {
      sortString(data, column);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const dataFromServer = await getAlldataFromServershipOut();
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
  const filledDateInputRef = useRef();
  const arrivalAtGantryTime = useRef();
  const timeFilled = useRef();
  const tempF = useRef();
  const densityKgLtr = useRef();
  const invoiceDate = useRef();
  const dateOut = useRef();
  const timeOut = useRef();
  const pointNo = useRef();
  const filledBy = useRef();
  const checkedBy = useRef();
  const sealAppliedBy = useRef();
  const tankNo = useRef();
  const labCertificateNumber = useRef();
  const statusRef = useRef();
  const fillingTime = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const payLoad = {
      arrivalAtGantry: arrivalAtGantryTime.current.value,
      timeFilled: timeFilled.current.value,
      temperature: tempF.current.value,
      densityKgLtr: densityKgLtr.current.value,
      invoiceDate: invoiceDate.current.value,
      dateOut: dateOut.current.value,
      timeOut: timeOut.current.value,
      pointNumber: pointNo.current.value,
      filledBy: filledBy.current.value,
      sealedBy: checkedBy.current.value,
      tankNo: tankNo.current.value,
      labCertificateNumber: labCertificateNumber.current.value,
      fillingDuration: fillingTime.current.value,
    };

    async function sendData(payLoad) {
      console.log(JSON.stringify(payLoad));
      const response = await postAllDatatoServerShipOut(payLoad);
      console.log(response);
      setRefresh(true);
    }

    sendData(payLoad);
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  if (status === "authenticated" && session.user.name === "maaz") {
    return (
      <div>
        <Sidebar level="Shipping Out" shift="SHIFT: A" hidden="none" />
        <Navbar />
        {showDiv ? (
          <div>
            <div className="pl-[20%] pt-[70px] w-full pb-20">
              <div className="bg-white pl-20 shadow-sm rounded-xl mr-[60px] pt-20 pb-20">
                <h1 className="text-5xl text-headBlue font-normal pb-10">
                  New Entry
                </h1>

                <form className="w-full max-w-[90%]" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-10 formContainer">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="grid-T/L-no"
                      >
                        Token Number
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={tlInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray"
                        id="grid-T/L no"
                        type="text"
                        placeholder="ABC123"
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="grid-Products"
                      >
                        Products
                      </label>
                      <select
                        ref={productsInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-lastGray"
                        id="grid-Products"
                      >
                        <option>HSD</option>
                      </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="Token"
                      >
                        Token
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={tokenInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="Token"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="Quantity"
                      >
                        Quantity
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={quantityInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="Quantity"
                        type="number"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="customer"
                      >
                        Customer
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={customerInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="customer"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="Transfer-Type"
                      >
                        Transfer Type
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={transferTypeInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="Transfer-Type"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="date-in"
                      >
                        Date In
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={dateInInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="date-in"
                        type="date"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="time-in"
                      >
                        Time In
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={timeInInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="time-in"
                        type="time"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="source"
                      >
                        Source
                      </label>
                      <select
                        disabled={inputDisable}
                        ref={sourceInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="time-in"
                        type="number"
                      >
                        <option>ORC #1</option>
                      </select>
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="tare-weight"
                      >
                        Tare Weight(KG)
                      </label>
                      <input
                        disabled={inputDisable}
                        ref={tareWeightInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="time-in"
                        type="number"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="filled-date"
                      >
                        FILLED DATE
                      </label>
                      <input
                        ref={filledDateInputRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="filled-date"
                        type="date"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="arrival-at-gantry"
                      >
                        ARRIVAL AT GANTRY(TIME)
                      </label>
                      <input
                        ref={arrivalAtGantryTime}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="arrival-at-gantry"
                        type="time"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="tare-weight"
                      >
                        Time Filled
                      </label>
                      <input
                        ref={timeFilled}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="time-in"
                        type="time"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="temperature"
                      >
                        Temp °F
                      </label>
                      <input
                        ref={tempF}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="temperature"
                        type="float"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="density"
                      >
                        Density
                      </label>
                      <input
                        ref={densityKgLtr}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="density"
                        type="float"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="invoice"
                      >
                        Invoice Date
                      </label>
                      <input
                        ref={invoiceDate}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="invoice"
                        type="date"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="dateOut"
                      >
                        Date Out
                      </label>
                      <input
                        ref={dateOut}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="dateOut"
                        type="date"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="temperature"
                      >
                        Time Out
                      </label>
                      <input
                        ref={timeOut}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="timeOut"
                        type="time"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="pointNo"
                      >
                        Point No,
                      </label>
                      <input
                        ref={pointNo}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="pointNo"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="temperature"
                      >
                        Filled By
                      </label>
                      <input
                        ref={filledBy}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="filledBy"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="checkedBy"
                      >
                        Sealed By
                      </label>
                      <input
                        ref={checkedBy}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="checkedBy"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="sealAppliedBy"
                      >
                        Seal Applied By
                      </label>
                      <input
                        ref={sealAppliedBy}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="sealAppliedBy"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="tankNo"
                      >
                        Tank Number
                      </label>
                      <input
                        ref={tankNo}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="tankNo"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="labCertificate"
                      >
                        Lab Certificate No
                      </label>
                      <input
                        ref={labCertificateNumber}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="labCertificate"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <input
                        ref={statusRef}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="status"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-headBlue text-xs font-bold mb-2"
                        htmlFor="fillingTime"
                      >
                        Filling Time
                      </label>
                      <input
                        ref={fillingTime}
                        className="appearance-none block w-full bg-gray-200 text-headBlue border  border-none bg-lastGray  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-lastGray focus:border-lastGray"
                        id="fillingTime"
                        type="time"
                      />
                    </div>




                    {/*Shipping Out Fields 
                                                  + indicates calculated varibales where user input is not required.


                                                    Filled date
                                                    arrival at gantry
                                                    time filled
                                                    temperature
                                                    density
                                                +    gross weight
                                                +   net weight
                                                +    weight by density
                                                +    WBD - NW
                                                    invoice Date
                                                    date out
                                                    time out
                                                    point number
                                                    filled by
                                                    checked by
                                                    sealed by
                                                    tank no
                                                    lab cert number
                                                +    volume 85
                                                    arrival to gantry duration
                                                    filling duration
                                                    filling to out duration
                                                    remarks
                                                    source plant
                                                +   litres60


                                                */}


                  </div>


                  <button
                    className="bg-Orange text-white rounded-lg h-10 w-[120px]"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={() => setShowDiv(!showDiv)}
                    className="bg-White text-black rounded-lg h-10 w-[120px] border-Orange border-2 ml-10"
                  >
                    Show Data
                  </button>
                  {inputDisable ? (
                    <button
                      onClick={() => setInputDisable(!inputDisable)}
                      className="bg-white text-black rounded-lg h-10 w-[120px] border-Orange border-2 ml-10"
                    >
                      Toggle Control
                    </button>
                  ) : (
                    <button
                      onClick={() => setInputDisable(!inputDisable)}
                      className="bg-Orange text-white rounded-lg h-10 w-[120px] border-Orange border-2 ml-10"
                    >
                      Toggle Control
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="pl-[20%] pr-[5%]">
              <hr className="border-none h-[1px] text-white bg-buttonWhite" />
            </div>

            <div className="pl-[20%] w-[95%] pt-10 pb-20">
              <h1 className="text-5xl text-headBlue font-normal pb-10">
                Past Records
              </h1>
              <FindOut data={data} />
              <h2 className="py-10">
                Please click the below arrows to sort the columns
              </h2>
              <div className="overflow-x-scroll relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-white uppercase bg-Orange ">
                    <tr>
                      <th
                        onClick={() => handleSort("number", "serialNumber")}
                        scope="col"
                        className="py-3 px-6 cursor-pointer"
                      >
                        Serial Number
                        {ascArrow.TLNumber ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "tokenNumber")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Token Number
                        {ascArrow.products ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "filledDate")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Filled Date
                        {ascArrow.token ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "arrivalAtGantry")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Arrival At Gantry
                        {ascArrow.quantity ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("string", "timeFilled")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Time Filled
                        {ascArrow.customer ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("string", "temperature")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Temperature
                        {ascArrow.transferType ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("string", "density")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Density
                        {ascArrow.dateIn ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("string", "grossWeight")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Gross Weight
                        {ascArrow.timIn ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "netWeight")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Net Weight
                        {ascArrow.tareWeight ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "weightByDensity")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Weight By Density
                        {ascArrow.filledDate ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "WBD_minus_NW")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        weightByDensity - NetWeigt
                        {ascArrow.arrivalAtGantry ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "invoiceDate")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Invoice Date
                        {ascArrow.timeFilled ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "dateOut")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Date Out
                        {ascArrow.tempF ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "timeOut")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Time Out
                        {ascArrow.density ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "pointNumber")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Point Number
                        {ascArrow.grossWeight ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "filledBy")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Filled By
                        {ascArrow.netWeight ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "filledBy")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Filled By
                        {ascArrow.weightByDensity ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "sealedBy")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Sealed By
                        {ascArrow.difference ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "tankNo")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Tank Number
                        {ascArrow.incoiceDate ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "labCertificateNumber")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Lab Certificate Number
                        {ascArrow.dateOut ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "volumeAt85")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Volume At 85
                        {ascArrow.pointNo ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "litresAt60")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Litres At 60
                        {ascArrow.filledBy ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "ArrivalToGantryDuration")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Arrival To Gantry Duration
                        {ascArrow.checkedBy ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "fillingDuration")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Filling Duration
                        {ascArrow.sealedBy ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "FillingToOutDuration")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Filling to Out Duration
                        {ascArrow.tankNo ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "inToOutDuration")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        In to Out Duration
                        {ascArrow.labCertificate ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "remarks")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Remarks
                        {ascArrow.vol85 ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "sourcePlant")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Source Plant
                        {ascArrow.ltr60 ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("number", "mtons60")}
                        scope="col"
                        className="py-3 px-6"
                      >
                        Edit
                        {ascArrow.mtons60 ? (
                          <img
                            className="h-4"
                            src="images/sort-down-solid.svg"
                          />
                        ) : (
                          <img className="h-4" src="images/sort-up-solid.svg" />
                        )}
                      </th>



                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((responses, key) => (
                      <tr
                        className="bg-white text-buttonWhite border-b "
                        key={responses.serialNumber}
                      >



                        <td className="py-4 px-6">{responses.serialNumber}</td>
                        <td className="py-4 px-6">{responses.tokenNumber}</td>
                        <td className="py-4 px-6">{responses.filledDate}</td>
                        <td className="py-4 px-6">{responses.arrivalAtGantry}</td>
                        <td className="py-4 px-6">{responses.timeFilled}</td>
                        <td className="py-4 px-6">{responses.temperature}</td>
                        <td className="py-4 px-6">{responses.density}</td>
                        <td className="py-4 px-6">{responses.grossWeight}</td>
                        <td className="py-4 px-6">{responses.netWeight}</td>
                        <td className="py-4 px-6">{responses.weightByDensity}</td>
                        <td className="py-4 px-6">{responses.WBD_minus_NW}</td>
                        <td className="py-4 px-6">{responses.invoiceDate}</td>
                        <td className="py-4 px-6">{responses.dateOut}</td>
                        <td className="py-4 px-6">{responses.timeOut}</td>
                        <td className="py-4 px-6">{responses.pointNumber}</td>
                        <td className="py-4 px-6">{responses.filledBy}</td>
                        <td className="py-4 px-6">{responses.sealedBy}</td>
                        <td className="py-4 px-6">{responses.tankNo}</td>
                        <td className="py-4 px-6">{responses.labCertificateNumber}</td>
                        <td className="py-4 px-6">{responses.volumeAt85}</td>
                        <td className="py-4 px-6">{responses.litresAt60}</td>
                        <td className="py-4 px-6">{responses.ArrivalToGantryDuration}</td>
                        <td className="py-4 px-6">{responses.fillingDuration}</td>
                        <td className="py-4 px-6">{responses.FillingToOutDuration}</td>
                        <td className="py-4 px-6">{responses.inToOutDuration}</td>
                        <td className="py-4 px-6">{responses.remarks}</td>
                        <td className="py-4 px-6">{responses.sourcePlant}</td>

                        <td className="py-4 px-6">
                          <a
                            href="#"
                            className="font-medium text-blue-600  hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => setShowDiv(!showDiv)}
                  className="bg-White text-black rounded-lg h-10 w-[120px] border-Orange border-2 m-10"
                >
                  Show Form
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}
