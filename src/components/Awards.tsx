import React from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa'

const Awards = () => {
  const awards = [
    {
      title: 'Achieving Grade A for Nation Examination',
      organization: 'GloLink International School',
      year: '2021',
      description: 'Achieved Grade A in the National Examination, demonstrating exceptional academic performance.',
      icon: FaTrophy,
      color: '#FFD700'
    },
    {
      title: 'Engineering Foundation Year at ITC',
      organization: 'Institute of Technology of Cambodia',
      year: '2022',
      description: 'Finished foundation year with a focus on engineering principles.',
      icon: FaMedal,
      color: '#C0C0C0'
    },
    {
      title: 'Techno Tech Innovation',
      organization: 'Khmer Enterprise',
      year: '2023',
      description: 'Participated and win the first round prize',
      icon: FaAward,
      color: '#CD7F32'
    },
    // {
    //   title: 'Dean\'s List Achievement',
    //   organization: 'Royal University of Phnom Penh',
    //   year: '2020-2024',
    //   description: 'Consistently maintained high academic performance for 6 consecutive semesters.',
    //   icon: FaStar,
    //   color: '#4169E1'
    // },
    // {
    //   title: 'Hackathon Champion',
    //   organization: 'Tech Innovation Cambodia',
    //   year: '2022',
    //   description: 'Led a team to victory in a 48-hour hackathon, developing a mobile app for local businesses.',
    //   icon: FaTrophy,
    //   color: '#FFD700'
    // },
    // {
    //   title: 'Best Intern Award',
    //   organization: 'TechCorp Cambodia',
    //   year: '2023',
    //   description: 'Recognized for exceptional performance and contribution during the internship program.',
    //   icon: FaMedal,
    //   color: '#C0C0C0'
    // }
  ]

  return (
    <section id="awards" className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Awards & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Achievements and recognition that highlight my dedication to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card group cursor-pointer"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <award.icon 
                    className="w-8 h-8"
                    style={{ color: award.color }}
                  />
                </div>
                <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  {award.year}
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {award.title}
                </h3>
                <h4 className="text-lg text-primary font-semibold mb-4">
                  {award.organization}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Recognition Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Additional Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Open Source Contributions', value: '5' },
                { label: 'Personal Project', value: '4' },
                { label: 'Train Music students', value: '3' },
                { label: 'Technical Articles', value: '0' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Awards
