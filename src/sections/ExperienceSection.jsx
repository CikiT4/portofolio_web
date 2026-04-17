import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    api.get('/experiences').then(r => setExperiences(r.data)).catch(() => {});
  }, []);

  return (
    <section id="experience" className="py-28 px-6 bg-ink-900 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">02</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Experience</span>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-12">
            Work <span className="italic text-gold/80">History</span>
          </h2>
        </RevealWrapper>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-[168px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" aria-hidden="true" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <RevealWrapper key={exp.id} delay={i * 80}>
                <article className="flex gap-6 md:gap-0 group">
                  {/* Date (desktop) */}
                  <div className="hidden md:block w-40 shrink-0 text-right pr-8 pt-1">
                    <span className="font-mono text-xs text-ink-500 leading-relaxed">
                      {exp.start_date}
                      {exp.end_date && <><br />{exp.end_date}</>}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-ink-800 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 z-10 relative">
                      <Briefcase size={14} className="text-gold/60 group-hover:text-gold transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pl-4 md:pl-6 pb-2">
                    {/* Date (mobile) */}
                    <p className="md:hidden font-mono text-xs text-ink-600 mb-1">
                      {exp.start_date}{exp.end_date ? ` — ${exp.end_date}` : ''}
                    </p>

                    <div className="bg-ink-800/40 border border-ink-700/50 rounded-xl p-5 group-hover:border-gold/20 group-hover:bg-ink-800/60 transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display text-lg text-ink-100 group-hover:text-gold transition-colors duration-200">{exp.title}</h3>
                          <p className="font-mono text-xs text-gold/70 mt-0.5">{exp.company}</p>
                        </div>
                        <span className="hidden md:block text-xs font-mono text-ink-700 bg-ink-800 border border-ink-700 rounded-full px-3 py-1">
                          {exp.end_date === 'Present' || !exp.end_date ? '● Active' : 'Completed'}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-ink-400 leading-relaxed line-clamp-3">{exp.description}</p>

                      {/* Tags */}
                      {exp.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.tags.map(tag => (
                            <span key={tag} className="font-mono text-xs text-ink-600 bg-ink-700/50 rounded-full px-2.5 py-0.5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
