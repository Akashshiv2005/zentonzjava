import React, { useEffect, useState } from 'react';
import { Shield, Calendar, MessageSquare, Clock, Phone, RefreshCw } from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

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
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries'>('bookings');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [invRes, bookRes] = await Promise.all([
        fetch('http://localhost:8081/api/contact'),
        fetch('http://localhost:8081/api/reservations')
      ]);
      
      if (invRes.ok) setInquiries(await invRes.json());
      if (bookRes.ok) setBookings(await bookRes.json());
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-on-surface font-serif uppercase flex items-center gap-4">
            <Shield className="text-primary w-10 h-10" />
            Admin Command Center
          </h1>
          <p className="text-on-surface/60 mt-2 font-medium">Manage your rituals and inquiries</p>
        </div>
        
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 bg-on-surface/5 hover:bg-on-surface/10 text-on-surface px-6 py-3 rounded-2xl transition-all border border-white/5 font-bold"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
            activeTab === 'bookings' 
            ? 'bg-primary text-background shadow-luxury' 
            : 'bg-on-surface/5 text-on-surface/50 hover:bg-on-surface/10'
          }`}
        >
          Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
            activeTab === 'inquiries' 
            ? 'bg-primary text-background shadow-luxury' 
            : 'bg-on-surface/5 text-on-surface/50 hover:bg-on-surface/10'
          }`}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      <div className="bg-on-surface/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-luxury-deep">
        {activeTab === 'bookings' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-on-surface/5 border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Customer</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Ritual</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Schedule</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-on-surface/[0.02] transition-colors">
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
                  </tr>
                ))}
                {bookings.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-on-surface/30 font-medium">No bookings found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-on-surface/5 border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Sender</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Inquiry Type</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-on-surface/[0.02] transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-on-surface">{inquiry.name}</div>
                      <div className="text-xs text-on-surface/50 flex flex-col gap-1 mt-1">
                        <span>{inquiry.email}</span>
                        <span className="flex items-center gap-1"><Phone size={10} className="text-primary" /> {inquiry.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="bg-on-surface/10 text-on-surface/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {inquiry.service}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex gap-3 items-start">
                        <MessageSquare size={16} className="text-primary shrink-0 mt-1" />
                        <p className="text-sm text-on-surface/60 leading-relaxed italic">"{inquiry.message}"</p>
                      </div>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && !loading && (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center text-on-surface/30 font-medium">No inquiries found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
