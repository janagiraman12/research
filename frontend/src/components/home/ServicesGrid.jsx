import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { SectionHeader, PageLoader, ErrorMessage } from '../common/UI';

const catColors = {
  'Manuscript Writing Support': '#3b82f6',
  'Journal Support': '#a855f7',
  'Thesis/Dissertation': '#10b981',
  'Conference Support': '#f97316',
  'Technical Services': '#f59e0b',
};

export default function ServicesGrid() {
  const { data: services, loading, error } = useFetch('/services');
  const preview = Array.isArray(services) ? services.slice(0, 6) : [];

  return (
    <section className="section">
      <div className="page-container">
        <SectionHeader eyebrow="What We Offer" title="Comprehensive Research Support" subtitle="From writing to publication — every step of your research journey, expertly handled." />
        {loading && <PageLoader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <div className="grid-3">
              {preview.map(s => {
                const color = catColors[s.category] || '#f59e0b';
                return (
                  <div key={s.id || s._id} className="card" style={{ padding:'1.5rem', transition:'all 0.25s', cursor:'default' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ width:'2.75rem', height:'2.75rem', borderRadius:'0.625rem', background:`${color}18`, border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                      <FileText size={20} color={color} />
                    </div>
                    <span style={{ display:'inline-block', padding:'0.15rem 0.5rem', borderRadius:'9999px', background:`${color}15`, color, fontSize:'0.65rem', fontWeight:600, marginBottom:'0.625rem' }}>{s.category}</span>
                    <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.95rem', marginBottom:'0.5rem', fontFamily:'DM Sans,sans-serif' }}>{s.title}</h3>
                    <p style={{ color:'#64748b', fontSize:'0.825rem', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{s.description}</p>
                  </div>
                );
              })}
            </div>
            {preview.length === 0 && !loading && (
              <p style={{ textAlign:'center', color:'#64748b', padding:'3rem' }}>No services found. Make sure the backend is seeded.</p>
            )}
            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <Link to="/services" className="btn-outline">View All Services <ArrowRight size={16} /></Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
