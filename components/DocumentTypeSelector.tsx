'use client';

import React from 'react';
import { DocumentType } from '@/lib/types';
import { DOCUMENT_TYPES } from '@/lib/constants';

interface DocumentTypeSelectorProps {
  value: DocumentType;
  onChange: (type: DocumentType) => void;
}

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-black mb-3">
        Document Type
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(DOCUMENT_TYPES).map(([key, template]) => (
          <button
            key={key}
            onClick={() => onChange(key as DocumentType)}
            className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
              value === key
                ? 'border-yellow-600 bg-yellow-50'
                : 'border-gray-300 bg-white hover:border-yellow-600'
            }`}
            type="button"
          >
            <span className="text-3xl">{template.icon}</span>
            <h3 className="font-semibold text-black text-center">
              {template.title}
            </h3>
            <p className="text-xs text-gray-600 text-center">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
