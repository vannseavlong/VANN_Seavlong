import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Software Engineering',
      school: 'Cambodia University of Technology and Science',
      period: '2022 - Present',
      description: 'Focused on Full Stack Development, Software Development, and Web Technologies.',
      achievements: [
        'Year 1: GPA 3.5/4.0',
        'Year 2: GPA 3.0/4.0',
        'Year 3: In progress'
      ],
      image: '/images/camtech.webp'
    },
    {
      degree: 'Foundation Year at ITC',
      school: 'Institute of Technology of Cambodia',
      period: '2021 - 2022',
      description: 'Start with a general knowledge related to Engineering and Construction.',
      achievements: [
        'Received a Civil Engineering Major at ITC for next year',
        'Foundation Certificate in Engineering',
        'GPA: 2.5/4.0'
      ],
      image: '/images/ITC.webp'
    },
    {
      degree: 'High School',
      school: 'GloLink International School',
      period: '2018 - 2021',
      description: 'Completed high school with a focus on Science and Mathematics.',
      achievements: [
        'National Exam: Grade A',
        'Mathematics: Grade A',
        'Physics/Chemistry: Grade A'
      ],
      image: '/images/GIS.webp'
    }
  ]

  return (
    <section id="education" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My academic journey and the foundation that shaped my technical expertise
          </p>
        </motion.div>

        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Education Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl"
                >
                  <Image
                    src={edu.image}
                    alt={`${edu.school} Campus`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Education Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="card">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-2">
                      {edu.period}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xl text-primary font-semibold mb-4">
                      {edu.school}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {edu.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 text-primary mr-3 flex-shrink-0"
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
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
