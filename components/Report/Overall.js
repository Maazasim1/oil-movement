import React,{useState,useEffect} from 'react';
import { getAlldatafromHSD } from '../../lib/shipping-in/utils';



export default function OverAll() {
    const [data,setData] = useState([])
    
    
    useEffect(() => {
        async function fetchData() {
            const dataFromServer = await getAlldatafromHSD();
            console.log(dataFromServer);
            setData(dataFromServer);
        }
        
        fetchData();
    }, []);

    return (
      
      <>
          <div className='ml-[35vw]'>
            </div>
            
            </>
  
  
    )
  }