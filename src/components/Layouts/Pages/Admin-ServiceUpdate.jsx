import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/Auth';
import { toast } from 'react-toastify';

export const AdminServicesUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();
    const [service, setService] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null); 

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/services/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authorizationToken,
                    },
                });
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Failed too fetch service data');
                }

                const data = await response.json();
                
                setService(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchServiceData();
    }, [id, authorizationToken]);

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        try {
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/file/service-image`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            return data.url; 
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let uploadedImageUrl = service.image;

            if (imageFile) {
                uploadedImageUrl = await handleImageUpload();
                if (!uploadedImageUrl) throw new Error('Image upload failed');
            }

            const updatedService = { ...service, image: uploadedImageUrl };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/file/services/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken,
                },
                body: JSON.stringify(updatedService),
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            toast.success('Service updated successfully');
            navigate('/admin/services');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Update Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Title</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={service.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={service.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={service.price}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {service.image && (
                        <div className="mt-2">
                            <img src={service.image} alt="Service" className="w-32 h-32 object-cover rounded" />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Update Service
                    </button>
                </div>
            </form>
        </div>
    );
};
