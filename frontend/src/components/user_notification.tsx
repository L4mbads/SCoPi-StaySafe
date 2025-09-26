export default function UserNotification() {
    return (
        <div className="flex-1 p-6">

          {/* Notification */}
          <div className="bg-white shadow rounded-2xl p-4 mt-6">
            <h2 className="font-semibold text-lg mb-4 text-[#3A3985]">Notification</h2>
            <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-3 rounded">
              <p className="font-semibold text-black">Your supplier contract was approved</p>
              <p className="text-sm text-gray-600">Legal team completed the review.</p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p className="font-semibold text-black">Your IT service contract will expire in 15 days</p>
              <p className="text-sm text-gray-600">Please request extension if necessary.</p>
            </div>
          </div>
        </div>
    );
}