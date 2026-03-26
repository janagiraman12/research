import { useFetch } from '../../hooks/useFetch';
import { SectionHeader, PageLoader } from '../common/UI';
import { CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const { data: steps, loading } = useFetch('/workflow');

  return (
    <section className="section" style={{ background:'rgba(255,255,255,0.01)' }}>
      <div className="page-container">
        <SectionHeader eyebrow="Client Journey" title="How It Works" subtitle="A transparent, step-by-step process designed around your research needs." />
        {loading && <PageLoader />}
        {!loading && Array.isArray(steps) && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'1.5rem' }}>
            {steps.map((step, i) => (
              <div key={step.id || i} style={{ textAlign:'center', padding:'1.5rem 1rem' }}>
                <div style={{ position:'relative', display:'inline-block', marginBottom:'1.25rem' }}>
                  <div style={{ width:'5rem', height:'5rem', borderRadius:'1rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <CheckCircle size={28} color="#f59e0b" />
                  </div>
                  <div style={{ position:'absolute', top:'-0.5rem', right:'-0.5rem', width:'1.5rem', height:'1.5rem', borderRadius:'50%', background:'#f59e0b', color:'#0d1526', fontSize:'0.7rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {step.step || i + 1}
                  </div>
                </div>
                <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.95rem', marginBottom:'0.5rem', fontFamily:'DM Sans,sans-serif' }}>{step.title}</h3>
                <p style={{ color:'#64748b', fontSize:'0.8rem', lineHeight:1.7 }}>{step.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
