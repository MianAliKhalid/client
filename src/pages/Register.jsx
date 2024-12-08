import React, { useState } from "react";;
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Register = () => {
  const navigate = useNavigate();
  const {storeTokenInLS}  = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ username: "", email: "", password: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(user),
      });
      // console.log("Response suck:", response);
      const res_data = await response.json();
      toast.warning(res_data.error);

      if (response.ok)
      {
        storeTokenInLS(res_data.token);
        toast.success("Sign up successful!");
        setUser({ username: "", email: "", password: "", phone: "" });
        navigate("/");
        window.location.reload();
      }
      else
      {
        toast.error(error.message);

      }

      
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Failed to sign up.");
      
    }

  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg shadow-indigo-500/50">
        <div className="text-center mb-8">
          <img
            className="mx-auto h-20 w-auto"
            src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register_1948-2986.jpg?w=1380"
            alt="Logo"
          />
          <h2 className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400">
            Create Your Account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                // required
                value={user.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                // required
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  // required
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
                    <label className="block text-gray-700">Phone</label>
                    <div className="flex items-center border rounded-lg">
                        <span className="px-4 text-gray-500">+92</span>
                        <input
                            type="number"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 focus:outline-none text-gray-400 bg-[#1D1E21] focus:border-blue-500"
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-pink-400 hover:text-pink-500">
              Already have an account? Log In
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 hover:from-violet-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
