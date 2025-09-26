'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    try {
      // Make a POST request to the backend login API
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        router.push('/'); // Redirect to the home page on success
      } else {
        // If login failed, get the error message from the response
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      // Handle network or other unexpected errors
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="w-full md:w-473/1368 h-screen flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-6">
        <div className="flex justify-center">
          <div className="p-3 rounded-full">
            <span className="text-blue-600 text-2xl">
              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                priority
              />
            </span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-[#3A3985]">Welcome back!</h1>
          <p className="text-[#3A3985]">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#3A3985]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A3985]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-sm" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-3xl font-semibold hover:opacity-90 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account? Contact your company&apos;s admin!
        </p>
      </div>
    </div>
  );
}