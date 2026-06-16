"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface CertificateData {
  employeeName?: string;
  employeeId?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  department?: string;
  designation?: string;
  joinDate?: string;
  relievingDate?: string;
  jobDescription?: string;
  hrName?: string;
  hrDesignation?: string;
  certificateNo?: string;
  certDate?: string;
  logo?: string;
  msme?: string;
  signature?: string;
  seal?: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function computeTenure(join?: string, relieve?: string) {
  if (!join || !relieve) return "";
  const start = new Date(join);
  const end = new Date(relieve);
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (rem > 0) parts.push(`${rem} month${rem > 1 ? "s" : ""}`);
  return parts.join(" and ") || "less than a month";
}

export default function CertificatePreview() {
  const router = useRouter();
  const certRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CertificateData | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("certData");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch (error) {
        console.error("Invalid session storage data", error);
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!certRef.current || !data) return;
    try {
      setDownloading(true);
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: `Experience_Certificate_${
          data.employeeName?.replace(/\s+/g, "_") || "Certificate"
        }.pdf`,
        image: { type: "jpeg" as const, quality: 1 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: 794,
          height: 1123,
          windowWidth: 794,
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123] as [number, number],
          orientation: "portrait" as const,
          hotfixes: ["px_scaling"],
        },
        pagebreak: { mode: ["avoid-all"] },
      };

      await html2pdf().set(opt).from(certRef.current).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-xl p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-900 mb-3">No certificate data found</h2>
          <p className="text-slate-600 text-sm mb-6">Please fill and submit the form first.</p>
          <button
            onClick={() => router.push("/form")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-blue-200"
          >
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  const tenure = computeTenure(data.joinDate, data.relievingDate);

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cert-printable, #cert-printable * { visibility: visible !important; }
          #cert-printable {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 794px !important;
            height: 1123px !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* ── Premium Header ── */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm no-print">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/form")}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
            >
              ← Edit Form
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 text-white px-7 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-blue-200 transition-all"
            >
              {downloading ? "Generating PDF…" : "⬇ Download PDF"}
            </button>
          </div>
        </header>

        {/* ── Certificate Preview ── */}
        <div className="py-10 px-4 flex justify-center no-print">
          <div
            id="cert-printable"
            ref={certRef}
            style={{
              width: "794px",
              height: "1123px",
              background: "#faf8f3",
              position: "relative",
              boxSizing: "border-box",
              fontFamily: "'Garamond', 'Georgia', serif",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* ── Outer Gold Border ── */}
            <div style={{
              position: "absolute",
              inset: "12px",
              border: "3px solid #d4af37",
              pointerEvents: "none",
              zIndex: 3,
              boxShadow: "inset 0 0 0 1px #f0e5cc",
            }} />

            {/* ── Inner Decorative Border ── */}
            <div style={{
              position: "absolute",
              inset: "16px",
              border: "1px solid #c9a961",
              pointerEvents: "none",
              zIndex: 3,
              opacity: 0.6,
            }} />

            {/* ── Content with premium spacing ── */}
            <div style={{
              position: "absolute",
              inset: 0,
              padding: "64px 48px",
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
              boxSizing: "border-box",
            }}>

              {/* ── HEADER SECTION ── */}
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "48px",
                paddingBottom: "28px",
                borderBottom: "2px solid #d4af37",
              }}>
                {/* Left Logo */}
                <div style={{ width: 80, height: 80, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-8px" }}>
                  {data.logo ? (
                    <img src={data.logo} alt="Logo" style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "contain" }} />
                  ) : (
                    <div style={{
                      width: 80, height: 80, border: "2px dashed #c9a961", borderRadius: 4,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#9a8860", fontWeight: 600, textAlign: "center"
                    }}>Company Logo</div>
                  )}
                </div>

                {/* Center Title */}
                <div style={{ flex: 1, textAlign: "center", padding: "0 60px 0 20px" }}>
                  <div style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: "#2d2416",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                    fontFamily: "'Garamond', serif",
                  }}>
                    CERTIFICATE OF EXPERIENCE
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: "#6b5d50",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                  }}>
                    Recognizing Professional Excellence & Service
                  </div>
                </div>
              </div>

              {/* ── Certificate Metadata ── */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#5a5244",
                marginBottom: "40px",
                paddingBottom: "16px",
                borderBottom: "1px solid #e5dccf",
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#2d2416", letterSpacing: "0.05em", marginBottom: 4 }}>CERTIFICATE No.</div>
                  <div style={{ letterSpacing: "0.03em", fontSize: 13 }}>{data.certificateNo || "XX-XXXX-XXXX"}</div>
                </div>
                <div style={{ textAlign: "center", marginLeft: "-20px" }}>
                  <div style={{ fontWeight: 700, color: "#2d2416", letterSpacing: "0.05em", marginBottom: 4 }}>ISSUED ON</div>
                  <div style={{ letterSpacing: "0.03em", fontSize: 13 }}>{formatDate(data.certDate) || "— — —"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "#2d2416", letterSpacing: "0.05em", marginBottom: 4 }}>VALID</div>
                  <div style={{ letterSpacing: "0.03em", fontSize: 13 }}>Perpetual</div>
                </div>
              </div>

              {/* ── Body Text ── */}
              <div style={{
                fontSize: 14,
                color: "#3a3429",
                lineHeight: 2,
                textAlign: "center",
                marginBottom: "36px",
                paddingLeft: "20px",
              }}>
                <p style={{ marginBottom: "20px", fontSize: 15, fontWeight: 500, color: "#2d2416" }}>
                  This is Proudly to Certify that
                </p>

                <p style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#d4af37",
                  marginBottom: "20px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  {data.employeeName || "Employee Name"}
                </p>
              </div>

              {/* ── Main Content ── */}
              <div style={{
                fontSize: 15,
                color: "#3a3429",
                lineHeight: 2.1,
                textAlign: "justify",
                flex: 1,
                marginBottom: "28px",
              }}>
                <p style={{ marginBottom: "18px" }}>
                  <span style={{ fontWeight: 600, color: "#2d2416" }}>{data.employeeName || "The above-named employee"}</span>
                  {data.employeeId && <span> (Employee ID: {data.employeeId})</span>} was employed with <span style={{ fontWeight: 600, color: "#2d2416" }}>{data.companyName || "our esteemed organization"}</span>
                  {data.department && <span> in the <span style={{ fontWeight: 600, color: "#2d2416" }}>{data.department}</span> Department</span>} as <span style={{ fontWeight: 600, color: "#2d2416" }}>{data.designation || "Designation"}</span>.
                </p>

                <p style={{ marginBottom: "18px" }}>
                  During the period from <span style={{ fontWeight: 600, color: "#2d2416" }}>{formatDate(data.joinDate)}</span> to <span style={{ fontWeight: 600, color: "#2d2416" }}>{formatDate(data.relievingDate)}</span>, amounting to a tenure of <span style={{ fontWeight: 600, color: "#d4af37" }}>{tenure}</span>, the above-named employee has successfully contributed to the organization.
                </p>

                {data.jobDescription && (
                  <p style={{ marginBottom: "18px" }}>
                    {data.jobDescription}
                  </p>
                )}

                <p style={{ marginBottom: "18px" }}>
                  During the period of service, the employee demonstrated excellent professionalism, strong work ethics, dedication, integrity, and remarkable performance in all assigned responsibilities. The employee's contributions have been valuable to the organization and we wish continued success in all future endeavors.
                </p>
              </div>

              {/* ── Footer Section ── */}
              <div style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "2px solid #d4af37",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "20px",
              }}>

                {/* Left: Signatory */}
                <div style={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  {data.signature ? (
                    <img src={data.signature} alt="Signature" style={{
                      height: 120,
                      maxWidth: 260,
                      objectFit: "contain",
                      marginBottom: 4,
                    }} />
                  ) : (
                    <div style={{ width: 240, height: 120, borderBottom: "2px solid #2d2416", marginBottom: 4 }} />
                  )}
                  <div style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#2d2416",
                    marginTop: -28,
                    letterSpacing: "0.05em",
                    textAlign: "center",
                  }}>
                    {data.hrName || "Authorized Signatory"}
                  </div>
                <div
  style={{
    fontSize: 13,
    color: "#2d2416",
    marginTop: 1,
    textAlign: "center",
    fontWeight: 400,
    letterSpacing: "0.03em",
  }}
