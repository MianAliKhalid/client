import React from "react";
import { NavLink } from "react-router-dom";
import { FaAddressBook, FaServicestack, FaUser, FaSignOutAlt, FaFileAlt, FaCheck, FaClock } from "react-icons/fa";
import adminNavData from "../../../json/adminNav.json";

const iconMap = {
  FaAddressBook: <FaAddressBook />,
  FaServicestack: <FaServicestack />,
  FaFileAlt: <FaFileAlt />,
  FaUser: <FaUser />,
  FaSignOutAlt: <FaSignOutAlt />,
  FaCheck: <FaCheck />,
  FaClock: <FaClock />,
};

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 h-screen w-64 flex flex-col">
      {/* Branding Section */}
      <div className="flex items-center justify-center bg-gray-800 h-16 border-b border-gray-700">
        <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
      </div>
      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto">
        {adminNavData.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.to}
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              activeClassName="bg-gray-700 text-white"
            >
              {iconMap[item.icon]}
              <span className="ml-3">{item.title}</span>
            </NavLink>
            {item.subItems && (
              <div className="ml-6">
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.to}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    activeClassName="bg-gray-700 text-white"
                  >
                    {iconMap[subItem.icon]}
                    <span className="ml-3">{subItem.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;