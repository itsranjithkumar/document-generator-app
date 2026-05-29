'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Playfair_Display, Lora, Cinzel, Great_Vibes } from 'next/font/google';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['700', '900'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

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
    await document.fonts.ready;

    const images = certificateRef.current.querySelectorAll('img');

    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn('Failed image:', img.src);
            img.style.display = 'none';
            resolve();
          };
        });
      })
    );

    const dataUrl = await toPng(certificateRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: '#ffffff',
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(
      `certificate_${certificateData.certificateId || 'document'}.pdf`
    );
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('Failed to generate PDF');
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 overflow-auto">
      {/* Certificate */}
      <div
        ref={certificateRef}
        className="relative bg-white shadow-2xl overflow-hidden"
        style={{
          width: '1600px',
          minHeight: '1000px',
          border: '12px double #D4AF37',
          background: '#f8f8f8',
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
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
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="flex justify-center pb-8">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Heading */}
            <h1
              className={`text-center text-7xl font-bold text-black pb-8 ${cinzel.className}`}
              style={{
                letterSpacing: '4px',
                fontWeight: 900,
              }}
            >
              Certificate of Course Completion
            </h1>

            {/* Subtitle */}
            <p className={`text-center text-4xl italic text-gray-600 pb-10 ${lora.className}`}>
              This certifies that
            </p>

            {/* Name */}
            <h2
              className={`text-center text-7xl text-black pb-12 ${greatVibes.className}`}
              style={{
                fontStyle: 'italic',
                letterSpacing: '2px',
              }}
            >
              {certificateData.name || 'Your Name'}
            </h2>

            {/* Description */}
            <p className={`text-center text-4xl text-gray-800 pb-4 ${lora.className}`}>
              has successfully completed the
            </p>

            <p className={`text-center text-4xl font-semibold text-yellow-700 pb-8 ${cinzel.className}`}
              style={{
                letterSpacing: '2px',
              }}
            >
              FULL STACK DEVELOPER program.
            </p>

            <p className={`text-center text-3xl italic pb-12 text-gray-800 ${lora.className}`}>
              Completed in 3 months
            </p>

            {/* Details */}
            <div className={`max-w-5xl mx-auto text-center text-xl text-gray-700 leading-relaxed pb-8 ${lora.className}`}>
              <p>
                This program covered front-end development using React and Tailwind CSS, as well as back-end technologies like FastAPI and SQLAlchemy. The recipient demonstrated proficiency in building RESTful APIs, database management, and deploying applications. Practical hands-on experience included integrating third-party services and version control systems like Git.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            {/* Info */}
            <div className="flex justify-between items-start mb-8 px-16">
              {/* Left */}
              <div className={`space-y-4 text-xl text-gray-700 ${lora.className}`}>
                <p>
                  <strong>Organization:</strong>{' '}
                  <span className="ml-2">Magizh Technologies</span>
                </p>

                <p>
                  <strong>Issue Date:</strong>{' '}
                  <span className="ml-2">
                    {certificateData.issueDate ||
                      '2026-01-01'}
                  </span>
                </p>
              </div>

              {/* Right */}
              <div className={`space-y-4 text-xl text-right text-gray-700 ${lora.className}`}>
                <p>
                  <strong>Certificate ID:</strong>{' '}
                  <span className="ml-2">
                    {certificateData.certificateId ||
                      'CERT-2026-001'}
                  </span>
                </p>

                <p className="text-lg text-gray-600">
                  <strong>Verify here:</strong>{' '}
                  <a
                    href="https://www.magizhtechnologies.com/certificates/verify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    www.magizhtechnologies.com
                  </a>
                </p>
              </div>
            </div>

            {/* Gold Line */}
            <div style={{ margin: '40px 60px 0 60px', borderTop: '3px double #D4AF37' }}></div>

            {/* Signature Section */}
            <div className="flex justify-between items-end mt-4 px-16" style={{ minHeight: '220px' }}>
              {/* Signature Area */}
          <div className="flex flex-col items-center w-56">
  <img
    src="/sig.png"
    alt="Signature"
    className="w-48 h-auto object-contain -mb-4"
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />

 <div
  className={`border-t-2 border-gray-500 w-full pt-1 -mt-4 text-center ${cinzel.className}`}
  style={{
    letterSpacing: '1px',
  }}
>
    <p className="text-2xl font-bold text-black leading-none">
      Vijay P
    </p>

    <p
      className={`text-lg text-gray-700 whitespace-nowrap leading-none mt-1 ${lora.className}`}
    >
      CEO, Magizh Technologies
    </p>
  </div>
</div>

             <div className="flex flex-col items-center">
  <img
    src="/msme.png"
    alt="MSME Registered"
className="w-36 h-36 object-contain"
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />

<p
  className={`text-base font-medium text-gray-700 mt-4 text-center ${lora.className}`}
>
  MSME Registered
</p>
</div>
              {/* Seal */}
            <div className="flex flex-col items-center">
  <img
    src="/seal.png"
    alt="Official Seal"
    className="w-40 h-40 object-contain"
    style={{
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
    }}
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />

  <p
  className={`text-base font-medium text-gray-700 mt-4 text-center ${lora.className}`}
>
  Official Seal
</p>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6">
        <button
          onClick={handleDownload}
          className={`bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition duration-300 text-lg ${cinzel.className}`}
          style={{
            letterSpacing: '1px',
          }}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default GeneratedCertificate;
