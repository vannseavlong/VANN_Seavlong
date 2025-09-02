import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what I'm passionate about
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-80 h-96 sm:w-96 sm:h-[28rem] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/professionalImg.jpg"
                alt="VANN Seavlong Professional Photo"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Hello! I'm VANN Seavlong
            </h3>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hello! I'm a third-year CamTech University student studying software engineering. I'm currently delving deeply into frontend skill. I focus on React vite using plugin UI component and Tailwind CSS plus API integration. I'm also exploring backend development, investigating full-stack workflows, and learning how to turn ideas into functional, clean, and user-friendly websites.
              </p>
              
              <p>
                I enjoy exploring and  building website because it can help me to enhance my fundamental skill related to both frontend and backend. Recently, I've been working on a project using React.js as a frontend and Node.js + Express.js as backend with Postman API following by mysql database with sequelize.
              </p>
              
              <p>
                There’s still a lot of things I don’t know, but I will keep going. 
                As a Software Engineering student, I am passionate about integrating new technologies into key sectors in my country. My goal is to work in a software company where I can grow professionally while gaining knowledge in other fields.
                Feel free to scroll through, check out my work, and reach out if anything sparks your interest.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-2xl font-bold text-primary">10+</h4>
                <p className="text-gray-600">School Projects Completed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-2xl font-bold text-primary">20+</h4>
                <p className="text-gray-600">Technologies Used</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
