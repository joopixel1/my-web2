import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { BsDownload } from 'react-icons/bs';

import './Resume.css';

type PDFFile = string | File | null;
pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');


export default function Resume() {
  const [file] = useState<PDFFile>('/docs/resume.pdf');
  const [numPages, setNumPages] = useState<number>();


  const options = {
    cMapUrl: 'cmaps/',
    standardFontDataUrl: 'standard_fonts/',
  };
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy) => setNumPages(nextNumPages);

  return (
    <div className="Example">
      <header>
        <h1>Resume</h1>
        <a href={file?.toString()} download={"Jesutofunmi Obimakinde Resume.pdf"}><BsDownload color={"black"} size={25}/></a>
      </header>
      <div className="Example__container__document">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index + 1} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
}
