import Navbar from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";
import UserNotification from "@/components/user_notification";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* REMOVED the wrapper div. The sidebar is now a direct child. */}
        <UserSideBar />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* ... main content is unchanged ... */}
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#3A3985]">My Dashboard</h1>
              <p className="text-sm text-[#3499FF] mt-1">
                Welcome, <span className="font-semibold italic">User!</span> Here&apos;s your contract summary.
              </p>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="p-6 bg-white shadow-md rounded-2xl text-center border-l-4 border-blue-500">
              <h2 className="text-sm font-medium text-gray-600">My Contracts</h2>
              <p className="text-3xl font-bold text-[#3A3985] mt-2">4</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-2xl text-center border-l-4 border-yellow-400">
              <h2 className="text-sm font-medium text-gray-600">Pending Requests</h2>
              <p className="text-3xl font-bold text-[#3A3985] mt-2">2</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-2xl text-center border-l-4 border-green-500">
              <h2 className="text-sm font-medium text-gray-600">Done This Month</h2>
              <p className="text-3xl font-bold text-[#3A3985] mt-2">1</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-2xl text-center border-l-4 border-red-500">
              <h2 className="text-sm font-medium text-gray-600">Rejected</h2>
              <p className="text-3xl font-bold text-[#3A3985] mt-2">1</p>
            </div>
          </div>

          <UserNotification />

          {/* My Activity */}
          <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
            <h2 className="font-semibold text-lg text-[#3A3985] mb-4">My Activity</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-1.5"></span>
                <div>
                  <p className="text-gray-800">IT service contract request approved by legal team.</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-1.5"></span>
                <div>
                  <p className="text-gray-800">Submitted new supplier contract application.</p>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-3 h-3 bg-yellow-500 rounded-full mt-1.5"></span>
                <div>
                  <p className="text-gray-800">Received contract extension notification.</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}