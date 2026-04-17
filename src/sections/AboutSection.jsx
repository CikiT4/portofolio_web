import React, { useEffect, useState } from 'react';
import { Mail, Phone, Instagram, MapPin, User, Github, Linkedin } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

export default function AboutSection() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get('/about').then(r => setAbout(r.data)).catch(() => {});
  }, []);

  return (
    <section id="about" className="py-28 px-6 bg-ink-950 relative overflow-hidden">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">01</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">About</span>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar / Profile card */}
          <RevealWrapper delay={100}>
            <div className="relative">
              {/* Profile placeholder */}
              <div className="relative w-64 h-64 mx-auto md:mx-0 rounded-2xl bg-ink-800 border border-ink-700 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {about?.photo_url ? (
                    <img src={about.photo_url.startsWith('http') ? about.photo_url : `http://localhost:5000${about.photo_url}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-4">
                        <User size={40} className="text-gold/60" />
                      </div>
                      <p className="font-display text-ink-300 text-lg">Hayden</p>
                      <p className="font-mono text-xs text-ink-600">@hxy.dn</p>
                    </div>
                  )}
                </div>
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/50" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:right-0 bg-ink-800 border border-gold/30 rounded-xl px-4 py-3 shadow-lg">
                <p className="font-mono text-xs text-gold">CS @ Binus University</p>
                <p className="font-sans text-xs text-ink-500">Malang, Jawa Timur</p>
              </div>
            </div>
          </RevealWrapper>

          {/* Text content */}
          <RevealWrapper delay={200}>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-2">
                  {about?.name || 'Hayden Novariyo'}
                  <br />
                  <span className="italic text-gold/80">Wira Alfisyahr</span>
                </h2>
                <p className="font-mono text-xs tracking-widest text-ink-500 uppercase mt-2">
                  {about?.role || 'Event Organizer & Creative Technologist'}
                </p>
              </div>

              <div className="gold-line" />

              <p className="font-sans text-sm text-ink-300 leading-[1.9]">
                {about?.bio || 'First year undergraduated Computer Science Degree at Binus University @Malang. Proficient in programming languages with a foundation in algorithms and data structures. Passionate about organizing event, solving complex problems and improving through innovative solutions.'}
              </p>

              {/* Contact chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Mail, label: about?.email || 'hayden.novariyo@gmail.com', href: `mailto:${about?.email || 'hayden.novariyo@gmail.com'}` },
                  { icon: Instagram, label: about?.instagram || '@hxy.dn', href: 'https://instagram.com/hxy.dn' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hayden-novariyo-wira-alfisyahr-562b07325' },
                  { icon: Github, label: 'GitHub', href: 'https://github.com/CikiT4' },
                  { icon: Phone, label: about?.phone || '082143724101', href: `tel:${about?.phone || '082143724101'}` },
                  { icon: MapPin, label: about?.location || 'Malang, Jawa Timur', href: null },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-2.5 bg-ink-800/50 border border-ink-700/50 rounded-lg px-3 py-2.5">
                    <Icon size={14} className="text-gold shrink-0" />
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-sans text-xs text-ink-300 hover:text-gold transition-colors duration-200 truncate">{label}</a>
                    ) : (
                      <span className="font-sans text-xs text-ink-400 truncate">{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
