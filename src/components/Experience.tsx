import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Experience = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllInternships, setShowAllInternships] = useState(false)

  const schoolProjects = [
    {
      title: 'Air Quality Monitoring System',
      duration: 'June 2025 - August 2025',
      description: 'Learn to create an air quality monitoring system using Flutter, FastAPI, connected to Open-meteo live sensor data.',
      technologies: ['Flutter', 'FastAPI', 'open-meteo', 'XGBOOST model selection'],
      githubLink: 'https://github.com/LONGCELOT/Air_Quality_Prediction/',
      achievements: [
        'Integrate everything together',
        'Prediction accuracy improvement',
        'Members: Bin Sodina, Nhek ChanPanha, Hong Pimolsaknan, VANN Seavlong (Me)'
      ]
    },
    {
      title: 'Quiz App',
      duration: 'June 2025 - August 2025',
      description: 'Learn to create a quiz app using Flutter and provided API integration',
      technologies: ['Flutter', 'API integration'],
      githubLink: 'https://github.com/LONGCELOT/quizApp/',
      achievements: [
        'Integrate everything together',
        'Prediction accuracy improvement',
        'Members: Bin Sodina, Nhek ChanPanha, Hong Pimolsaknan, VANN Seavlong (Me)'
      ]
    },
    {
      title: 'Movie Booking Ticket System',
      duration: 'January 2025 - May 2025',
      description: 'Learn to create a movie booking ticket system using React vite, express, connected to a share database server on Heidy SQL.',
      technologies: ['React.js', 'Express.js', 'MySQL','Heidy SQL'],
      achievements: [
        'Learn MySQL queries',
        'OOP Concepts unlock',
        'Members: Bin Sodina, Nhek ChanPanha, VANN Seavlong (Me)'
      ]
    },
    {
      title: 'Academic Record System Database + Figma UI',
      duration: 'July 2024 - August 2024',
      description: 'Learn to design a database schema with relationship, ER-Diagram and create a user-friendly UX/UI interface for managing academic records.',
      technologies: ['MySQL', 'Figma', 'Mamp server Php my admin'],
      achievements: [
        'Learn MySQL queries',
        'OOP Concepts unlock',
        'Members: Bin Sodina, Nhek ChanPanha, Hong PimolSaknan, VANN Seavlong (Me)'
      ]
    },
    {
      title: 'Rice Quality Detection System',
      duration: 'July 2024 - August 2024',
      description: 'Created own dataset and trained a model to detect the quality of rice. This project allowed me to understand the basics of machine learning and image classification. Yet this project is not fully completed due to time limitations.',
      technologies: ['Python', 'Roboflow', 'TensorFlow'],
      githubLink: 'https://github.com/LONGCELOT/Rice-Qualification-Detection.git',
      achievements: [
        'Python',
        'Roboflow',
        'Members: Bin Sodina, Nhek ChanPanha, Hong PimolSaknan, Mona Ameliazzaman, VANN Seavlong (Me)'
      ]
    },
    {
      title: 'BAW Project at Khmer Enterprise (KE)',
      duration: 'June 2023 - July 2023',
      description: 'Developed a sample website for the BAW project at Khmer Enterprise, related to Digital Education platform which allow student to access the video solution to each exercise from text book base with QR code.',
      technologies: ['html', 'css', 'javascript'],
      githubLink: 'https://github.com/LONGCELOT/My-Final-BAW.git',
      liveLink: 'https://longcelot.github.io/My-Final-BAW/',
      achievements: [
        'Won a first round award in top 8',
        'Team Collaboration with 5 members',
        'Certified by Khmer Enterprise'
      ]
    },
    {
      title: 'Flappy Bird Game Clone',
      duration: 'April 2023 - June 2023',
      description: 'Learn how to build a Flappy Bird game clone using Python and Pygame. This project allow me to understand some basic game development using Pygame.',
      technologies: ['Pythong', 'Pygame'],
      githubLink: 'https://github.com/LONGCELOT/FlappyBird.git',
      achievements: [
        'Implemented a good graphics and sound effects from open-source resources',
        'The game display the score live and has a game over screen',
        'Members: VANN Seavlong (Me), Chea LivChea'
      ]
    }
  ]

  const internshipExperiences = [
    {
      title: 'bEasy: Cleaning & Pest Landing Page',
      company: 'Suntel technology Cambodia',
      duration: 'Present',
      description: 'A landing page for bEasy, a cleaning and pest control service company in Cambodia. The website is built using React.js, JavaScript, and CSS, and is designed to be responsive and user-friendly.',
      technologies: ['React', 'JavaScript', 'CSS', 'Firebase'],
      liveLink: 'https://beasy.info/en',
      achievements: [
        'Implemented responsive design for mobile and desktop',
        'Integrated Firebase for user performanc and event tracking',
        'Work as a Frontend Intern contributing to the development of the landing page'
      ]
    },
    {
      title: 'ISI Intern in Marketing Department',
      company: 'ISI Group: Innovation, Striving, Integrity, and Growing together (ISIG)',
      duration: 'January 2024',
      description: 'Assisted in the categories the POSM materials, and develop a digital catalog for ISI products',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://catalogue.isisteel.com.kh/',
      achievements: [
        'New Experience as first time internship experience',
      ]
    }
  ]

  const renderProjectCard = (project: any, index: number) => (
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

      <p className="text-gray-600 mb-4">
        {project.description}
      </p>

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-900 mb-2">Technologies:</h5>
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
        <h5 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h5>
        <ul className="space-y-1">
          {project.achievements.map((achievement: string, achievementIndex: number) => (
            <li key={achievementIndex} className="text-sm text-gray-600 flex items-start">
              <svg className="w-3 h-3 text-primary mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {(project.githubLink || project.liveLink) && (
        <div className="flex gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
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
              className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
            >
              <FaExternalLinkAlt className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  )

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
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
                activeTab === 'projects'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              School Projects
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
                activeTab === 'internships'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Internships
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'projects' && (
            <>
              {(showAllProjects ? schoolProjects : schoolProjects.slice(0, 3)).map((project, index) => 
                renderProjectCard(project, index)
              )}
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
                    {showAllProjects ? 'Show Less' : `Show More (${schoolProjects.length - 3} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
          {activeTab === 'internships' && (
            <>
              {(showAllInternships ? internshipExperiences : internshipExperiences.slice(0, 3)).map((experience, index) => 
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
                    {showAllInternships ? 'Show Less' : `Show More (${internshipExperiences.length - 3} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience
