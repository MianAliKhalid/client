import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FaSignOutAlt, FaUsers, FaTasks, FaChartLine } from "react-icons/fa";
import Sidebar from "./components/AdminSidebar";
import { useAuth } from "../../store/Auth";

export const AdminLayout = () => {
  const { user, isLoading, authorizationToken } = useAuth();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authorizationToken");
    window.location.href = "/logout";
  };

  const [totalUsers, setTotalUsers] = useState("0");
  const [totalContacts, setTotalContacts] = useState("0");
  const [totalServices, setTotalServices] = useState("0");
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user || isLoading) return;


    const fetchStats = async () => {
      try {
        const fetchData = async (url) => {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        };

        
        const [users, contacts, services] = await Promise.all([
          fetchData(`${import.meta.env.VITE_BASE_URL}admin/users/count`),
          fetchData(`${import.meta.env.VITE_BASE_URL}admin/contacts/count`),
          fetchData(`${import.meta.env.VITE_BASE_URL}admin/services/count`),
        ]);

        setTotalUsers(users.users);
        setTotalContacts(contacts.contacts);
        setTotalServices(services.services);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStats();
  }, [user, authorizationToken, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user || user.role === "user") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome, {user?.name || "Admin"}
            </h1>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-white bg-blue-500">
                <FaUsers />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Users
                </h3>
                <p className="text-xl font-bold text-gray-600">{totalUsers}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-white bg-green-500">
                <FaTasks />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Contacts
                </h3>
                <p className="text-xl font-bold text-gray-600">
                  {totalContacts}
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-white bg-purple-500">
                <FaChartLine />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Services
                </h3>
                <p className="text-xl font-bold text-gray-600">
                  {totalServices}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Display Error if any */}
        {error && (
          <div className="p-4 bg-red-500 text-white">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
