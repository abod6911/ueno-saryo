import React, { useEffect, useRef, useState } from 'react';
import { Hexagon, ChevronRight } from 'lucide-react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";
const MITHA_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85";

/* ==========================================================================
   ULTRA-SMOOTH HARDWARE-ACCELERATED SCROLL VIDEO
   ========================================================================== */
function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isTicking = false;

    const handleLoadedMetadata = () => {
      setVideoReady(true);
      video.currentTime = 0.001;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const updateVideoTime = () => {
      if (!video.duration || isNaN(video.duration)) {
        isTicking = false;
        return;
      }

      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const targetTime = Math.min(progress * (video.duration - 0.05), video.duration - 0.05);

      const v = video as any;
      if (Math.abs(v.currentTime - targetTime) > 0.04) {
        if (typeof v.fastSeek === 'function') {
          v.fastSeek(targetTime);
        } else {
          v.currentTime = targetTime;
        }
      }

      isTicking = false;
    };

    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateVideoTime);
        isTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none transform-gpu">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu transition-opacity duration-700 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-600 ease-out will-change-transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const navLinks = [
    { name: 'Projects', sup: '6', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Real-time vision',
      body: 'Reads context as it happens and surfaces what matters before you ask.'
    },
    {
      id: '02',
      title: 'Layered insight',
      body: 'Moves from rough outline to sharp output without losing the thread.'
    },
    {
      id: '03',
      title: 'Adaptive speed',
      body: 'Learns your cadence and tightens every pass as you work.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 font-sans">
      <ScrollVideoBackground />

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-black/30 backdrop-blur-md">
          <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 py-4">
            <Reveal delay={0}>
              <a href="#" className="flex items-center gap-2.5">
                <Hexagon size={24} strokeWidth={1.5} className="text-white" />
                <span className="text-lg sm:text-xl font-medium tracking-tight lowercase">
                  novaai
                </span>
              </a>
            </Reveal>

            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link, idx) => (
                <Reveal key={link.name} delay={100 + idx * 100}>
                  <a
                    href={link.href}
                    className="text-sm text-white/85 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                    {link.sup && (
                      <sup className="font-mono text-[10px] text-white/60">
                        {link.sup}
                      </sup>
                    )}
                  </a>
                </Reveal>
              ))}
            </nav>

            <Reveal delay={500}>
              <a
                href="#consultation"
                className="rounded-md border border-white/20 bg-white/15 backdrop-blur-md px-4 py-2 text-xs sm:px-5 sm:text-sm text-white font-medium hover:bg-white/25 transition-colors whitespace-nowrap"
              >
                Get Free Consultation
              </a>
            </Reveal>
          </div>
        </header>

        <main className="w-full">
          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between gap-8 pt-4">
              <div className="flex flex-col gap-2">
                <Reveal delay={150}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                    / AI AUTOMATION
                  </p>
                </Reveal>
                <Reveal delay={270}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                    / AI INTEGRATION
                  </p>
                </Reveal>
                <Reveal delay={390}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                    / AI AGENT DEVELOPMENT
                  </p>
                </Reveal>
              </div>

              <Reveal delay={300} className="max-w-xs sm:text-right">
                <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md">
                  We design automation that brings clarity, precision, and efficiency to the way your company operates.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-12">
              <div className="max-w-2xl">
                <Reveal delay={150}>
                  <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-5 inline-block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                      We Automate 100+ Businesses
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={280}>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                    Clear. Precise.
                    <br />
                    Automated.
                  </h1>
                </Reveal>
              </div>

              <Reveal delay={420} className="w-full md:w-auto">
                <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/15 max-w-sm">
                  <img
                    src={MITHA_IMAGE}
                    alt="Mitha, co-founder of NovaAI"
                    className="h-24 w-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 pr-2 min-w-0">
                    <span className="text-sm font-medium text-white">
                      Talk with Mitha
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                      Co-founder of NovaAI
                    </span>
                    <a
                      href="#call"
                      className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 mt-1.5 flex items-center gap-1 transition-colors self-start whitespace-nowrap"
                    >
                      <span>Book 15-mins call</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <div className="h-[80vh]" aria-hidden="true" />

          <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between gap-8 pt-4">
              <Reveal delay={120}>
                <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                    Insight On Demand
                  </span>
                </div>
              </Reveal>

              <Reveal delay={220} className="max-w-sm sm:text-right">
                <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md">
                  Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
                </p>
              </Reveal>
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 md:gap-16 mt-12">
              <div className="max-w-xl">
                <Reveal delay={180}>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                    Learn to see
                    <br />
                    brilliantly.
                  </h2>
                </Reveal>

                <Reveal delay={320}>
                  <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed">
                    From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.
                  </p>
                </Reveal>

                <Reveal delay={420}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="#demo"
                      className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <span>Run the demo</span>
                      <ChevronRight size={14} />
                    </a>
                    <a
                      href="#consultation"
                      className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      Free consultation
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6">
                {capabilities.map((cap, idx) => (
                  <Reveal key={cap.id} delay={300 + idx * 110}>
                    <div
                      className={`flex gap-5 py-5 group cursor-pointer ${
                        idx !== capabilities.length - 1 ? 'border-b border-white/15' : ''
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 shrink-0 pt-0.5">
                        {cap.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-white transition-colors">
                            {cap.title}
                          </h3>
                          <ChevronRight
                            size={16}
                            className="text-white/40 group-hover:translate-x-0.5 group-hover:text-white transition-all"
                          />
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                          {cap.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
