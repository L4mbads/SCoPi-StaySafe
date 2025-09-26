"use client";

import Navbar from "@/components/landingpage"; // Assuming this is your Navbar
import LegalSideBar from "@/components/legal_sidebar";
import { useState } from "react";

export default function LegalAIAnalysis() {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Mengelola pemilihan file dari input
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!title || !selectedFile) {
      setMessage('Judul dan Dokumen Kontrak harus diisi.');
      setIsError(true);
      return;
    }

    // Validasi tipe file
    if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setMessage('Format file tidak didukung. Harap unggah PDF atau DOCX.');
        setIsError(true);
        return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('document', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/api/contracts/', {
        method: 'POST',
        body: formData,
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Kontrak berhasil diunggah dan dibuat! Status: Draft.');
        setIsError(false);
        // Reset form
        setTitle('');
        setSelectedFile(null);
        document.getElementById('file-upload').value = '';
      } else {
        setMessage(`Gagal mengunggah kontrak: ${data.error || 'Terjadi kesalahan server.'}`);
        setIsError(true);
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setMessage('Terjadi kesalahan jaringan atau server tidak merespons.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <LegalSideBar />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">AI Analysis</h1>
            <p className="text-gray-500 mt-2">
              Use AI tools for in-depth legal and compliance analysis of your documents.
            </p>
          </div>

          {/* Tools Analysis Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#3A3985] mb-6">
              Contract Analysis Tool
            </h2>

            {/* Upload Box */}
            <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6 hover:border-blue-400 transition-colors">
              <div className="text-5xl mb-3">📄</div>
              <p className="text-gray-600 mb-4">
                Upload a contract to check for risks and compliance issues.
              </p>
              <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-[#3499FF] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  <span>Upload</span>
                  <input
                    id="file-upload"
                    name="document"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                    disabled={isLoading}
                    required
                  />
                </label>
                <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Masukkan Judul Kontrak"
  className="border rounded px-3 py-2 mb-4 w-full"
  required
/>
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition duration-150 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                  disabled={isLoading}
                >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengunggah...
                  </>
                ) : (
                  'Unggah dan Proses Kontrak'
                )}
              </button>
            </form>

            {/* Results + Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Analysis Results */}
              <div className="border border-gray-200 rounded-lg p-4">
            {selectedFile && (
            <p className="mt-2 text-sm text-gray-700 font-medium">
              File terpilih: <span className="font-normal text-blue-600">{selectedFile.name}</span>
            </p>
          )}
                <h3 className="font-semibold text-[#3A3985] mb-3">
                  Analysis Results
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 flex justify-between">
                    Legal Compliance Score:
                    <span className="font-semibold text-blue-600">90%</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    Identified Legal Risk:
                    <span className="font-semibold text-yellow-600">Medium</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    Problematic Clauses:
                    <span className="font-semibold text-red-600">2 Clauses</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 justify-center">
                <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 text-left transition-colors">
                  View Risky Clauses
                </button>
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 text-left transition-colors">
                  Compare to Standards
                </button>
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 text-left transition-colors">
                  Suggested Improvements
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}