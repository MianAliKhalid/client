import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../store/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AdminServices = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authorizationToken,isAdmin } = useAuth();

    
    const getAllServicesData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}admin/services`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch services data");
            }

            const data = await response.json();
            setServices(data.services || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load services data");
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a service
    const deleteService = async (serviceId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}admin/services/delete/${serviceId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete service");
            }

            setServices(services.filter((service) => service._id !== serviceId));
            toast.success("Service deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete service");
        }
    };

    const editService = (serviceId) => {
        navigate(`/admin/services/update/${serviceId}/edit`);
    };

    
    const addNewService = () => {
        navigate('/admin/services/add');
    };

    useEffect(() => {
        getAllServicesData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-all"
                        onClick={() => navigate(-1)} 
                    >
                        Back
                    </button>
                    <button
                        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all"
                        onClick={addNewService} 
                    >
                        Add New Service
                    </button>
                </div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Services</h1>

                {services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
                                <p className="text-gray-600 mt-2">{service.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                                        onClick={() => editService(service._id)}
                                    >
                                        Edit
                                    </button>

                                    {!isAdmin ? (null) : <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                                        onClick={() => deleteService(service._id)}
                                    >
                                        Delete
                                    </button>
                                    }
                                    {/* <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                                        onClick={() => deleteService(service._id)}
                                    >
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No services found</p>
                )}
            </div>
        </div>
    );
};
