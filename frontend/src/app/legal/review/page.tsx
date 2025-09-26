"use client";
import { useState, useEffect } from "react";
import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

// This component is well-structured, no changes needed here.
const ContractPreview = () => (
  <div className="flex flex-col items-center justify-center pt-8">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
    </svg>
    <div className="text-sm font-medium text-gray-500">Preview Dokumen Kontrak</div>
    <div className="text-xs text-gray-400">Kontrak_Supplier_MegaCorp.pdf</div>
  </div>
);

// This modal is well-structured, no changes needed here.
type ReviewModalProps = {
  show: boolean;
  onClose: () => void;
};


const ReviewModal = ({ show, onClose }: ReviewModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      <div className="bg-white w-[900px] max-w-[90%] rounded-lg shadow-xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#3A3985]">Review Kontrak - PT. Mega Corp</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="border border-gray-200 rounded-md h-96 bg-gray-50 flex-1">
              <ContractPreview />
            </div>
            <div className="bg-red-50 border border-red-300 p-4 rounded text-sm text-red-700">
              <p className="font-bold mb-2">Klausul Berisiko Terdeteksi:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Pasal 5.2: Terms of payment tidak sesuai standar (90 hari)</li>
                <li>Pasal 8.1: Klausul force majeure tidak lengkap</li>
                <li>Pasal 12: Dispute resolution tidak jelas</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#3A3985]">Panel Review</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status Review</label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-black focus:ring-blue-500 focus:border-blue-500">
                <option>Pilih status...</option>
                <option>Disetujui</option>
                <option>Perlu revisi</option>
                <option>Ditolak</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Catatan Review</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-2.5 text-black resize-none focus:ring-blue-500 focus:border-blue-500" placeholder="Berikan catatan detail untuk keputusan review..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tingkat Risiko</label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-black focus:ring-blue-500 focus:border-blue-500">
                <option>Tinggi</option>
                <option>Sedang</option>
                <option>Rendah</option>
              </select>
            </div>
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tindak Lanjut</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Kirim ke pemohon untuk revisi</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Jadwalkan meeting review</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /> Eskalasi ke senior counsel</label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">Batal</button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Simpan Review</button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ReviewQueue() {
  const [showModal, setShowModal] = useState(false);

  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/contract_request/", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setRequest(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, []);
  return (
    // 1. Set the root container to be a flex column
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LandingPage />

      {/* 2. Make this container grow to fill the remaining vertical space */}
      <div className="flex flex-1">
        {/* 3. Sidebar is now a direct child */}
        <LegalSideBar />

        {/* 4. Use standard padding and let it scroll */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">Review Queue</h1>
            <p className="text-gray-500 mt-2">
              List of contracts awaiting review and approval.
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-black focus:ring-blue-500 focus:border-blue-500">
                  <option>All Priorities</option>
                  <option>Urgent</option>
                  <option>High</option>
                  <option>Normal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-black focus:ring-blue-500 focus:border-blue-500">
                  <option>All Types</option>
                  <option>Supplier</option>
                  <option>Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-black focus:ring-blue-500 focus:border-blue-500">
                  <option>All Levels</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                Filter
              </button>
            </div>
          </div>

          { loading ? (
            <p>Loading requests...</p>
          ) : (<>
            {request.map((req, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-6 mb-6 border-l-4 border-red-500">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  {req.contract_title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Value: Rp {req.estimated_value} | Term: {getMonthSpan(new Date(req.start_date), new Date(req.end_date))} bulan | Klien: {req.client_name}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                  Review
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                  AI Analysis
                </button>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
              <span className="font-bold">AI Note:</span> Payment clauses do not meet company standards. High risk of late payment identified.
            </div>
          </div>
          ))}
          </>
          )}
        </main>
      </div>

      {/* Review Modal Popup */}
      <ReviewModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

function getMonthSpan(date1: Date, date2: Date) {
  let year1 = date1.getFullYear();
  let month1 = date1.getMonth(); // 0-based (Jan = 0, Dec = 11)

  let year2 = date2.getFullYear();
  let month2 = date2.getMonth();

  return Math.abs((year2 - year1) * 12 + (month2 - month1));
}