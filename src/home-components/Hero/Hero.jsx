import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[550px] md:h-[650px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/d00Jtngg/main-slider-1-2.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
          {/* Left: Text */}
          <motion.div
            className="flex-1 text-white max-w-lg md:max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm md:text-base mb-2 font-medium">
              Welcome to MicroLoan-Hub
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
              Connecting Your <br /> Loan Needs
            </h1>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/apply-loan")}
                className="btn btn-primary btn-lg"
              >
                Apply for Loan
              </button>
              <button
                onClick={() => navigate("/all-loans")}
                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary"
              >
                Explore Loans
              </button>
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}

export default Hero;
