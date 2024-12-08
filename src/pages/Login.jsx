import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Login = () => {
  const { storeTokenInLS } = useAuth();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      console.log("Response:", response);
      // toast.warning(res_data.error);
      // toast.warning(res_data.message);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Log in successful!");
        setUser({ email: "", password: "" });
        //hard refresh to get the user details
        navigate("/");
        window.location.reload();
      } else {
        toast.warning(error.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Failed to log in.");
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log("Google login successful:", user);
      toast.success("Google login successful!");
      // Redirect or handle after successful login
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Failed to login with Google.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg shadow-indigo-500/50">
        <div className="text-center mb-8">
          <img
            className="mx-auto h-20 w-auto"
            src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register_1948-2986.jpg?w=1380"
            alt="Logo"
          />
          <h2 className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Welcome Back!
          </h2>
          <p className="mt-2 text-gray-300">Please log in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                // required
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  // required
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
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
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-pink-400 hover:text-pink-500"
            >
              Register Here
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
