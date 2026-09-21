import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaBook,
  FaNpm,
  FaMobileAlt,
  FaGlobe,
  FaCode,
} from "react-icons/fa";
import { ProjectItem, ProjectMediaType, hasDetailPage } from "../data/projects";

const MAX_TECH_TAGS = 4;
const MAX_PHONES = 3;
const COVER_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

const TYPE_META: Record<ProjectMediaType, { label: string; Icon: IconType }> = {
  app: { label: "App", Icon: FaMobileAlt },
  web: { label: "Web", Icon: FaGlobe },
  "open-source": { label: "Open Source", Icon: FaCode },
};

// Full class names so Tailwind can see them. Picked per project (by slug) so
// cards without a preview image don't all look identical.
const COVER_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-sky-500 to-blue-700",
  "from-violet-500 to-blue-600",
  "from-cyan-500 to-blue-600",
  "from-indigo-500 to-purple-600",
];

// Front phone first, then the two peeking out behind it. The cover is
// 1200:630 (the OG image ratio) so link previews aren't cropped.
const PHONE_SLOTS = [
  "left-1/2 top-4 z-20 w-[32%] -translate-x-1/2 group-hover:-translate-y-2",
  "left-[14%] top-8 z-10 w-[27%] -rotate-6",
  "right-[14%] top-8 z-10 w-[27%] rotate-6",
];

const pickGradient = (slug: string) => {
  const hash = Array.from(slug).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
};

const ICON_LINK_CLASS =
  "relative z-30 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-300 hover:border-primary hover:text-primary";

// The CTA's ::after stretches over the whole card, so the entire card is
// clickable while the icon links (z-30) stay independently clickable.
const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-secondary focus-visible:outline-none after:absolute after:inset-0 after:z-20";

const ProjectCover = ({ project }: { project: ProjectItem }) => {
  const { Icon } = TYPE_META[project.mediaType];
  const image = project.coverImage ?? project.docsPreviewImage;
  const phones =
    project.mediaType === "app"
      ? (project.screenshots ?? []).slice(0, MAX_PHONES)
      : [];

  if (image) {
    return (
      <Image
        src={image}
        alt={`${project.title} preview`}
        fill
        sizes={COVER_SIZES}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  if (phones.length > 0) {
    return (
      <>
        {phones.map((src, i) => (
          <div
            key={src}
            className={`absolute aspect-[9/20] overflow-hidden rounded-2xl border-4 border-gray-900 bg-gray-900 shadow-xl transition-transform duration-500 ${PHONE_SLOTS[i]}`}
          >
            <Image
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-14 w-14 text-white/90 transition-transform duration-500 group-hover:scale-110" />
      </div>
    </>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { label: typeLabel, Icon: TypeIcon } = TYPE_META[project.mediaType];
  const detailPage = hasDetailPage(project);
  // Without a detail page there is nowhere else to read the rest, so the
  // card itself carries the full description, tech list and achievements.
  const showFull = !detailPage;
  const technologies = showFull
    ? project.technologies
    : project.technologies.slice(0, MAX_TECH_TAGS);
  const hiddenTechCount = project.technologies.length - technologies.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/40">
        <div
          className={`relative aspect-[1200/630] overflow-hidden bg-gradient-to-br ${pickGradient(
            project.slug
          )}`}
        >
          <ProjectCover project={project} />
          <span className="absolute right-3 top-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
            <TypeIcon className="h-3 w-3 text-primary" />
            {typeLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-500">
              {project.duration}
            </span>
            <h3 className="mt-1 line-clamp-2 text-lg font-bold text-gray-900">
              {project.title}
            </h3>
            {project.company && (
              <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-primary">
                {project.company}
              </p>
            )}

            <p
              className={`mt-3 text-sm text-gray-600 ${
                showFull ? "" : "line-clamp-3"
              }`}
            >
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                >
                  {tech}
                </span>
              ))}
              {hiddenTechCount > 0 && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                  +{hiddenTechCount}
                </span>
              )}
            </div>

            {showFull && project.achievements.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {project.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <svg
                      className="mr-2 mt-1.5 h-3 w-3 flex-shrink-0 text-primary"
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
            )}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
            {detailPage ? (
              <Link href={`/projects/${project.slug}`} className={CTA_CLASS}>
                View Details
                <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : (
              project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CTA_CLASS}
                >
                  Visit Site
                  <FaExternalLinkAlt className="h-3 w-3" />
                </a>
              )
            )}

            <div className="ml-auto flex items-center gap-1.5">
              {project.repositories
                ? project.repositories.map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub: ${repo.label}`}
                      title={`GitHub: ${repo.label}`}
                      className={ICON_LINK_CLASS}
                    >
                      <FaGithub className="h-4 w-4" />
                    </a>
                  ))
                : project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                      className={ICON_LINK_CLASS}
                    >
                      <FaGithub className="h-4 w-4" />
                    </a>
                  )}
              {detailPage && project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  title="Live demo"
                  className={ICON_LINK_CLASS}
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
              )}
              {project.docsLink && (
                <a
                  href={project.docsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Documentation"
                  title="Documentation"
                  className={ICON_LINK_CLASS}
                >
                  <FaBook className="h-4 w-4" />
                </a>
              )}
              {project.npmLink && (
                <a
                  href={project.npmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="npm package"
                  title="npm package"
                  className={ICON_LINK_CLASS}
                >
                  <FaNpm className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default ProjectCard;
