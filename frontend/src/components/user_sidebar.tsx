export default function UserSideBar() {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
          <ul className="space-y-4">
            <li className="text-[#797979] pt-3">Menu</li>
            <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Contract Request</li>
            <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">My Contract</li>
            <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Notification</li>
          </ul>
          <ul className="space-y-4 pt-80">
            <li className="text-[#797979]">Profile</li>
            <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">My Profile</li>
          </ul>
    </div>
  );
}