import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Users, ArrowRight, MessageSquare } from 'lucide-react';

const commitments = [
  { icon:Shield, title:'Original Work Only', desc:'Every deliverable is 100% original, written from scratch. We never reuse or resell content.' },
  { icon:Eye,    title:'Full Transparency',   desc:'Clear scope, pricing, and timelines — no surprises.' },
  { icon:Lock,   title:'Strict Confidentiality', desc:'Your research data and identity are never shared with third parties.' },
  { icon:Users,  title:'Academic Responsibility', desc:'We provide expert assistance. Final submissions remain the researcher\'s responsibility.' },
];

export function EthicsSection() {
  return (
    <section className="section">
      <div className="page-container">
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom:'1rem' }}>Our Ethics</div>
          <h2 className="section-title">Research Integrity First</h2>
          <p className="section-sub" style={{ margin:'0.75rem auto 0' }}>We are committed to supporting research — not replacing the researcher.</p>
        </div>
        <div className="grid-4">
          {commitments.map(({ icon:Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding:'1.5rem', textAlign:'center' }}>
              <div style={{ width:'3rem', height:'3rem', borderRadius:'0.75rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                <Icon size={22} color="#f59e0b" />
              </div>
              <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.9rem', marginBottom:'0.5rem', fontFamily:'DM Sans,sans-serif' }}>{title}</h3>
              <p style={{ color:'#64748b', fontSize:'0.8rem', lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section style={{ padding:'3rem 0 5rem' }}>
      <div className="page-container">
        <div className="card" style={{ padding:'4rem 2rem', textAlign:'center', position:'relative', overflow:'hidden', background:'rgba(96,101,246,0.05)' }}>
          <div style={{ position:'absolute', top:0, right:0, width:'16rem', height:'16rem', background:'rgba(245,158,11,0.04)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ width:'3.5rem', height:'3.5rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:'1rem', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
              <MessageSquare size={24} color="#f59e0b" />
            </div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.75rem,4vw,2.25rem)', fontWeight:700, color:'#fff', marginBottom:'1rem' }}>
              Ready to Publish Your Research?
            </h2>
            <p style={{ color:'#94a3b8', fontSize:'1.05rem', maxWidth:'32rem', margin:'0 auto 2rem' }}>
              Get a free consultation and custom quote within 24 hours. No commitment required.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem' }}>
              <Link to="/contact" className="btn-gold" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
