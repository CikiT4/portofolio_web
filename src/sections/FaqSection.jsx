import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const headingId = `faq-heading-${faq.id}`;
  const panelId = `faq-panel-${faq.id}`;

  return (
    <RevealWrapper delay={index * 80}>
      <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-gold/40 bg-ink-800/60' : 'border-ink-700/50 bg-ink-800/30 hover:border-ink-600'}`}>
        <button
          id={headingId}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className={`font-display text-base font-light transition-colors duration-200 ${open ? 'text-gold' : 'text-ink-100'}`}>
            {faq.question}
          </span>
          <ChevronDown
            size={18}
            className={`text-gold shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ transition: 'max-height 0.4s ease, opacity 0.3s ease' }}
        >
          <div className="px-6 pb-6">
            <div className="h-px bg-gradient-to-r from-gold/20 to-transparent mb-4" />
            <p className="font-sans text-sm text-ink-400 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api.get('/faqs').then(r => setFaqs(r.data)).catch(() => {});
  }, []);

  return (
    <section id="faq" className="py-28 px-6 bg-ink-950 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">08</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">FAQ</span>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <RevealWrapper delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-4">
              Frequently <span className="italic text-gold/80">Asked</span>
            </h2>
            <p className="font-sans text-sm text-ink-500 leading-relaxed">
              Common questions about my work, services, and how to collaborate.
            </p>
            <div className="mt-8 p-5 bg-ink-800/40 border border-gold/20 rounded-xl">
              <p className="font-mono text-xs text-gold mb-2">Have another question?</p>
              <p className="font-sans text-sm text-ink-400">
                Send me a message through the contact form below or reach out on Instagram{' '}
                <a href="https://instagram.com/hxy.dn" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light">@hxy.dn</a>
              </p>
            </div>
          </RevealWrapper>

          <div className="space-y-3" role="list">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
