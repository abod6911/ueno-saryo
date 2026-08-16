import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { projectsData } from '../data/projects';
import { ProjectDetailModal } from './ProjectDetailModal';

export const SelectedWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-tight">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" button (hidden on mobile, visible on desktop) */}
          <a
            href="#work"
            className="group relative hidden md:inline-flex items-center rounded-full text-xs uppercase tracking-widest font-medium py-3 px-6 text-text-primary transition-all duration-300 focus:outline-none self-start md:self-end"
          >
            {/* Hover gradient border ring */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-5 py-2.5 group-hover:border-transparent transition-colors duration-200">
              View all work
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>

        {/* Bento Grid: 12 cols, alternating spans: 7 / 5 / 5 / 7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projectsData.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setSelectedProject(project)}
                className={`${project.colSpan} group relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer transition-all duration-500 hover:border-white/20`}
              >
                {/* Image Container with specific Aspect Ratio */}
                <div className={`w-full ${project.aspectRatio} relative overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Halftone Texture Overlay */}
                  <div
                    className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Dark gradient base vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Static Card Info Overlay (bottom) */}
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted/90 mb-1.5 font-medium">
                        {project.category} • {project.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface/80 border border-stroke flex items-center justify-center text-text-primary">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover Backdrop Overlay: bg-bg/70 + backdrop-blur-lg */}
                  <div className="absolute inset-0 bg-bg/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center p-6 text-center">
                    {/* Hover Label Pill with animated gradient border */}
                    <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105 mb-4">
                      {/* Animated gradient border */}
                      <span className="absolute inset-0 accent-gradient animated-gradient-border" />
                      <div className="relative px-6 py-2.5 rounded-full bg-surface text-text-primary text-sm font-medium flex items-center gap-2">
                        <span>View —</span>
                        <span className="font-display italic text-base font-normal">
                          {project.title}
                        </span>
                        <ArrowUpRight className="w-4 h-4 ml-0.5 text-[#89AACC]" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted max-w-xs line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
