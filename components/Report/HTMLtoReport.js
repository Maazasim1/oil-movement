import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReportStructure from './ReportStructure';
import React, { useEffect, useState } from 'react'
import { Portal } from 'react-portal'


function Modal(props) {
  
  const PrintDocument = () => {
    const d = new Date();
    const text = d.toString();
    // const input = document.getElementById('reportComponent');
    html2canvas(document.querySelector("#reportComponent")).then((canvas) => {
      // document.body.appendChild(canvas);


      const imageData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('l', "px",);

      pdf.addImage(imageData, 'PNG', 0, 0, (canvas.width / 3), (canvas.height / 3));
      pdf.save(text + "-report" + ".pdf")
    })
  }


  return (
    <div id="modal">
      <Portal>


        <div className='h-full w-full  absolute left-0 top-0 z-40 flex justify-center items-center'>
          <div className='bg-white rounded-xl w-[80vw] h-[80vh] border-2 border-Orange shadow-xl'>
            <button className='rounded-full bg-black text-white w-6 m-5' onClick={() => props.showModal(!props.modal)}>X</button>
            <div className='flex justify-center flex-col items-center pb-[30vh] '>
            <ReportStructure/>

            </div>
           
          <div className='flex justify-center items-end  text-white'>
            <button className='bg-Orange p-3 rounded-full' onClick={()=>PrintDocument()}>
              Save as pdf
            </button>
          </div>

          </div>

        </div>
      </Portal>
    </div>

  );


}


export default function HTMLtoReport(props) {



  const [modal, showModal] = useState(false);




  return (
    <div>
      <button style={{ display: props.hidden }}
        className="text-buttonWhite active:bg-Orange font-bold uppercase text-sm px-6 py-3 rounded hover:bg-Orange hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          showModal(true)
        }}
      >{props.title}</button>
      {
        modal ? <Modal modal={modal} showModal={showModal} /> : null
      }

    </div>
  )
}
