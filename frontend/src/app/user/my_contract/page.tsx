import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";

export default function UserMyContract() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <UserSideBar />

        {/* Main Content */}
        <div className="flex-1 pl-[19vw] p-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#3A3985]">My Contract</h1>
            <p className="text-sm text-[#3499FF]">Role-based access control system</p>
          </div>

          {/* Search Section */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6 flex flex-col gap-2">
            {/* Labels */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm font-medium text-[#3A3985]">
              <p>Estimated Contract Value</p>
              <p>Status</p>
              <p>Type</p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input
                type="text"
                placeholder="Search Contracts"
                className="border border-gray-300 rounded-lg px-4 py-2 flex-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#3499FF]"
              />
              <select className="border border-gray-300 rounded-lg px-4 py-2 flex-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#3499FF]">
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 flex-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#3499FF]">
                <option value="">Type</option>
                <option value="supplier">Supplier Contracts</option>
                <option value="service">Service Contracts</option>
              </select>

              {/* Button */}
              <div className="flex justify-end">
                <button className="bg-[#3499FF] hover:bg-[#277ddf] transition text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow w-9999">
                  🔍 Search
                </button>
              </div>  
            </div>
          </div>

          {/* Contract List */}
          <div className="bg-white shadow rounded-2xl mt-6 p-4">
            <h2 className="font-semibold text-lg mb-4 text-[#3A3985]">My Contract List</h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600">
                  <th className="p-3">Contract Name</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="border-t">
                  <td className="p-3">Supplier Contracts</td>
                  <td className="p-3">PT. Office Supply</td>
                  <td className="p-3">Sep 15, 2024</td>
                  <td className="p-3">Jun 15, 2025</td>
                  <td className="p-3">Rp 800 M</td>
                  <td className="p-3 text-green-600">Active</td>
                  <td className="p-3 flex gap-2">
                  <button className="group">
                    <img src="/eye-icon.png" alt="View" className="w-5 group-hover:brightness-75 transition" />
                  </button>
                  <button className="group">
                    <img src="/download-icon.png" alt="Download" className="w-5 h-5 group-hover:brightness-75 transition" />
                  </button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Service Contracts</td>
                  <td className="p-3">PT. Tech Solutions</td>
                  <td className="p-3">Sep 5, 2025</td>
                  <td className="p-3">Jun 5, 2025</td>
                  <td className="p-3">Rp 2 B</td>
                  <td className="p-3 text-green-600">Active</td>
                  <td className="p-3 flex gap-2">
                  <button className="group">
                    <img src="/eye-icon.png" alt="View" className="w-5 group-hover:brightness-75 transition" />
                  </button>
                  <button className="group">
                    <img src="/download-icon.png" alt="Download" className="w-5 h-5 group-hover:brightness-75 transition" />
                  </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
