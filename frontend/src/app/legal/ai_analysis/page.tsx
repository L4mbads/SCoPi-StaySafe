import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

export default function LegalAIAnalysis() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <LegalSideBar />

        {/* Main Content */}
        <main className="flex-1 pl-[16em]">
          {/* Header */}
          <div className="mb-8 mt-[1em]">
            <h1 className="text-3xl font-bold text-[#3A3985]">AI Analysis</h1>
            <p className="text-[#3499FF] mt-2">
              AI Tools for Legal and Compliance Analysis
            </p>
          </div>

          {/* Tools Analysis Section */}
          <div className="bg-white shadow rounded-xl p-6 mr-[1em]">
            <h2 className="text-lg font-semibold text-[#3A3985] mb-4">
              Tools Analysis AI
            </h2>

            {/* Upload Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6">
              <div className="text-gray-400 text-4xl mb-3">⬆️</div>
              <p className="text-gray-600 mb-4">
                Upload Contracts for In-Depth Analysis
              </p>
              <button className="bg-[#3499FF] hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                Upload & Analysis
              </button>
            </div>

            {/* Results + Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Analysis Results */}
              <div className="border border-blue-300 rounded-lg p-4">
                <h3 className="font-semibold text-[#3A3985] mb-3">
                  Legal Analysis Results
                </h3>
                <p className="text-gray-700">
                  Legal Compliance Level:{" "}
                  <span className="font-semibold text-blue-600">90%</span>
                </p>
                <p className="text-gray-700">
                  Legal Risk:{" "}
                  <span className="font-semibold text-blue-600">Medium</span>
                </p>
                <p className="text-gray-700">
                  Problematic Clauses:{" "}
                  <span className="font-semibold text-blue-600">
                    2 Clauses
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 text-left">
                  View Risky Clauses
                </button>
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 text-left">
                  Compare to Standards
                </button>
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 text-left">
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
