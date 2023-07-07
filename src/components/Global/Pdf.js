import React from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from '@mui/material/Button'
const Pdf = ({ contentId , downloadFileName}) => {
    const  generatePDF = () =>{
        const input = document.getElementById(contentId);
        html2canvas(input)
        .then((canvas) =>{
         const imgData = canvas.toDataURL('image/png')
         const pdf = new jsPDF();
         pdf.setFontSize(40)
         pdf.addImage(imgData,'JPEG', 15,20,180, 240 )
         pdf.save(`${downloadFileName}.pdf`)
        })
     };
  return (
    <div >
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Download PDF
        </Button>
    </div>
  )
}

export default Pdf