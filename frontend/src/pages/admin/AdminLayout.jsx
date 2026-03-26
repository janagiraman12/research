import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Briefcase, DollarSign, Star, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { to:'/admin',              icon:LayoutDashboard, label:'Dashboard', end:true },
  { to:'/admin/services',     icon:Briefcase,       label:'Services' },
  { to:'/admin/pricing',      icon:DollarSign,      label:'Pricing' },
  { to:'/admin/testimonials', icon:Star,            label:'Testimonials' },
  { to:'/admin/contacts',     icon:MessageSquare,   label:'Contacts' },
];

function SidebarContent({ admin, onLogout, onClose }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Logo */}
      <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:'0.625rem' }}>
        <div style={{ width:'2rem', height:'2rem', background:'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <BookOpen size={14} color="#0d1526" />
        </div>
        <div>
          <div style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem' }}>ResearchAssist Pro</div>
          <div style={{ color:'#64748b', fontSize:'0.7rem' }}>Admin Panel</div>
        </div>
        {onClose && <button onClick={onClose} style={{ marginLeft:'auto', background:'none', border:'none', color:'#64748b', cursor:'pointer' }}><X size={16}/></button>}
      </div>

      {/* Nav */}
      <nav style={{ flexGrow:1, padding:'0.75rem 0.75rem', display:'flex', flexDirection:'column', gap:'0.125rem' }}>
        {navItems.map(({ to, icon:Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={onClose} style={({ isActive }) => ({
            display:'flex', alignItems:'center', gap:'0.625rem', padding:'0.625rem 0.875rem', borderRadius:'0.75rem',
            textDecoration:'none', fontSize:'0.875rem', fontWeight:500, transition:'all 0.15s',
            color: isActive ? '#f59e0b' : '#94a3b8',
            background: isActive ? 'rgba(245,158,11,0.1)' : 'transparent',
            border: isActive ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
          })}>
            <Icon size={16} />{label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding:'0.75rem', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.625rem', padding:'0.625rem 0.875rem', marginBottom:'0.25rem' }}>
          <div style={{ width:'2rem', height:'2rem', borderRadius:'50%', background:'#1e3a5f', display:'flex', alignItems:'center', justifyContent:'center', color:'#f59e0b', fontWeight:700, fontSize:'0.875rem', flexShrink:0 }}>
            {admin?.name?.charAt(0)}
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ color:'#fff', fontSize:'0.8rem', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{admin?.name}</div>
            <div style={{ color:'#475569', fontSize:'0.7rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{admin?.email}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width:'100%', display:'flex', alignItems:'center', gap:'0.625rem', padding:'0.625rem 0.875rem', borderRadius:'0.75rem', background:'none', border:'1px solid transparent', color:'#94a3b8', fontSize:'0.875rem', cursor:'pointer', transition:'all 0.15s', fontFamily:'DM Sans,sans-serif' }}
          onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.05)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='#94a3b8';e.currentTarget.style.background='transparent';}}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); toast.success('Logged out'); navigate('/admin/login'); };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#080f1e' }}>
      {/* Desktop sidebar */}
      <aside style={{ width:'15rem', flexShrink:0, background:'#0d1a2e', borderRight:'1px solid rgba(255,255,255,0.05)', display:'flex', flexDirection:'column' }} className="hidden md:flex">
        <SidebarContent admin={admin} onLogout={handleLogout} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex' }}>
          <aside style={{ width:'15rem', background:'#0d1a2e', borderRight:'1px solid rgba(255,255,255,0.05)', display:'flex', flexDirection:'column' }}>
            <SidebarContent admin={admin} onLogout={handleLogout} onClose={() => setMobileOpen(false)} />
          </aside>
          <div style={{ flex:1, background:'rgba(0,0,0,0.6)' }} onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        {/* Topbar */}
        <header style={{ background:'rgba(13,26,46,0.8)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'0 1.5rem', height:'3.75rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <button onClick={() => setMobileOpen(true)} style={{ background:'none', border:'none', color:'#94a3b8', cursor:'pointer' }} className="md:hidden">
            <Menu size={20} />
          </button>
          <span style={{ color:'#64748b', fontSize:'0.875rem' }} className="hidden md:block">Admin Dashboard</span>
          <span style={{ color:'#f59e0b', fontSize:'0.875rem', fontWeight:500 }}>{admin?.name}</span>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto', padding:'1.75rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
