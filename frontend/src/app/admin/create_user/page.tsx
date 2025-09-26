"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminCreate() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    if (password != confirmPassword) {
      setError("Pastikan konfirmasi password benar");
    } else {
      try {
        // Make a POST request to the backend login API
        const response = await fetch("http://localhost:8080/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
            password,
            "confirm_password": confirmPassword,
          }),
        });

        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          router.push("/admin/home"); // Redirect to the home page on success
        } else {
          // If login failed, get the error message from the response
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (err) {
        // Handle network or other unexpected errors
        setError("An error occurred. Please try again later.");
        console.error("Login error:", err);
      }
    }
  };
  return (
    <div className="flex min-h-screen bg-blue-100 items-center justify-center relative overflow-hidden">
      {/* Back Button (kanan atas) */}
      <a href="/" className="absolute top-3 left-5">
        <Image src="/back-button.png" alt="Back" width={74} height={36} />
      </a>

      {/* Main Card */}
      <div className="relative border-l-[#3A3985] border-l-4 bg-white rounded-2xl shadow-xl w-[500px] h-[500px] p-6 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src="/add-user-icon.png" alt="User Logo" className="w-12 h-12" />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-3">
          Create <span className="text-blue-500">New User</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2 flex-1">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Role (Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Role --</option>
              <option value="Internal">Internal</option>
              <option value="Admin">Administrator</option>
              <option value="Legal">Legal</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-md px-2 py-1 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? (
                  // Eye open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye crossed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-10-7-10-7a18.24 18.24 0 0 1 5.06-5.94M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md px-2 py-1 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-blue-500"
              >
                {showConfirm ? (
                  // Eye open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye crossed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-10-7-10-7a18.24 18.24 0 0 1 5.06-5.94M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-1.5 mt-2 bg-gradient-to-r from-indigo-700 to-blue-400 text-white font-semibold rounded-md shadow-md hover:opacity-90 text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
