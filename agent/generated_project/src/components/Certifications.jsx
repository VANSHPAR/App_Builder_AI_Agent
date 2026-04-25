import React from "react";
import { motion } from "framer-motion";

// Sample certifications data – replace with real information as needed
const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon",
    date: "Mar 2023",
    link: "https://www.yourcertlink.com/aws-solutions-architect",
  },
  {
    id: 2,
    title: "Google Cloud Professional Data Engineer",
    issuer: "Google",
    date: "Jan 2024",
    link: "https://www.yourcertlink.com/gcp-data-engineer",
  },
  // Add more certifications as needed
];

const Certifications = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="bg-navy bg-opacity-80 rounded-lg p-4 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-teal-400 hover:text-teal-300"
            >
              <h3 className="text-xl font-semibold mb-1">{cert.title}</h3>
              <p className="text-sm text-gray-400">{cert.issuer} – {cert.date}</p>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
