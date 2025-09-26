export default function LegalSideBar() {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <ul className="space-y-4">
        <p className="text-[#797979] pt-3">Menu</p>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Dashboard Review</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Review Queue</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">AI Analysis</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Compliance Check</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Contract Library</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">Legal Report</li>
      </ul>
      <ul className="space-y-4 pt-60">
        <li className="text-[#797979]">Profile</li>
        <li className="text-[#3A3985] hover:text-blue-600 cursor-pointer">My Profile</li>
      </ul>
    </div>
  );
}
