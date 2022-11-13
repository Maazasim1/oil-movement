import React from 'react'
import { useState } from 'react'
import OverAll from './Overall'

const selectedReport={
    overAll: false,
    bowswerSummary: false,
    statusRefinery: false,
    tankGauge: false,
    loadingPlanvsShip: false,
    partyWiseShip: false,
    quickStatus: false,
    dropDownList: false,
}

export default function ReportStructure() {
const [report, setReport] = useState(selectedReport)

  return (
    <>
    <nav>
        <ul>
            <li onClick={setReport({overAll:!report.overAll})}>Over All</li>
        </ul>
            
    </nav>
     {report.overAll ? <OverAll /> : null}

    </>
  )
}





