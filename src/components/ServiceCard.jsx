import React, { useState } from 'react';
import Modal from './Modal';

export default function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  const iconMap = {
    Camera: '📸', Calendar: '📅', Wifi: '📡', PenTool: '✍️',
    Star: '⭐', Users: '👥', TrendingUp: '📈',
  };

  const details = service.details
    ? service.details.split('\n').filter(Boolean)
    : [];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="w-full text-left group relative bg-ink-800/60 backdrop-blur-sm border border-ink-600/50 rounded-2xl p-7
          hover:border-gold/40 hover:bg-ink-700/60 hover:-translate-y-1.5 hover:shadow-2xl
          transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-gold/40"
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        <div className="relative">
          <div className="text-3xl mb-4">{iconMap[service.icon] || '⭐'}</div>
          <h3 className="font-display text-xl font-light text-ink-100 mb-3 group-hover:text-gold transition-colors duration-200">
            {service.name}
          </h3>
          <p className="font-sans text-sm text-ink-400 leading-relaxed mb-5">{service.description}</p>
          <span className="font-mono text-xs tracking-widest text-gold/70 group-hover:text-gold transition-colors duration-200">
            LEARN MORE →
          </span>
        </div>
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={service.name}>
        <div className="space-y-5">
          <p className="font-sans text-sm text-ink-300 leading-relaxed">{service.description}</p>
          {details.length > 0 && (
            <div>
              <h4 className="font-mono text-xs tracking-widest text-gold mb-3 uppercase">What's Included</h4>
              <ul className="space-y-2">
                {details.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-ink-200">
                    <span className="text-gold mt-0.5 shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-4 border-t border-ink-700">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block px-6 py-3 bg-gold text-ink-950 font-sans font-medium text-sm rounded-lg hover:bg-gold-light transition-all duration-200"
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
