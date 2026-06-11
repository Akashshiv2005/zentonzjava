import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/zentonez-logo.png';
import { Shield, Calendar, MessageSquare, Clock, Phone, RefreshCw, Gift, Camera, Scissors, BookOpen, Trash2 } from 'lucide-react';
import { AdminGallery } from '../components/Admin/AdminGallery';
import { AdminMagazine } from '../components/Admin/AdminMagazine';
import AdminServices from '../components/Admin/AdminServices';
import AdminTestimonials from '../components/Admin/AdminTestimonials';
import AdminPromotions from '../components/Admin/AdminPromotions';
import ConfirmModal from '../components/ui/ConfirmModal';
import { AdminToast } from '../components/ui/AdminToast';

interface Booking {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('zt_admin_token') !== null;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'stories' | 'services' | 'gallery' | 'promotions' | 'magazine'>('bookings');

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDeleteBooking = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8081/api/reservations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setToast({ message: "Booking deleted successfully", type: 'success' });
        setBookings(prev => prev.filter(b => b.id !== id));
      } else {
        setToast({ message: "Failed to delete booking", type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Error deleting booking", type: 'error' });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('http://localhost:8081/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('zt_admin_token', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zt_admin_token');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const bookRes = await fetch('http://localhost:8081/api/reservations');
      
      if (bookRes.ok) {
        const data: Booking[] = await bookRes.json();
        setBookings(data.sort((a, b) => b.id - a.id));
      }
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background selection:bg-primary/30 selection:text-on-surface font-sans">
        
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-10 mix-blend-multiply scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-transparent to-background" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-4 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-luxury-deep border border-on-surface/10 bg-white/80 backdrop-blur-xl"
        >
          {/* Left Side - Branding */}
          <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden hidden md:flex border-r border-on-surface/5 bg-gradient-to-br from-primary/15 via-background to-surface-dim/40">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white/80 backdrop-blur-md p-4 rounded-2xl inline-block border border-on-surface/10 shadow-md"
              >
                <img src={logo} alt="Zen Tonez" className="h-10 object-contain" />
              </motion.div>
            </div>
            
            <div className="relative z-10 mt-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl lg:text-5xl font-black font-serif text-on-surface leading-tight mb-4"
              >
                Admin <br/><span className="text-primary italic font-light">Portal</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-on-surface/60 text-sm font-medium leading-relaxed max-w-xs"
              >
                Welcome back. Enter your credentials to access the management tools.
              </motion.p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 flex items-center justify-center relative bg-white/30 backdrop-blur-md">
            <div className="w-full max-w-sm relative z-10">
              
              {/* Mobile Header (Hidden on Desktop) */}
              <div className="md:hidden text-center mb-10">
                <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl inline-block border border-on-surface/10 mb-6">
                  <img src={logo} alt="Zen Tonez" className="h-8 object-contain" />
                </div>
                <h1 className="text-2xl font-black font-serif text-on-surface">Admin Portal</h1>
                <p className="text-on-surface/40 text-xs mt-2 uppercase tracking-widest">Secure Login</p>
              </div>

              <div className="hidden md:block mb-10">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Shield size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Secure Gateway</span>
                </div>
                <h3 className="text-2xl font-black text-on-surface">Sign In</h3>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface/60 ml-1">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white border border-on-surface/10 rounded-2xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-on-surface/30"
                      placeholder="admin"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface/60 ml-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-on-surface/10 rounded-2xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-on-surface/30"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {loginError && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-error text-xs font-medium bg-error/10 p-4 rounded-xl border border-error/20 flex items-center justify-center gap-2"
                    >
                      {loginError}
                      {loginError.includes('Invalid') && <span className="text-on-surface/50 text-[10px]">(Did you restart the backend?)</span>}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="group relative w-full bg-primary hover:bg-on-surface hover:text-white text-background font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-luxury hover:shadow-luxury-deep disabled:opacity-50 disabled:cursor-not-allowed mt-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoggingIn ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw size={16} className="animate-spin" /> Authenticating
                      </span>
                    ) : 'Enter Portal'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container relative admin-portal overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none z-0" />
      
      {/* Premium Admin Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-[#C9A24A]/10 shadow-[0_2px_15px_rgba(43,43,43,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-20 sm:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Clickable Logo with White Background for Visibility */}
            <Link to="/" className="h-8 sm:h-12 w-auto bg-white/95 px-2 py-1 rounded-lg hover:scale-105 transition-transform duration-500 shadow-md">
              <img src={logo} alt="ZenTonez Logo" className="h-full w-auto object-contain" />
            </Link>
            
            <div className="w-px h-5 sm:h-8 bg-on-surface/10" />
            
            {/* Header Title (Visible on Mobile too) */}
            <h1 className="text-xs sm:text-xl md:text-2xl font-black text-on-surface font-serif uppercase tracking-widest flex items-center gap-1.5 sm:gap-3">
              <Shield className="text-primary w-4 h-4 sm:w-6 sm:h-6 hidden xs:block" />
              <span className="hidden xs:inline">Admin Portal</span>
              <span className="xs:hidden">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-on-surface/5 hover:bg-red-500/20 text-on-surface/60 hover:text-red-400 px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all font-black uppercase tracking-widest text-[10px] sm:text-xs"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
            <button 
              onClick={fetchData}
              className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary border border-primary/20 text-primary hover:text-black px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-luxury"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh Data</span>
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary/80 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Dashboard</p>
          <h2 className="text-2xl sm:text-3xl font-black text-on-surface font-serif uppercase tracking-widest">Manage Your Kingdom</h2>
        </div>

      {/* Tabs - Pill Design (Desktop Only) */}
      <div className="hidden md:flex justify-center mb-12 w-full relative z-10">
        <div className="inline-flex items-center p-1.5 bg-white/80 backdrop-blur-md border border-[#C9A24A]/20 rounded-full shadow-luxury shrink-0">
          {[
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'stories', label: 'Client Stories' },
            { id: 'services', label: 'Services' },
            { id: 'gallery', label: 'Gallery Images' },
            { id: 'magazine', label: 'Magazine Pages' },
            { id: 'promotions', label: 'Offers', icon: <Gift size={14} className="inline mr-1" /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 whitespace-nowrap ${isActive ? 'text-white' : 'text-[#2b2b2b]/60 hover:text-[#2b2b2b]'}`}
              >
                <span className="relative z-20 flex items-center">{tab.icon}{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-primary rounded-full shadow-luxury-gold z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-[#C9A24A]/15 rounded-[2rem] overflow-hidden shadow-luxury-deep relative min-h-[400px] z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            {activeTab === 'bookings' && (
              <div>
                {/* Desktop View: Interactive Table */}
                <div className="hidden md:block overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#C9A24A]/5 border-b border-[#C9A24A]/15">
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Customer</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Ritual</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Schedule</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Notes</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A24A]/10">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[#C9A24A]/5 transition-all duration-300 hover:scale-[1.003] origin-center">
                          <td className="px-6 py-6">
                            <div className="font-bold text-on-surface">{booking.name}</div>
                            <div className="text-xs text-on-surface/50 flex items-center gap-1 mt-1">
                              <Phone size={12} className="text-primary" /> {booking.phone}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                              {booking.service}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-sm font-medium text-on-surface flex items-center gap-2">
                              <Calendar size={14} className="text-primary" /> {booking.date}
                            </div>
                            <div className="text-xs text-on-surface/50 flex items-center gap-2 mt-1">
                              <Clock size={14} className="text-primary" /> {booking.time}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <p className="text-sm text-on-surface/60 max-w-xs line-clamp-2">{booking.notes || '—'}</p>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <button
                              onClick={() => setDeleteConfirmId(booking.id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && !loading && (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center text-on-surface/30 font-medium">No bookings found yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
 
                {/* Mobile View: High-contrast Cards List */}
                <div className="md:hidden divide-y divide-[#C9A24A]/10">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-5 space-y-4 hover:bg-[#C9A24A]/2 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-base text-[#2B2B2B]">{booking.name}</h4>
                          <a href={`tel:${booking.phone}`} className="text-xs text-primary font-bold flex items-center gap-1 mt-1">
                            <Phone size={12} /> {booking.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {booking.service}
                          </span>
                          <button
                            onClick={() => setDeleteConfirmId(booking.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Booking"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 text-xs font-semibold text-on-surface/75 bg-on-surface/5 p-3 rounded-xl border border-[#C9A24A]/10">
                        <div className="flex items-center gap-1">
                          <Calendar size={13} className="text-primary" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={13} className="text-primary" />
                          <span>{booking.time}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="text-xs text-on-surface/60 bg-background/50 p-2.5 rounded-lg border border-on-surface/5">
                          <span className="font-bold block text-[10px] uppercase text-primary mb-1">Notes</span>
                          {booking.notes}
                        </div>
                      )}
                    </div>
                  ))}
                  {bookings.length === 0 && !loading && (
                    <div className="px-6 py-16 text-center text-on-surface/30 font-medium">
                      No bookings found yet.
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'stories' && (
              <AdminTestimonials />
            )}

            {activeTab === 'services' && (
              <AdminServices />
            )}

            {activeTab === 'gallery' && (
              <AdminGallery />
            )}

            {activeTab === 'magazine' && (
              <AdminMagazine />
            )}

            {activeTab === 'promotions' && (
              <AdminPromotions />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      </div>

      {/* Admin Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/95 backdrop-blur-xl border-t border-on-surface/5 pb-safe pt-2 px-2 overflow-x-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-2 min-w-[320px]">
          {[
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'stories', label: 'Stories', icon: MessageSquare },
            { id: 'services', label: 'Services', icon: Scissors },
            { id: 'gallery', label: 'Gallery', icon: Camera },
            { id: 'magazine', label: 'Magazine', icon: BookOpen },
            { id: 'promotions', label: 'Offers', icon: Gift }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center w-14 transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface/40 hover:text-on-surface/80'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                <span className={`text-[9px] font-black tracking-widest mt-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <ConfirmModal
        isOpen={deleteConfirmId !== null}
        onCancel={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDeleteBooking(deleteConfirmId)}
        title="Delete Booking"
        message="Are you sure you want to delete this booking request? This action cannot be undone."
      />

      <AdminToast
        isOpen={toast !== null}
        message={toast?.message || ""}
        type={toast?.type || "success"}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Admin;
