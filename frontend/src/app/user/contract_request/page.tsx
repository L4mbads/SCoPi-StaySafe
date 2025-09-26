import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";

export default function UserContractRequest() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <UserSideBar />
        {/* Main Content */}
        <div className="flex-1 pl-[15em] p-6 pt-3">
          {/* Contract Requests Header */}
          <div className="p-1">
            <h2 className="text-xl font-bold text-[#3A3985]">Contract Requests</h2>
            <p className="text-sm text-[#3499FF]">Submit a new draft contract request with AI</p>

            {/* Create New Request Form */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-[#3A3985] mb-4">Create New Request</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Contract Title</p>
                  <p className="text-[#3A3985]">Company Name</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Estimated Contract Value</p>
                  <p className="text-[#3A3985]">Company Address</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <p className="text-[#3A3985]">Start Date</p>
                  <p className="text-[#3A3985]">End Date</p>
                  <p className="text-[#3A3985]">Client</p>
                  <p className="text-[#3A3985]">Department</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="date" className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="date" className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Service Description</p>
                  <p className="text-[#3A3985]">Final Delivery</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea placeholder="Type description" className="border rounded-lg p-2 w-full h-24 text-gray-900"></textarea>
                  <textarea placeholder="Type final delivery" className="border rounded-lg p-2 w-full h-24 text-gray-900"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Priority</p>
                </div>
                  <input type="text" className="border rounded-lg p-2 w-full text-gray-900" />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3A3985] to-[#3499FF] text-white font-semibold py-2 rounded-lg">
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Request History */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6 border border-blue-300">
            <h3 className="font-semibold text-lg text-[#3A3985] mb-4">My Request History</h3>
            <table className="w-full te xt-sm text-left border-collapse">
              <thead className="text-[#3A3985] border-b">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Contract Type</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="border-b">
                  <td className="p-2">Sep 15, 2024</td>
                  <td className="p-2">Supplier Contracts</td>
                  <td className="p-2">PT. Tech Solutions</td>
                  <td className="p-2">Rp 800 M</td>
                  <td className="p-2">Legal Team Review</td>
                  <td className="p-2 flex gap-2">
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Sep 5, 2025</td>
                  <td className="p-2">Service Contracts</td>
                  <td className="p-2">CV. Maju Bersama</td>
                  <td className="p-2">Rp 2 B</td>
                  <td className="p-2">Approved</td>
                  <td className="p-2 flex gap-2">
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
