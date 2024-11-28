import React, { useEffect, useState } from "react";
import { FaTools } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fallbackImage = "/images/placeholder.jpg";  

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    
    const fetchServices = async () => {
      try {
        console.log(import.meta.env.VITE_BASE_URL);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/services`);
        if (!response.ok) throw new Error("Failed to fetch services.");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error.message);
        toast.error("Could not load services.");
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (id) => {
    // console.log(`Service ID: ${id}`);
    navigate(`/service/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <h1 className="mt-20 text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400">
        Our Services
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            onClick={() => handleServiceClick(service._id)} 
          >
            <div className="absolute -top-6 -left-6 bg-gradient-to-r from-pink-500 to-violet-500 p-3 rounded-full shadow-lg">
              <FaTools className="text-white text-xl" />
            </div>
            <img
              src={service.image || fallbackImage}
              alt={service.name}
              onError={(e) => (e.target.src = fallbackImage)}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400 mb-2">
              {service.name}
            </h2>
            <p className="text-gray-300 mb-4">{service.description}</p>
            <span className="text-sm text-gray-400 italic">by {service.provider}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
