'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DocumentPreview } from '@/components/DocumentPreview';
import { FormData } from '@/lib/types';
import { downloadPDF } from '@/lib/pdf-generator';
import { Download, Edit2, Loader } from 'lucide-react';

function PreviewContent() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const docTitle = {
        offer: 'Offer Letter',
        relieving: 'Relieving Letter',
        receipt: 'Receipt',
      }[formData!.documentType];

      const filename = `${docTitle.replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      await downloadPDF('document-preview', filename);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={() => router.push('/document-generator')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              <Edit2 size={20} />
              Edit
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div ref={previewRef} id="document-preview">
          <DocumentPreview data={formData} />
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition disabled:bg-gray-400"
          >
            {isDownloading ? 'Downloading...' : 'Download as PDF'}
          </button>
          <Link
            href="/document-generator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg border-2 border-yellow-600 hover:bg-yellow-50 transition"
          >
            Create Another
          </Link>
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
