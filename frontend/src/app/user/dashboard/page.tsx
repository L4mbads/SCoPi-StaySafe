import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";
import UserNotification from "@/components/user_notification";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <UserSideBar />
        {/* Main Content */}
        <div className="flex-1 pl-[19vw] p-6" >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#3A3985]">My Dashboard</h1>
              <p className="text-sm text-[#3499FF]">
                Welcome, <span className="font-semibold italic">User!</span> Here&apos;s your contract summary.
              </p>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="p-6 bg-white shadow rounded-2xl text-center border-l-4 border-l-[#3B82F6]">
              <h2 className="text-sm text-[#3A3985]">My Contract</h2>
              <p className="text-2xl font-bold text-[#3A3985]">4</p>
            </div>
            <div className="p-6 bg-white shadow rounded-2xl text-center border-l-4 border-l-[#FACC15]">
              <h2 className="text-sm text-[#3A3985]">Pending Request</h2>
              <p className="text-2xl font-bold text-[#3A3985]">2</p>
            </div>
            <div className="p-6 bg-white shadow rounded-2xl text-center border-l-4 border-l-[#22C55E]">
              <h2 className="text-sm text-[#3A3985]">Done this Month</h2>
              <p className="text-2xl font-bold text-[#3A3985]">1</p>
            </div>

            <div className="p-6 bg-white shadow rounded-2xl text-center border-l-4 border-l-[#EF4444]">
              <h2 className="text-sm text-[#3A3985]">My Contract</h2>
              <p className="text-2xl font-bold text-[#3A3985]">1</p>
            </div>
          </div>

          {/* Notification */}
          <UserNotification />

          {/* My Activity */}
          <div className="bg-white shadow rounded-2xl p-4 mt-6">
            <h2 className="font-semibold text-lg mb-4 text-[#3A3985]">My Activity</h2>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-green-500 rounded-full mt-1"></span>
                <div>
                  <p className="text-gray-800">IT service contract request approved by legal team</p>
                  <p className="text-sm text-gray-500">2 hour ago</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full mt-1"></span>
                <div>
                  <p className="text-gray-800">Submitted new supplier contract application</p>
                  <p className="text-sm text-gray-500">2 hour ago</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></span>
                <div>
                  <p className="text-gray-800">Received contract extension notification</p>
                  <p className="text-sm text-gray-500">2 hour ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
