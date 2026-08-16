import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Briefcase, GraduationCap, Code2, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const experiences = [
    {
      role: 'Principal Creative Technologist',
      company: 'Kinetic Labs / Chicago',
      period: '2021 — PRESENT',
      description:
        'Directing architecture and real-time graphics pipelines for luxury automotive and architecture clients. Built custom WebGL frameworks and generative token systems.',
    },
    {
      role: 'Senior Staff Frontend Architect',
      company: 'Vanguard Systems',
      period: '2017 — 2021',
      description:
        'Engineered enterprise design systems, high-concurrency real-time trading interfaces, and sub-16ms interactive canvas visuals.',
    },
    {
      role: 'Design Engineer & Founder',
      company: 'Aetheria Studio',
      period: '2012 — 2017',
      description:
        'Shipped 40+ bespoke web experiences, mobile apps, and brand identities for high-growth tech startups and design agencies.',
    },
  ];

  const skillGroups = [
    { category: 'Creative & 3D', items: ['Three.js', 'GLSL Shaders', 'WebGL', 'GSAP', 'Framer Motion', 'Canvas API'] },
    { category: 'Core Stack', items: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'] },
    { category: 'Architecture', items: ['Design Systems', 'Performance Optimization', 'Micro-Frontends', 'CI/CD'] },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-white transition-all z-20"
            aria-label="Close resume"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stroke mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#89AACC] font-medium block mb-1">
                Curriculum Vitae
              </span>
              <h3 className="text-3xl sm:text-4xl font-display italic text-text-primary">
                Michael Smith
              </h3>
              <p className="text-xs text-muted mt-1">
                Creative Technologist & Fullstack Engineer • Chicago, IL
              </p>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full py-2 px-5 text-xs font-semibold uppercase tracking-wider text-bg bg-text-primary hover:bg-white transition-all self-start sm:self-center shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Contact for PDF</span>
            </a>
          </div>

          {/* Experience Section */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-medium mb-6">
              <Briefcase className="w-4 h-4 text-[#89AACC]" />
              <span>Work Experience</span>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-stroke/70">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#89AACC]" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base font-semibold text-text-primary">
                      {exp.role}
                    </h4>
                    <span className="text-[11px] text-[#89AACC] font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-muted/90 mb-2">{exp.company}</div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-medium mb-4">
              <Code2 className="w-4 h-4 text-[#89AACC]" />
              <span>Core Competencies</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillGroups.map((group) => (
                <div key={group.category} className="p-4 rounded-2xl bg-bg/60 border border-stroke">
                  <h5 className="text-xs font-semibold text-text-primary mb-2.5">
                    {group.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-surface border border-stroke text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Honors */}
          <div className="pt-6 border-t border-stroke/50 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#89AACC]" />
              <span>B.S. in Computer Science & Interactive Media • Univ. of Illinois</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#89AACC]" />
              <span>Awwwards Site of the Day (3x) • FWA of the Day (2x)</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
