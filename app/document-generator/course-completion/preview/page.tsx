'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const GeneratedCertificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const [certificateData, setCertificateData] = useState({
    name: '',
    issueDate: '',
    certificateId: '',
    course: '',
  });

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('certificateData');

    if (storedData) {
      setCertificateData(JSON.parse(storedData));
    }
  }, []);

  // Download PDF
  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1600, 1000],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 1600, 1000);

      pdf.save('certificate.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 overflow-auto">
      {/* Certificate */}
      <div
        ref={certificateRef}
        className="relative bg-white shadow-2xl overflow-hidden"
        style={{
          width: '1600px',
          height: '1000px',
          border: '12px double #D4AF37',
          background: '#f8f8f8',
          padding: '50px',
        }}
      >
        {/* Watermark */}
        <div
          className="absolute opacity-10"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src="/logo.png"
            alt="Watermark"
            className="w-[350px] h-[350px]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-28 h-28 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Heading */}
            <h1
              className="text-center text-6xl font-bold text-black mb-6"
              style={{
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Certificate of Course Completion
            </h1>

            {/* Subtitle */}
            <p className="text-center text-3xl italic text-gray-600 mb-8">
              This certifies that
            </p>

            {/* Name */}
            <h2
              className="text-center text-5xl font-bold text-black mb-10"
              style={{
                fontFamily: 'cursive',
              }}
            >
              {certificateData.name || 'Your Name'}
            </h2>

            {/* Description */}
            <p className="text-center text-3xl text-gray-800 mb-4">
              has successfully completed the
            </p>

            <p className="text-center text-4xl font-semibold text-yellow-700 mb-10">
              {certificateData.course ||
                'FULL STACK DEVELOPER PROGRAM'}
            </p>

            {/* Details */}
            <div className="max-w-6xl mx-auto text-center text-2xl text-gray-700 leading-relaxed space-y-3">
              <p>
                This program covered front-end development
                using React and Tailwind CSS.
              </p>

              <p>
                Backend technologies included FastAPI,
                SQLAlchemy, and REST API development.
              </p>

              <p>
                The candidate demonstrated proficiency in
                full stack application development,
                deployment, Git version control, and
                database management.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            {/* Info */}
            <div className="flex justify-between items-center mt-10 px-10">
              {/* Left */}
              <div className="space-y-3 text-2xl text-gray-700">
                <p>
                  <strong>Organization:</strong>{' '}
                  Magizh Technologies
                </p>

                <p>
                  <strong>Issue Date:</strong>{' '}
                  {certificateData.issueDate ||
                    '2026-01-01'}
                </p>
              </div>

              {/* Right */}
              <div className="space-y-3 text-2xl text-right text-gray-700">
                <p>
                  <strong>Certificate ID:</strong>{' '}
                  {certificateData.certificateId ||
                    'CERT-2026-001'}
                </p>

                <p>
                  Verify:
                  <span className="text-blue-600 ml-2">
                    www.magizhtechnologies.com
                  </span>
                </p>
              </div>
            </div>

            {/* Signature */}
            <div className="flex justify-between items-end mt-16 px-10">
              {/* Seal */}
              <div className="flex flex-col items-center">
                <img
                  src="/Magizh Technologies.png"
                  alt="Seal"
                  className="w-40 h-40 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display =
                      'none';
                  }}
                />

                <p className="text-xl font-semibold mt-2">
                  Official Seal
                </p>
              </div>

              {/* Signature Area */}
              <div className="text-center">
                <img
                  src="/sig.png"
                  alt="Signature"
                  className="w-[200px] object-contain mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display =
                      'none';
                  }}
                />

                <div className="border-t border-gray-500 mt-3 pt-3">
                  <p className="text-2xl font-bold">
                    Vijay P.
                  </p>

                  <p className="text-xl text-gray-700">
                    CEO, Magizh Technologies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-8">
        <button
          onClick={handleDownload}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default GeneratedCertificate;