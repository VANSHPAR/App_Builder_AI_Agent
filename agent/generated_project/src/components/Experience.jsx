import React from "react";
import { motion } from "framer-motion";

// Sample experiences – replace with real data as needed
const experiences = [
  {
    id: 1,
    company: "Company A",
    role: "Frontend Engineer",
    period: "2020‑2022",
    description: "Developed responsive UI components using React and Tailwind CSS, improving page load speed by 30%.",
  },
  {
    id: 2,
    company: "Company B",
    role: "Full‑Stack Developer",
    period: "2022‑2023",
    description: "Built end‑to‑end features with Node.js, Express, and PostgreSQL, handling over 10k daily active users.",
  },
  {
    id: 3,
    company: "Company C",
    role: "Software Engineer Intern",
    period: "Summer 2019",
    description: "Assisted in migrating legacy codebase to modern React architecture and wrote unit tests.",
  },
];

const Experience = () => {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Work Experience</h2>
      {/* Container with vertical line */}
      <div className="relative ml-4">
        {/* The vertical line */}
        <div className="absolute left-0 top-0 h-full border-l-2 border-teal-500" />
        {/* Experience cards */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative mb-12 ml-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="rounded-lg bg-navy bg-opacity-80 p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-teal-400">{exp.role} @ {exp.company}</h3>
              <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
              <p className="text-gray-200">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
