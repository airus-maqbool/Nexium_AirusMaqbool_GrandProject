"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";

export default function PdfPreview({ file }: { file: File }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 mt-2 max-h-[80vh] overflow-y-auto overflow-x-hidden flex flex-col items-center custom-scrollbar">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-center text-gray-400">Loading PDF...</div>}
        error={<div className="text-center text-red-500">Failed to load PDF.</div>}
      >
        {Array.from(new Array(numPages), (el, idx) => (
          <Page
            key={`page_${idx + 1}`}
            pageNumber={idx + 1}
            width={Math.min(500, window.innerWidth * 0.8)}
            className="mx-auto my-4 rounded shadow"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}