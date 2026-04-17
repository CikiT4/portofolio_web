import React from 'react';
import { Instagram, Mail, Phone, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-lg text-ink-200">
              <span className="text-gold">H</span>ayden Novariyo
            </p>
            <p className="font-sans text-xs text-ink-500 mt-1">Event Organizer · Content Creator · CS Student</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hayden.novariyo@gmail.com"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-700 text-ink-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://instagram.com/hxy.dn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-700 text-ink-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/hayden-novariyo-wira-alfisyahr-562b07325"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-700 text-ink-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/CikiT4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-700 text-ink-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://wa.me/6282143724101"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-700 text-ink-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
              aria-label="Phone"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        <div className="gold-line my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-mono text-xs text-ink-600">
            © {new Date().getFullYear()} Hayden Novariyo Wira Alfisyahr. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-700">
            Malang, Jawa Timur, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
