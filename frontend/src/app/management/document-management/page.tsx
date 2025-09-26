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
} from "lucide-react";

// Mock Data for the Documents Repository Table
const documentRepository = [
  {
    name: "Contract A",
    company: "PT. Office Supply",
    startDate: "Sep 15, 2024",
    endDate: "Jun 15, 2025",
    value: "Rp 800 M",
    status: "Active",
  },
  {
    name: "Contract B",
    company: "PT. Tech Solutions",
    startDate: "Sep 5, 2024",
    endDate: "Jun 5, 2025",
    value: "Rp 2 B",
    status: "Active",
  },
  {
    name: "NDA for Project X",
    company: "Global Innovations Inc.",
    startDate: "Oct 1, 2024",
    endDate: "Oct 1, 2026",
    value: "N/A",
    status: "Pending",
  },
];

export default function DocumentManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (fixed top) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LandingPage />
      </div>

      {/* Sidebar (fixed left) */}
      <div className="fixed top-24 left-0 h-[calc(100vh-6rem)] w-56 bg-white shadow z-40">
        <ManagementSideBar />
      </div>

      {/* Main Content */}
      <main className="ml-56 pt-28 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8 pl-3">
          <h1 className="text-3xl font-bold text-[#3A3985]">
            Document Management
          </h1>
          <p className="text-[#3499FF] mt-1">
            Smart Contract Storage with{" "}
            <span className="text-[#3499FF] font-medium">
              AI-powered metadata extraction
            </span>
          </p>
        </div>

        {/* 1. Upload Contract Documents Section */}
        <div className="bg-white shadow rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#3A3985] mb-4">
            Upload Contract Documents
          </h2>

          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center transition duration-300 hover:border-[#3499FF]">
            <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              Drag & drop file or click to upload
            </p>
            <p className="text-sm text-gray-400 mb-4">Support PDF</p>

            <button className="bg-[#3499FF] text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600 transition">
              Select File
            </button>
          </div>
        </div>

        {/* 2. Documents Repository Section */}
        <div className="bg-white shadow rounded-xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3A3985]">
              Documents Repository
            </h2>
            <div className="flex items-center space-x-2">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents"
                  className="border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-[#3499FF] focus:border-[#3499FF]"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              {/* Filter Button */}
              <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documentRepository.map((doc, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          title="View Document"
                          className="text-[#3499FF] hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          title="Download"
                          className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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
