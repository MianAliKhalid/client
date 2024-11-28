import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/Auth';
import { toast } from 'react-toastify';

export const AdminUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken,isAdmin } = useAuth();
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        role: '',
        avatar: '',
        privateNote: ''
    });
    const [loading, setLoading] = useState(true);
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
    const handleRoleChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            role: e.target.value
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}admin/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authorizationToken,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, authorizationToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}admin/users/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken,
                },
                body: JSON.stringify(user)
            });
            // console.log("response", response);
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            toast.success('User data updated successfully');
            navigate('/admin/users');
        } catch (error) {
            toast.error('Failed to update user data');
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Update User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
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
                    <label className="block text-gray-700">Private Note</label>
                    <textarea
                        name="privateNote"
                        value={user.privateNote}
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};
