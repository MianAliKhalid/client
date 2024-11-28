import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../store/Auth";
export const AdminContactView = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authorizationToken } = useAuth();

  const fetchContact = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}admin/contacts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contact data");
      }

      const data = await response.json();
      setContact(data.contact);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id, authorizationToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!contact) {
    return <p>No contact found</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Admin Contact View
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={contact.username}
            readOnly
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={contact.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            value={contact.message}
            readOnly
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
  <label className="block text-gray-700">Created At</label>
  <input
    type="text"
    value={contact.createdAt ? new Date(contact.createdAt).toLocaleString() : 'Invalid date'}
    readOnly
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
  />
</div>
      </form>
    </div>
  );
};

export default AdminContactView;
