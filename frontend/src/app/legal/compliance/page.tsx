import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

export default function LegalComplianceCheck() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <LegalSideBar />

        {/* Main Content */}
        <main className="flex-1 pl-[16em] p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">Compliance Check</h1>
            <p className="text-[#3499FF] mt-2 italic">
              Validate compliance with regulations and internal standards
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="bg-white shadow rounded-xl p-6">
              {/* Auto Compliance Checker */}
              <h2 className="text-lg font-semibold text-[#3A3985] mb-4">
                Automatic Compliance Checker
              </h2>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Select a Contract to check
                </label>
                <select className="w-full border rounded-lg p-2 text-gray-700">
                  <option value="">Choose contract</option>
                  <option>Supplier Contract</option>
                  <option>Service Contract</option>
                </select>
              </div>
              <button className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-6">
                Run the check
              </button>

              {/* Compliance Results */}
              <h3 className="font-semibold text-[#3A3985] mb-3">Compliance check results</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
                  <p className="font-semibold text-gray-800">
                    Government Regulatory Compliance
                  </p>
                  <p className="text-sm text-gray-600">
                    100% - All requirements met
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 bg-yellow-50 p-3 rounded">
                  <p className="font-semibold text-gray-800">Company Internal Standards</p>
                  <p className="text-sm text-gray-600">
                    85% - 2 clauses need adjustment
                  </p>
                </div>

                <div className="border-l-4 border-red-400 bg-red-50 p-3 rounded">
                  <p className="font-semibold text-gray-800">Company Internal Standards</p>
                  <p className="text-sm text-gray-600">
                    85% - 2 clauses need adjustment
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Export Report
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Make Improvement Suggestions
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#3A3985] mb-4">
                Compliance Rules
              </h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-gray-800">Force Majeure Clause 
                    <span className="ml-2 text-xs text-red-600 font-medium">mandatory</span>
                  </p>
                  <p className="text-sm text-gray-600">All contracts must have a force majeure clause</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-gray-800">Tender Value Limit 
                    <span className="ml-2 text-xs text-yellow-500 font-medium">important</span>
                  </p>
                  <p className="text-sm text-gray-600">Contracts over IDR 500 million must be tendered</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-gray-800">Terms of Payment 
                    <span className="ml-2 text-xs text-blue-500 font-medium">standard</span>
                  </p>
                  <p className="text-sm text-gray-600">Maximum 30 days for payment</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-gray-800">Dispute Resolution 
                    <span className="ml-2 text-xs text-green-500 font-medium">optional</span>
                  </p>
                  <p className="text-sm text-gray-600">Dispute resolution clause</p>
                </div>
              </div>

              {/* Add Rules Button */}
              <button className="w-full mt-6 border-2 border-dashed border-gray-300 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
                + Add Rules
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
