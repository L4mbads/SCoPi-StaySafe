import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

export default function ReviewQueue() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LandingPage />

      {/* Main Layout Container: Use flex for sidebar and content. */}
      {/* The pt-26 class is likely meant to create vertical space for a fixed navbar. 
          I'll remove it and apply a more standard padding-top to the main content. */}
      <div className="flex">
        
        {/* Sidebar: Give it a fixed width (e.g., w-64). flex-shrink-0 prevents it from shrinking. */}
        <div className="w-64 flex-shrink-0">
          <LegalSideBar />
        </div>

        {/* Main Content: flex-1 makes it take up all remaining horizontal space. */}
        {/* The problematic pl-[16em] is removed. A general p-8 is used, and pt-20 is added 
            for vertical offset (assuming a navbar height). */}
        <main className="flex-1 p-8 pt-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">Review Queue</h1>
            <p className="text-[#3499FF] mt-2 italic">
              List of contracts awaiting review and approval
            </p>
          </div>

          {/* Filter Section */}
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

          {/* Contract Card */}
          {/* NOTE: border-t-1 is not a standard Tailwind class. I've corrected it to border-t. */}
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
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm">
                  Review
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-lg text-sm">
                  AI Analysis
                </button>
              </div>
            </div>

            {/* Contract Status */}
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

            {/* AI Notes */}
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded">
              <span className="font-semibold">AI Notes:</span> Payment clauses do not
              meet company standards. High risk of late payment
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}