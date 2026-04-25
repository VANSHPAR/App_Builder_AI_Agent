import React from "react";
import { FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJs, FaPython, FaDocker } from "react-icons/fa";

// Define skill categories with icons
const skills = {
  Frontend: [
    { name: "React", icon: <FaReact /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "JavaScript", icon: <FaJs /> },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Python", icon: <FaPython /> },
  ],
  Tools: [
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Docker", icon: <FaDocker /> },
  ],
};

const Skills = () => {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills</h2>
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {skillList.map((skill, idx) => (
              <span
                key={idx}
                className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-1 rounded hover:bg-teal-600 transition-colors"
              >
                <span className="text-lg">{skill.icon}</span>
                <span>{skill.name}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
