'use client';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url
// ).toString();

const PdfViewer = ({ url }: { url: string }) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <Document
            className={'object-cover overflow-hidden w-full h-full'}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber} />
        </Document>
    );
};

export default PdfViewer;
