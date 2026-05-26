'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DocumentPreview } from '@/components/DocumentPreview';
import { FormData } from '@/lib/types';
import { Edit2, Loader, Download } from 'lucide-react';

function PreviewContent() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('documentFormData');
      if (storedData) {
        setFormData(JSON.parse(storedData));
        localStorage.removeItem('documentFormData');
      }
    } catch (error) {
      console.error('[v0] Failed to retrieve form data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('document-print-area');
    if (!element) return;

    setIsDownloading(true);

    try {
      // Dynamically import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // A4 dimensions in mm
      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;

      // Wrap a clone inside a padded container so all 4 sides of the
      // gold border + absolute-positioned corner ornaments are captured fully.
      const PADDING_PX = 40;

      const wrapper = document.createElement('div');
      wrapper.style.cssText = [
        'position:fixed',
        'top:-99999px',
        'left:0',
        `padding:${PADDING_PX}px`,
        'background:#f3f4f6',
        'box-sizing:content-box',
        'display:inline-block',
      ].join(';');

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.margin = '0';
      clone.style.position = 'relative';
      clone.style.width = `${element.offsetWidth}px`;

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Two frames so layout fully settles before measuring
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      const captureWidth  = wrapper.scrollWidth;
      const captureHeight = wrapper.scrollHeight;

      const canvas = await html2canvas(wrapper, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f3f4f6',
        logging: false,
        width: captureWidth,
        height: captureHeight,
        windowWidth: captureWidth,
        windowHeight: captureHeight,
      });

      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Wrapper already adds 40px padding on all sides so use minimal PDF margins
      const MARGIN_MM = 4;
      const usableWidthMM  = A4_WIDTH_MM  - MARGIN_MM * 2;
      const usableHeightMM = A4_HEIGHT_MM - MARGIN_MM * 2;

      const canvasWidthPx  = canvas.width;
      const canvasHeightPx = canvas.height;
      const aspectRatio    = canvasHeightPx / canvasWidthPx;

      let imgWidthMM  = usableWidthMM;
      let imgHeightMM = imgWidthMM * aspectRatio;

      // Scale down uniformly if too tall so everything fits on 1 page
      if (imgHeightMM > usableHeightMM) {
        const scale = usableHeightMM / imgHeightMM;
        imgWidthMM  *= scale;
        imgHeightMM  = usableHeightMM;
      }

      // Center on page
      const xOffset = (A4_WIDTH_MM  - imgWidthMM)  / 2;
      const yOffset = (A4_HEIGHT_MM - imgHeightMM) / 2;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      pdf.addImage(
        imgData,
        'JPEG',
        xOffset,
        yOffset,
        imgWidthMM,
        imgHeightMM,
        undefined,
        'FAST'
      );

      // Generate a sensible filename
      const docType = formData?.documentType || 'document';
      const name =
        formData?.candidateName ||
        formData?.employeeName ||
        formData?.companyName ||
        'document';
      const safeName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      pdf.save(`${docType}_${safeName}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin w-8 h-8 text-yellow-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-2">No Document Data</h1>
          <p className="text-gray-600 mb-6">
            Please create a document first to preview it.
          </p>
          <Link
            href="/document-generator"
            className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
          >
            Create Document
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div>
            <Link
              href="/document-generator"
              className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-4"
            >
              ← Back to Form
            </Link>
            <h1 className="text-3xl font-bold text-black">Document Preview</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.push('/document-generator')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              <Edit2 size={20} />
              Edit
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div ref={previewRef} id="document-preview">
          <DocumentPreview data={formData} />
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/document-generator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg border-2 border-yellow-600 hover:bg-yellow-50 transition"
          >
            Create Another
          </Link>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Generating…
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader className="animate-spin w-8 h-8 text-yellow-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading preview...</p>
          </div>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}