"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface OfferData {
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
}

const formatDate = (val: string) => {
  if (!val) return "________________";
  const d = new Date(val);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
};

const S: Record<string, React.CSSProperties> = {
  page: {
    width: "794px",
    minHeight: "1123px",
    backgroundColor: "#ffffff",
    fontFamily: "'Times New Roman', Georgia, 'DejaVu Serif', serif",
    position: "relative",
    boxSizing: "border-box",
  },
  outerBorder: {
    position: "absolute",
    inset: "14px",
    border: "2.5px solid #d4af37",
    pointerEvents: "none",
    zIndex: 1,
  },
  innerBorder: {
    position: "absolute",
    inset: "20px",
    border: "1px solid #d4af37",
    pointerEvents: "none",
    zIndex: 1,
  },
  content: {
    padding: "46px 58px 40px",
    position: "relative",
    zIndex: 2,
  },
};

export default function OfferLetterPreview() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<OfferData | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("offerLetterData");
    if (raw) {
      try { setData(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      const el = printRef.current;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: el.offsetWidth,
        height: el.offsetHeight,
        logging: false,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = 210;
      const pdfH = 297;
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const pdfRatio = pdfW / pdfH;

      let finalWidth = pdfW;
      let finalHeight = pdfW / ratio;

      if (finalHeight > pdfH) {
        const scale = canvas.width / pdfW;
        const pageHeightPx = pdfH * scale;
        let yPos = 0;
        let isFirstPage = true;

        while (yPos < canvasHeight) {
          if (!isFirstPage) {
            pdf.addPage();
          }
          
          const remainingHeight = canvasHeight - yPos;
          const drawHeight = Math.min(pageHeightPx, remainingHeight);
          const pageImgHeight = (drawHeight / canvas.width) * pdfW;

          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvasWidth;
          tempCanvas.height = drawHeight;
          const tempCtx = tempCanvas.getContext("2d")!;
          tempCtx.drawImage(canvas, 0, yPos, canvasWidth, drawHeight, 0, 0, canvasWidth, drawHeight);

          pdf.addImage(tempCanvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, pdfW, pageImgHeight);
          yPos += drawHeight;
          isFirstPage = false;
        }
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, finalWidth, finalHeight);
      }
      pdf.save(`Offer_Letter_${data?.candidateName?.replace(/\s+/g, "_") || "document"}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading preview…</p>
        </div>
      </div>
    );
  }

  const d = data;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: "flex", borderTop: "1px solid #e5dccf", fontSize: "13px" }}>
      <div style={{
        width: "220px", padding: "12px 14px", backgroundColor: "#fef9ec",
        color: "#8b7355", fontWeight: 700, flexShrink: 0, fontFamily: "Georgia, serif", fontSize: "13px", letterSpacing: "0.02em"
      }}>{label}</div>
      <div style={{ padding: "12px 14px", color: "#000000", flex: 1, fontWeight: 500, fontSize: "13px" }}>{value}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      {/* Toolbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(15,23,42,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => router.push("/document-generator/offer-letter")}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              color: "#94a3b8", background: "none", border: "none", cursor: "pointer",
              fontSize: "13px", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Edit Form
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
            <span style={{ color: "#cbd5e1", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Offer Letter Preview
            </span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: downloading ? "#334155" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white", border: "none", cursor: downloading ? "not-allowed" : "pointer",
              fontSize: "13px", fontWeight: 600, padding: "8px 20px", borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)", transition: "all 0.2s",
              opacity: downloading ? 0.7 : 1,
            }}
          >
            {downloading ? (
              <div style={{ width: "14px", height: "14px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            ) : (
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
            {downloading ? "Generating…" : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Page */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px 60px" }}>
        <div style={{ filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.5))" }}>
          <div ref={printRef} style={S.page}>
            {/* Borders */}
            <div style={S.outerBorder} />
            <div style={S.innerBorder} />

            {/* Corner diamonds */}
            {[
              { top: "10px", left: "10px" },
              { top: "10px", right: "10px" },
              { bottom: "10px", left: "10px" },
              { bottom: "10px", right: "10px" },
            ].map((pos, i) => (
              <div key={i} style={{ position: "absolute", ...pos, width: "10px", height: "10px", zIndex: 3 }}>
                <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="4" height="4" fill="#d4af37" transform="rotate(45 5 5)" />
                </svg>
              </div>
            ))}

            <div style={S.content}>
              {/* ── HEADER ── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                {/* Logo */}
                <div style={{ width: "140px", height: "70px", display: "flex", alignItems: "center" }}>
                  {d.logo
                    ? <img src={d.logo} alt="Logo" style={{ maxWidth: "140px", maxHeight: "70px", objectFit: "contain" }} />
                    : <div style={{ width: "140px", height: "60px", border: "1px dashed #ccc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#bbb" }}>Company Logo</div>
                  }
                </div>

                {/* Company Info - RIGHT ALIGNED */}
                <div style={{ textAlign: "right", marginLeft: "auto" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#000000", letterSpacing: "0.3px", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
                    {d.companyName || "COMPANY NAME"}
                  </div>
                  {(d.companyAddress || d.companyCity) && (
                    <div style={{ fontSize: "10px", color: "#000000", marginTop: "4px", lineHeight: 1.6 }}>
                      {[d.companyAddress, d.companyCity].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {(d.companyPhone || d.companyEmail) && (
                    <div style={{ fontSize: "10px", color: "#000000", marginTop: "2px", lineHeight: 1.5 }}>
                      {d.companyPhone && <div>Tel: {d.companyPhone}</div>}
                      {d.companyEmail && <div>{d.companyEmail}</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #000000 0%, #d4af37 50%, #000000 100%)", marginBottom: "5px" }} />
              <div style={{ height: "1px", background: "#d4af37", marginBottom: "18px" }} />

              {/* Title */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{
                  display: "inline-block",
                  fontSize: "16px", fontWeight: "bold", color: "#000000",
                  letterSpacing: "5px", textTransform: "uppercase",
                  borderBottom: "2px solid #d4af37", paddingBottom: "5px",
                  fontFamily: "Georgia, serif",
                }}>
                  OFFER LETTER
                </div>
                <div style={{ fontSize: "10px", color: "#000000", marginTop: "6px", letterSpacing: "2px" }}>
                  PRIVATE & CONFIDENTIAL
                </div>
              </div>

              {/* Ref & Date */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#000000",
                marginBottom: "14px",
                fontFamily: "Georgia, serif",
              }}>
                <span><strong>Ref No:</strong> {d.letterRef || "HR/OL/2024/001"}</span>
                <span><strong>Date:</strong> {formatDate(d.letterDate)}</span>
              </div>

              {/* To Address */}
              <div style={{ marginBottom: "14px", fontSize: "12px", color: "#000000", lineHeight: 1.7 }}>
                <span style={{ fontWeight: 600 }}>To,</span><br />
                <span style={{ fontSize: "13px", color: "#000000", fontWeight: 600 }}>{d.candidateName || "Candidate Name"}</span>
              </div>

              {/* Salutation */}
              <div style={{ fontSize: "13px", color: "#000000", marginBottom: "12px" }}>
                Dear <span style={{ fontWeight: 600 }}>{d.candidateName?.split(" ").slice(-1)[0] || "Sir/Madam"},</span>
              </div>

              {/* Body */}
              <div style={{ fontSize: "13px", color: "#000000", lineHeight: 1.85, textAlign: "justify", marginBottom: "16px" }}>
                We are pleased to extend an offer of employment for the position of <span style={{ fontWeight: 600 }}>{d.position || "________________"}</span> in
                the <span style={{ fontWeight: 600 }}>{d.department || "________________"}</span> department at <span style={{ fontWeight: 600 }}>{d.companyName || "the Company"}</span>. This offer is extended
                subject to the terms and conditions set forth herein.
              </div>

              {/* Appointment & Compensation Details */}
              <div style={{ background: "#fef9ec", border: "3px solid #c9a961", borderLeft: "8px solid #c9a961", borderRadius: "4px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "0px" }}>
                  <div style={{ background: "#fef9ec", padding: "12px 14px", fontSize: "14px", fontWeight: 700, color: "#8b7355", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    EMPLOYMENT DETAILS
                  </div>
                  {[
                    ["Position", d.position || "—"],
                    ["Department", d.department || "—"],
                    ["Annual Compensation", `₹${d.ctc || "—"}`],
                    ["Employment Type", "Full-Time"],
                    ["Probation Period", "6 Months"],
                  ].map(([k, v]) => <Row key={k} label={k} value={v} />)}
                </div>
              </div>

              {/* Conditions */}
              <div style={{ fontSize: "13px", color: "#000000", lineHeight: 1.85, textAlign: "justify", marginBottom: "12px" }}>
                This offer is conditional upon the satisfactory completion of background verification and submission
                of all required documents. You are requested to report on <span style={{ fontWeight: 600, color: "#000000" }}>{formatDate(d.joiningDate)}</span> to the HR department with your original documents.
              </div>
              <div style={{ fontSize: "13px", color: "#000000", lineHeight: 1.85, textAlign: "justify", marginBottom: "20px" }}>
                We are excited to have you on board! Kindly sign and return a copy of this letter to confirm your acceptance.
                Welcome to <span style={{ fontWeight: 600 }}>{d.companyName || "the team"}</span> — we look forward to building great things together!
              </div>

              {/* Signature Row */}
              <div style={{
                marginTop: "16px",
                paddingTop: "20px",
                borderTop: "2px solid #c9a961",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "24px",
              }}>
                {/* Left: Signatory */}
                <div style={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {d.signature ? (
                    <img src={d.signature} alt="Signature" style={{
                      height: 100,
                      maxWidth: 240,
                      objectFit: "contain",
                      marginBottom: 2,
                    }} />
                  ) : (
                    <div style={{
                      width: 220,
                      height: 100,
                      borderBottom: "2px solid #5a5244",
                      marginBottom: 2,
                    }} />
                  )}
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#2d2416",
                    marginTop: -18,
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}>
                    {d.hrName || "Authorized Signatory"}
                  </div>
                  <div style={{
                    fontSize: 11.5,
                    color: "#3a3429",
                    marginTop: 2,
                    textAlign: "center",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}>
                    {d.hrDesignation || "HR Manager"}
                  </div>
                </div>

                {/* Center: Seal */}
                <div style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {d.seal ? (
                    <img src={d.seal} alt="Seal" style={{
                      width: 95,
                      height: 95,
                      objectFit: "contain",
                      marginBottom: 6,
                      marginTop: 6,
                    }} />
                  ) : (
                    <div style={{
                      width: 95,
                      height: 95,
                      borderRadius: "50%",
                      border: "3px solid #c9a961",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "#7a6d5f",
                      fontWeight: 600,
                      marginBottom: 6,
                      marginTop: 6,
                      background: "linear-gradient(135deg, #f0e5cc, #faf8f3)",
                    }}>
                      OFFICIAL SEAL
                    </div>
                  )}
                  <div style={{
                    fontSize: 11.5,
                    color: "#3a3429",
                    marginTop: 6,
                    fontWeight: 600,
                    textAlign: "center",
                    letterSpacing: "0.02em",
                  }}>
                    {d.companyName}
                  </div>
                </div>

                {/* Right: MSME Badge */}
                <div style={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {d.msmeLogo ? (
                    <>
                      <img src={d.msmeLogo} alt="MSME" style={{
                        height: 100,
                        maxWidth: 160,
                        objectFit: "contain",
                      }} />
                      <div style={{
                        marginTop: 6,
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: "#5a5244",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}>
                        MSME CERTIFIED
                      </div>
                    </>
                  ) : (
                    <div style={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{
                        fontSize: 9,
                        color: "#7a6d5f",
                        fontWeight: 600,
                      }}>
                        MSME Badge
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                marginTop: "35px",
                borderTop: "2px solid #d4af37",
                paddingTop: "12px",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "11px",
                  color: "#666666",
                  lineHeight: 1.6,
                  letterSpacing: "0.3px",
                }}>
                  <strong style={{
                    color: "#000000",
                    fontSize: "11px",
                  }}>
                    This is a computer-generated document and is valid without a physical signature.
                  </strong>
                  <br />
                  <span style={{
                    color: "#d4af37",
                    fontWeight: 600,
                  }}>
                    {d.companyName}
                  </span>{" "}
                  • {d.companyAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
