// pages/management-dashboard.jsx
"use client";
import LandingPage from "@/components/landingpage";
import ManagementSideBar from "@/components/management-sidebar";
import {
  Upload,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  CheckCircle,
  Sliders,
  Mail,
  Lock,
} from "lucide-react";

// Mock Data for the Integrations Log Table
const integrationLogs = [
  {
    timestamp: "2025-01-15 14:30:30",
    system: "ERP System",
    operation: "Sync Vendor Data",
    status: "Succes",
    detail: "15 second update",
  },
  {
    timestamp: "2025-01-15 14:24:25",
    system: "Email Gateway",
    operation: "Send Notification",
    status: "Succes",
    detail: "Contract expiry alert sent",
  },
  {
    timestamp: "2025-01-15 14:01:10",
    system: "E-Signature",
    operation: "Document Signing",
    status: "Failed",
    detail: "Invalid certificate",
  },
];

// Active Integration Statuses
const activeIntegrations = [
  { system: "ERP System", percentage: 100, color: "blue", icon: Sliders, status: "Active" },
  { system: "Email Gateway", percentage: 100, color: "green", icon: Mail, status: "Active" },
  { system: "E-Signature", percentage: 80, color: "yellow", icon: Lock, status: "Configure" },
];

export default function IntegrationGateway() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LandingPage />
      </div>

      {/* Sidebar */}
      <div className="fixed top-24 left-0 h-[calc(100vh-6rem)] w-56 bg-white shadow z-40">
        <ManagementSideBar />
      </div>

      {/* Main Content */}
      <main className="ml-56 pt-28 p-8 bg-gray-50 min-h-screen space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#3A3985]">Integration Gateway</h1>
          <p className="text-[#3499FF] mt-1">
            API-based integration for{" "}
            <span className="text-[#3499FF] font-medium">
              One Standard, One System, One Data
            </span>
          </p>
        </div>

        {/* Top Row: Active Integrations + API Config */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Integrations */}
          <div className="lg:col-span-1 bg-white shadow rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-[#3A3985]">Active Integration</h2>

            {activeIntegrations.map((item, index) => {
              const barColor =
                item.color === "blue"
                  ? "bg-blue-500"
                  : item.color === "green"
                  ? "bg-green-500"
                  : "bg-yellow-500";
              const lightBg =
                item.color === "blue"
                  ? "bg-blue-50"
                  : item.color === "green"
                  ? "bg-green-50"
                  : "bg-yellow-50";
              const textColor =
                item.color === "blue"
                  ? "text-blue-700"
                  : item.color === "green"
                  ? "text-green-700"
                  : "text-yellow-700";

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 border-l-4 ${lightBg} ${
                    item.color === "blue"
                      ? "border-blue-500"
                      : item.color === "green"
                      ? "border-green-500"
                      : "border-yellow-500"
                  }`}
                >
                  <p className="font-medium text-gray-800">{item.system}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
                      <div
                        className={`h-2.5 rounded-full ${barColor}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                      {item.percentage}% - All requirements met
                    </span>
                  </div>
                  <div className="mt-2 text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${textColor} ${lightBg}`}
                    >
                      {item.status === "Active" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {item.status}
                        </>
                      ) : (
                        item.status
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* API Configuration */}
          <div className="lg:col-span-2 bg-white shadow rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-[#3A3985]">API Configuration</h2>

            {/* API Endpoint */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Endpoint
              </label>
              <input
                type="text"
                defaultValue="http://api.scopi.company.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#3499FF] focus:border-[#3499FF] text-gray-700"
              />
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  defaultValue="********"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-12 text-gray-700 focus:ring-[#3499FF] focus:border-[#3499FF]"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Webhook URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook URL
              </label>
              <input
                type="text"
                defaultValue="http://your-system.com/webhook"
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-[#3499FF] focus:border-[#3499FF]"
              />
            </div>

            {/* Endpoints */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Available Endpoint:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 font-mono space-y-1">
                <p>GET /contracts - contract list</p>
                <p>POST /contacts - contact upload</p>
                <p>GET /analytics - data analytics</p>
                <p>POST /ai/analyze - AI analytics</p>
              </div>
            </div>

            <button className="w-full bg-[#3499FF] text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600 transition mt-4 cursor-pointer">
              Save Configuration
            </button>
          </div>
        </div>

        {/* Integration Logs */}
        <div className="bg-white shadow rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#3A3985] mb-4">
            Integrations Log
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {integrationLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.system}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.operation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.status === "Succes"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
