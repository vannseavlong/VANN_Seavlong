import { motion } from "framer-motion";
import Image from "next/image";

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
            Get to know more about who I am, what I do, and what I'm passionate
            about
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
                src="/images/about.webp"
                alt="VANN Seavlong Professional Photo"
                fill
                sizes="(max-width: 640px) 320px, 384px"
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
                I'm a frontend developer with over 1 year of experience,
                working mainly with React and Next.js to build clean and
                user-friendly websites. I'm also new to mobile development
                and currently learning Flutter to expand my skill set. On
                the backend side, I now have a better understanding of
                building APIs and have hands-on experience with Express.js.
              </p>

              <p>
                I enjoy building websites and portals along with the backend
                systems that manage their content, as it helps me understand
                both sides of a product more deeply. On the frontend, I've
                worked on performance optimization (such as using WebP
                images), event and traffic tracking with GA4 and Firebase
                Analytics, responsive design, and SEO best practices. I'm
                also familiar with security best practices like the OWASP
                Top 10 and how to apply them in real projects. On the
                backend, I'm more comfortable with Node.js and use
                Express.js to build and manage server-side logic. Beyond
                client work, I also contribute to open source by building
                and publishing npm packages, which I'll cover in more
                detail in the Experience section below.
              </p>

              <p>
                Outside of coding, I like to unwind with guitar, drums, or
                piano, and occasionally jump into a round of Mobile Legends
                with friends. Fun fact: I once used Google Sheets as the
                database for my own budget-tracking app, and that experience
                led me to build{" "}
                <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  longcelot-sheet-db
                </code>
                , an npm package that makes it easier to use Google Sheets as
                a staging table in future projects.
              </p>

              <p>
                There’s still a lot of things I don’t know, but I will keep
                going. As a Software Engineering student, I am passionate about
                integrating new technologies into key sectors in my country. My
                goal is to join a software company where I can grow
                professionally, gain knowledge in other fields, and give back
                to the community. Feel free to scroll through, check out my
                work, and reach out if anything sparks your interest.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-2xl font-bold text-primary">12</h4>
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
  );
};

export default About;
