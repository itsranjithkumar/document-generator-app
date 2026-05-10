import React from 'react';
import Link from 'next/link';
import { DocumentForm } from '@/components/DocumentForm';

export const metadata = {
  title: 'Document Generator - Create Professional Documents',
  description: 'Generate professional offer letters, relieving letters, and receipts',
};

export default function DocumentGeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-black mb-2">Create Document</h1>
          <p className="text-gray-600">
            Fill in the details below to generate your professional document.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <DocumentForm />
        </div>
      </div>
    </main>
  );
}
