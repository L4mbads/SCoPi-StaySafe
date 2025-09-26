"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Data arrays are unchanged...
const menuItems = [
  { label: "Dashboard", icon: "/dashboard-icon.png", path: "/user/dashboard" },
  { label: "Contract Request", icon: "/contract-req-icon.png", path: "/user/contract-request" },
  { label: "My Contract", icon: "/my-contract-icon.png", path: "/user/my-contract" },
  { label: "Notification", icon: "/notif-icon.png", path: "/user/notification" },
];

const profileItems = [
  { label: "My Profile", icon: "/people-icon.png", path: "/user/profile" },
];

export default function UserSideBar() {
  const activePath = usePathname();

  return (
    // MOVED the responsive classes here. Use md:flex.
    <aside className="hidden w-64 bg-white shadow-lg md:flex flex-col justify-between p-4">
      {/* Top section with menu items (no change) */}
      <div>
        <div className="text-gray-500 text-sm font-semibold mb-2 px-2">Menu</div>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  activePath === item.path
                    ? "bg-[#DCEDFF] text-[#3A3985] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Image src={item.icon} alt={item.label} width={20} height={20} />
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section with profile/settings (no change) */}
      <div>
        <div className="text-gray-500 text-sm font-semibold mb-2 px-2">Settings</div>
        <ul className="flex flex-col gap-1">
          {profileItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  activePath === item.path
                    ? "bg-[#DCEDFF] text-[#3A3985] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Image src={item.icon} alt={item.label} width={20} height={20} />
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}