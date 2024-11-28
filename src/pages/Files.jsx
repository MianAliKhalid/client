import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/Auth'; 
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const Files = () => {
  const { user, isLoggedIn } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/upload/images?userId=${user._id}&email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setFiles(data.data);
        } else {
          toast.error(data.message);s
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Error fetching files.');
      }
    };

    if (user) {
      fetchFiles();
    }
  }, [user]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="mt-10 text-3xl font-bold text-center mb-8">Your Files</h2>
        {files.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {files.map((file) => (
              <div key={file._id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition duration-300 ease-in-out">
                <a href={file.image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={file.image}
                    alt="Uploaded"
                    className="w-full h-56 object-cover rounded-t-lg group-hover:opacity-80 transition duration-300"
                  />
                  {/* Hover overlay icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white text-lg font-semibold transition duration-300 ease-in-out">
                    View Image
                  </div>
                </a>
                <div className="p-4">
                  <p className="text-gray-700 text-sm">{file.personalDetails}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center">No files found.</p>
        )}
      </div>
    </div>
  );
};

export default Files;