>
  {data.hrDesignation || "CEO, Magizh Technologies"}
</div>
                </div>

                {/* Center: Seal */}
            {/* Center: Seal */}
<div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {data.seal ? (
    <img
      src={data.seal}
      alt="Seal"
      style={{
        width: 100,
        height: 100,
        objectFit: "contain",
        marginBottom: 8,
        marginTop: 8,
      }}
    />
  ) : (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "3px solid #d4af37",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        color: "#9a8860",
        fontWeight: 600,
        marginBottom: 8,
        marginTop: 8,
        background: "linear-gradient(135deg, #f0e5cc, #faf8f3)",
      }}
    >
      OFFICIAL SEAL
    </div>
  )}

  <div
    style={{
      fontSize: 13,
      color: "#2d2416",
      marginTop: 6,
      fontWeight: 600,
      textAlign: "center",
      letterSpacing: "0.03em",
    }}
  >
    {data.companyName}
  </div>
</div>

                {/* Right: MSME Badge */}
            <div
  style={{
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {data.msme ? (
    <>
      <img
        src={data.msme}
        alt="MSME"
        style={{
          height: 110,
          maxWidth: 170,
          objectFit: "contain",
        }}
      />

      <div
        style={{
          marginTop: 8,
          fontSize: 11,
          fontWeight: 600,
          color: "#2d2416",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        MSME REGISTERED 
      </div>
    </>
  ) : (
    <div
      style={{
        width: 110,
        height: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "#9a8860",
          fontWeight: 600,
        }}
      >
        MSME Badge
      </div>
    </div>
  )}
</div>
              </div>

            </div>
          </div>
        </div>

        <div className="pb-10 text-center text-xs text-slate-400 no-print">
          A4 Document • 794 × 1123 px • Optimized for PDF Export
        </div>
      </div>
    </>
  );
}
