import React, { useEffect, useState } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import ServiceCard from '../components/ServiceCard';
import api from '../hooks/useApi';

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(() => {});
  }, []);

  return (
    <section id="services" className="py-28 px-6 bg-ink-950 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">03</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Services</span>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-4">
              What I <span className="italic text-gold/80">Offer</span>
            </h2>
            <p className="font-sans text-sm text-ink-500 max-w-xl">
              Click any card to learn more about the service and what's included.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <RevealWrapper key={service.id} delay={i * 100}>
              <ServiceCard service={service} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
