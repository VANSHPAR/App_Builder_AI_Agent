import React, { useState, useEffect } from "react";

// Simple smooth scroll helper – avoids adding an extra dependency on react‑scroll
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when the window is resized to a medium (or larger) breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { name: "Home", id: "hero" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-navy bg-opacity-90 backdrop-blur-sm z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <div className="flex-shrink-0 text-white text-xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}>MyPortfolio</div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-gray-200 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            className="text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle navigation menu"
          >
            {/* Icon – simple three‑bars */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu – slide down */}
      {menuOpen && (
        <div className="md:hidden bg-navy bg-opacity-90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
