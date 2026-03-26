import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const s = { color:'#64748b', fontSize:'0.875rem', textDecoration:'none', display:'block', padding:'0.25rem 0', transition:'color 0.2s' };
  return (
    <footer style={{ borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(0,0,0,0.2)', marginTop:'2rem' }}>
      <div className="page-container" style={{ padding:'3.5rem 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'2.5rem' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.625rem', textDecoration:'none', marginBottom:'1rem' }}>
              <div style={{ width:'2rem', height:'2rem', background:'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <BookOpen size={14} color="#0d1526" />
              </div>
              <span style={{ fontFamily:'Playfair Display,serif', fontWeight:700, color:'#fff', fontSize:'1rem' }}>
                ResearchAssist <span style={{ color:'#f59e0b' }}>Pro</span>
              </span>
            </Link>
            <p style={{ color:'#64748b', fontSize:'0.875rem', lineHeight:1.7, marginBottom:'1.25rem' }}>
              From Manuscript to Publication — We Help Researchers Succeed.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
              {[[Mail,'contact@researchassistpro.com'],[Phone,'+91 98765 43210'],[MapPin,'Chennai, Tamil Nadu, India']].map(([Icon,text],i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#64748b', fontSize:'0.8rem' }}>
                  <Icon size={13} color="#f59e0b" />{text}
                </div>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:600, fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>Services</h4>
            {['Manuscript Writing','Journal Support','Thesis Formatting','Data Analysis','Plagiarism Check','Conference Papers'].map(s2 => (
              <Link key={s2} to="/services" style={{ ...s, marginBottom:'0.5rem' }} onMouseEnter={e=>e.target.style.color='#f59e0b'} onMouseLeave={e=>e.target.style.color='#64748b'}>{s2}</Link>
            ))}
          </div>
          {/* Links */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:600, fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>Quick Links</h4>
            {[['/', 'Home'],['/services','Services'],['/pricing','Pricing'],['/about','About'],['/contact','Contact']].map(([to,label]) => (
              <Link key={to} to={to} style={{ ...s, marginBottom:'0.5rem' }} onMouseEnter={e=>e.target.style.color='#f59e0b'} onMouseLeave={e=>e.target.style.color='#64748b'}>{label}</Link>
            ))}
          </div>
          {/* Ethics */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:600, fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>Ethics</h4>
            <div className="card" style={{ padding:'1rem' }}>
              <p style={{ color:'#94a3b8', fontSize:'0.8rem', lineHeight:1.7 }}>
                We provide editing and writing assistance only. All work is delivered as a reference draft. Academic responsibility remains with the researcher.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', marginTop:'0.75rem' }}>
                {['100% Original','Confidential','No Resale'].map(t => (
                  <span key={t} style={{ padding:'0.2rem 0.6rem', borderRadius:'9999px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', color:'#f59e0b', fontSize:'0.7rem' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop:'2.5rem', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'0.75rem' }}>
          <span style={{ color:'#475569', fontSize:'0.8rem' }}>© {new Date().getFullYear()} ResearchAssist Pro. All rights reserved.</span>
          <Link to="/admin/login" style={{ color:'#475569', fontSize:'0.8rem', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='#94a3b8'} onMouseLeave={e=>e.target.style.color='#475569'}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
