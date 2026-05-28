"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function CertificateForm() {
  const router = useRouter();
  const logoRef = useRef<HTMLInputElement>(null);
  const sealRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);
  const msmeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    employeeName: "",
    designation: "",
    department: "",
    employeeId: "",
    joinDate: "",
    relievingDate: "",
    jobDescription: "",
    certDate: "",
    hrName: "",
    hrDesignation: "",
    certificateNo: "",
  });

  const [images, setImages] = useState({
    logo: null as string | null,
    seal: null as string | null,
    signature: null as string | null,
    msme: null as string | null,
  });

  const [previews, setPreviews] = useState({
    logo: null as string | null,
    seal: null as string | null,
    signature: null as string | null,
    msme: null as string | null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFillDummyData = () => {
    setForm({
      companyName: "Nexora Technologies Pvt. Ltd.",
      companyAddress: "123 Tech Park, Electronic City, Bangalore - 560100, Karnataka",
      companyEmail: "hr@nexoratech.com",
      companyPhone: "+91 98765 43210",
      employeeName: "Arjun Ramesh Kumar",
      designation: "Full Stack Developer",
      department: "Product & Engineering",
      employeeId: "EMP-2021-047",
      joinDate: "2021-03-15",
      relievingDate: "2024-03-14",
      jobDescription:
        "Developed and maintained full-stack web applications, designed and implemented APIs, created responsive user interfaces, and optimized database performance. Collaborated with cross-functional teams to deliver scalable software solutions and significantly improved application performance.",
      certDate: "2024-03-15",
      hrName: "Priya Krishnamurthy",
      hrDesignation: "Head of Human Resources",
      certificateNo: "NXT/HR/2024/001",
    });
  };

  const handleImageUpload = (field: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImages((prev) => ({ ...prev, [field]: result }));
      setPreviews((prev) => ({ ...prev, [field]: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, ...images };
    sessionStorage.setItem("certData", JSON.stringify(data));
    router.push("/document-generator/experience-certificate/preview");
  };

  const inputClass =
    "w-full bg-white/60 border border-white/20 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-blue-500/20 transition-all font-sans backdrop-blur-sm";

  const labelClass =
    "block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-sans">
      {/* ── Premium Header ── */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Certificate Generator</h1>
              <p className="text-xs text-slate-500">Professional HR documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFillDummyData}
              className="text-xs font-semibold text-slate-600 px-4 py-2.5 rounded-lg hover:bg-white/80 transition-all border border-slate-200/50 hover:border-slate-300"
            >
              ✨ Fill Sample Data
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* ── LEFT: Form ── */}
          <div className="col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ── Section 1: Company Information ── */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-blue-600/5 to-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Company Information</h2>
                    <p className="text-xs text-slate-500">Header details</p>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className={labelClass}>Organization Name <span className="text-red-500">*</span></label>
                    <input name="companyName" value={form.companyName} onChange={handleChange} required
                      placeholder="Nexora Technologies Pvt. Ltd." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Registered Address <span className="text-red-500">*</span></label>
                    <input name="companyAddress" value={form.companyAddress} onChange={handleChange} required
                      placeholder="123 Tech Park, Bangalore" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input name="companyEmail" value={form.companyEmail} onChange={handleChange}
                        placeholder="hr@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input name="companyPhone" value={form.companyPhone} onChange={handleChange}
                        placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Certificate No. <span className="text-red-500">*</span></label>
                      <input name="certificateNo" value={form.certificateNo} onChange={handleChange} required
                        placeholder="NXT/HR/2024/001" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Issue Date <span className="text-red-500">*</span></label>
                      <input type="date" name="certDate" value={form.certDate} onChange={handleChange} required
                        className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Branding Assets ── */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-purple-600/5 to-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Branding Assets</h2>
                    <p className="text-xs text-slate-500">Logo, seal, signature, MSME badge</p>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-5">
                  {[
                    { key: "logo", label: "Company Logo", desc: "Header left", ref: logoRef },
                    { key: "seal", label: "Official Seal", desc: "Certificate center", ref: sealRef },
                    { key: "signature", label: "Signature", desc: "Signatory line", ref: signatureRef },
                    { key: "msme", label: "MSME Badge", desc: "Header & footer", ref: msmeRef },
                  ].map(({ key, label, desc, ref }) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div
                        onClick={() => ref.current?.click()}
                        className={`flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all
                          ${previews[key as keyof typeof previews]
                            ? "border-blue-400 bg-blue-50"
                            : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/40"}`}
                      >
                        {previews[key as keyof typeof previews] ? (
                          <>
                            <img
                              src={previews[key as keyof typeof previews] || ""}
                              alt={label}
                              className="w-12 h-12 object-contain rounded-lg bg-white shadow-sm border border-slate-200"
                            />
                            <div className="text-center">
                              <p className="text-xs font-semibold text-blue-700">✓ Uploaded</p>
                              <p className="text-[10px] text-slate-400">Click to replace</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-2xl">📄</div>
                            <div className="text-center">
                              <p className="text-xs font-semibold text-slate-600">{desc}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Click to upload</p>
                            </div>
                          </>
                        )}
                      </div>
                      <input ref={ref} type="file" accept="image/*"
                        onChange={(e) => handleImageUpload(key, e)} className="hidden" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section 3: Employee Details ── */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-emerald-600/5 to-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Employee Details</h2>
                    <p className="text-xs text-slate-500">Personal information</p>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input name="employeeName" value={form.employeeName} onChange={handleChange} required
                      placeholder="Arjun Ramesh Kumar" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Designation <span className="text-red-500">*</span></label>
                      <input name="designation" value={form.designation} onChange={handleChange} required
                        placeholder="Senior Software Engineer" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Department</label>
                      <input name="department" value={form.department} onChange={handleChange}
                        placeholder="Product & Engineering" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Employee ID</label>
                    <input name="employeeId" value={form.employeeId} onChange={handleChange}
                      placeholder="EMP-2021-047" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Date of Joining <span className="text-red-500">*</span></label>
                      <input type="date" name="joinDate" value={form.joinDate} onChange={handleChange} required
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Relieving <span className="text-red-500">*</span></label>
                      <input type="date" name="relievingDate" value={form.relievingDate} onChange={handleChange} required
                        className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Key Responsibilities</label>
                    <textarea
                      name="jobDescription"
                      value={form.jobDescription}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe key roles and achievements..."
                      className={inputClass + " resize-none"}
                    />
                  </div>
                </div>
              </div>

              {/* ── Section 4: Signatory ── */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-amber-600/5 to-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">4</div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Authorised Signatory</h2>
                    <p className="text-xs text-slate-500">HR authority details</p>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Signatory Name <span className="text-red-500">*</span></label>
                      <input name="hrName" value={form.hrName} onChange={handleChange} required
                        placeholder="Ms. Priya Krishnamurthy" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Designation <span className="text-red-500">*</span></label>
                      <input name="hrDesignation" value={form.hrDesignation} onChange={handleChange} required
                        placeholder="Head of Human Resources" className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Submit Button ── */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-blue-200 text-sm"
                >
                  Preview Certificate →
                </button>
              </div>
            </form>
          </div>

          {/* ── RIGHT: Live Preview Card ── */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-slate-600/5 to-transparent">
                <h3 className="text-sm font-bold text-slate-900">Live Preview</h3>
                <p className="text-xs text-slate-500 mt-1">A4 Size Preview</p>
              </div>
              <div className="p-4 flex justify-center" style={{ aspectRatio: "210/297" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "210/297",
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "#9ca3af",
                    padding: "16px",
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📄</div>
                    <p className="text-xs">Fill in details to see preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
