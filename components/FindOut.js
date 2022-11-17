import React, { useState, useRef } from 'react'


export default function FindOut(props) {

  const searchRef = useRef();
  const [data, setData] = useState([]);
  const [showResults, setShowResults] = useState(false)
  const [row,setRow]=useState();

  const changeRow=(newRow)=>{
    setRow(newRow);

  }
  const searchData = (e) => {
    console.log(props.data[0].TLNumber)
    e.preventDefault()
    setShowResults(true);

    console.log(searchRef.current.value)
    
    let filteredArray = props.data.filter((element) =>Number.isInteger(element[row])? element[row].toString()===searchRef.current.value:element[row] === searchRef.current.value);

    console.log(filteredArray);

    setData(filteredArray)



  }
  return (
    <div className='pb-20'>
      <form onSubmit={searchData}>
        <div className='flex'>

          <select onChange={(e)=>changeRow(e.target.value)} id="dropdown-button-2" data-dropdown-toggle="dropdown-search-city" className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" type="button">
            {
              props?.data[0] && Object.keys(props.data[0])?.map((options) => (
                <option key={options} value={options}>
                  {options}
                </option>
              ))
            }
          </select>
          <input ref={searchRef} type='search' id="location-search" className="block p-2.5 w-full  text-sm text-buttonWhite bg-backWhite rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder='Search' />
          <button className="p-2.5 text-sm font-medium text-white bg-Orange rounded-r-lg border border-x-Orange focus:ring-4 focus:outline-none focus:ring-blue-300" type='submit'>
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
      {showResults ?
        data?.map((responses, key) => (
          <tr
            className="bg-white text-buttonWhite border-b "
            key={responses.serialNumber}
          >
            <th
              scope="row"
              className="py-4 px-6 font-medium text-black whitespace-nowrap"
            >
              {responses.TLNumber}
            </th>
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
        )) : <>

        </>
      }
    </div>
  )
}
