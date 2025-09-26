import Navbar from "@/components/landingpage"; // Assuming this is your Navbar
import UserSideBar from "@/components/user_sidebar";
import Image from "next/image"; // Import Image for action icons

export default function UserMyContract() {
  return (
    // 1. Set the root container to be a flex column
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      {/* 2. Make this container grow to fill the remaining vertical space */}
      <div className="flex flex-1">
        <UserSideBar />

        {/* 3. Use a <main> tag and standard padding */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3985]">My Contracts</h1>
            <p className="text-gray-500 mt-2">View, search, and manage your contracts.</p>
          </div>

          {/* Search Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Value</label>
                <input
                  type="text"
                  placeholder="e.g., > 10000"
                  className="w-full border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Expired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Types</option>
                  <option>Supplier</option>
                  <option>Service</option>
                </select>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Contract List */}
          <div className="bg-white shadow-md rounded-xl mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">Contract Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Company</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Start Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">End Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Value</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800">Supplier Contract</td>
                  <td className="p-4 text-gray-800">PT. Office Supply</td>
                  <td className="p-4 text-gray-800">Sep 15, 2024</td>
                  <td className="p-4 text-gray-800">Jun 15, 2025</td>
                  <td className="p-4 text-gray-800">Rp 800 M</td>
                  <td className="p-4">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>
                  </td>
                  <td className="p-4 flex gap-4">
                    <button><Image src="/eye-icon.png" alt="View" width={20} height={20} /></button>
                    <button><Image src="/download-icon.png" alt="Download" width={20} height={20} /></button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800">Service Contract</td>
                  <td className="p-4 text-gray-800">PT. Tech Solutions</td>
                  <td className="p-4 text-gray-800">Sep 5, 2025</td>
                  <td className="p-4 text-gray-800">Jun 5, 2025</td>
                  <td className="p-4 text-gray-800">Rp 2 B</td>
                   <td className="p-4">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>
                  </td>
                  <td className="p-4 flex gap-4">
                    <button><Image src="/eye-icon.png" alt="View" width={20} height={20} /></button>
                    <button><Image src="/download-icon.png" alt="Download" width={20} height={20} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}