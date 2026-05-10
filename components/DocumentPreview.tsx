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

  const renderOfferLetter = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-yellow-600 pb-6">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="h-20 object-contain" />
        )}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-black">{data.companyName}</h1>
          {data.companyAddress && (
            <p className="text-sm text-gray-700">{data.companyAddress}</p>
          )}
          {data.companyPhone && (
            <p className="text-sm text-gray-700">Phone: {data.companyPhone}</p>
          )}
          {data.companyEmail && (
            <p className="text-sm text-gray-700">Email: {data.companyEmail}</p>
          )}
        </div>
      </div>

      {/* Document Title */}
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-black">OFFER OF EMPLOYMENT</h2>
      </div>

      {/* Content */}
      <div className="space-y-4 text-gray-800">
        <p>
          <strong>Date:</strong> {formatDate(new Date().toISOString().split('T')[0])}
        </p>
        <p>
          <strong>To:</strong>
          <br />
          {data.candidateName}
        </p>

        <p>
          Dear {data.candidateName},
        </p>

        <p>
          We are pleased to offer you the position of <strong>{data.position}</strong>{' '}
          {data.department && <>in the <strong>{data.department}</strong> Department</>} with{' '}
          <strong>{data.companyName}</strong>.
        </p>

        <div className="bg-gray-50 p-4 rounded border-l-4 border-yellow-600 space-y-2">
          <p>
            <strong>Position:</strong> {data.position}
          </p>
          {data.department && (
            <p>
              <strong>Department:</strong> {data.department}
            </p>
          )}
          <p>
            <strong>Annual Salary:</strong> {data.salary || 'To be mutually agreed'}
          </p>
          {data.startDate && (
            <p>
              <strong>Start Date:</strong> {formatDate(data.startDate)}
            </p>
          )}
          {data.reportingTo && (
            <p>
              <strong>Reporting To:</strong> {data.reportingTo}
            </p>
          )}
        </div>

        {data.termsAndConditions && (
          <>
            <p>
              <strong>Terms and Conditions:</strong>
            </p>
            <p className="whitespace-pre-wrap">{data.termsAndConditions}</p>
          </>
        )}

        <p>
          We look forward to working with you and are excited about the contributions you will
          make to our organization.
        </p>

        <p>Please acknowledge receipt of this letter and confirm your acceptance.</p>

        <p>Yours sincerely,</p>
      </div>

      {/* Signature Area */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-300">
        <div>
          <div className="h-20 flex items-end justify-center">
            {data.signature && (
              <img src={data.signature} alt="Signature" className="h-16 object-contain" />
            )}
          </div>
          <div className="border-t border-black pt-2 text-center">
            <p className="text-sm font-semibold text-black">Authorized Signatory</p>
            <p className="text-xs text-gray-600">{data.companyName}</p>
          </div>
        </div>
        {data.seal && (
          <div className="flex items-end justify-center">
            <img src={data.seal} alt="Seal" className="h-20 object-contain" />
          </div>
        )}
      </div>
    </div>
  );

  const renderRelievingLetter = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-yellow-600 pb-6">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="h-20 object-contain" />
        )}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-black">{data.companyName}</h1>
          {data.companyAddress && (
            <p className="text-sm text-gray-700">{data.companyAddress}</p>
          )}
          {data.companyPhone && (
            <p className="text-sm text-gray-700">Phone: {data.companyPhone}</p>
          )}
          {data.companyEmail && (
            <p className="text-sm text-gray-700">Email: {data.companyEmail}</p>
          )}
        </div>
      </div>

      {/* Document Title */}
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-black">RELIEVING LETTER</h2>
      </div>

      {/* Content */}
      <div className="space-y-4 text-gray-800">
        <p>
          <strong>Date:</strong> {formatDate(new Date().toISOString().split('T')[0])}
        </p>

        <p>
          <strong>To Whom It May Concern,</strong>
        </p>

        <p>
          This letter is to confirm that <strong>{data.employeeName}</strong> has been relieved from
          his/her duties as <strong>{data.designation}</strong> at <strong>{data.companyName}</strong>.
        </p>

        <div className="bg-gray-50 p-4 rounded border-l-4 border-yellow-600 space-y-2">
          {data.employeeId && (
            <p>
              <strong>Employee ID:</strong> {data.employeeId}
            </p>
          )}
          <p>
            <strong>Designation:</strong> {data.designation}
          </p>
          {data.joiningDate && (
            <p>
              <strong>Date of Joining:</strong> {formatDate(data.joiningDate)}
            </p>
          )}
          {data.relievingDate && (
            <p>
              <strong>Date of Relieving:</strong> {formatDate(data.relievingDate)}
            </p>
          )}
          {data.salary && (
            <p>
              <strong>Last Drawn Salary:</strong> {data.salary}
            </p>
          )}
        </div>

        {data.serviceDescription && (
          <>
            <p>
              <strong>Service Summary:</strong>
            </p>
            <p className="whitespace-pre-wrap">{data.serviceDescription}</p>
          </>
        )}

        <p>
          The employee has completed all official formalities and has been relieved as per the
          company&apos;s policies.
        </p>

        <p>
          We wish them all the best for their future endeavors.
        </p>

        <p>Yours sincerely,</p>
      </div>

      {/* Signature Area */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-300">
        <div>
          <div className="h-20 flex items-end justify-center">
            {data.signature && (
              <img src={data.signature} alt="Signature" className="h-16 object-contain" />
            )}
          </div>
          <div className="border-t border-black pt-2 text-center">
            <p className="text-sm font-semibold text-black">Authorized Signatory</p>
            <p className="text-xs text-gray-600">{data.companyName}</p>
          </div>
        </div>
        {data.seal && (
          <div className="flex items-end justify-center">
            <img src={data.seal} alt="Seal" className="h-20 object-contain" />
          </div>
        )}
      </div>
    </div>
  );

  const renderReceipt = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-yellow-600 pb-6">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="h-20 object-contain" />
        )}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-black">{data.companyName}</h1>
          {data.companyAddress && (
            <p className="text-sm text-gray-700">{data.companyAddress}</p>
          )}
          {data.companyPhone && (
            <p className="text-sm text-gray-700">Phone: {data.companyPhone}</p>
          )}
          {data.companyEmail && (
            <p className="text-sm text-gray-700">Email: {data.companyEmail}</p>
          )}
        </div>
      </div>

      {/* Document Title */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-black">RECEIPT</h2>
      </div>

      {/* Receipt Details */}
      <div className="space-y-2 text-gray-800 text-sm">
        <div className="flex justify-between">
          <strong>Receipt Number:</strong>
          <span>{data.receiptNumber}</span>
        </div>
        <div className="flex justify-between">
          <strong>Date:</strong>
          <span>{formatDate(data.receiptDate) || formatDate(new Date().toISOString().split('T')[0])}</span>
        </div>
      </div>

      {/* Items */}
      <div className="border-y border-gray-300 py-4 my-4">
        {data.itemDescription && (
          <p className="text-gray-800 whitespace-pre-wrap mb-4">{data.itemDescription}</p>
        )}

        <table className="w-full text-sm text-gray-800">
          <tbody>
            {data.quantity && (
              <tr className="border-b border-gray-300">
                <td className="py-2"><strong>Quantity:</strong></td>
                <td className="text-right">{data.quantity}</td>
              </tr>
            )}
            {data.unitPrice && (
              <tr className="border-b border-gray-300">
                <td className="py-2"><strong>Unit Price:</strong></td>
                <td className="text-right">Rs. {parseFloat(data.unitPrice).toFixed(2)}</td>
              </tr>
            )}
            <tr className="text-black font-bold text-base">
              <td className="py-4"><strong>Total Amount:</strong></td>
              <td className="text-right">Rs. {parseFloat(data.totalAmount || '0').toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Method */}
      {data.paymentMethod && (
        <div className="text-gray-800 text-sm">
          <strong>Payment Method:</strong> {data.paymentMethod}
        </div>
      )}

      {/* Signature Area */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-300 mt-8">
        <div>
          {data.receivedBy && (
            <p className="text-sm text-gray-800 mb-2">
              <strong>Received By:</strong> {data.receivedBy}
            </p>
          )}
          <div className="h-16 flex items-end justify-center">
            {data.signature && (
              <img src={data.signature} alt="Signature" className="h-12 object-contain" />
            )}
          </div>
          <div className="border-t border-black pt-2 text-center">
            <p className="text-xs text-gray-600">Signature</p>
          </div>
        </div>
        {data.seal && (
          <div className="flex items-end justify-center">
            <img src={data.seal} alt="Seal" className="h-16 object-contain" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 mt-8 pt-4 border-t border-gray-300">
        <p>Thank you for your transaction!</p>
      </div>
    </div>
  );

  let content;
  switch (data.documentType) {
    case 'offer':
      content = renderOfferLetter();
      break;
    case 'relieving':
      content = renderRelievingLetter();
      break;
    case 'receipt':
      content = renderReceipt();
      break;
    default:
      content = <div>Unknown document type</div>;
  }

  return (
    <div className="bg-white border-4 border-yellow-600 rounded-lg p-8 min-h-screen max-w-4xl mx-auto" 
         style={{ fontFamily: 'Arial, sans-serif' }}>
      {content}
    </div>
  );
};
