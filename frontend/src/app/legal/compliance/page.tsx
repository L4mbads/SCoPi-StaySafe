import Navbar from "@/components/landingpage"; // Renamed for clarity
import LegalSideBar from "@/components/legal_sidebar";

export default function LegalComplianceCheck() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <LegalSideBar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">Compliance Check</h1>
            <p className="text-gray-500 mt-2">
              Validate compliance with regulations and internal standards.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Checker */}
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col">
              <h2 className="text-xl font-bold text-[#3A3985] mb-4">
                Automatic Compliance Checker
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Contract to Check
                </label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                  <option>Supplier Contract - PT. Tech Solutions</option>
                  <option>Service Contract - CV. Maju Bersama</option>
                </select>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mb-6 transition-colors">
                Run Check
              </button>

              {/* Compliance Results */}
              <h3 className="text-lg font-semibold text-[#3A3985] mb-3">Compliance Results</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r-lg">
                  <p className="font-semibold text-green-800">Government Regulations</p>
                  <p className="text-sm text-green-700">100% - All requirements met</p>
                </div>
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded-r-lg">
                  <p className="font-semibold text-yellow-800">Internal Standards</p>
                  <p className="text-sm text-yellow-700">85% - 2 clauses need adjustment</p>
                </div>
                <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded-r-lg">
                  <p className="font-semibold text-red-800">Risk Assessment</p>
                  <p className="text-sm text-red-700">High Risk - Indemnity clause missing</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                  Export Report
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Suggest Improvements
                </button>
              </div>
            </div>

            {/* Right Section: Rules */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#3A3985] mb-4">
                Compliance Rules
              </h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold text-gray-800">Force Majeure Clause
                    <span className="ml-2 text-xs font-bold uppercase text-red-600">Mandatory</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">All contracts must have a force majeure clause.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold text-gray-800">Value Limit
                    <span className="ml-2 text-xs font-bold uppercase text-yellow-600">Important</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Contracts over IDR 500 million must be tendered.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold text-gray-800">Payment Terms
                    <span className="ml-2 text-xs font-bold uppercase text-blue-600">Standard</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Maximum 30 days for payment terms.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold text-gray-800">Dispute Resolution
                    <span className="ml-2 text-xs font-bold uppercase text-green-600">Optional</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">A dispute resolution clause is recommended.</p>
                </div>
              </div>
              <button className="w-full mt-6 border-2 border-dashed border-gray-300 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors font-semibold">
                + Add New Rule
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}