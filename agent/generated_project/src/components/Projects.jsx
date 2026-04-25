import React from "react";
import { motion } from "framer-motion";

// Sample project data – replace with real data as needed
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A brief description of Project One highlighting its purpose and key features.",
    tech: ["React", "Tailwind", "Vite"],
    image: "/src/assets/project1.png",
    demo: "https://example.com/project-one",
    repo: "https://github.com/yourusername/project-one",
  },
  {
    id: 2,
    title: "Project Two",
    description: "A brief description of Project Two showcasing the problem it solves.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/src/assets/project2.png",
    demo: "https://example.com/project-two",
    repo: "https://github.com/yourusername/project-two",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A brief description of Project Three focusing on its technical challenges.",
    tech: ["React", "TypeScript", "Tailwind"],
    image: "/src/assets/project3.png",
    demo: "https://example.com/project-three",
    repo: "https://github.com/yourusername/project-three",
  },
  // Add more projects as needed
];

/**
 * ProjectCard – displays a single project.
 * Props: title, description, tech (array), image, demo, repo
 */
const ProjectCard = ({ title, description, tech, image, demo, repo }) => (
  <motion.div
    className="bg-navy bg-opacity-80 p-6 rounded-lg shadow-soft flex flex-col"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Project Image */}
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="rounded-lg shadow-soft mb-4"
    />
    {/* Title */}
    <h3 className="text-xl font-semibold text-teal-400 mb-2">{title}</h3>
    {/* Description */}
    <p className="text-gray-200 mb-4 flex-grow">{description}</p>
    {/* Tech Badges */}
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t, idx) => (
        <span
          key={idx}
          className="badge bg-teal-600 text-white px-2 py-1 rounded text-xs"
        >
          {t}
        </span>
      ))}
    </div>
    {/* Action Buttons */}
    <div className="mt-auto flex space-x-4">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors"
        >
          Live Demo
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
        >
          Source Code
        </a>
      )}
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            title={proj.title}
            description={proj.description}
            tech={proj.tech}
            image={proj.image}
            demo={proj.demo}
            repo={proj.repo}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
