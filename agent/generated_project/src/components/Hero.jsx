import React from "react";
import { motion } from "framer-motion";

// Re‑use the same smooth‑scroll helper as in Navbar for consistency
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Personal data – adjust as needed
const name = "Your Name";
const role = "Full‑Stack Developer";
const tagline = "Building performant, beautiful web experiences.";

const Hero = () => {
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-screen bg-navy text-white">
      {/* Profile Image */}
      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-40 h-40 rounded-full mb-6 object-cover"
        loading="lazy"
      />

      {/* Animated Name */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {name}
      </motion.h1>

      {/* Role & Tagline */}
      <motion.p
        className="text-xl md:text-2xl text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {role}
      </motion.p>
      <motion.p
        className="text-lg md:text-xl text-gray-400 mb-12 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {tagline}
      </motion.p>

      {/* Call‑to‑Action Buttons */}
      <div className="flex space-x-4">
        <a
          href="/resume.pdf"
          download
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors"
        >
          Download Resume
        </a>
        <button
          onClick={() => scrollToSection("contact")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
        >
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default Hero;
