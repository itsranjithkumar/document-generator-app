"use client";
import { useState, useRef, useCallback, memo } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  candidateName: string;
  candidateAddress: string;
  position: string;
  department: string;
  joiningDate: string;
  ctc: string;
  letterDate: string;
  letterRef: string;
  hrName: string;
  hrDesignation: string;
  logo: string;
  signature: string;
  seal: string;
  msmeLogo: string;
};

const Field = memo(({
  label, name, type = "text", placeholder, full, value, onChange,
}: {
  label: string; name: keyof FormState; type?: string; placeholder?: string; full?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-widest uppercase">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
));

Field.displayName = "Field";

const ImageUpload = memo(({
  label, field, inputRef, preview, hint, handleImage,
}: {
  label: string; field: keyof FormState; inputRef: React.RefObject<HTMLInputElement | null>; preview: string; hint: string; handleImage: (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormState) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-widest uppercase">
      {label}
    </label>
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl p-4 cursor-pointer transition-all group flex items-center gap-4 bg-gray-50 hover:bg-blue-50/50"
    >
      {preview ? (
        <img src={preview} alt={label} className="h-12 w-auto object-contain rounded" />
      ) : (
        <div className="h-12 w-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-300 group-hover:text-blue-400 transition flex-shrink-0">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition truncate">
          {preview ? "Change image" : "Upload image"}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{hint}</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e, field)} />
    </div>
  </div>
));

ImageUpload.displayName = "ImageUpload";

const SectionTitle = memo(({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1 h-5 bg-blue-600 rounded-full" />
    <h3 className="text-sm font-bold text-gray-800 tracking-tight">{children}</h3>
  </div>
));

SectionTitle.displayName = "SectionTitle";

const SAMPLE_DATA = {
  companyName: "Nexora Technologies Pvt. Ltd.",
  companyAddress: "Plot No. 14, SIPCOT IT Park, Saravanampatti",
  companyCity: "Coimbatore, Tamil Nadu – 641035",
  companyPhone: "+91 98765 43210",
  companyEmail: "hr@nexoratech.in",
  companyWebsite: "www.nexoratech.in",
  candidateName: "Mr. Arjun Krishnamurthy",
  candidateAddress: "23/4, Nehru Nagar, R.S. Puram, Coimbatore – 641002",
  position: "Senior Software Engineer",
  department: "Technology & Product",
  joiningDate: "2024-07-15",
  ctc: "9,60,000",
  letterDate: "2024-06-28",
  letterRef: "HR/OL/2024/047",
  hrName: "Mrs. Priya Sharma",
  hrDesignation: "Head of Human Resources",
};

export default function OfferLetterForm() {
  const router = useRouter();
  const logoRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);
  const sealRef = useRef<HTMLInputElement>(null);
  const msmeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    candidateName: "",
    candidateAddress: "",
    position: "",
    department: "",
    joiningDate: "",
    ctc: "",
    letterDate: "",
    letterRef: "",
    hrName: "",
    hrDesignation: "",
    logo: "",
    signature: "",
    seal: "",
    msmeLogo: "",
  });

  const [filled, setFilled] = useState(false);

  const fillSample = () => {
    setForm((f) => ({ ...f, ...SAMPLE_DATA }));
    setFilled(true);
    setTimeout(() => setFilled(false), 2500);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormState) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setForm((f) => ({ ...f, [field]: b64 }));
  };

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof FormState;
    const value = e.target.value;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const handlePreview = () => {
    const snapshot = { ...form };
    localStorage.setItem("offerLetterData", JSON.stringify(snapshot));
    router.push("/document-generator/offer-letter/preview");
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Offer Letter Generator</h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in details to generate a professional offer letter</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fillSample}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border-2 transition-all ${
                filled
                  ? "bg-green-50 border-green-400 text-green-700"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {filled ? (
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {filled ? "Filled!" : "Auto Fill Sample"}
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Letter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Branding Assets */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Branding Assets</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload label="Company Logo" field="logo" inputRef={logoRef} preview={form.logo} hint="PNG or JPG · max 300×100px" handleImage={handleImage} />
            <ImageUpload label="MSME Logo / Badge" field="msmeLogo" inputRef={msmeRef} preview={form.msmeLogo} hint="MSME registration badge" handleImage={handleImage} />
            <ImageUpload label="Official Seal / Stamp" field="seal" inputRef={sealRef} preview={form.seal} hint="Round or rectangular company seal" handleImage={handleImage} />
            <ImageUpload label="Authorised Signature" field="signature" inputRef={signatureRef} preview={form.signature} hint="PNG with transparent background preferred" handleImage={handleImage} />
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Company Details</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company Name" name="companyName" placeholder="Nexora Technologies Pvt. Ltd." full value={form.companyName} onChange={handleChange} />
            <Field label="Company Address" name="companyAddress" placeholder="14, SIPCOT IT Park, Saravanampatti" full value={form.companyAddress} onChange={handleChange} />
            <Field label="City, State, PIN" name="companyCity" placeholder="Coimbatore, Tamil Nadu – 641035" value={form.companyCity} onChange={handleChange} />
            <Field label="Phone" name="companyPhone" placeholder="+91 98765 43210" value={form.companyPhone} onChange={handleChange} />
            <Field label="Email" name="companyEmail" type="email" placeholder="hr@company.com" value={form.companyEmail} onChange={handleChange} />
            <Field label="Website" name="companyWebsite" placeholder="www.company.com" value={form.companyWebsite} onChange={handleChange} />
          </div>
        </div>

        {/* Letter Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Letter Details</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Letter Date" name="letterDate" type="date" value={form.letterDate} onChange={handleChange} />
            <Field label="Reference Number" name="letterRef" placeholder="HR/OL/2024/001" value={form.letterRef} onChange={handleChange} />
          </div>
        </div>

        {/* Candidate Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Candidate Details</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Candidate Full Name" name="candidateName" placeholder="Mr. Rajesh Kumar" full value={form.candidateName} onChange={handleChange} />
            <Field label="Candidate Address" name="candidateAddress" placeholder="45, Gandhi Nagar, Coimbatore – 641002" full value={form.candidateAddress} onChange={handleChange} />
            <Field label="Position / Designation" name="position" placeholder="Software Engineer" value={form.position} onChange={handleChange} />
            <Field label="Department" name="department" placeholder="Technology & Product" value={form.department} onChange={handleChange} />
            <Field label="Date of Joining" name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} />
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Compensation (Annual in ₹)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="CTC (Annual)" name="ctc" placeholder="9,60,000" full value={form.ctc} onChange={handleChange} />
          </div>
        </div>

        {/* Signing Authority */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionTitle>Signing Authority</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="HR / Signatory Name" name="hrName" placeholder="Mrs. Priya Sharma" value={form.hrName} onChange={handleChange} />
            <Field label="Designation" name="hrDesignation" placeholder="Head of Human Resources" value={form.hrDesignation} onChange={handleChange} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={fillSample}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border-2 transition-all ${
              filled
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-white border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {filled ? "✓ Sample data filled" : "Fill with sample data"}
          </button>
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all text-sm"
          >
            Preview & Download PDF
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
