'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const CertificatePage = () => {
  const [name, setName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(
    "FULL STACK DEVELOPER (Course Completed)"
  );

  const router = useRouter();

  const generateCertificate = () => {
    // Validation
    if (!name || !issueDate || !certificateId || !selectedCourse) {
      alert("Please fill in all required details before proceeding.");
      return;
    }

    // Store data in localStorage
    localStorage.setItem(
      "certificateData",
      JSON.stringify({
        name,
        issueDate,
        certificateId,
        course: selectedCourse,
      })
    );

    // Navigate to preview page
    router.push("/document-generator/course-completion/preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Generate Your Certificate
          </h1>

          <p className="text-lg text-gray-600">
            Create professional certificates with our easy-to-use generator
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            {/* Top Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={() =>
                  router.push("/offer-letter/form")
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Offer Letter
              </button>

              <button
                onClick={() =>
                  router.push(
                    "/experience-certificate/form"
                  )
                }
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Experience Certificate
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Date & Certificate ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Issue Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>

                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) =>
                      setIssueDate(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base"
                  />
                </div>

                {/* Certificate ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate ID
                  </label>

                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) =>
                      setCertificateId(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base"
                    placeholder="e.g. CERT-2026-001"
                  />
                </div>
              </div>

              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>

                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) =>
                      setSelectedCourse(e.target.value)
                    }
                    className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      Select document type
                    </option>

                    <option value="FULL STACK DEVELOPER (Course Completed)">
                      FULL STACK DEVELOPER (Course Completed)
                    </option>

                    <option value="FULL STACK DEVELOPER (Internship Completed)">
                      FULL STACK DEVELOPER (Internship Completed)
                    </option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button
                  onClick={generateCertificate}
                  disabled={
                    !name ||
                    !issueDate ||
                    !certificateId ||
                    !selectedCourse
                  }
                  className={`w-full flex justify-center items-center px-6 py-4 rounded-xl text-base font-semibold text-white transition-all duration-200 ${
                    !name ||
                    !issueDate ||
                    !certificateId ||
                    !selectedCourse
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  <span>Generate Certificate</span>

                  <svg
                    className="ml-2 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Your data is secure and will only be used to generate your certificate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;