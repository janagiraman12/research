import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Briefcase, DollarSign, Star, MessageSquare, Bell } from 'lucide-react';

export default function AdminDashboard() {
  const { data: stats, loading } = useFetch('/admin/dashboard');

  const cards = [
    { label:'Services',       value:stats?.services,    icon:Briefcase,     color:'#3b82f6', to:'/admin/services' },
    { label:'Pricing Plans',  value:stats?.pricing,     icon:DollarSign,    color:'#10b981', to:'/admin/pricing' },
    { label:'Testimonials',   value:stats?.testimonials,icon:Star,          color:'#f59e0b', to:'/admin/testimonials' },
    { label:'Total Contacts', value:stats?.contacts,    icon:MessageSquare, color:'#a855f7', to:'/admin/contacts' },
  ];

  const cardStyle = (color) => ({
    background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
    borderRadius:'1rem', padding:'1.5rem', textDecoration:'none', display:'block', transition:'all 0.2s',
  });

  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff', marginBottom:'0.25rem' }}>Dashboard</h1>
        <p style={{ color:'#64748b', fontSize:'0.875rem' }}>Welcome back. Here's an overview of your platform.</p>
      </div>

      {stats?.newContacts > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:'0.75rem', padding:'0.875rem 1.25rem', marginBottom:'1.5rem' }}>
          <Bell size={16} color="#f59e0b" />
          <span style={{ color:'#fbbf24', fontSize:'0.875rem', flexGrow:1 }}>
            You have <strong>{stats.newContacts}</strong> new unread contact {stats.newContacts === 1 ? 'message' : 'messages'}.
          </span>
          <Link to="/admin/contacts" style={{ color:'#f59e0b', fontSize:'0.8rem', textDecoration:'underline' }}>View</Link>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
        {cards.map(c => (
          <Link key={c.label} to={c.to} style={cardStyle(c.color)}
            onMouseEnter={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}>
            <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'0.75rem', background:`${c.color}18`, border:`1px solid ${c.color}25`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
              <c.icon size={18} color={c.color} />
            </div>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'2rem', fontWeight:700, color:'#fff', marginBottom:'0.25rem' }}>
              {loading ? '—' : (c.value ?? 0)}
            </div>
            <div style={{ color:'#64748b', fontSize:'0.8rem' }}>{c.label}</div>
          </Link>
        ))}
      </div>

      <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'1rem', padding:'1.5rem' }}>
        <h2 style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem', marginBottom:'1rem' }}>Quick Actions</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'0.75rem' }}>
          {[{ to:'/admin/services',label:'+ Add Service'},{to:'/admin/pricing',label:'+ Add Pricing'},{to:'/admin/testimonials',label:'+ Add Testimonial'},{to:'/admin/contacts',label:'View Contacts'}].map(a => (
            <Link key={a.to} to={a.to} className="btn-outline" style={{ justifyContent:'center', textAlign:'center', fontSize:'0.8rem', padding:'0.5rem 0.75rem' }}>{a.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
