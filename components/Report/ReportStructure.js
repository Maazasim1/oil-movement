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

  
  const handlerReports = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    setOverAll(false)
    setBowswerSummary(false)
    setStatusRefinery(false)
    setTankGauge(false)
    setLoadingPlanvsShip(false)
    setPartyWiseShip(false)
    setQuickStatus(false)
    setDropDownList(false)
    if (name === 'overAll') {
      setOverAll(true)
    }
    if (name === 'bowswerSummary') {
      setBowswerSummary(true)
    }
    if (name === 'statusRefinery') {
      setStatusRefinery(true)
    }

    if (name === 'tankGauge') {
      setTankGauge(true)
    }
    if (name === 'loadingPlanvsShip') {
      setLoadingPlanvsShip(true)
    }
    if (name === 'partyWiseShip') {
      setPartyWiseShip(true)
    }
    if (name === 'quickStatus') {
      setQuickStatus(true)
    }

    if (name === 'dropDownList') {

      setDropDownList(true)
    }
  }








  return (
    <>
      <div className='flex justify-center '>

        <nav className='  text-white bg-Orange rounded-lg p-5 my-10 w-[1250px] '>

          <button name='overAll' className='px-4' onClick={() => handlerReports(event)}>Over All</button>
          <button name='bowswerSummary' className='px-4' onClick={() => handlerReports(event)}>Bowswer Summary</button>
          <button name='statusRefinery' className='px-4' onClick={() => handlerReports(event)}>Status Refinery</button>
          <button name='tankGauge' className='px-4' onClick={() => handlerReports(event)}>Tank Gauge</button>
          <button name='loadingPlanvsShip' className='px-4' onClick={() => handlerReports(event)}>Loading Plan vs Ship</button>
          <button name='partyWiseShip' className='px-4' onClick={() => handlerReports(event)}>Party Wise Ship</button>
          <button name='quickStatus' className='px-4' onClick={() => handlerReports(event)}>Quick Status</button>
          <button name='dropDownList' className='px-4' onClick={() => handlerReports(event)}>Drop Down List</button>



        </nav>
      </div>
      {overAll ? <div className='ml-[20vw] m-10 mb-16'><OverAll /></div> : null}


    </>
  )
}





