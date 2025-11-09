"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export default function PDFModal({
  isOpen,
  onClose,
  pdfUrl,
  title = "Document Viewer",
}: PDFModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="flex justify-center">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading PDF...</p>
                </div>
              }
              error={
                <div className="text-center py-8">
                  <p className="text-red-600">Failed to load PDF</p>
                </div>
              }
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="mb-4">
                  <Page
                    pageNumber={index + 1}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </div>
              ))}
            </Document>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              Zoom Out
            </button>
            <span className="text-sm text-gray-600">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((prev) => Math.min(2.0, prev + 0.1))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              Zoom In
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {numPages > 0 && `Total Pages: ${numPages}`}
          </div>
        </div>
      </div>
    </div>
  );
}
