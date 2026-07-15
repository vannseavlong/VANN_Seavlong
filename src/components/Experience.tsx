import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import MilestoneTimeline, { Milestone } from "./MilestoneTimeline";
import {
  ProjectItem,
  ownProjects,
  schoolProjects,
  internshipExperiences,
  hasDetailPage,
} from "../data/projects";

const journeyMilestones: Milestone[] = [
  {
    icon: FaMapMarkerAlt,
    label: "2022",
    description: "Go to CamTech University",
    indicator: "walk",
  },
  {
    icon: FaMapMarkerAlt,
    label: "2024",
    description: "Short Intern at ISI Group",
    indicator: "motor",
  },
  {
    icon: FaMapMarkerAlt,
    label: "July 2025",
    description: "Frontend Intern part-time at Suntel Technology",
    indicator: "car",
  },
  {
    icon: FaMapMarkerAlt,
    label: "January 2026 - Now",
    description: "Junior Frontend Developer at Suntel Technology",
    indicator: "plane",
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState("own");
  const [showAllOwn, setShowAllOwn] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllInternships, setShowAllInternships] = useState(false);

  const renderProjectCard = (project: ProjectItem, index: number) => (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="experience-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {project.title}
          </h3>
          {project.company && (
            <h4 className="text-lg text-primary font-semibold mb-2">
              {project.company}
            </h4>
          )}
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {project.duration}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-900 mb-2">
          Technologies:
        </h5>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-900 mb-2">
          Key Achievements:
        </h5>
        <ul className="space-y-1">
          {project.achievements.map(
            (achievement: string, achievementIndex: number) => (
              <li
                key={achievementIndex}
                className="text-sm text-gray-600 flex items-start"
              >
                <svg
                  className="w-3 h-3 text-primary mr-2 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {achievement}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {project.repositories
          ? project.repositories.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                {repo.label}
              </a>
            ))
          : project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
          >
            <FaExternalLinkAlt className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
        {hasDetailPage(project) && (
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-300 ml-auto"
          >
            View Details
            <FaArrowRight className="w-3 h-3 ml-2" />
          </Link>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my projects and professional experiences
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex gap-1 max-w-full overflow-x-auto no-scrollbar bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("own")}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-md font-medium transition-colors duration-300 ${
                activeTab === "own"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Own Project
            </button>
            <button
              onClick={() => setActiveTab("internships")}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-md font-medium transition-colors duration-300 ${
                activeTab === "internships"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Company Project
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-md font-medium transition-colors duration-300 ${
                activeTab === "projects"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              School Projects
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "own" && (
            <>
              {ownProjects.length === 0 && (
                <p className="text-center text-gray-500">
                  No personal projects added yet.
                </p>
              )}
              {(showAllOwn ? ownProjects : ownProjects.slice(0, 3)).map(
                (project, index) => renderProjectCard(project, index)
              )}
              {ownProjects.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={() => setShowAllOwn(!showAllOwn)}
                    className="btn-primary px-8 py-3 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {showAllOwn
                      ? "Show Less"
                      : `Show More (${ownProjects.length - 3} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
          {activeTab === "projects" && (
            <>
              {(showAllProjects
                ? schoolProjects
                : schoolProjects.slice(0, 3)
              ).map((project, index) => renderProjectCard(project, index))}
              {schoolProjects.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="btn-primary px-8 py-3 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {showAllProjects
                      ? "Show Less"
                      : `Show More (${schoolProjects.length - 3} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
          {activeTab === "internships" && (
            <>
              {(showAllInternships
                ? internshipExperiences
                : internshipExperiences.slice(0, 3)
              ).map((experience, index) =>
                renderProjectCard(experience, index)
              )}
              {internshipExperiences.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={() => setShowAllInternships(!showAllInternships)}
                    className="btn-primary px-8 py-3 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {showAllInternships
                      ? "Show Less"
                      : `Show More (${internshipExperiences.length - 3} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>

        <div className="mt-16 sm:mt-24">
          <MilestoneTimeline milestones={journeyMilestones} startLabel="2021" endLabel="Now" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
