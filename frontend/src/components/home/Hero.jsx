import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';

const stats = [
  { value:'500+', label:'Papers Published' },
  { value:'98%',  label:'Client Satisfaction' },
  { value:'24hr', label:'Turnaround Available' },
  { value:'10+',  label:'Years Experience' },
];

export default function Hero() {
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)' }}>
      {/* Orbs */}
      <div style={{ position:'absolute', top:'25%', right:'20%', width:'28rem', height:'28rem', background:'rgba(96,101,246,0.08)', borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} className="float" />
      <div style={{ position:'absolute', bottom:'20%', left:'10%', width:'18rem', height:'18rem', background:'rgba(245,158,11,0.05)', borderRadius:'50%', filter:'blur(50px)', pointerEvents:'none' }} />

      <div className="page-container" style={{ position:'relative', zIndex:1, paddingTop:'6rem', paddingBottom:'4rem', width:'100%' }}>
        <div style={{ maxWidth:'48rem' }}>
          {/* Eyebrow */}
          <div className="eyebrow" style={{ marginBottom:'1.5rem' }}>✦ Professional Research Support</div>

          {/* Headline */}
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2.25rem,6vw,4rem)', fontWeight:700, color:'#fff', lineHeight:1.1, marginBottom:'1.5rem' }}>
            From{' '}
            <span style={{ background:'linear-gradient(90deg,#f59e0b,#fbbf24)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Manuscript</span>
            {' '}to{' '}
            <span style={{ background:'linear-gradient(90deg,#a5b9fd,#e0eaff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Publication</span>
          </h1>

          <p style={{ color:'#94a3b8', fontSize:'clamp(1rem,2vw,1.2rem)', lineHeight:1.75, marginBottom:'2rem', maxWidth:'36rem' }}>
            Expert academic writing, editing, formatting, and data analysis services trusted by PhD scholars, professors, and research institutions across India.
          </p>

          {/* Badges */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem', marginBottom:'2.5rem' }}>
            {[[Shield,'Plagiarism-Free'],[Clock,'On-Time Delivery'],[Star,'Expert Writers']].map(([Icon,text]) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:'0.375rem', padding:'0.375rem 0.875rem', borderRadius:'9999px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#94a3b8', fontSize:'0.8rem' }}>
                <Icon size={12} color="#f59e0b" />{text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>
            <Link to="/contact" className="btn-gold" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn-outline" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
              Explore Services
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginTop:'4rem', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'1rem' }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
