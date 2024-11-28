import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";

const QueryApprove = () => {
  const { user, authorizationToken } = useAuth();
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Queries
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/file/services/pending`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setQueries(data || []);
        } else {
          toast.error(data.message || "Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        toast.error("Error fetching queries.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchQueries();
    }
  }, [user, authorizationToken]);

  // Update Status: Approved/Pending
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/file/update-status`,
        {
          method: "PUT",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageId: id, status: newStatus }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setQueries((prevQueries) =>
          prevQueries.map((query) =>
            query._id === id ? { ...query, status: newStatus } : query
          )
        );
        toast.success("Status updated successfully.");
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status.");
    }
  };

  // Delete Query
  const deleteQuery = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/file/delete-image/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setQueries(queries.filter((query) => query._id !== id));
        toast.success("Query deleted successfully.");
      } else {
        toast.error(data.message || "Failed to delete query.");
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Error deleting query.");
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">User Queries</h1>
      <Outlet />

      {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : queries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {queries.map((query) => (
            <div
              key={query._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4 transition duration-300 hover:shadow-lg"
            >
              {/* Image Section */}
              {query.url ? (
                <img
                  src={query.url}
                  alt={`${query.firstName} ${query.lastName}`}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-t-lg">
                  No Image
                </div>
              )}

              {/* Details Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {query.firstName} {query.lastName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Email: {query.email}
                </p>
                <p className="text-sm text-gray-600 mt-1">City: {query.city}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Province: {query.province}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Country: {query.country}
                </p>
                <p className="text-sm italic text-gray-800 mt-2">
                  Details: {query.personalDetails}
                </p>
                {query.user && (
                  <div className="mt-4 border-t pt-2 text-sm text-gray-700">
                    <p>User Name: {query.user.username}</p>
                    <p>Email: {query.user.email}</p>
                    <p>Phone: {query.user.phone}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {/* Preview Button */}
                  <a
                    href={query.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition w-1/3 text-center"
                  >
                    Preview
                  </a>

                  {/* Download Button */}
                  <a
                    href={query.url}
                    download={`query-image-${query._id}`}
                    className="py-2 px-4 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition w-1/3 text-center"
                  >
                    Download
                  </a>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() =>
                      updateStatus(
                        query._id,
                        query.status === "approved" ? "pending" : "approved"
                      )
                    }
                    className={`py-2 px-4 rounded-lg text-white w-1/3 ${
                      query.status === "approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {query.status === "approved"
                      ? "Mark as Pending"
                      : "Mark as Approved"}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteQuery(query._id)}
                    className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 w-1/3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No queries available.
        </p>
      )}
    </div>
  );
};

export default QueryApprove;