"use client";
import LandingPage from "@/components/landingpage";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

type UserRole = "Admin" | "Tim Hukum" | "Internal" | "Executive";

type User = {
  name: string;
  email: string;
  role: UserRole;
  status: string;
};

const roleColor: Record<UserRole, string> = {
  "Admin": "bg-red-100 text-red-600",
  "Legal": "bg-yellow-100 text-yellow-700",
  "Internal": "bg-blue-100 text-blue-600",
  "Executive": "bg-green-100 text-green-600",
};


export default function AdminHome() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleCounts, setRoleCounts] = useState({}); // State to store role counts

  const router = useRouter();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
        const counts = data.users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});
        setRoleCounts(counts);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const pageSize = 15;
  const totalPages = Math.ceil(users.length / pageSize);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        credentials: "include",
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== id));

      // Recalculate role counts
      setRoleCounts((prevCounts) => {
        const userToDelete = users.find((user) => user.ID === id);
        if (userToDelete) {
          const updatedCounts = { ...prevCounts };
          updatedCounts[userToDelete.role] -= 1;
          if (updatedCounts[userToDelete.role] === 0) {
            delete updatedCounts[userToDelete.role];
          }
          return updatedCounts;
        }
        return prevCounts;
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Navbar on top */}
      <LandingPage />

      {/* Content with sidebar + main area */}
      <div className="min-h-screen flex pt-25.5">
        {/* Sidebar kiri full height */}
        <aside className="w-full h-fit-full max-w-3xs bg-white shadow-md p-6">
          <div className="flex items-center space-x-2 mb-8">
            <img src="/people-icon.png" alt="User Icon" className="w-6 h-6" />
            <span className="font-medium text-gray-700">User Management</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex p-6 space-x-6 h-fit-full">
          {/* Left: User List */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow flex flex-col h-fit-full">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-1 bg-nqo">
              User Management & Access Control
            </h2>
            <p className="text-sm text-blue-400 mb-6">
              Role-based access control system
            </p>

            <div className="bg-white rounded-lg border flex-1 flex flex-col ">
              <div className="flex justify-between items-center p-4 border-b ">
                <h3 className="font-medium text-gray-700">User List</h3>
                <button
                onClick={() => {router.push("/admin/create_user")}}
                className="flex items-center space-x-2 bg-blue-500 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-600">
                  <FaUserPlus />
                  <span>Add User</span>
                </button>
              </div>

              <div className="overflow-x-auto flex-1">
                {loading ? (
                  <p>Loading users...</p>
                ): (
                  <table className="w-full table-fixed text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-sm text-gray-700">
                        <th className="p-3 w-1/3">Name</th>
                        <th className="p-3 w-1/3">Email</th>
                        <th className="p-3">Role</th>
                        {/* <th className="p-3">Status</th> */}
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice((page-1) * pageSize, page * pageSize).map((user, idx) => (
                        <tr className="border-t text-gray-700" key={idx}>
                          <td className="p-3">{user.name}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 text-xs rounded ${roleColor[user.role] || "bg-gray-100 text-gray-700"}`}>
                              {user.role}
                            </span>
                          </td>
                          {/* <td className="p-3">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                              {user.status}
                            </span>
                          </td> */}
                          <td className="p-3 space-x-3 flex">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FaEdit />
                            </button>
                            <button
                            onClick={() => {handleDelete(user.ID)}}
                            className="text-red-500 hover:text-red-700">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center p-4 border-t bg-white">
                <button
                  className={`px-3 py-1 rounded mr-2 text-sm ${page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  className={`px-3 py-1 rounded ml-2 text-sm ${page === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right: Role Management Summary */}
          <div className=" h-full min-w-3xs relative flex items-center justify-center">
            {/* Background border */}
            <div className="relative bg-white rounded-xl shadow-lg z-10 h-fit w-full space-y-4 p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center">Manajemen Peran</h3>
                {loading ? (
                  <p>loading...</p>
                ) : (<>
                      {Object.entries(roleCounts).map(([role, count], idx) => (
                        <div key={idx} className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow text-center">
                          <p className="text-gray-600 pb-2">{role}</p>
                          <p className="text-4xl font-bold text-blue-600">{count}</p>
                        </div>
                      ))}
                    </>
                )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}