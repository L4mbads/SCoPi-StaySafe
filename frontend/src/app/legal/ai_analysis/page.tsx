import Navbar from "@/components/landingpage"; // Assuming this is your Navbar
import LegalSideBar from "@/components/legal_sidebar";

export default function LegalAIAnalysis() {
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6 hover:border-blue-400 transition-colors">
              <div className="text-5xl mb-3">📄</div>
              <p className="text-gray-600 mb-4">
                Upload a contract to check for risks and compliance issues.
              </p>
              <button className="bg-[#3499FF] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                Upload & Analyze
              </button>
            </div>

            {/* Results + Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Analysis Results */}
              <div className="border border-gray-200 rounded-lg p-4">
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