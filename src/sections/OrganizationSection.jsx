import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

export default function OrganizationSection() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    api.get('/organizations').then(r => setOrgs(r.data)).catch(() => {});
  }, []);

  return (
    <section id="organizations" className="py-28 px-6 bg-ink-900 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">07</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Organizations</span>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-12">
            Community <span className="italic text-gold/80">Involvement</span>
          </h2>
        </RevealWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {orgs.map((org, i) => (
            <RevealWrapper key={org.id} delay={i * 70}>
              <article className="group h-full bg-ink-800/40 border border-ink-700/50 rounded-2xl p-6 hover:border-gold/30 hover:bg-ink-800/60 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-all duration-300">
                    <Users size={16} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-ink-100 group-hover:text-gold transition-colors duration-200 leading-tight">{org.name}</h3>
                    <p className="font-mono text-xs text-gold/60 mt-0.5">{org.role}</p>
                  </div>
                </div>

                {/* Date */}
                <p className="font-mono text-xs text-ink-600 mb-3">
                  {org.start_date}{org.end_date && org.end_date !== org.start_date ? ` — ${org.end_date}` : ''}
                </p>

                {/* Bullets */}
                {org.bullets?.length > 0 && (
                  <ul className="space-y-1.5">
                    {org.bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="flex items-start gap-2 font-sans text-xs text-ink-400">
                        <span className="text-gold/40 mt-0.5 shrink-0">◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
