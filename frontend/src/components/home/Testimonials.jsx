import { Star, Quote } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { SectionHeader, PageLoader } from '../common/UI';

export default function Testimonials() {
  const { data: testimonials, loading } = useFetch('/testimonials');

  return (
    <section className="section" style={{ background:'rgba(255,255,255,0.01)' }}>
      <div className="page-container">
        <SectionHeader eyebrow="Client Reviews" title="Trusted by Researchers Across India" subtitle="Hear from PhD scholars, professors, and research scientists who've published with our support." />
        {loading && <PageLoader />}
        {!loading && Array.isArray(testimonials) && (
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={t.id || i} className="card" style={{ padding:'1.5rem', display:'flex', flexDirection:'column' }}>
                <Quote size={24} color="rgba(245,158,11,0.25)" style={{ marginBottom:'1rem' }} />
                <p style={{ color:'#94a3b8', fontSize:'0.875rem', lineHeight:1.75, flexGrow:1, marginBottom:'1.25rem' }}>"{t.feedback}"</p>
                <div style={{ paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                  <div>
                    <div style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem' }}>{t.name}</div>
                    <div style={{ color:'#64748b', fontSize:'0.75rem', marginTop:'0.125rem' }}>{t.designation}{t.institution ? `, ${t.institution}` : ''}</div>
                  </div>
                  <div style={{ display:'flex', gap:'2px' }}>
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} size={12} color="#f59e0b" fill={n <= t.rating ? '#f59e0b' : 'none'} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && (!testimonials || testimonials.length === 0) && (
          <p style={{ textAlign:'center', color:'#64748b', padding:'2rem' }}>No testimonials yet.</p>
        )}
      </div>
    </section>
  );
}
