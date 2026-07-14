import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaMobileAlt,
} from "react-icons/fa";
import { allProjects, ProjectItem } from "../../data/projects";

interface ProjectPageProps {
  project: ProjectItem;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{project.title} - VANN Seavlong</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container section-padding">
          <Link
            href="/#experience"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 mb-8"
          >
            <FaArrowLeft className="w-3 h-3 mr-2" />
            Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                {project.company && (
                  <h2 className="text-lg text-primary font-semibold">
                    {project.company}
                  </h2>
                )}
              </div>
              <span className="text-sm text-gray-500 font-medium mt-2 sm:mt-0">
                {project.duration}
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-8">{project.description}</p>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Key Achievements
              </h3>
              <ul className="space-y-2">
                {project.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="text-gray-600 flex items-start"
                  >
                    <svg
                      className="w-3 h-3 text-primary mr-2 mt-1.5 flex-shrink-0"
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
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
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
                  className="btn-primary px-6 py-2 rounded-full font-medium inline-flex items-center hover:transform hover:scale-105 transition-all duration-300"
                >
                  <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                  Visit Live Site
                </a>
              )}
            </div>

            {project.mediaType === "app" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Screenshots
                </h3>
                {project.screenshots && project.screenshots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.screenshots.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-[9/16] rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-xl border border-dashed border-gray-300 text-gray-500">
                    <FaMobileAlt className="w-8 h-8 mb-3 text-gray-400" />
                    Screenshots coming soon.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allProjects.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};
