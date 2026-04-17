import React, { useEffect, useState } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import SkillBar from '../components/SkillBar';
import api from '../hooks/useApi';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'technical', label: 'Technical' },
  { key: 'language', label: 'Languages' },
];

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    api.get('/skills').then(r => setSkills(r.data)).catch(() => {});
  }, []);

  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 px-6 bg-ink-900 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">05</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Skills</span>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <RevealWrapper delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-4">
              My <span className="italic text-gold/80">Expertise</span>
            </h2>
            <p className="font-sans text-sm text-ink-500 leading-relaxed">
              A blend of soft skills, technical abilities, and multilingual communication refined through real-world event management and technology.
            </p>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Filter skills by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`font-mono text-xs tracking-widest px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeCategory === cat.key
                      ? 'bg-gold text-ink-950 border-gold'
                      : 'text-ink-400 border-ink-700 hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper delay={200}>
            <div className="space-y-5">
              {filtered.map((skill, i) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} category={skill.category} delay={i * 80} />
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
