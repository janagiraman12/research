import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { SectionHeader, PageLoader } from '../common/UI';

export default function PricingPreview() {
  const { data: allPricing, loading } = useFetch('/pricing');
  const tiers = ['Basic', 'Professional', 'Premium'];
  const preview = tiers.map(tier => {
    const items = Array.isArray(allPricing) ? allPricing.filter(p => p.tier === tier) : [];
    return items[0] || null;
  }).filter(Boolean);

  return (
    <section className="section">
      <div className="page-container">
        <SectionHeader eyebrow="Transparent Pricing" title="Plans for Every Research Need" subtitle="No hidden fees. Custom quotes available for complex projects." />
        {loading && <PageLoader />}
        {!loading && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem', maxWidth:'900px', margin:'0 auto' }}>
              {preview.map(plan => {
                const isPro = plan.tier === 'Professional';
                return (
                  <div key={plan.id || plan._id} className="card" style={{ padding:'1.75rem', display:'flex', flexDirection:'column', border: isPro ? '1px solid rgba(245,158,11,0.4)' : undefined, boxShadow: isPro ? '0 0 40px rgba(245,158,11,0.08)' : undefined, position:'relative' }}>
                    {isPro && (
                      <div style={{ position:'absolute', top:'-0.875rem', left:'50%', transform:'translateX(-50%)', padding:'0.2rem 0.875rem', background:'#f59e0b', color:'#0d1526', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:700, display:'flex', alignItems:'center', gap:'0.25rem', whiteSpace:'nowrap' }}>
                        <Star size={10} fill="currentColor" /> Most Popular
                      </div>
                    )}
                    <div style={{ marginBottom:'1.25rem' }}>
                      <span style={{ display:'inline-block', padding:'0.15rem 0.6rem', borderRadius:'9999px', background:'rgba(255,255,255,0.06)', color:'#94a3b8', fontSize:'0.7rem', fontWeight:600, marginBottom:'0.75rem' }}>{plan.tier}</span>
                      <h3 style={{ color:'#fff', fontWeight:600, fontFamily:'DM Sans,sans-serif', marginBottom:'0.5rem' }}>{plan.serviceName}</h3>
                      <div style={{ color:'#f59e0b', fontSize:'1.4rem', fontWeight:700, fontFamily:'monospace' }}>{plan.price}</div>
                    </div>
                    <p style={{ color:'#64748b', fontSize:'0.825rem', marginBottom:'1.25rem', flexGrow:1 }}>{plan.description}</p>
                    <ul style={{ listStyle:'none', padding:0, marginBottom:'1.5rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                      {(Array.isArray(plan.features) ? plan.features : []).map((f, i) => (
                        <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', fontSize:'0.825rem', color:'#94a3b8' }}>
                          <Check size={14} color="#f59e0b" style={{ marginTop:'2px', flexShrink:0 }} />{f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className={isPro ? 'btn-gold' : 'btn-outline'} style={{ justifyContent:'center', textAlign:'center' }}>Get a Quote</Link>
                  </div>
                );
              })}
            </div>
            {preview.length === 0 && (
              <p style={{ textAlign:'center', color:'#64748b', padding:'2rem' }}>No pricing plans found. Run the seed script.</p>
            )}
            <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
              <Link to="/pricing" style={{ color:'#64748b', textDecoration:'none', fontSize:'0.875rem', display:'inline-flex', alignItems:'center', gap:'0.5rem' }}
                onMouseEnter={e=>e.currentTarget.style.color='#f59e0b'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
                View all pricing plans <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
