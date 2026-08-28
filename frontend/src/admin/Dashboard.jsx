import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  FolderKanban, 
  Image, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pRes, eRes, tRes, sRes] = await Promise.all([
          api.get('/projects'),
          api.get('/enquiries'),
          api.get('/testimonials'),
          api.get('/services')
        ]);
        setProjects(pRes.data);
        setEnquiries(eRes.data);
        setTestimonials(tRes.data);
        setServices(sRes.data);
      } catch (err) {
        console.error('[Dashboard Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-32 text-[#C5A880]">
        <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate stats
  const totalProjects = projects.length;
  const totalPhotos = projects.reduce((acc, p) => acc + 1 + (p.gallery ? p.gallery.length : 0), 0);
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const totalTestimonials = testimonials.length;

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            Overview
          </span>
          <h1 className="font-editorial text-3xl md:text-4xl text-white font-normal mt-1">
            Admin <span className="italic font-light text-[#C5A880]">Dashboard</span>
          </h1>
        </div>

        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Projects */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#C5A880]">
            <FolderKanban className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Projects</span>
          </div>
          <h3 className="font-editorial text-4xl text-white font-semibold">{totalProjects}</h3>
          <p className="text-xs text-neutral-400 font-light">Published in studio portfolio</p>
        </div>

        {/* Photos */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#C5A880]">
            <Image className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Total Media</span>
          </div>
          <h3 className="font-editorial text-4xl text-white font-semibold">{totalPhotos}</h3>
          <p className="text-xs text-neutral-400 font-light">Images & films documented</p>
        </div>

        {/* Enquiries */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#C5A880]">
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Enquiries</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-editorial text-4xl text-white font-semibold">{totalEnquiries}</h3>
            {newEnquiries > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {newEnquiries} New
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 font-light">Client submissions received</p>
        </div>

        {/* Testimonials */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[#C5A880]">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Reviews</span>
          </div>
          <h3 className="font-editorial text-4xl text-white font-semibold">{totalTestimonials}</h3>
          <p className="text-xs text-neutral-400 font-light">Client stories & feedback</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="p-8 rounded-3xl bg-[#121212] border border-white/5 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-2xl text-white font-medium">Recent Enquiries</h3>
          <Link
            to="/admin/enquiries"
            className="text-xs uppercase tracking-widest text-[#C5A880] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <p className="text-sm font-light text-neutral-400 py-6 text-center">No enquiries recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  <th className="pb-3 px-4">Client</th>
                  <th className="pb-3 px-4">Event</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Phone</th>
                  <th className="pb-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-light">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-white">{enq.name}</td>
                    <td className="py-4 px-4 text-neutral-300">{enq.eventType}</td>
                    <td className="py-4 px-4 text-neutral-400">
                      {enq.weddingDate ? new Date(enq.weddingDate).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="py-4 px-4 text-neutral-300">{enq.phone}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold border ${
                          enq.status === 'new'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : enq.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
