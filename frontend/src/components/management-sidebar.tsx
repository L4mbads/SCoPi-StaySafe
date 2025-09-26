"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, FileText, Share2, User } from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutGrid, path: "/management/dashboard" },
  { label: "Document Management", icon: FileText, path: "/management/document-management" },
  { label: "Integration Gateway", icon: Share2, path: "/management/integration-gateway" },
];

const profileItems = [
  { label: "My Profile", icon: User, path: "/user/profile" },
];

export default function ManagementSideBar() {
  const activePath = usePathname();

  return (
    <aside className="fixed top-24 w-[16vw] min-w-[220px] h-[calc(100vh-6rem)] bg-white shadow-lg flex flex-col justify-between z-10">
      {/* Top Section - Menu */}
      <div className="px-4 pt-6 overflow-y-auto flex-1">
        <div className="text-gray-500 text-sm font-semibold mb-3">Menu</div>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#DCEDFF] text-[#3A3985] font-semibold"
                      : "text-[#3A3985] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section - Settings */}
      <div className="px-4 pb-6 border-t pt-4 bg-white">
        <div className="text-gray-500 text-sm font-semibold mb-3">Settings</div>
        <ul className="flex flex-col gap-1">
          {profileItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#DCEDFF] text-[#3A3985] font-semibold"
                      : "text-[#3A3985] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
