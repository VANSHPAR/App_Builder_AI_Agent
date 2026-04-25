import React from "react";
import { motion } from "framer-motion";

// Sample education data – replace with real information as needed
const education = [
  {
    id: 1,
    institution: "University X",
    degree: "B.Sc. Computer Science",
    period: "2016‑2020",
    details: "Graduated with honors, focusing on algorithms, data structures, and software engineering principles.",
  },
  {
    id: 2,
    institution: "University Y",
    degree: "M.Sc. Software Engineering",
    period: "2021‑2023",
    details: "Specialized in distributed systems and cloud-native application development. Thesis on micro‑service orchestration.",
  },
  // Add more entries as needed
];

const Education = () => {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          className="bg-navy bg-opacity-80 rounded-lg p-6 shadow-soft mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h3 className="text-xl font-semibold text-teal-400">
            {edu.degree} – {edu.institution}
          </h3>
          <p className="text-sm text-gray-400 mb-2">{edu.period}</p>
          <p className="text-gray-200">{edu.details}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Education;
