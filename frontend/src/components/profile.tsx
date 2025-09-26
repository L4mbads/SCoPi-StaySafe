export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#3A3985]">My Profile</h1>
      <p className="text-[#3499FF] mb-6">Manage your account information and preferences</p>

      <div className="grid grid-cols-   1 md:grid-cols-3 gap-6">
        {/* Left: Personal Information */}
        <div className="md:col-span-2 bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#3A3985] mb-4">Personal Information</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#3A3985] mb-1">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm text-[#3A3985] mb-1">Email</label>
                <input type="email" defaultValue="john.doe@gmail.com" className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#3A3985] mb-1">Departemen</label>
                <input type="text" defaultValue="Procurement" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm text-[#3A3985] mb-1">Position</label>
                <input type="text" defaultValue="Procurement Officer" className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#3A3985] mb-1">Phone Number</label>
              <input type="text" defaultValue="+62 812 3907 8273" className="w-full border rounded-lg p-2" />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#3A3985] to-[#3499FF] text-white font-semibold px-4 py-2 rounded-lg">
              Save
            </button>
          </form>
        </div>

        {/* Right: Account Settings */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#3A3985] mb-4">Account Settings</h2>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#3A3985] to-[#3499FF] text-white text-2xl font-bold">
              JD
            </div>
          </div>

          {/* Security */}
          <h3 className="font-semibold text-[#3A3985]">Security</h3>
          <hr />
          <ul className="mb-4 text-sm text-gray-700 space-y-1">
            <li>Change Password</li>
            <li>2FA Security</li>
          </ul>

          {/* Preferences */}
          <h3 className="font-semibold text-[#3A3985]">Preferences</h3>
          <hr />
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Notification Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
