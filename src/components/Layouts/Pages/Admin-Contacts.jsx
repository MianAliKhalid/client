import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../store/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminContacts = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();
    
   
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10); 
    const [pageInput, setPageInput] = useState('');

    
    const fetchContacts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}admin/contacts?page=${currentPage}&limit=${itemsPerPage}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contacts data');
            }

            const data = await response.json();
            setContacts(data.contacts || []);
            setTotalPages(data.totalPages || 1); 
        } catch (error) {
            console.error('Failed to load contacts data', error);
        }
    };

    
    const truncateMessage = (message, wordLimit) => {
        const words = message.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return message;
    };

    
    useEffect(() => {
        fetchContacts();
    }, [authorizationToken, currentPage, itemsPerPage]);

   
    const handleGoToPage = () => {
        const pageNumber = parseInt(pageInput);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else {
            toast.warn('Invalid page number');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow rounded-lg">
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacts</h2>

            {/* Pagination Controls (Page Number Input) */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Previous
                </button>

                {/* Page Input Field */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">Page:</span>
                    <input
                        type="number"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                        placeholder={`1-${totalPages}`}
                        min="1"
                        max={totalPages}
                    />
                    <button
                        onClick={handleGoToPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Go
                    </button>
                </div>

                <span className="self-center text-lg text-gray-800">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Next
                </button>
            </div>

            {/* Contacts Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Message</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 border-b border-gray-200 transition"
                            >
                                <td className="px-6 py-3">{contact.name}</td>
                                <td className="px-6 py-3">{contact.email}</td>
                                <td className="px-6 py-3">{contact.phone}</td>
                                <td className="px-6 py-3">{truncateMessage(contact.message, 15)}</td>
                                <td className="px-6 py-3">
                                    <button
                                        onClick={() => navigate(`/admin/contacts/${contact._id}/view`)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
