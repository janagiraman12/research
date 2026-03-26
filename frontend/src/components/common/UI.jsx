export function Spinner({ small = false }) {
  return <div className="spinner" style={small ? { width:'1rem', height:'1rem' } : {}} />;
}

export function PageLoader() {
  return (
    <div style={{ minHeight:'30vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
      <Spinner />
      <p style={{ color:'#64748b', fontSize:'0.875rem' }}>Loading...</p>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ marginBottom:'3.5rem', textAlign: center ? 'center' : 'left' }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom:'1rem' }}>{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub" style={{ margin: center ? '0.75rem auto 0' : '0.75rem 0 0' }}>{subtitle}</p>}
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
      <p style={{ color:'#f87171', fontSize:'0.875rem', marginBottom:'0.5rem' }}>{message || 'Something went wrong.'}</p>
      <p style={{ color:'#475569', fontSize:'0.75rem' }}>
        Make sure backend is running on <code style={{ color:'#f59e0b' }}>http://localhost:5000</code>
      </p>
    </div>
  );
}
