'use client';

import React from 'react';
import { FormData } from '@/lib/types';

interface DocumentPreviewProps {
  data: FormData;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const today = formatDate(new Date().toISOString().split('T')[0]);

  /* ─── Shared sub-components ─── */

  const CompanyHeader = () => (
    <div style={{ borderBottom: '3px solid #B8860B', paddingBottom: '16px', marginBottom: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo – slightly smaller than before */}
        <div style={{ flex: '0 0 auto' }}>
          {data.logo ? (
            <img
              src={data.logo}
              alt="Company Logo"
              style={{ height: '88px', width: 'auto', maxWidth: '150px', objectFit: 'contain' }}
            />
          ) : (
            <div style={{
              height: '88px', width: '88px',
              background: '#f9f4e8',
              border: '2px solid #B8860B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '4px',
            }}>
              <span style={{ fontSize: '11px', color: '#B8860B', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>LOGO</span>
            </div>
          )}
        </div>

        {/* Company details – right */}
        <div style={{ textAlign: 'right' }}>
          <h1 style={{
            fontSize: '19px', fontWeight: 700, color: '#111',
            margin: '0 0 5px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>
            {data.companyName || 'Company Name'}
          </h1>
          {data.companyAddress && (
            <p style={{ fontSize: '11px', color: '#555', margin: '0 0 2px' }}>{data.companyAddress}</p>
          )}
          {data.companyPhone && (
            <p style={{ fontSize: '11px', color: '#555', margin: '0 0 2px' }}>Tel: {data.companyPhone}</p>
          )}
          {data.companyEmail && (
            <p style={{ fontSize: '11px', color: '#B8860B', margin: '0', fontWeight: 600 }}>{data.companyEmail}</p>
          )}
        </div>
      </div>
    </div>
  );

  const DocumentTitle = ({ title }: { title: string }) => (
    <div style={{ textAlign: 'center', margin: '0 0 22px' }}>
      <h2 style={{
        fontSize: '15px', fontWeight: 700, color: '#111',
        letterSpacing: '4px', textTransform: 'uppercase',
        margin: '0 0 7px', display: 'inline-block',
      }}>
        {title}
      </h2>
      <div style={{ height: '2px', background: '#B8860B', width: '56px', margin: '0 auto' }} />
    </div>
  );

  const GoldDivider = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
      <div style={{ flex: 1, height: '1px', background: '#B8860B', opacity: 0.35 }} />
      <div style={{ width: '5px', height: '5px', background: '#B8860B', transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: '1px', background: '#B8860B', opacity: 0.35 }} />
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div style={{ display: 'flex', borderBottom: '1px solid #ede8d8', padding: '8px 0' }}>
        <span style={{
          flex: '0 0 180px', fontSize: '11px', color: '#777',
          fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
          paddingTop: '1px',
        }}>
          {label}
        </span>
        <span style={{ flex: 1, fontSize: '12px', color: '#111', fontWeight: 500 }}>{value}</span>
      </div>
    ) : null;

  /* ─── Signature block – offer letter (reduced gap) ─── */
  const SignatureBlockOffer = () => (
    <div
      style={{
        marginTop: '40px',
        paddingTop: '28px',
        borderTop: '1px solid #ddd',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        {/* Authorized signatory */}
        <div style={{ textAlign: 'center', width: '240px' }}>
          {data.signature ? (
            <img
              src={data.signature}
              alt="Signature"
              style={{
                height: '130px',
                width: '230px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto 4px',
              }}
            />
          ) : (
            <div
              style={{
                height: '130px',
                borderBottom: '2px solid #111',
                width: '230px',
                margin: '0 auto 4px',
              }}
            />
          )}

          <div
            style={{
              borderTop: '2px solid #111',
              paddingTop: '4px',
              width: '230px',
              margin: '0 auto',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 700,
                color: '#111',
                letterSpacing: '0.8px',
              }}
            >
              Vijay P
            </p>

            <p
              style={{
                margin: '2px 0 0',
                fontSize: '12px',
                color: '#666',
              }}
            >
              CEO
            </p>

            <p
              style={{
                margin: '2px 0 0',
                fontSize: '12px',
                color: '#666',
              }}
            >
              Magizh Technologies
            </p>
          </div>
        </div>

        {/* Seal */}
        {data.seal && (
          <div
            style={{
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 40px',
              gap: '8px',
            }}
          >
            <img
              src={data.seal}
              alt="Company Seal"
              style={{
                height: '100px',
                width: '100px',
                objectFit: 'contain',
                opacity: 0.88,
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: '10px',
                color: '#999',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Official Seal
            </p>
          </div>
        )}

        {/* MSME Logo */}
        <div
          style={{
            textAlign: 'center',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {data.msmeLogoField ? (
            <img
              src={data.msmeLogoField}
              alt="MSME Logo"
              style={{
                height: '100px',
                width: 'auto',
                maxWidth: '150px',
                objectFit: 'contain',
                marginBottom: '8px',
              }}
            />
          ) : (
            <div
              style={{
                height: '100px',
                width: '150px',
                background: '#f9f4e8',
                border: '2px solid #B8860B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  color: '#B8860B',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                MSME LOGO
              </span>
            </div>
          )}

          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: '#777',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            MSME Registered
          </p>
        </div>
      </div>
    </div>
  );

  /* ─── Signature block – relieving (reduced gap) ─── */
  const SignatureBlockRelieving = () => (
    <div
      style={{
        marginTop: '40px',
        paddingTop: '28px',
        borderTop: '1px solid #ddd',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '60px',
        justifyContent: 'space-between',
      }}
    >
      {/* Authorized signatory */}
      <div style={{ textAlign: 'center', width: '240px' }}>
        {data.signature ? (
          <img
            src={data.signature}
            alt="Signature"
            style={{
              height: '130px',
              width: '230px',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto 4px',
            }}
          />
        ) : (
          <div
            style={{
              height: '130px',
              borderBottom: '2px solid #111',
              width: '230px',
              margin: '0 auto 4px',
            }}
          />
        )}

        <div
          style={{
            borderTop: '2px solid #111',
            paddingTop: '4px',
            width: '230px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              fontWeight: 700,
              color: '#111',
              letterSpacing: '0.8px',
            }}
          >
            Vijay P
          </p>

          <p
            style={{
              margin: '2px 0 0',
              fontSize: '12px',
              color: '#666',
            }}
          >
            CEO
          </p>

          <p
            style={{
              margin: '2px 0 0',
              fontSize: '12px',
              color: '#666',
            }}
          >
            Magizh Technologies
          </p>
        </div>
      </div>

      {/* Seal */}
      {data.seal && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={data.seal}
            alt="Company Seal"
            style={{
              height: '100px',
              width: '100px',
              objectFit: 'contain',
              opacity: 0.88,
              display: 'block',
              marginBottom: '8px',
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: '#999',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Official Seal
          </p>
        </div>
      )}

      {/* MSME */}
      <div
        style={{
          textAlign: 'center',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {data.msmeLogoField ? (
          <img
            src={data.msmeLogoField}
            alt="MSME Logo"
            style={{
              height: '90px',
              width: 'auto',
              maxWidth: '140px',
              objectFit: 'contain',
              marginBottom: '8px',
            }}
          />
        ) : (
          <div
            style={{
              height: '90px',
              width: '140px',
              background: '#f9f4e8',
              border: '2px solid #B8860B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#B8860B',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textAlign: 'center',
                padding: '8px',
              }}
            >
              MSME LOGO
            </span>
          </div>
        )}

        <p
          style={{
            margin: 0,
            fontSize: '10px',
            color: '#777',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          MSME Registered
        </p>
      </div>
    </div>
  );

  /* ─── Offer Letter ─── */
  const renderOfferLetter = () => (
    <>
      <CompanyHeader />
      <DocumentTitle title="Offer of Employment" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}
      >
        {/* Left Side */}
        <div>
          <p
            style={{
              fontSize: '13px',
              color: '#111',
              margin: 0,
              fontWeight: 600,
            }}
          >
            To,
          </p>

          <p
            style={{
              fontSize: '14px',
              color: '#111',
              margin: '4px 0 0',
              fontWeight: 700,
            }}
          >
            {data.candidateName || '_______________'}
          </p>
        </div>

        {/* Right Side */}
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontSize: '13px',
              color: '#666',
              margin: 0,
            }}
          >
            Date: <strong style={{ color: '#111' }}>{today}</strong>
          </p>
        </div>
      </div>

      <GoldDivider />

      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75', marginBottom: '12px' }}>
        Dear <strong>{data.candidateName || '[Candidate Name]'}</strong>,
      </p>
      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75', marginBottom: '16px' }}>
        We are pleased to extend an offer of employment to you for the position of{' '}
        <strong style={{ color: '#B8860B' }}>{data.position || '[Position]'}</strong>
        {data.department && <> within the <strong>{data.department}</strong> Department</>} at{' '}
        <strong>{data.companyName}</strong>. We believe your skills and experience will be a
        valuable addition to our team.
      </p>

      <div style={{
        background: '#fdf9f0',
        border: '1px solid #e8d89a',
        borderLeft: '4px solid #B8860B',
        borderRadius: '0 4px 4px 0',
        padding: '14px 18px',
        marginBottom: '16px',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#B8860B', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px' }}>
          Employment Details
        </p>
        <InfoRow label="Position" value={data.position} />
        <InfoRow label="Department" value={data.department} />
        <InfoRow label="Annual Compensation" value={data.salary} />
        <InfoRow label="Date of Joining" value={data.startDate ? formatDate(data.startDate) : ''} />
        <InfoRow label="Reporting To" value={data.reportingTo} />
      </div>

      {data.termsAndConditions && (
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px', borderBottom: '1px solid #e8d89a', paddingBottom: '5px' }}>
            Terms &amp; Conditions
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#555',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {data.termsAndConditions}
          </p>
        </div>
      )}

      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75', marginBottom: '5px' }}>
        We look forward to welcoming you to the team. Please sign and return a copy of this letter to confirm your acceptance.
      </p>
      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75' }}>
        Congratulations and welcome aboard!
      </p>

      <SignatureBlockOffer />
    </>
  );

  /* ─── Relieving Letter ─── */
  const renderRelievingLetter = () => (
    <>
      <CompanyHeader />
      <DocumentTitle title="Relieving Letter" />

      <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>
          Date: <strong style={{ color: '#111' }}>{today}</strong>
        </p>
        {data.employeeId && (
          <p style={{ fontSize: '13px', color: '#666', margin: '0', textAlign: 'right' }}>
            Ref: <strong style={{ color: '#111' }}>{data.employeeId}</strong>
          </p>
        )}
      </div>

      <GoldDivider />

      <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
        To Whom It May Concern,
      </p>
      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75', marginBottom: '16px' }}>
        This is to certify that{' '}
        <strong style={{ color: '#B8860B' }}>{data.employeeName || '[Employee Name]'}</strong>{' '}
        was employed with <strong>{data.companyName}</strong> as{' '}
        <strong>{data.designation || '[Designation]'}</strong>
        {data.joiningDate && <> from <strong>{formatDate(data.joiningDate)}</strong></>}
        {data.relievingDate && <> until <strong>{formatDate(data.relievingDate)}</strong></>}.
      </p>

      <div style={{
        background: '#fdf9f0',
        border: '1px solid #e8d89a',
        borderLeft: '4px solid #B8860B',
        borderRadius: '0 4px 4px 0',
        padding: '14px 18px',
        marginBottom: '16px',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#B8860B', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px' }}>
          Service Record
        </p>
        <InfoRow label="Employee Name" value={data.employeeName} />
        <InfoRow label="Employee ID" value={data.employeeId} />
        <InfoRow label="Designation" value={data.designation} />
        <InfoRow label="Date of Joining" value={data.joiningDate ? formatDate(data.joiningDate) : ''} />
        <InfoRow label="Date of Relieving" value={data.relievingDate ? formatDate(data.relievingDate) : ''} />
        {/* Last Drawn Salary intentionally excluded */}
      </div>

      {data.serviceDescription && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#666', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px', borderBottom: '1px solid #e8d89a', paddingBottom: '5px' }}>
            Service Summary
          </p>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.65', whiteSpace: 'pre-wrap', margin: 0 }}>
            {data.serviceDescription}
          </p>
        </div>
      )}

      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75', marginBottom: '6px' }}>
        {data.employeeName?.split(' ')[0] || 'The employee'} has completed all necessary handover
        formalities and has been relieved from their duties in accordance with company policies.
      </p>
      <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.75' }}>
        We wish {data.employeeName?.split(' ')[0] || 'them'} the very best in all future endeavors.
      </p>

      <SignatureBlockRelieving />
    </>
  );

  const renderContent = () => {
    switch (data.documentType) {
      case 'offer':     return renderOfferLetter();
      case 'relieving': return renderRelievingLetter();
      default:          return <p>Unknown document type.</p>;
    }
  };

  return (
    <>
      <style>{`
        @media print {
          /* Hide everything on the page */
          body * { visibility: hidden !important; }

          /* Show only the letter */
          #document-print-area,
          #document-print-area * { visibility: visible !important; }

          /* Position it to fill the A4 page */
          #document-print-area {
            position: fixed !important;
            inset: 0 !important;
            margin: 0 !important;
            padding: 22px 30px !important;
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
            /* Keep the gold border visible in print */
            border: 2px solid #B8860B !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide screen-only corner ornaments */
          .doc-corner { display: none !important; }

          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }
        }
      `}</style>

      <div
        id="document-print-area"
        style={{
          background: '#fff',
          border: '2px solid #B8860B',
          boxShadow: '0 0 0 5px #fdf9f0',
          borderRadius: '6px',
          padding: '28px 32px',
          maxWidth: '850px',
          margin: '24px auto',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          color: '#111',
          lineHeight: 1.6,
          minHeight: '1100px',
          position: 'relative',
        }}
      >
        {renderContent()}
      </div>
    </>
  );
};
