import LandingPage from "@/components/landingpage";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar on top */}
      <LandingPage />

      {/* Content with sidebar + main area */}
      <div className="flex pt-26">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 fixed ">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-indigo-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1118.364 4.56 9 9 0 015.12 17.804z"
                />
              </svg>
            </span>
            <span className="font-medium text-gray-700">User Management</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex p-6 space-x-6">
          {/* Left: User List */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              User Management & Access Control
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Role-based access control system
            </p>

            <div className="bg-white rounded-lg border">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-medium">User List</h3>
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600">
                  + Add User
                </button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-600">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">John Doe</td>
                    <td className="p-3">john.doe@gmail.com</td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                        Admin
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                        Aktif
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button className="text-blue-500">✏️</button>
                      <button className="text-red-500">🗑️</button>
                    </td>
                  </tr>
                  {/* Add more rows here */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Role Management Summary */}
          <div className="w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-gray-600">Admin</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-gray-600">Tim Hukum</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-gray-600">Pengguna Internal</p>
              <p className="text-2xl font-bold text-blue-600">10</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
