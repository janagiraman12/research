import { Target, Users, Award, Heart } from 'lucide-react';
import { ContactCTA } from '../components/home/EthicsAndCTA';

const team = [
  { name:'Dr. Meera Subramaniam', role:'Lead Academic Editor', bio:'PhD in Life Sciences, 12+ years in academic publishing.' },
  { name:'Arjun Krishnamurthy',   role:'Data Analyst (Python/R)', bio:'M.Tech in Data Science, specialist in biostatistics and ML.' },
  { name:'Priyanka Rajan',        role:'Manuscript Writer',       bio:'MA English, 8+ years in scientific and technical writing.' },
  { name:'Dr. Vikram Nair',       role:'Subject Matter Expert',   bio:'PhD in Engineering, handles STEM manuscripts and theses.' },
];

const values = [
  { icon:Target, title:'Precision',    desc:'Every word, citation, and format detail is handled with meticulous care.' },
  { icon:Users,  title:'Collaboration',desc:'We work with you, not just for you — your vision guides every draft.' },
  { icon:Award,  title:'Excellence',   desc:'We set the standard high because your publication career demands it.' },
  { icon:Heart,  title:'Integrity',    desc:'Honest timelines, transparent pricing, and ethical academic support — always.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop:'8rem', paddingBottom:'4rem', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)', textAlign:'center' }}>
        <div className="page-container">
          <div className="eyebrow" style={{ marginBottom:'1rem' }}>About Us</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:700, color:'#fff', marginBottom:'1.25rem' }}>The Team Behind Your Research Success</h1>
          <p style={{ color:'#94a3b8', fontSize:'1.05rem', maxWidth:'38rem', margin:'0 auto', lineHeight:1.75 }}>
            ResearchAssist Pro was founded to bridge the gap between brilliant research and successful publication — combining academic expertise with editorial excellence.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="page-container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom:'1rem' }}>Our Story</div>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700, color:'#fff', marginBottom:'1.25rem' }}>Built by Researchers, for Researchers</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem', color:'#94a3b8', fontSize:'0.9rem', lineHeight:1.8 }}>
                <p>ResearchAssist Pro was born out of firsthand experience with the publication process — the missed deadlines, journal rejections due to language issues, and formatting headaches that distract researchers from their real work.</p>
                <p>Our team of PhD-qualified writers, data scientists, and academic editors has collectively supported over 500 publications in Scopus, PubMed, and Web of Science indexed journals.</p>
                <p>Based in Chennai, we serve researchers across India — from students submitting their first journal paper to senior professors preparing comprehensive review articles.</p>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {[['500+','Papers Supported'],['98%','Satisfaction Rate'],['50+','Journals Covered'],['5+','Years Active']].map(([num,label]) => (
                <div key={label} className="stat-card">
                  <div className="stat-number">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background:'rgba(255,255,255,0.01)' }}>
        <div className="page-container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div className="eyebrow" style={{ marginBottom:'1rem' }}>Core Values</div>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="grid-4">
            {values.map(({ icon:Icon, title, desc }) => (
              <div key={title} className="card" style={{ padding:'1.5rem', textAlign:'center' }}>
                <div style={{ width:'3rem', height:'3rem', borderRadius:'0.75rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                  <Icon size={22} color="#f59e0b" />
                </div>
                <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.95rem', marginBottom:'0.5rem', fontFamily:'DM Sans,sans-serif' }}>{title}</h3>
                <p style={{ color:'#64748b', fontSize:'0.825rem', lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="page-container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div className="eyebrow" style={{ marginBottom:'1rem' }}>Our Team</div>
            <h2 className="section-title">Expert Academics at Your Service</h2>
          </div>
          <div className="grid-4">
            {team.map(m => (
              <div key={m.name} className="card" style={{ padding:'1.5rem', textAlign:'center' }}>
                <div style={{ width:'4rem', height:'4rem', borderRadius:'50%', background:'linear-gradient(135deg,#1e3a5f,#2e2785)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', border:'1px solid rgba(255,255,255,0.1)', fontFamily:'Playfair Display,serif', fontWeight:700, color:'#f59e0b', fontSize:'1.5rem' }}>
                  {m.name.charAt(0)}
                </div>
                <h3 style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.25rem', fontFamily:'DM Sans,sans-serif' }}>{m.name}</h3>
                <p style={{ color:'#f59e0b', fontSize:'0.75rem', marginBottom:'0.625rem' }}>{m.role}</p>
                <p style={{ color:'#64748b', fontSize:'0.775rem', lineHeight:1.7 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
