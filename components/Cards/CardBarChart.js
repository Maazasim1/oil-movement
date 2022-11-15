import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAlldatafromFO,getAlldatafromHSD,getAlldatafromPMG,getAlldatafromLPG } from '../../lib/shipping-in/utils';


export default function CardBarChart() {

    const [fo,setFo] = useState([]);
    const [hsd,setHsd] = useState([]);
    const [pmg,setPmg] = useState([]);
    const [lpg,setLpg] = useState([]);
  
    const [total,setTotal]=useState()

    
    const test=[
        {litresat60:1000},
        {litresat85:2000},

    ]


    useEffect(() => {
      async function getdata() {

        setFo(await getAlldatafromFO());
        setHsd(await getAlldatafromHSD());    
        setPmg(await getAlldatafromPMG());
        setLpg(await getAlldatafromLPG());

      }

      getdata().then(()=>{

  setTotal([...hsd, ...fo, ...pmg, ...lpg]);
}        

      )
      
    }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  
  
  console.log(fo)
  const data = {
    labels:["hsd","fo","pmg","lpg"],
    datasets: [
      {
        label: 'LITRES AT 60',
        data: total.map((item)=> item.litresAt60),
        
        backgroundColor: '#FF5E37',
      },
      {
        label: 'LITRES AT 85',
        data: total.map((item)=> item.litresAt85),
        backgroundColor: '#572C75',
      },
    ],
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-headBlue mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-headBlue text-xl font-semibold">
                Total Oil
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Bar data={data} options={options}/>
          </div>
        </div>
      </div>
    </>
  );
}
