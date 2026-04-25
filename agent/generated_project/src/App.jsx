import React, { createContext, useState } from 'react';

// Import layout components
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// Import section components
import Hero from './Hero.jsx';
import Experience from './Experience.jsx';
import Projects from './Projects.jsx';
import Education from './Education.jsx';
import Skills from './Skills.jsx';
import Certifications from './Certifications.jsx';
//import CodingPlatforms from './CodingPlatforms.jsx';
//import Contact from './Contact.jsx';

// Create a ThemeContext for future dark/light mode toggling
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <section id="hero" className="py-20">
          <Hero />
        </section>
        <section id="experience" className="py-20">
          <Experience />
        </section>
        <section id="projects" className="py-20">
          <Projects />
        </section>
        <section id="education" className="py-20">
          <Education />
        </section>
        <section id="skills" className="py-20">
          <Skills />
        </section>
        <section id="certifications" className="py-20">
          <Certifications />
        </section>
        <section id="coding-platforms" className="py-20">
          <CodingPlatforms />
        </section>
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default App;
