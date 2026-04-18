import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  LogOut, Home, Briefcase, Star, BarChart2, GraduationCap,
  Users, HelpCircle, MessageSquare, Settings, Zap, User
} from 'lucide-react';
import AdminHero from '../admin/AdminHero';
import AdminAbout from '../admin/AdminAbout';
import AdminExperiences from '../admin/AdminExperiences';
import AdminServices from '../admin/AdminServices';
import AdminSkills from '../admin/AdminSkills';
import AdminStats from '../admin/AdminStats';
import AdminEducation from '../admin/AdminEducation';
import AdminOrganizations from '../admin/AdminOrganizations';
import AdminFaqs from '../admin/AdminFaqs';
import AdminMessages from '../admin/AdminMessages';

const TABS = [
  { key: 'hero', label: 'Home', icon: Home, component: AdminHero },
  { key: 'about', label: 'About', icon: User, component: AdminAbout },
  { key: 'experiences', label: 'Experience', icon: Briefcase, component: AdminExperiences },
  { key: 'services', label: 'Services', icon: Star, component: AdminServices },
  { key: 'skills', label: 'Skills', icon: Zap, component: AdminSkills },
  { key: 'stats', label: 'Stats', icon: BarChart2, component: AdminStats },
  { key: 'education', label: 'Education', icon: GraduationCap, component: AdminEducation },
  { key: 'organizations', label: 'Organizations', icon: Users, component: AdminOrganizations },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, component: AdminFaqs },
  { key: 'messages', label: 'Messages', icon: MessageSquare, component: AdminMessages },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const ActiveComponent = TABS.find(t => t.key === activeTab)?.component || AdminHero;

  return (
    <div className="min-h-screen bg-ink-950 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-60' : 'w-16'} shrink-0 bg-ink-900 border-r border-ink-800 flex flex-col transition-all duration-300 sticky top-0 h-screen overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-ink-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
            <Settings size={14} className="text-gold" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-display text-sm text-ink-100">Admin Panel</p>
              <p className="font-mono text-xs text-ink-600">{user?.username}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto" aria-label="Admin navigation">
          <ul className="space-y-1 px-2">
            {TABS.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                    activeTab === key
                      ? 'bg-gold/15 text-gold border border-gold/20'
                      : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800'
                  }`}
                  title={!sidebarOpen ? label : undefined}
                >
                  <Icon size={15} className="shrink-0" />
                  {sidebarOpen && <span className="font-sans text-sm">{label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-ink-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink-500 hover:text-gold hover:bg-ink-800 transition-all duration-200 ${!sidebarOpen ? 'justify-center' : ''}`}
            title="View Portfolio"
          >
            <Home size={15} className="shrink-0" />
            {sidebarOpen && <span className="font-sans text-sm">View Site</span>}
          </a>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-200 ${!sidebarOpen ? 'justify-center' : ''}`}
            title="Logout"
          >
            <LogOut size={15} className="shrink-0" />
            {sidebarOpen && <span className="font-sans text-sm">Logout</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 text-ink-600 hover:text-gold transition-colors duration-200"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <span className="font-mono text-xs">{sidebarOpen ? '← Collapse' : '→'}</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 bg-ink-950/90 backdrop-blur-md border-b border-ink-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-ink-100">
              {TABS.find(t => t.key === activeTab)?.label}
            </h1>
            <p className="font-mono text-xs text-ink-600">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glow-dot" />
            <span className="font-mono text-xs text-ink-500">Live</span>
          </div>
        </div>

        <div className="p-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
