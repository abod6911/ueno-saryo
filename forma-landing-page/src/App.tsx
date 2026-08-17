import { useState } from 'react';
import { Circle } from 'lucide-react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const SERVICES = [
  'Website',
  'Mobile App',
  'Web App',
  'E-Commerce',
  'Visual Identity',
  '3D & Motion',
  'Digital Marketing',
  'Growth & Consulting',
  'Other'
] as const;

interface SocialBtnProps {
  href?: string;
  className: string;
  children: React.ReactNode;
  ariaLabel: string;
}

function SocialBtn({ href = "#", className, children, ariaLabel }: SocialBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
    </a>
  );
}

const TwitterIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      {/* Large Rounded Card Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
        />

        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
          {/* Navbar (top) */}
          <nav className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto flex items-center gap-3 sm:gap-6 self-start">
            {/* Logo */}
            <a href="#" className="flex items-center" aria-label="Home">
              <svg
                width="32"
                height="32"
                viewBox="0 0 256 256"
                className="shrink-0"
              >
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="black" />
                <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="black" />
              </svg>
            </a>

            {/* Navigation Links */}
            <div className="hidden sm:flex items-center gap-6">
              <a
                href="#story"
                className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                Our story
              </a>
              <a
                href="#expertise"
                className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                Expertise
              </a>
              <a
                href="#work"
                className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                Our work
              </a>
              <a
                href="#journal"
                className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                Journal
              </a>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors ml-auto whitespace-nowrap"
            >
              Start a project
            </a>
          </nav>

          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Bottom row (headline + form) */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Headline (left) */}
            <p className="text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0 text-white">
              We craft bold ideas
              <br />
              and ship them as{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400
                }}
              >
                products
              </span>
            </p>

            {/* Contact form card (right) */}
            <div id="contact" className="w-full lg:w-[min(480px,45%)] shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                {/* 1. Heading */}
                <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">
                  Say hello! 👋
                </h2>

                {/* 2. Email + socials row */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                  <div className="min-w-0 pr-1">
                    <span className="text-[11px] text-gray-500 font-medium block leading-tight mb-0.5">
                      Drop us a line
                    </span>
                    <a
                      href="mailto:hello@forma.co"
                      className="text-blue-600 font-semibold hover:underline truncate block text-sm sm:text-base"
                    >
                      hello@forma.co
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <SocialBtn className="bg-gray-100 text-gray-800" ariaLabel="Twitter">
                      <TwitterIcon size={13} />
                    </SocialBtn>
                    <SocialBtn className="bg-pink-100 text-pink-500" ariaLabel="Circle">
                      <Circle size={13} fill="currentColor" />
                    </SocialBtn>
                    <SocialBtn className="bg-orange-100 text-orange-400" ariaLabel="Instagram">
                      <InstagramIcon size={13} />
                    </SocialBtn>
                    <SocialBtn className="bg-blue-100 text-blue-600" ariaLabel="LinkedIn">
                      <LinkedinIcon size={13} />
                    </SocialBtn>
                  </div>
                </div>

                {/* 3. OR divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 font-medium text-sm">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* 4. Form or Success State */}
                {sent ? (
                  /* 5. Submit behavior: Success state */
                  <div className="py-6 gap-3 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-bold">
                      ✓
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      You're all set!
                    </h3>
                    <p className="text-sm text-gray-500">
                      Expect a reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-black block mb-2">
                        Tell us about your vision
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <textarea
                      rows={4}
                      required
                      placeholder="What are you looking to build or improve..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                    />

                    <div>
                      <label className="text-sm font-medium text-black block mb-2">
                        I need help with...
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {SERVICES.map((service) => {
                          const isSelected = selected.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              onClick={() => toggleService(service)}
                              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-gray-100 text-black border-black'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {sending ? 'Sending...' : 'Send my message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
