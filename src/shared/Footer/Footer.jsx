import React from "react";
import { NavLink } from "react-router";
import { Facebook, Twitter, Linkedin, Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 pt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">

       
        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            MicroLoan-Hub
          </h2>
          <p className="text-base-content/70 mb-4">
            Smart & secure microloan request and approval tracking platform.
            Fast, reliable and fully online.
          </p>
          <div className="flex gap-3">
            <a href="#" className="btn btn-sm btn-circle btn-primary">
              <Facebook size={16} />
            </a>
            <a href="#" className="btn btn-sm btn-circle btn-outline">
              <Twitter size={16} />
            </a>
            <a href="#" className="btn btn-sm btn-circle btn-outline">
              <Linkedin size={16} />
            </a>
            <a href="#" className="btn btn-sm btn-circle btn-outline">
              <Github size={16} />
            </a>
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-primary transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-loans" className="hover:text-primary transition">
                Browse Loans
              </NavLink>
            </li>
            <li>
              <NavLink to="/apply-loan" className="hover:text-primary transition">
                Apply Loan
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary transition">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/contact" className="hover:text-primary transition">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:text-primary transition">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-primary transition">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-base-content/70">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@microloanhub.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234-567890
            </li>
            <li>
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
          <p>
            © {new Date().getFullYear()} MicroLoan-Hub. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <span className="text-primary font-semibold">Samrat</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
