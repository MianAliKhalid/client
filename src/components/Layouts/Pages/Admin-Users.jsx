import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminUsers = () => {
  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken, isAdmin} = useAuth();

  const getAllUsersData = async () => {
    // console.log("Current User:", isAdmin);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users data");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}admin/users/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
      window.scrollTo(0, 0);
     
      toast.success("User deleted successfully");
      // window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  const editUser = (userId) => {
    navigate(`/admin/users/update/${userId}/edit`);
  };

  const addNewUser = () => {

    navigate('/admin/users/add');
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        

        
        <button
          onClick={addNewUser}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all"
        >
          Add New User
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Users</h2>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  #
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Avatar
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Username
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Phone
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Private Note
                </th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2 text-center text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-b px-4 py-2 text-center">
                    <img
                      src={user.avatar}
                      alt={`${user.username}'s avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {user.username}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {user.phone}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {user.role}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {user.privateNote || "N/A"}
                  </td>
                  {
                    isAdmin ? (
                      <td className="border-b px-4 py-2 text-center">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => editUser(user._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                    ) : (
                      <td className="border-b px-4 py-2 text-center">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => editUser(user._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                    )
                    
                    

                  }
                  {/* <td className="border-b px-4 py-2 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => editUser(user._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};
