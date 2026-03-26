import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { PageLoader, ErrorMessage } from '../components/common/UI';
import { ContactCTA } from '../components/home/EthicsAndCTA';

const cats = ['All','Manuscript Writing Support','Journal Support','Thesis/Dissertation','Conference Support','Technical Services'];
const catColors = { 'Manuscript Writing Support':'#3b82f6','Journal Support':'#a855f7','Thesis/Dissertation':'#10b981','Conference Support':'#f97316','Technical Services':'#f59e0b' };

export default function Services() {
  const [active, setActive] = useState('All');
  const { data: services, loading, error } = useFetch('/services');
  const filtered = active === 'All' ? (Array.isArray(services) ? services : []) : (Array.isArray(services) ? services.filter(s => s.category === active) : []);

  return (
    <>
      <section style={{ paddingTop:'8rem', paddingBottom:'4rem', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)', textAlign:'center' }}>
        <div className="page-container">
          <div className="eyebrow" style={{ marginBottom:'1rem' }}>Our Services</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:700, color:'#fff', marginBottom:'1rem' }}>Research Support Services</h1>
          <p style={{ color:'#94a3b8', fontSize:'1.05rem', maxWidth:'32rem', margin:'0 auto' }}>Comprehensive academic assistance tailored for researchers, scholars, and institutions.</p>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', marginBottom:'3rem' }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding:'0.5rem 1.125rem', borderRadius:'9999px', fontSize:'0.825rem', fontWeight:500, cursor:'pointer', transition:'all 0.2s', fontFamily:'DM Sans,sans-serif',
                background: active===cat ? '#f59e0b' : 'rgba(255,255,255,0.04)',
                color: active===cat ? '#0d1526' : '#94a3b8',
                border: active===cat ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
              }}>{cat}</button>
            ))}
          </div>
          {loading && <PageLoader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <div className="grid-3">
              {filtered.map((s, i) => {
                const color = catColors[s.category] || '#f59e0b';
                return (
                  <div key={s.id||i} className="card" style={{ padding:'1.5rem', transition:'transform 0.25s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ width:'2.75rem', height:'2.75rem', borderRadius:'0.625rem', background:`${color}15`, border:`1px solid ${color}25`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                      <FileText size={20} color={color} />
                    </div>
                    <span style={{ display:'inline-block', padding:'0.15rem 0.5rem', borderRadius:'9999px', background:`${color}12`, color, fontSize:'0.65rem', fontWeight:600, marginBottom:'0.625rem' }}>{s.category}</span>
                    <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.95rem', marginBottom:'0.5rem', fontFamily:'DM Sans,sans-serif' }}>{s.title}</h3>
                    <p style={{ color:'#64748b', fontSize:'0.825rem', lineHeight:1.7 }}>{s.description}</p>
                  </div>
                );
              })}
              {filtered.length === 0 && <p style={{ color:'#64748b', gridColumn:'1/-1', textAlign:'center', padding:'3rem' }}>No services in this category.</p>}
            </div>
          )}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
