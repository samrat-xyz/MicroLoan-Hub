
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail, MdAccessTime, MdAccountCircle } from "react-icons/md";
const Navbar = ({ user = null, onLogout = () => {} }) => {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current);
      localStorage.setItem("theme", current);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const navClass = ({ isActive }) =>
    `font-medium relative ${
      isActive
        ? "font-bold after:block after:border-b-2 after:border-primary "
        : ""
    }`;

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
      <li>
        <NavLink to="/login" className={navClass}>
          <MdAccountCircle size={26} className="text-primary" />
        </NavLink>
      </li>

      <li>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="toggle toggle-neutral text-primary"
        />
      </li>
    </>
  );

  return (
    <div className="sticky top-0">
      <div className="w-full bg-gray-100 text-gray-600 text-sm">
        <div className="container mx-auto flex items-center justify-between py-2">
          {/* Left Icons */}
          <div className="flex items-center space-x-4">
            <FaFacebookF className="text-[#0d6efd] cursor-pointer" />
            <FaTwitter className="text-[#1da1f2] cursor-pointer" />
            <FaLinkedinIn className="text-[#0a66c2] cursor-pointer" />
            <FaInstagram className="text-[#E1306C] cursor-pointer" />
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-3 text-gray-700">
            <a href="#" className="hover:text-blue-600">
              Login
            </a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">
              Company News
            </a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">
              FAQs
            </a>
          </div>

          {/* Right Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <MdEmail className="text-blue-500 text-lg" />
              <span>needhelp@company.com</span>
            </div>

            <div className="hidden md:flex items-center space-x-1  ">
              <MdAccessTime className="text-blue-500 text-lg" />
              <span>Mon - Sat 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">MicroLoan-Hub</p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">{links}</ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden btn btn-ghost btn-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <ul className="absolute top-full left-0 w-full bg-base-100 shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50 transition-all duration-300">
            {links}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
