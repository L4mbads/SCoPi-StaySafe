"use client";

import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";
import { useState, useEffect } from "react";

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
    priority: "low",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes (NO CHANGES HERE)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (NO CHANGES HERE)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          estimated_contract_value: parseFloat(formData.estimated_contract_value),
          start_date: new Date(formData.start_date).toISOString(),
          end_date: new Date(formData.end_date).toISOString(),
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/contract_request/self", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setHistory(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSideBar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Contract Requests Header */}
          <div>
            <h2 className="text-2xl font-bold text-[#3A3985]">Contract Request</h2>
            <p className="text-sm text-gray-500 mt-1">Submit a new draft contract request with AI</p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
          </div>

          {/* Create New Request Form */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#3A3985] mb-4">Create New Request</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* A better way to structure labels and inputs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contract Title</label>
                  <input
                    type="text"
                    name="contract_title"
                    value={formData.contract_title}
                    onChange={handleChange}
                    required
                    className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimated Contract Value</label>
                   <input
                    type="number"
                    name="estimated_contract_value"
                    value={formData.estimated_contract_value}
                    onChange={handleChange}
                    required
                    className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Address</label>
                  <input
                    type="text"
                    name="company_address"
                    value={formData.company_address}
                    onChange={handleChange}
                    required
                    className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Client Name</label>
                  <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Client Title</label>
                  <input type="text" name="client_title" value={formData.client_title} onChange={handleChange} required className="mt-1 border rounded-lg p-2 w-full text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Service Description</label>
                  <textarea name="service_description" value={formData.service_description} onChange={handleChange} required placeholder="Type description" className="mt-1 border rounded-lg p-2 w-full h-24 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Final Deliverables</label>
                  <textarea name="final_deliverables" value={formData.final_deliverables} onChange={handleChange} placeholder="Type final delivery" className="mt-1 border rounded-lg p-2 w-full h-24 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
              </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select name="priority" value={formData.priority} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3A3985] to-[#3499FF] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Request
              </button>
            </form>
          </div>

          {/* Request History */}
          <div className="bg-white shadow-md rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-lg text-[#3A3985] mb-4">My Request History</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Contract Type</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                {loading ? (
                  <></>
                ) : (<>
                      {history.map((h, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3">{new Date((h.CreatedAt)).toDateString()}</td>
                        <td className="p-3">{h.contract_title}</td>
                        <td className="p-3">{h.company_name}</td>
                        <td className="p-3">Rp{h.estimated_value}</td>
                        <td className="p-3">
                            <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                            {h.contract_request_status}
                            </span>
                        </td>
                        </tr>
                      ))}
                    </>
                )}
                </tbody>
                </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}