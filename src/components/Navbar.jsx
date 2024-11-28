import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isLoggedIn, LogoutUser, user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    LogoutUser();
    toggleMenu();
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const avatarImage =  user.avatar 
  return (
    <nav className=" sticky  w-full z-30 bg-gradient-to-r from-black via-black to-black backdrop-blur-xl shadow-xl border-b border-indigo-300/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white hover:scale-105 transition duration-300 ease-in-out">
          <Link to="/">{user.username}</Link>
          
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
            >
              {item}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/upload"
                className="text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
              >
                Upload Files
              </Link>

              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out focus:outline-none"
                >
                  <img
                    src={avatarImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  {/* {user.username} */}
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleProfileMenu}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/security"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleProfileMenu}
                    >
                      Security
                    </Link>
                    <Link
                      to="/files"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleProfileMenu}
                    >
                      My Files
                    </Link>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleProfileMenu}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
              {/* <Link
                to="/logout"
                className="text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </Link> */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to="/security"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Security
              </Link>
              <Link
                to="/my-files"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                My Files
              </Link>
              <Link
                to="/logout"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-200 text-lg font-medium px-3 py-2 rounded-md hover:bg-indigo-500/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/30 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
