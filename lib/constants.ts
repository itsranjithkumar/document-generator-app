import { DocumentTemplate, DocumentType } from './types';

export const DOCUMENT_TYPES: Record<DocumentType | 'courseCompletion', DocumentTemplate> = {
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
  courseCompletion: {
    type: 'courseCompletion',
    title: 'Course Completion',
    description: 'Certificate of course completion',
    url: 'http://localhost:3000/document-generator/course-completion/form',
    icon: '🎓',
  },
  internshipCertificate: {
    type: 'internshipCertificate',
    title: 'Internship Certificate',
    description: 'Certificate of completion for internships',
    icon: '📋',
  },
};
export const DOCUMENT_COLORS = {
  primary: '#000000', // Black headings
  background: '#FFFFFF', // White background
  accent: '#D4AF37', // Gold borders
  text: '#333333', // Dark gray text
  lightBg: '#F9F9F9', // Light gray background for sections
  courseCompletion: {
    type: 'courseCompletion',
    title: 'Course Completion',
    description: 'Certificate of course completion',
    url: 'http://localhost:3000/document-generator/course-completion/form',
    icon: '🎓',
  },
};

export const TAILWIND_COLORS = {
  heading: 'text-black',
  background: 'bg-white',
  border: 'border-yellow-600', // Gold border
  text: 'text-gray-800',
};