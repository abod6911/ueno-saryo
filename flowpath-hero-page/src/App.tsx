import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4";

interface NavDropdownItem {
  title: string;
  items: string[];
}

const NAV_DROPDOWNS: NavDropdownItem[] = [
  {
    title: 'Product',
    items: ['Connections', 'Workflows', 'Insights']
  },
  {
    title: 'Solutions',
    items: ['Guides', 'Use cases', 'API reference']
  },
  {
    title: 'About',
    items: ['Our story', 'Open roles', 'Reach us']
  }
];

export default function App() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
      />

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Navigation (top, not fixed/sticky) */}
      <header className="relative z-20 w-full px-5 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          {/* Inline SVG diamond shape with two overlapping paths at 0.9 and 0.5 opacity */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="shrink-0 transition-transform group-hover:scale-105"
          >
            <path d="M12 2L22 12L12 22L2 12Z" fill="white" fillOpacity="0.9" />
            <path d="M16 6L26 16L16 26L6 16Z" fill="white" fillOpacity="0.5" />
          </svg>
          <span className="text-white text-lg sm:text-xl font-medium tracking-tight">
            flowpath
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {NAV_DROPDOWNS.map((dropdown) => {
            const isOpen = activeDropdown === dropdown.title;
            return (
              <div
                key={dropdown.title}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(dropdown.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{dropdown.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="!absolute top-full left-0 liquid-glass rounded-xl py-3 px-2 min-w-[160px] shadow-xl animate-dropdown z-30">
                    {dropdown.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-white/80 hover:text-white text-sm rounded-lg hover:bg-white/5 block px-3 py-2 transition-colors whitespace-nowrap"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="#"
            className="text-white/90 hover:text-white text-sm font-medium transition-colors"
          >
            Plans
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#"
            className="text-white/90 hover:text-white text-sm font-medium transition-colors"
          >
            Log in
          </a>
          <a
            href="#"
            className="liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Try it free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-9 h-9 flex items-center justify-center text-white focus:outline-none cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          <Menu
            className={`w-6 h-6 absolute transition-all duration-300 ${
              mobileOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`w-6 h-6 absolute transition-all duration-300 ${
              mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-2 z-50 bg-[#2C221C]/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transition-all duration-400`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.97)',
            pointerEvents: mobileOpen ? 'auto' : 'none',
          }}
        >
          <div className="flex flex-col gap-5">
            {NAV_DROPDOWNS.map((dropdown) => (
              <div key={dropdown.title} className="flex flex-col gap-2">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  {dropdown.title}
                </span>
                <div className="flex flex-col pl-3 gap-2 border-l border-white/10 ml-1">
                  {dropdown.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={() => setMobileOpen(false)}
                      className="text-white/70 hover:text-white text-sm py-1 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="text-white/90 hover:text-white text-sm font-semibold transition-colors block"
              >
                Plans
              </a>
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-white/10 pt-5 mt-2 flex flex-col gap-3">
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="text-white/90 hover:text-white text-center py-2 text-sm font-medium transition-colors"
              >
                Log in
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="liquid-glass rounded-full py-3 text-center text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Try it free
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content (below nav, top-aligned, not vertically centered) */}
      <div className="flex-1 flex items-start justify-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl">
          {/* Heading */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em] font-medium">
            Bridge the
            <br />
            gaps. <span className="text-white/60">Ditch the</span>
            <br />
            <span className="text-white/60">grindwork.</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto mt-6 sm:mt-8">
            Flowpath unifies your complete wellness tools, so your crew spends less energy plugging gaps and more on real progress.
          </p>

          {/* Two CTA buttons side by side */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href="#"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-white/90 transition-colors shadow-sm"
            >
              Begin your journey
            </a>
            <a
              href="#"
              className="px-5 sm:px-6 py-2.5 sm:py-3 liquid-glass rounded-full text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              See it live
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
