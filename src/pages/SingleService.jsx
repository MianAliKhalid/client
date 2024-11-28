import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const fallbackImage = "/images/placeholder.jpg";  

const SingleService = () => {
  const { id } = useParams(); // Get the service ID from URL
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/services/${id}`);
        if (!response.ok) throw new Error("Failed to fetch service details.");
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Error fetching service details:", error.message);
        toast.error("Could not load service details.");
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <h1 className="mt-20 text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400">
        {service.name}
      </h1>
      <div className="max-w-5xl mx-auto bg-black p-6 rounded-lg shadow-lg">
        <div className="relative mb-6">
          <img
            src={service.image || fallbackImage}
            alt={service.name}
            className="w-full h-80 object-cover rounded-lg shadow-xl"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-md">
            <p className="text-lg font-semibold">{service.name}</p>
          </div>
        </div>
        <p className="text-lg text-gray-300 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl text-pink-500 font-bold">{service.price}</span>
          <span className="text-sm text-gray-400 italic">by {service.provider}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
