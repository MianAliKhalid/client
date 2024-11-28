import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.message) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        setFormData({
          username: user?.username || "",
          email: user?.email || "",
          message: "",
        });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex flex-col items-center py-12 px-6">
      <h1 className="mt-16 text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Contact Us
      </h1>
      <p className="text-lg text-center max-w-2xl mb-12 text-gray-300">
        Reach out to us with any questions or inquiries! We're here to help you.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="flex items-center space-x-4 bg-opacity-20 p-4 rounded-lg bg-white/10 backdrop-blur-lg">
          <FaPhone className="text-blue-500 text-2xl" />
          <span className="text-gray-300">+1 (234) 567-8900</span>
        </div>
        <div className="flex items-center space-x-4 bg-opacity-20 p-4 rounded-lg bg-white/10 backdrop-blur-lg">
          <FaEnvelope className="text-blue-500 text-2xl" />
          <span className="text-gray-300">info@yourcompany.com</span>
        </div>
        <div className="flex items-center space-x-4 bg-opacity-20 p-4 rounded-lg bg-white/10 backdrop-blur-lg">
          <FaMapMarkerAlt className="text-blue-500 text-2xl" />
          <span className="text-gray-300">123 Tech Lane, Future City</span>
        </div>
      </div>

      {!isLoggedIn ? (
        <div>
        <div className="bg-white/10 p-8 rounded-t-2xl shadow-lg backdrop-blur-md max-w-lg w-full text-gray-400 text-sm">
          <p>
            If you want some custom service, please upload your details and go
            to registration. After registration, you can proceed to upload.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="mt-4 text-blue-500 hover:underline"
          >
            Go to Registration
          </button>
        </div>
      
        <div className="bg-white/10 p-8 rounded-b-2xl shadow-lg backdrop-blur-md max-w-lg w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="text-sm text-gray-400 block mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-400 block mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm text-gray-400 block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-gray-900 font-semibold hover:from-teal-500 hover:to-blue-500 transition duration-200 focus:ring-4 focus:ring-blue-500/50"
            >
              Send Message
            </button>
          </form>
        </div>

</div>
       ) : (<div className="bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md max-w-lg w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-sm text-gray-400 block mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-400 block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm text-gray-400 block mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-gray-900 font-semibold hover:from-teal-500 hover:to-blue-500 transition duration-200 focus:ring-4 focus:ring-blue-500/50"
          >
            Send Message
          </button>
        </form>
      </div>  )}
    </div>
  );
};

export default Contact;
