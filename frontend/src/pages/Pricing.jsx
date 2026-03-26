import { useState } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { PageLoader } from '../components/common/UI';
import { ContactCTA } from '../components/home/EthicsAndCTA';

export default function Pricing() {
  const { data: allPricing, loading } = useFetch('/pricing');
  const [activeTier, setActiveTier] = useState('All');
  const tiers = ['All','Basic','Professional','Premium'];
  const filtered = activeTier==='All' ? (Array.isArray(allPricing)?allPricing:[]) : (Array.isArray(allPricing)?allPricing.filter(p=>p.tier===activeTier):[]);

  return (
    <>
      <section style={{ paddingTop:'8rem', paddingBottom:'4rem', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)', textAlign:'center' }}>
        <div className="page-container">
          <div className="eyebrow" style={{ marginBottom:'1rem' }}>Pricing</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:700, color:'#fff', marginBottom:'1rem' }}>Transparent, Flexible Pricing</h1>
          <p style={{ color:'#94a3b8', fontSize:'1.05rem', maxWidth:'32rem', margin:'0 auto' }}>All prices are indicative. Contact us for a custom quote.</p>
        </div>
      </section>
      <section className="section">
        <div className="page-container">
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', marginBottom:'3rem' }}>
            {tiers.map(t => (
              <button key={t} onClick={()=>setActiveTier(t)} style={{ padding:'0.5rem 1.25rem', borderRadius:'9999px', fontSize:'0.825rem', fontWeight:500, cursor:'pointer', transition:'all 0.2s', fontFamily:'DM Sans,sans-serif', background:activeTier===t?'#f59e0b':'rgba(255,255,255,0.04)', color:activeTier===t?'#0d1526':'#94a3b8', border:activeTier===t?'1px solid #f59e0b':'1px solid rgba(255,255,255,0.1)' }}>{t}</button>
            ))}
          </div>
          {loading && <PageLoader />}
          {!loading && (
            <div className="grid-3">
              {filtered.map(plan => {
                const isPro = plan.tier==='Professional';
                return (
                  <div key={plan.id||plan._id} className="card" style={{ padding:'1.75rem', display:'flex', flexDirection:'column', position:'relative', border:isPro?'1px solid rgba(245,158,11,0.4)':undefined }}>
                    {isPro && <div style={{ position:'absolute', top:'-0.875rem', left:'50%', transform:'translateX(-50%)', padding:'0.2rem 0.875rem', background:'#f59e0b', color:'#0d1526', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:700, whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:'0.25rem' }}><Star size={10} fill="currentColor"/>Popular</div>}
                    <div style={{ marginBottom:'1.25rem' }}>
                      <span style={{ display:'inline-block', padding:'0.15rem 0.6rem', borderRadius:'9999px', background:'rgba(255,255,255,0.06)', color:'#94a3b8', fontSize:'0.7rem', fontWeight:600, marginBottom:'0.75rem' }}>{plan.tier}</span>
                      <h3 style={{ color:'#fff', fontWeight:600, fontFamily:'DM Sans,sans-serif', marginBottom:'0.5rem' }}>{plan.serviceName}</h3>
                      <div style={{ color:'#f59e0b', fontSize:'1.4rem', fontWeight:700, fontFamily:'monospace' }}>{plan.price}</div>
                    </div>
                    <p style={{ color:'#64748b', fontSize:'0.825rem', marginBottom:'1.25rem', flexGrow:1 }}>{plan.description}</p>
                    <ul style={{ listStyle:'none', padding:0, marginBottom:'1.5rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                      {(Array.isArray(plan.features)?plan.features:[]).map((f,i) => (
                        <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', fontSize:'0.825rem', color:'#94a3b8' }}>
                          <Check size={14} color="#f59e0b" style={{ marginTop:'2px', flexShrink:0 }} />{f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className={isPro?'btn-gold':'btn-outline'} style={{ justifyContent:'center', textAlign:'center' }}>
                      Request This Plan <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
              {filtered.length===0 && <p style={{ color:'#64748b', gridColumn:'1/-1', textAlign:'center', padding:'3rem' }}>No plans found.</p>}
            </div>
          )}
          <div className="card" style={{ padding:'2.5rem', textAlign:'center', maxWidth:'36rem', margin:'3rem auto 0' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff', marginBottom:'0.75rem' }}>Need a Custom Quote?</h3>
            <p style={{ color:'#94a3b8', fontSize:'0.875rem', marginBottom:'1.5rem' }}>For bulk projects, ongoing collaborations, or institutional requirements.</p>
            <Link to="/contact" className="btn-gold">Contact Us for Custom Pricing</Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
