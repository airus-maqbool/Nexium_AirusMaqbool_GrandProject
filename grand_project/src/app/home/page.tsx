"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PdfPreview = dynamic(() => import("@/components/PdfPreview"), { ssr: false });

const dummySkills = ["JavaScript", "React", "Tailwind CSS", "Node.js"];
const dummySummary =
  "Experienced developer with a strong background in building scalable web applications and a passion for learning new technologies.";
const dummyScore = 87;

export default function HomePage() {
  const [jobDesc, setJobDesc] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [showCards, setShowCards] = useState(false);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setShowCards(false);
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleTailor() {
    setShowCards(true);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 relative">
        <div className="w-full max-w-2xl space-y-6">
          {/* Job Description */}
          <textarea
            className="w-full h-24 p-4 rounded-xl border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none bg-white text-gray-800 placeholder-gray-400 transition"
            placeholder="Paste job description here..."
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
          />

          {/* PDF Upload */}
          <label className="block">
            <span className="block mb-2 text-gray-700 font-medium">Upload Resume (PDF)</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
            />
          </label>

          {/* PDF Preview */}
          {pdfFile && <PdfPreview file={pdfFile} />}

          {/* Tailor Button */}
          <div className="flex justify-center">
            <button
              className="w-32 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleTailor}
              disabled={!pdfFile || !jobDesc}
            >
              Tailor
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {showCards ? (
            <>
              {/* Skills Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-blue-700">Skills</h2>
                  <button
                    className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-full text-xs font-medium transition"
                    onClick={() => handleCopy(dummySkills.join(", "))}
                  >
                    Copy
                  </button>
                </div>
                <ul className="list-disc list-inside text-blue-900 space-y-1">
                  {dummySkills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Summary Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-blue-700">Summary</h2>
                  <button
                    className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-full text-xs font-medium transition"
                    onClick={() => handleCopy(dummySummary)}
                  >
                    Copy
                  </button>
                </div>
                <p className="text-blue-900">{dummySummary}</p>
              </div>

              {/* Matching Score Card */}
              <div className="bg-green-50 border border-green-100 rounded-2xl shadow-lg p-6 flex flex-col gap-2 animate-fade-in">
                <h2 className="text-lg font-semibold text-green-700 mb-2">Matching Score</h2>
                <div className="text-4xl font-bold text-green-600 mb-1">{dummyScore}%</div>
                <p className="text-green-900">This is your estimated match score for the job description and resume provided.</p>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center mt-24 animate-fade-in">
              Fill in the job description and upload your resume to get tailored suggestions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add fade-in animation
// In your global CSS (e.g., src/app/globals.css), add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.4,0,0.2,1) both; }