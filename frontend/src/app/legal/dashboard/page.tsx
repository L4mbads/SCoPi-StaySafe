import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

export default function LegalDashboard() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
        <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <LegalSideBar />

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 min-h-screen pl-[17.5em]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">My Profile</h1>
            <p className="text-[#3499FF] mt-2">
              Welcome, <span className="italic font-semibold">Jane Smith!</span> Here&apos;s a summary of your review tasks
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
              <p className="text-sm text-gray-600">Requires immediate review</p>
              <p className="text-3xl font-bold text-red-500 mt-2">8</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-400">
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">8</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-500 mt-2">8</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">8</p>
            </div>
          </div>

          {/* High Priority Alert */}
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h2 className="bg-gradient-to-r from-red-600 to-orange-400 inline-block text-transparent bg-clip-text">High Priority Alert</h2>

            {/* Alert 1 */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-red-700">PT. Mega Corp Contract - High Risk Clause Detected</p>
                <p className="text-sm text-gray-600">AI detected payment clauses that do not meet company standards</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Review</button>
            </div>

            {/* Alert 2 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-yellow-700">5 contracts approaching review deadline (24 hours)</p>
                <p className="text-sm text-gray-600">Supplier, IT service, and consulting contracts need to be completed</p>
              </div>
              <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg">See List</button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#3A3985] mb-4">Recent Activities</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-900">
                  <span className="font-medium">Approved</span> PT. Tech Solution&apos;s IT service contract.
                </span>
                <span className="ml-auto text-sm text-gray-500">30 mins ago</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-gray-900">
                  <span className="font-medium">Rejected</span> supplier contract - clause not in accordance.
                </span>
                <span className="ml-auto text-sm text-gray-500">30 mins ago</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
