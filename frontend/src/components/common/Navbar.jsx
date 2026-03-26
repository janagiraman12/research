import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, BookOpen, LogIn } from 'lucide-react';

const links = [
  { to:'/', label:'Home' },
  { to:'/services', label:'Services' },
  { to:'/pricing', label:'Pricing' },
  { to:'/about', label:'About' },
  { to:'/contact', label:'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navStyle = {
    position:'fixed', top:0, left:0, right:0, zIndex:100,
    transition:'all 0.3s',
    background: scrolled ? 'rgba(13,21,38,0.97)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
  };

  return (
    <nav style={navStyle}>
      <div className="page-container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'4.5rem' }}>

        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.625rem', textDecoration:'none' }}>
          <div style={{ width:'2.25rem', height:'2.25rem', background:'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <BookOpen size={16} color="#0d1526" />
          </div>
          <span style={{ fontFamily:'Playfair Display,serif', fontWeight:700, color:'#fff', fontSize:'1.1rem' }}>
            ResearchAssist <span style={{ color:'#f59e0b' }}>Pro</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.25rem' }} className="hidden md:flex">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} style={({ isActive }) => ({
              padding:'0.5rem 1rem', borderRadius:'0.5rem', textDecoration:'none', fontSize:'0.875rem', fontWeight:500,
              color: isActive ? '#f59e0b' : '#94a3b8',
              background: isActive ? 'rgba(245,158,11,0.08)' : 'transparent',
              transition:'all 0.2s',
            })}>{l.label}</NavLink>
          ))}
        </div>

        {/* Desktop right buttons */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }} className="hidden md:flex">
          {/* Admin Login button */}
          <Link to="/admin/login" style={{
            display:'inline-flex', alignItems:'center', gap:'0.375rem',
            padding:'0.5rem 1rem', borderRadius:'0.5rem', fontSize:'0.8rem', fontWeight:500,
            color:'#94a3b8', background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(255,255,255,0.1)', textDecoration:'none', transition:'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
            <LogIn size={14} /> Admin Login
          </Link>
          {/* Get a Quote CTA */}
          <Link to="/contact" className="btn-gold" style={{ padding:'0.5rem 1.25rem', fontSize:'0.875rem' }}>
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background:'none', border:'none', color:'#94a3b8', cursor:'pointer', padding:'0.5rem' }} className="md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:'rgba(13,21,38,0.99)', borderTop:'1px solid rgba(255,255,255,0.05)', padding:'1rem 1.5rem', display:'flex', flexDirection:'column', gap:'0.25rem' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} onClick={() => setOpen(false)} style={({ isActive }) => ({
              padding:'0.75rem 1rem', borderRadius:'0.75rem', textDecoration:'none', fontSize:'0.9rem', fontWeight:500,
              color: isActive ? '#f59e0b' : '#94a3b8',
              background: isActive ? 'rgba(245,158,11,0.08)' : 'transparent',
            })}>{l.label}</NavLink>
          ))}
          {/* Mobile Admin Login */}
          <Link to="/admin/login" onClick={() => setOpen(false)} style={{
            display:'flex', alignItems:'center', gap:'0.5rem',
            padding:'0.75rem 1rem', borderRadius:'0.75rem', textDecoration:'none',
            fontSize:'0.875rem', fontWeight:500, color:'#94a3b8',
            border:'1px solid rgba(255,255,255,0.08)', marginTop:'0.25rem',
          }}>
            <LogIn size={15} /> Admin Login
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold" style={{ marginTop:'0.5rem', justifyContent:'center' }}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
