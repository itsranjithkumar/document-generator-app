'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { ImageUpload } from './ImageUpload';
import { FormData, DocumentType } from '@/lib/types';

interface DocumentFormProps {
  onSubmit?: (data: FormData) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    documentType: 'offer',
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    logo: null,
    signature: null,
    seal: null,
    candidateName: '',
    position: '',
    department: '',
    salary: '',
    startDate: '',
    reportingTo: '',
    termsAndConditions: '',
    employeeName: '',
    designation: '',
    employeeId: '',
    joiningDate: '',
    relievingDate: '',
    serviceDescription: '',
    receiptNumber: '',
    receiptDate: '',
    itemDescription: '',
    quantity: '',
    unitPrice: '',
    totalAmount: '',
    paymentMethod: '',
    receivedBy: '',
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | DocumentType
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field: keyof FormData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      const encodedData = encodeURIComponent(JSON.stringify(formData));
      router.push(`/document-generator/${formData.documentType}/preview?data=${encodedData}`);
    }
  };

  const isOfferLetter = formData.documentType === 'offer';
  const isRelievingLetter = formData.documentType === 'relieving';
  const isReceipt = formData.documentType === 'receipt';

  return (
    <form onSubmit={handlePreview} className="space-y-8 max-w-4xl mx-auto">
      {/* Document Type Selection */}
      <div>
        <DocumentTypeSelector
          value={formData.documentType}
          onChange={(type) => handleInputChange('documentType', type)}
        />
      </div>

      {/* Company Information */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-bold text-black mb-6">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Company Address
            </label>
            <input
              type="text"
              value={formData.companyAddress}
              onChange={(e) => handleInputChange('companyAddress', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.companyPhone}
              onChange={(e) => handleInputChange('companyPhone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange('companyEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
        </div>
      </div>

      {/* Company Images */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-bold text-black mb-6">Company Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageUpload
            label="Company Logo"
            value={formData.logo}
            onChange={(value) => handleImageChange('logo', value)}
            description="Your company logo/branding"
          />
          <ImageUpload
            label="Signature"
            value={formData.signature}
            onChange={(value) => handleImageChange('signature', value)}
            description="Authorized signatory signature"
          />
          <ImageUpload
            label="Company Seal"
            value={formData.seal}
            onChange={(value) => handleImageChange('seal', value)}
            description="Official company seal/stamp"
          />
        </div>
      </div>

      {/* Offer Letter Fields */}
      {isOfferLetter && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold text-black mb-6">Offer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Candidate Name *
              </label>
              <input
                type="text"
                value={formData.candidateName}
                onChange={(e) => handleInputChange('candidateName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Annual Salary
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Reporting To
              </label>
              <input
                type="text"
                value={formData.reportingTo}
                onChange={(e) => handleInputChange('reportingTo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black mb-2">
                Terms & Conditions
              </label>
              <textarea
                value={formData.termsAndConditions}
                onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 h-24"
              />
            </div>
          </div>
        </div>
      )}

      {/* Relieving Letter Fields */}
      {isRelievingLetter && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold text-black mb-6">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Employee Name *
              </label>
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Designation *
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Joining Date
              </label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Relieving Date *
              </label>
              <input
                type="date"
                value={formData.relievingDate}
                onChange={(e) => handleInputChange('relievingDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Last Drawn Salary
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black mb-2">
                Service Description
              </label>
              <textarea
                value={formData.serviceDescription}
                onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 h-24"
              />
            </div>
          </div>
        </div>
      )}

      {/* Receipt Fields */}
      {isReceipt && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold text-black mb-6">Receipt Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Receipt Number *
              </label>
              <input
                type="text"
                value={formData.receiptNumber}
                onChange={(e) => handleInputChange('receiptNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Receipt Date
              </label>
              <input
                type="date"
                value={formData.receiptDate}
                onChange={(e) => handleInputChange('receiptDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black mb-2">
                Item Description
              </label>
              <textarea
                value={formData.itemDescription}
                onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Unit Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Total Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Payment Method
              </label>
              <input
                type="text"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Received By
              </label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => handleInputChange('receivedBy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="border-t pt-8 flex gap-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
        >
          Preview Document
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
