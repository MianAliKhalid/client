import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Security = () => {
  const { user, authorizationToken } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/update-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken || "",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || "Failed to change password");
        throw new Error(responseData.message || "Failed to change password");
      }

      toast.success("Password changed successfully");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email || "",
    }));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Update Your Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-400 mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your old password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Security;
