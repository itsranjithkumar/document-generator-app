import { DocumentTemplate, DocumentType } from './types';

export const DOCUMENT_TYPES: Record<DocumentType, DocumentTemplate> = {
  offer: {
    type: 'offer',
    title: 'Offer Letter',
    description: 'Professional offer letter for new employees',
    icon: '📄',
  },
  relieving: {
    type: 'relieving',
    title: 'Relieving Letter',
    description: 'Formal relieving letter for departing employees',
    icon: '📋',
  },
  receipt: {
    type: 'receipt',
    title: 'Receipt',
    description: 'Official payment or transaction receipt',
    icon: '🧾',
  },
};

export const DOCUMENT_COLORS = {
  primary: '#000000', // Black headings
  background: '#FFFFFF', // White background
  accent: '#D4AF37', // Gold borders
  text: '#333333', // Dark gray text
  lightBg: '#F9F9F9', // Light gray background for sections
};

export const TAILWIND_COLORS = {
  heading: 'text-black',
  background: 'bg-white',
  border: 'border-yellow-600', // Gold border
  text: 'text-gray-800',
};
