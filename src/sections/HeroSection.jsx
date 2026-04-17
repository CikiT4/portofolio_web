import React, { useEffect, useState } from 'react';
import { ChevronDown, Camera, Calendar, Instagram, Mail } from 'lucide-react';
import api from '../hooks/useApi';

export default function HeroSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.get('/hero').then(r => setHero(r.data)).catch(() => {});
  }, []);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink-950"
      role="banner"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="animate-on-load delay-100 flex items-center justify-center gap-3 mb-8">
          <span className="glow-dot" />
          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">Portfolio</span>
          <span className="glow-dot" />
        </div>

        {/* Name */}
        <h1 className="animate-on-load delay-200 font-display text-5xl md:text-7xl lg:text-8xl font-light text-ink-100 leading-[1.05] mb-6">
          {hero?.title || 'Hayden Novariyo'}
          <br />
          <span className="italic text-gold/90">Wira Alfisyahr</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-load delay-300 font-sans text-base md:text-lg text-ink-400 tracking-wide mb-4 max-w-xl mx-auto">
          {hero?.subtitle || 'Event Organizer · Content Creator · CS Student'}
        </p>

        {/* Tagline */}
        {hero?.tagline && (
          <p className="animate-on-load delay-400 font-display italic text-gold/60 text-lg mb-10">
            "{hero.tagline}"
          </p>
        )}

        {/* CTA chips */}
        <div className="animate-on-load delay-500 flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3.5 bg-gold text-ink-950 font-sans font-medium text-sm rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {hero?.cta_text || 'Explore My Work'}
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3.5 border border-ink-600 text-ink-200 font-sans font-medium text-sm rounded-full hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Quick info chips */}
        <div className="animate-on-load delay-600 flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            { icon: Camera, label: 'Event Documentation' },
            { icon: Calendar, label: 'Event Planning' },
            { icon: Instagram, label: '@hxy.dn' },
            { icon: Mail, label: 'hayden.novariyo@gmail.com' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 font-mono text-xs text-ink-500 bg-ink-800/50 border border-ink-700/50 rounded-full px-3 py-1.5">
              <Icon size={11} className="text-gold/70" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="animate-on-load delay-700 absolute bottom-8 flex flex-col items-center gap-2 text-ink-600 hover:text-gold transition-colors duration-200 animate-float"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
