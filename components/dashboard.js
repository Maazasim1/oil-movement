import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import CardBarChart from './Cards/CardBarChart'
import CardLineChart from './Cards/CardLineChart'
import PieChart from './Cards/PieChart'
export default function Dashboard() {
    return (
        <div className='bg-slate-900 h-full'>
            <Sidebar level="Admin" />
            <Navbar />
            <div className='grid grid-flow-row-dense grid-cols-2 grid-row-2 gap-10    ml-[20vw] mt-[40px] mr-[40px] AdminPane'>
                <CardBarChart />
                <CardLineChart />
                <PieChart class />


            </div>
        </div>
    )
}
