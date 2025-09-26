"use client";
import { useRouter } from "next/router";
import { useMemo } from "react";

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
  const activePath = "/user/dashboard";

  return (
    <aside
      className="fixed h-screen w-[16vw] justify-between h-screen w-[16vw] min-w-[220px] bg-white shadow-lg"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <div className="px-6 pt-6">
          <div className="text-gray-500 text-sm mb-2">Menu</div>
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${activePath === item.path ? "bg-[#DCEDFF] text-[#3A3985]" : "text-[#3A3985] hover:bg-[#F5F7FA]"}`}
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className="text-base">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-6 fixed bottom-5">
        <div className="text-gray-400 text-sm mb-2">Settings</div>
        <ul className="flex flex-col gap-1">
          {profileItems.map((item) => (
            <li
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${activePath === item.path ? "bg-[#DCEDFF] text-[#3A3985]" : "text-[#3A3985] hover:bg-[#F5F7FA]"}`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <span className="text-base">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}