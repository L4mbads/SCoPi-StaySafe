"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Dashboard", icon: "/dashboard-icon.png", path: "/legal/dashboard" },
  { label: "Review Queue", icon: "/contract-req-icon.png", path: "/legal/review-queue" },
  { label: "AI Analysis", icon: "/my-contract-icon.png", path: "/legal/ai_analysis" },
  { label: "Compliance Check", icon: "/notif-icon.png", path: "/legal/compliance" },
  { label: "Contract Library", icon: "/notif-icon.png", path: "/legal/contract-library" },
  { label: "Legal Report", icon: "/notif-icon.png", path: "/legal/legal-report" },
];

const profileItems = [
  { label: "My Profile", icon: "/people-icon.png", path: "/legal/profile" },
];

export default function LegalSideBar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 bg-white shadow-lg md:flex flex-col justify-between p-4">
      {/* Top section */}
      <div>
        <div className="text-gray-500 text-sm font-semibold mb-2 px-2">Menu</div>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  pathname === item.path
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

      {/* Bottom section (no longer needs 'fixed' positioning) */}
      <div>
        <div className="text-gray-500 text-sm font-semibold mb-2 px-2">Settings</div>
        <ul className="flex flex-col gap-1">
          {profileItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  pathname === item.path
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