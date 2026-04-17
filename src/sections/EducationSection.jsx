import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

export default function EducationSection() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get('/education').then(r => setEducation(r.data)).catch(() => {});
  }, []);

  return (
    <section id="education" className="py-28 px-6 bg-ink-950 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">06</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Education</span>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <RevealWrapper delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-4">
              Academic <span className="italic text-gold/80">Background</span>
            </h2>
            <p className="font-sans text-sm text-ink-500 leading-relaxed">
              Building a strong foundation in technology and engineering to complement hands-on event management experience.
            </p>
          </RevealWrapper>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <RevealWrapper key={edu.id} delay={i * 120 + 100}>
                <article className="group bg-ink-800/40 border border-ink-700/50 rounded-2xl p-6 hover:border-gold/30 hover:bg-ink-800/60 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-all duration-300">
                      <GraduationCap size={20} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-xl font-light text-ink-100 group-hover:text-gold transition-colors duration-200">
                          {edu.institution}
                        </h3>
                        <span className="font-mono text-xs text-ink-600 shrink-0">
                          {edu.start_date} — {edu.end_date || 'Present'}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-gold/70 mb-2">{edu.degree}</p>
                      {edu.field && <p className="font-mono text-xs text-ink-500">{edu.field}</p>}
                      {edu.description && (
                        <p className="font-sans text-sm text-ink-500 mt-3 leading-relaxed">{edu.description}</p>
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
