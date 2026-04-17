import React, { useEffect, useRef, useState } from 'react';

export default function StatCounter({ value, label, suffix = '+', icon: Icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center group">
      {Icon && (
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
            <Icon size={22} className="text-gold" />
          </div>
        </div>
      )}
      <div className="font-display text-5xl font-light text-gold mb-1">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs tracking-widest text-ink-400 uppercase">{label}</div>
    </div>
  );
}
