
import pdf from '../../Images/cmat.pdf'
import pdfff from './SKJT.pdf'

import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


const ViwePdf = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [image, setImage] = useState();
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1)
    }

    function changePageNext() {
        changePage(+1)
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
       

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }
    return (
        <div className="App">
            <input type="file" onChange={handleImage} />
            <header className="App-header">
                <Document file="http://localhost:5000/PDF/1679330457005_.net%20theory%20assignment-3.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page height="600" pageNumber={pageNumber} />
                </Document>
                <p> Page {pageNumber} of {numPages}</p>
                {pageNumber > 1 &&
                    <button onClick={changePageBack}>Previous Page</button>
                }
                {
                    pageNumber < numPages &&
                    <button onClick={changePageNext}>Next Page</button>
                }
            </header>
        
        </div>
    );
}


export default ViwePdf
