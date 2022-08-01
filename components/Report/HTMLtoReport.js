import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReportStructure from './ReportStructure';

import React from 'react'



export default function HTMLtoReport(props) {
    
    const PrintDocument=()=>{
        const d = new Date();
        const text = d.toString();
    const input=document.getElementById('reportComponent');
    html2canvas(input).then((canvas)=>{
    const imageData = canvas.toDataURL('image/png') ;
    const pdf=new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imageData,'JPEG',0,0,width,height);
    pdf.save(text+"-report"+".pdf")
    })
}


  return (
    <div>
        <button
                className="text-buttonWhite active:bg-Orange font-bold uppercase text-sm px-6 py-3 rounded hover:bg-Orange hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => PrintDocument()}
            >{props.title}</button>
        
    </div>
  )
}
