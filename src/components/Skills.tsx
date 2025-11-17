import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiPostman,
  SiVisualstudiocode,
  SiBootstrap,
  SiFigma,
  SiOpenai,
  SiShadow,
  SiFirebase,
  SiGoogleanalytics,
  SiDocker,
  SiDigitalocean,
  SiFastapi,
  SiPython,
  SiGooglecloud,
} from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Shadcn UI", icon: SiShadow, color: "#000000" },
      ],
    },
    {
      title: "Backend Technologies",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#000000" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Database Design", icon: FaDatabase, color: "#336791" },
        { name: "FastAPI", icon: SiFastapi, color: "#009688" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "#F05032" },
        { name: "GitHub", icon: FaGithub, color: "#181717" },
        { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "OpenAI", icon: SiOpenai, color: "#000000" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Google Analytics", icon: SiGoogleanalytics, color: "#FFCA28" },
        // { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        // { name: 'DigitalOcean', icon: SiDigitalocean, color: '#007596' }
        { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      ],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <skill.icon
                      className="w-12 h-12 mb-3"
                      style={{ color: skill.color }}
                    />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What I Bring to the Table
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Problem Solving",
                description:
                  "Breaking down complex problems into manageable solutions",
              },
              {
                title: "Team Work",
                description:
                  "Collaborating effectively with cross-functional teams",
              },
              {
                title: "Continuous Learning",
                description: "Staying updated with the latest technologies",
              },
              {
                title: "Logical Flow Structure",
                description:
                  "Understanding and implementing logical flow in code",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
