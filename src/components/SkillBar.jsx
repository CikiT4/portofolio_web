import React, { useEffect, useRef } from 'react';

export default function SkillBar({ name, level, category, delay = 0 }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          fill.style.width = `${level}%`;
        }, delay + 200);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.3 });
    observer.observe(fill.parentElement);
    return () => observer.disconnect();
  }, [level, delay]);

  const categoryColors = {
    soft: 'from-gold-dark to-gold-light',
    technical: 'from-amber-700 to-amber-400',
    language: 'from-yellow-700 to-yellow-400',
    general: 'from-gold-dark to-gold-light',
  };

  const gradientClass = categoryColors[category] || categoryColors.general;

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-sans text-sm text-ink-200 group-hover:text-gold transition-colors duration-200">{name}</span>
        <span className="font-mono text-xs text-gold">{level}%</span>
      </div>
      <div className="skill-bar h-1 bg-ink-700 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full`}
          style={{ width: '0%', transition: 'width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  );
}
