import React,{useState,useRef} from 'react'

export default function Find(props) {
    const searchRef=useRef();
    const [data,setData]=useState([]);
    const [showResults,setShowResults]=useState(false)

    const searchData=(e)=>{
        console.log(props.data[0].TLNumber)
        e.preventDefault()
        setShowResults(true);

        console.log(searchRef.current.value)
        let filteredArray = props.data.filter((element)=>element.TLNumber===searchRef.current.value);

          console.log(filteredArray);
          
        setData(filteredArray)

    

    }
  return (
    <div>
        <form onSubmit={searchData}>

        <label for='search'>
            Enter TL Number
        </label>
        <input ref={searchRef} type='text' placeholder='enter tl number' id='search' />
        <button type='submit'>Search</button>
        </form>
        {showResults?
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
                        <td className="py-4 px-6">{responses.productCode}</td>
                        <td className="py-4 px-6">{responses.tokenNumber}</td>
                        <td className="py-4 px-6">{responses.quantity}</td>
                        <td className="py-4 px-6">{responses.customer}</td>
                        <td className="py-4 px-6">{responses.transferType}</td>
                        <td className="py-4 px-6">{responses.dateIn}</td>
                        <td className="py-4 px-6">{responses.timeIn}</td>
                        <td className="py-4 px-6">{responses.tareWeight}</td>
                        <td className="py-4 px-6">
                          <a
                            href="#"
                            className="font-medium text-blue-600  hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    )):<></>
                }
    </div>
  )
}
