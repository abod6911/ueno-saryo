import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, MapPin, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@michaelsmith.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', message: '' });
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-white transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#89AACC] font-medium block mb-1">
              Start a conversation
            </span>
            <h3 className="text-3xl font-display italic text-text-primary">
              Say hello.
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-2">
              Drop a note about your upcoming project, collaboration, or question.
            </p>
          </div>

          {/* Direct Email Quick Copy Pill */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-bg/80 border border-stroke mb-6">
            <div className="flex items-center gap-2.5 text-xs text-text-primary">
              <Mail className="w-3.5 h-3.5 text-[#89AACC]" />
              <span>hello@michaelsmith.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-text-primary px-2.5 py-1 rounded-lg bg-surface hover:bg-stroke/60 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
              <h4 className="text-xl font-display italic text-text-primary mb-1">
                Message received!
              </h4>
              <p className="text-xs text-muted">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your timeline, scope, or idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full relative group rounded-full text-xs uppercase tracking-widest font-semibold py-3 text-bg bg-text-primary hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Location info */}
          <div className="mt-6 pt-4 border-t border-stroke/40 flex items-center justify-between text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#89AACC]" /> Chicago, IL (CST)
            </span>
            <span>Avg. response: &lt; 24h</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
