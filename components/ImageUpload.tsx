'use client';

import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  description?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  description,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-black mb-2">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-600 mb-3">{description}</p>
      )}

      {value ? (
        <div className="relative w-full h-32 border-2 border-yellow-600 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={value}
            alt={label}
            className="max-h-full max-w-full object-contain"
          />
          <button
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragging
              ? 'border-yellow-600 bg-yellow-50'
              : 'border-gray-300 bg-gray-50 hover:border-yellow-600'
          }`}
        >
          <Upload className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-sm font-medium text-gray-700">
            Drag and drop your image here
          </p>
          <p className="text-xs text-gray-500">or click to select</p>
          <p className="text-xs text-gray-500 mt-2">Max 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
        className="hidden"
      />
    </div>
  );
};
