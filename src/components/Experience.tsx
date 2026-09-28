import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import MilestoneTimeline, { Milestone } from "./MilestoneTimeline";
import ProjectCard from "./ProjectCard";
import {
  ownProjects,
  schoolProjects,
  internshipExperiences,
} from "../data/projects";

const journeyMilestones: Milestone[] = [
  {
    icon: FaMapMarkerAlt,
    label: "2022",
    description: "Go to CamTech University",
  },
  {
    icon: FaMapMarkerAlt,
    label: "2024",
    description: "Short Intern at ISI Group",
  },
  {
    icon: FaMapMarkerAlt,
    label: "July 2025",
    description: "Frontend Intern part-time at Suntel Technology",
  },
  {
    icon: FaMapMarkerAlt,
    label: "January 2026 - Now",
    description: "Junior Frontend Developer at Suntel Technology",
  },
];

const INITIAL_VISIBLE = 6;

const tabs = [
  {
    id: "own",
    label: "Own Project",
    projects: ownProjects,
    emptyText: "No personal projects added yet.",
  },
  {
    id: "internships",
    label: "Company Project",
    projects: internshipExperiences,
    emptyText: "No company projects added yet.",
  },
  {
    id: "projects",
    label: "School Projects",
    projects: schoolProjects,
    emptyText: "No school projects added yet.",
  },
];

const Experience = () => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const expanded = expandedTabs[activeTab.id] ?? false;
  const visibleProjects = expanded
    ? activeTab.projects
    : activeTab.projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = activeTab.projects.length - INITIAL_VISIBLE;

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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-md font-medium transition-colors duration-300 ${
                  activeTab.id === tab.id
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab.projects.length === 0 ? (
          <p className="text-center text-gray-500">{activeTab.emptyText}</p>
        ) : (
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}

        {hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10"
          >
            <button
              onClick={() =>
                setExpandedTabs((prev) => ({
                  ...prev,
                  [activeTab.id]: !expanded,
                }))
              }
              className="btn-primary px-8 py-3 rounded-full font-medium hover:transform hover:scale-105 transition-all duration-300"
            >
              {expanded ? "Show Less" : `Show More (${hiddenCount} more)`}
            </button>
          </motion.div>
        )}

        <div className="mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              My <span className="text-gradient">Journey</span>
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              A quick look at the road that got me here.
            </p>
          </motion.div>
          <MilestoneTimeline milestones={journeyMilestones} startLabel="2021" endLabel="Now" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
