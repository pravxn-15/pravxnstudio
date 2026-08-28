import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  MessageSquare, 
  Settings as SettingsIcon, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  FileText
} from 'lucide-react';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Testimonials', path: '/admin/testimonials', icon: FileText },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#EAE5D9] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-4 flex items-center justify-between z-30">
        <Link to="/" className="font-editorial text-xl font-semibold text-white">
          pravxn<span className="text-[#C5A880] italic">admin</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-neutral-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0F0F0F] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <Link to="/" className="block mb-8">
            <span className="font-editorial text-2xl font-semibold tracking-wider text-white">
              pravxn<span className="text-[#C5A880] font-light italic">admin</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
              Studio Management System
            </span>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C5A880] text-black font-bold shadow-lg shadow-[#C5A880]/20'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/5 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-[#C5A880] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-colors py-2 px-3 rounded-lg hover:bg-rose-500/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto min-h-screen bg-[#070707]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
