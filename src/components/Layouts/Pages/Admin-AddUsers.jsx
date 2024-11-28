import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/Auth"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddUsers = () => {
  const navigate = useNavigate();
  const { authorizationToken , isAdmin} = useAuth();
  // console.log("Current User:", isAdmin);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
    role: "",
  });

  const [error, setError] = useState(null);

  let roleOptions =[]


if(isAdmin){
  roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
  ];
}
else{
roleOptions = [
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
  ];
}
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const res_data = await response.json();
        toast.warning(res_data.error);
        throw new Error("Failed to add user");
      }
     
      
        toast.success("User added successfully");
        
        setTimeout(() => {
          navigate("/admin/users");
        }, 1000);
      

     
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New User
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <div className="flex items-center border rounded-lg">
            <span className="px-4 text-gray-500">+92</span>
            <input
              type="number"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleRoleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a role...</option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUsers;
