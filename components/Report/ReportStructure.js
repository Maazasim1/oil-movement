import React from 'react'
import { useState } from 'react'
import OverAll from './Overall'


export default function ReportStructure() {
    const [overAll, setOverAll] = useState(true)
    const [bowswerSummary, setBowswerSummary] = useState(false)
    const [statusRefinery, setStatusRefinery] = useState(false)
    const [tankGauge, setTankGauge] = useState(false)
    const [loadingPlanvsShip, setLoadingPlanvsShip] = useState(false)
    const [partyWiseShip, setPartyWiseShip] = useState(false)
    const [quickStatus, setQuickStatus] = useState(false)
    const [dropDownList, setDropDownList] = useState(false)
    
  return (
    <>
    <div className='flex justify-center '>

    <nav className=' ml-[190PX] text-white bg-Orange rounded-lg p-5 my-10 w-[1200px] '>
        
            <button onClick={()=>setOverAll(!overAll)}>Over All</button>
            <button className='px-3' onClick={()=>setBowswerSummary(!bowswerSummary)}>Bowswer Summary</button>
            <button className='px-3' onClick={()=>setStatusRefinery(!statusRefinery)}>Status Refinery</button>
            <button className='px-3' onClick={()=>setTankGauge(!tankGauge)}>Tank Gauge</button>
            <button className='px-3' onClick={()=>setLoadingPlanvsShip(!loadingPlanvsShip)}>Loading Plan vs Ship</button>
            <button className='px-3' onClick={()=>setPartyWiseShip(!partyWiseShip)}>Party Wise Ship</button>
            <button className='px-3' onClick={()=>setQuickStatus(!quickStatus)}>Quick Status</button>
            <button className='px-3' onClick={()=>setDropDownList(!dropDownList)}>Drop Down List</button>
            
            
            
    </nav>
    </div>
     {overAll ? <OverAll /> : null}
     

    </>
  )
}





