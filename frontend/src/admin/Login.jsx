import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      addToast('Welcome back, Admin!', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('[Login Error]', err);
      addToast(err.response?.data?.message || 'Invalid admin credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-[#121212] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C5A880] block">
            pravxnstudio Admin
          </span>
          <h1 className="font-editorial text-3xl text-white font-normal">
            Studio Management
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Sign in to manage projects, enquiries, services & settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-[#070707] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#070707] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
            <strong>Default Credentials:</strong> <br />
            Username: <code className="text-white">admin</code> | Password: <code className="text-white">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
