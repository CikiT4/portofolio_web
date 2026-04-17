import React, { useState } from 'react';
import { Send, Mail, Instagram, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RevealWrapper from '../components/RevealWrapper';
import api from '../hooks/useApi';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent! I\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const InputError = ({ field }) => errors[field] ? (
    <span className="font-sans text-xs text-red-400 mt-1 block" role="alert" aria-live="polite">{errors[field]}</span>
  ) : null;

  return (
    <section id="contact" className="py-28 px-6 bg-ink-900 relative">
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealWrapper>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">09</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase">Contact</span>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <RevealWrapper delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink-100 mb-4">
              Let's <span className="italic text-gold/80">Connect</span>
            </h2>
            <p className="font-sans text-sm text-ink-400 leading-relaxed mb-10">
              Whether you're planning an event, need documentation, or want to collaborate — I'd love to hear from you.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'hayden.novariyo@gmail.com', href: 'mailto:hayden.novariyo@gmail.com', title: 'Email' },
                { icon: Instagram, label: '@hxy.dn', href: 'https://instagram.com/hxy.dn', title: 'Instagram' },
                { icon: MapPin, label: 'Landungsari, Malang, Jawa Timur', href: null, title: 'Location' },
              ].map(({ icon: Icon, label, href, title }) => (
                <div key={title} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-ink-600 uppercase">{title}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-sans text-sm text-ink-300 hover:text-gold transition-colors duration-200">{label}</a>
                    ) : (
                      <p className="font-sans text-sm text-ink-400">{label}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={200}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your full name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    className={`admin-input ${errors.name ? 'border-red-800/60' : ''}`}
                  />
                  <InputError field="name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`admin-input ${errors.email ? 'border-red-800/60' : ''}`}
                  />
                  <InputError field="email" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  placeholder="Event documentation, collaboration..."
                  className="admin-input"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Message *</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell me about your project or event..."
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  className={`admin-input resize-none ${errors.message ? 'border-red-800/60' : ''}`}
                />
                <InputError field="message" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 admin-btn-primary py-4 text-base rounded-xl"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-ink-950/30 border-t-ink-950 rounded-full" />
                ) : (
                  <Send size={16} />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
