"use client";

import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";

import { useState } from "react";

export default function UserContractRequest() {
  const [formData, setFormData] = useState({
    contract_title: "",
    company_name: "",
    company_address: "",
    client_name: "",
    client_title: "",
    estimated_contract_value: "",
    start_date: "",
    end_date: "",
    service_description: "",
    final_deliverables: "",
    priority: "low", // Default priority
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/api/contract_request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          estimated_contract_value: parseFloat(formData.estimated_contract_value), // Ensure it's a number
          start_date: new Date(formData.start_date).toISOString(), // Convert to ISO string
          end_date: new Date(formData.end_date).toISOString(), // Convert to ISO string
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create contract request");
      }

      setSuccess("Contract request created successfully!");
      setFormData({
        contract_title: "",
        company_name: "",
        company_address: "",
        client_name: "",
        client_title: "",
        estimated_contract_value: "",
        start_date: "",
        end_date: "",
        service_description: "",
        final_deliverables: "",
        priority: "low",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex">
        {/* Sidebar */}
        <UserSideBar />
        {/* Main Content */}
        <div className="flex-1 p-6 pt-3">
          {/* Contract Requests Header */}
          <div className="p-1">
            <h2 className="text-xl font-bold text-[#3A3985]">Contract Requests</h2>
            <p className="text-sm text-[#3499FF]">Submit a new draft contract request with AI</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {/* Create New Request Form */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-[#3A3985] mb-4">Create New Request</h3>
              <form
              onSubmit={handleSubmit}
              className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Contract Title</p>
                  <p className="text-[#3A3985]">Company Name</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text"
                  name="contract_title"
                  value={formData.contract_title}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Estimated Contract Value</p>
                  <p className="text-[#3A3985]">Company Address</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text"
                  name="estimated_contract_value"
                  value={formData.estimated_contract_value}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text"
                  name="company_address"
                  value={formData.company_address}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <p className="text-[#3A3985]">Start Date</p>
                  <p className="text-[#3A3985]">End Date</p>
                  <p className="text-[#3A3985]">Client Name</p>
                  <p className="text-[#3A3985]">Client Title</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                  <input type="text"
                  name="client_title"
                  value={formData.client_title}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 w-full text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Service Description</p>
                  <p className="text-[#3A3985]">Final Delivery</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                  name="service_description"
                  value={formData.service_description}
                  onChange={handleChange}
                  required
                  placeholder="Type description" className="border rounded-lg p-2 w-full h-24 text-gray-900"></textarea>
                  <textarea
                  name="final_deliverables"
                  value={formData.final_deliverables}
                  onChange={handleChange}
                  placeholder="Type final delivery" className="border rounded-lg p-2 w-full h-24 text-gray-900"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-[#3A3985]">Priority</p>
                </div>
                <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="" disabled className="bg-blue-600 text-white">Pilih prioritas</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3A3985] to-[#3499FF] text-white font-semibold py-2 rounded-lg">
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Request History */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6 border border-blue-300">
            <h3 className="font-semibold text-lg text-[#3A3985] mb-4">My Request History</h3>
            <table className="w-full te xt-sm text-left border-collapse">
              <thead className="text-[#3A3985] border-b">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Contract Type</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="border-b">
                  <td className="p-2">Sep 15, 2024</td>
                  <td className="p-2">Supplier Contracts</td>
                  <td className="p-2">PT. Tech Solutions</td>
                  <td className="p-2">Rp 800 M</td>
                  <td className="p-2">Legal Team Review</td>
                  <td className="p-2 flex gap-2">
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Sep 5, 2025</td>
                  <td className="p-2">Service Contracts</td>
                  <td className="p-2">CV. Maju Bersama</td>
                  <td className="p-2">Rp 2 B</td>
                  <td className="p-2">Approved</td>
                  <td className="p-2 flex gap-2">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
