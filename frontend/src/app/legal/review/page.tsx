"use client";
import { useState } from "react";
import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

// Component to represent the icon and filename in the contract preview
const ContractPreview = () => (
  <div className="flex flex-col items-center justify-center pt-8">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-gray-400 mb-2"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
    </svg>
    <div className="text-sm font-medium text-gray-500">Preview Dokumen Kontrak</div>
    <div className="text-xs text-gray-400">Kontrak_Supplier_MegaCorp.pdf</div>
  </div>
);

// --- Review Modal Component with Blur Background ---
const ReviewModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    // CHANGE HERE: Replaced bg-black bg-opacity-50 with bg-white/30 backdrop-blur-sm
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      {/* Modal size is adjusted to better fit the image content */}
      <div className="bg-white w-[900px] max-w-[90%] rounded-lg shadow-xl p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#3A3985]">
            Review Kontrak - PT. Mega Corp
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content Grid: 2 columns to mimic the image layout */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* Left Side: Document Preview & Risk Clauses (Stacked vertically) */}
          <div className="flex flex-col space-y-4">
            {/* Document Preview Area (takes up more space) */}
            <div className="border border-gray-200 rounded-md h-96 bg-gray-50 flex-1">
              <ContractPreview />
            </div>

            {/* Risk Clauses Section (matches image style) */}
            <div className="bg-red-50 border border-red-300 p-4 rounded text-sm text-red-700">
              <p className="font-bold mb-2">Klausul Berisiko Terdeteksi:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li><span className="text-red-600 font-semibold">•</span> Pasal 5.2: Terms of payment tidak sesuai standar (90 hari)</li>
                <li><span className="text-red-600 font-semibold">•</span> Pasal 8.1: Klausul force majeure tidak lengkap</li>
                <li><span className="text-red-600 font-semibold">•</span> Pasal 12: Dispute resolution tidak jelas</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Review Panel (matches image style) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#3A3985]">Panel Review</h3>

            {/* Status Review */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status Review
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-black focus:ring-blue-500 focus:border-blue-500">
                <option>Pilih status...</option>
                <option>Disetujui</option>
                <option>Perlu revisi</option>
                <option>Ditolak</option>
              </select>
            </div>

            {/* Catatan Review */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Catatan Review
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-black resize-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Berikan catatan detail untuk keputusan review..."
              ></textarea>
            </div>

            {/* Tingkat Risiko */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tingkat Risiko
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-black focus:ring-blue-500 focus:border-blue-500">
                <option>Tinggi</option>
                <option>Sedang</option>
                <option>Rendah</option>
              </select>
            </div>

            {/* Tindak Lanjut (Actions) */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tindak Lanjut</label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Kirim ke pemohon untuk revisi
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Jadwalkan meeting review
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Eskalasi ke senior counsel
              </label>
            </div>
          </div>
        </div>

        {/* Footer: Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
          >
            Batal
          </button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">
            Simpan Review
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ReviewQueue() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LandingPage />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <LegalSideBar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 pt-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">Review Queue</h1>
            <p className="text-[#3499FF] mt-2 italic">
              List of contracts awaiting review and approval
            </p>
          </div>
          
          {/* === Filter Section === */}
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium text-[#3A3985] mb-1">
                  Priority filter
                </label>
                <select className="w-full border rounded-lg p-2 text-black">
                  <option>Semua Prioritas</option>
                  <option>Sangat Mendesak</option>
                  <option>Mendesak</option>
                  <option>Normal</option>
                </select>
              </div>

              {/* Contract Type */}
              <div>
                <label className="block text-sm font-medium text-[#3A3985] mb-1">
                  Contract type
                </label>
                <select className="w-full border rounded-lg p-2 text-black">
                  <option>Semua Jenis</option>
                  <option>Supplier</option>
                  <option>Layanan</option>
                  <option>Konsultasi</option>
                  <option>Kerjasama</option>
                </select>
              </div>

              {/* Risk Level */}
              <div>
                <label className="block text-sm font-medium text-[#3A3985] mb-1">
                  Risk level
                </label>
                <select className="w-full border rounded-lg p-2 text-black">
                  <option>Semua Risiko</option>
                  <option>Tinggi</option>
                  <option>Sedang</option>
                  <option>Rendah</option>
                </select>
              </div>

              {/* Filter Button */}
              <div>
                <button className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Filter
                </button>
              </div>
            </div>
          </div>
          {/* === End Filter Section === */}


          {/* Contract Card (Matches image_ce49a0.png) */}
          <div className="bg-white shadow p-6 border-l-4 border-t border-red-500">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Supplier Contract for PT. Mega Crop
                </h2>
                <p className="text-sm text-gray-600">
                  Value: Rp 2.5M | Term: 24 months | Submitted by: Mike Brown
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Review
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-lg text-sm">
                  AI Analysis
                </button>
              </div>
            </div>
            {/* Contract Status and AI Notes from image_ce49a0.png */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">⏰</span>
                Deadline: 6 hours left
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">⚠️</span>
                AI detects 3 risky clauses
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded">
              <span className="font-semibold">AI Notes:</span> Payment clauses do not
              meet company standards. High risk of late payment
            </div>
          </div>
        </main>
      </div>
      
      {/* === Review Modal Popup === */}
      <ReviewModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}