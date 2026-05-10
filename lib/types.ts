export type DocumentType = 'offer' | 'relieving' | 'receipt';

export interface FormData {
  documentType: DocumentType;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  logo: string | null;
  signature: string | null;
  seal: string | null;
  
  // Offer Letter specific
  candidateName?: string;
  position?: string;
  department?: string;
  salary?: string;
  startDate?: string;
  reportingTo?: string;
  termsAndConditions?: string;
  
  // Relieving Letter specific
  employeeName?: string;
  designation?: string;
  employeeId?: string;
  joiningDate?: string;
  relievingDate?: string;
  serviceDescription?: string;
  
  // Receipt specific
  receiptNumber?: string;
  receiptDate?: string;
  itemDescription?: string;
  quantity?: string;
  unitPrice?: string;
  totalAmount?: string;
  paymentMethod?: string;
  receivedBy?: string;
}

export interface DocumentTemplate {
  type: DocumentType;
  title: string;
  description: string;
  icon: string;
}
