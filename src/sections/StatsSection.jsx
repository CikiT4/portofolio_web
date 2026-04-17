import React, { useEffect, useState } from 'react';
import { Camera, Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import StatCounter from '../components/StatCounter';
import api from '../hooks/useApi';

const ICON_MAP = { Camera, Users, Clock, Calendar, TrendingUp };

export default function StatsSection() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <section id="stats" className="py-24 px-6 bg-ink-950 relative overflow-hidden">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/3 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">04</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Impact</span>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <StatCounter
                key={stat.id}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                icon={ICON_MAP[stat.icon]}
              />
            ))}
          </div>
        </RevealWrapper>

        <RevealWrapper delay={200}>
          <div className="gold-line mt-16" />
          <p className="text-center font-display italic text-ink-500 mt-6 text-lg">
            "Turning moments into memories, and ideas into events."
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
