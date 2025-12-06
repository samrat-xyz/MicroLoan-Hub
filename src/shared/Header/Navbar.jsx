import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Active Link Class
  const navClass = ({ isActive }) =>
    `font-medium relative transition ${
      isActive ? "text-primary font-bold after:border-primary" : ""
    }`;

  // Nav Links
  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-loans" className={navClass}>
          All Loans
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={navClass}>
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navClass}>
          Contact
        </NavLink>
      </li>

      {/* User Section */}
      <li>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="user" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow w-52 mt-3"
            >
              <li>
                <Link>Dashboard</Link>
              </li>
              <li>
                <Link onClick={logoutUser}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
        )}
      </li>

      <li>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="toggle toggle-neutral"
        />
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="w-full bg-gray-100 text-gray-600 text-sm">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          {/* Social */}
          <div className="flex items-center space-x-4">
            <FaFacebookF className="text-[#0d6efd] cursor-pointer" />
            <FaTwitter className="text-[#1da1f2] cursor-pointer" />
            <FaLinkedinIn className="text-[#0a66c2] cursor-pointer" />
            <FaInstagram className="text-[#E1306C] cursor-pointer" />
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <NavLink to="/login" className="hover:text-blue-600">
              Login
            </NavLink>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">
              Company News
            </a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">
              FAQs
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <MdEmail className="text-blue-500 text-lg" />
              <span>needhelp@company.com</span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <MdAccessTime className="text-primary text-lg" />
              <span>Mon - Sat 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-5 px-4">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-extrabold text-primary">MicroLoan-Hub</p>

          <ul className="hidden md:flex items-center gap-8">{links}</ul>

          <button
            className="btn btn-ghost md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div
          className={`md:hidden bg-base-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 mt-3 py-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
