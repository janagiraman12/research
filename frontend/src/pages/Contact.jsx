import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name||!form.email||!form.message) { toast.error('Name, email, and message are required.'); return; }
    setLoading(true);
    try {
      await api.post('/contacts', form);
      setSuccess(true);
      setForm({ name:'',email:'',phone:'',subject:'',message:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <section style={{ paddingTop:'8rem', paddingBottom:'4rem', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)', textAlign:'center' }}>
        <div className="page-container">
          <div className="eyebrow" style={{ marginBottom:'1rem' }}>Get In Touch</div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:700, color:'#fff', marginBottom:'1rem' }}>Start Your Research Journey</h1>
          <p style={{ color:'#94a3b8', fontSize:'1.05rem', maxWidth:'28rem', margin:'0 auto' }}>Tell us about your project. We'll respond with a custom quote within 24 hours.</p>
        </div>
      </section>
      <section className="section">
        <div className="page-container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'3rem', alignItems:'start' }}>
            {/* Info */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[[Mail,'Email','contact@researchassistpro.com',`mailto:contact@researchassistpro.com`],[Phone,'Phone / WhatsApp','+91 98765 43210','tel:+919876543210'],[MapPin,'Location','Chennai, Tamil Nadu, India',null]].map(([Icon,label,val,href]) => (
                <div key={label} className="card" style={{ padding:'1.25rem', display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                  <div style={{ width:'2.5rem', height:'2.5rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:'0.625rem', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={16} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ color:'#64748b', fontSize:'0.75rem', marginBottom:'0.25rem' }}>{label}</div>
                    {href ? <a href={href} style={{ color:'#e2e8f0', fontSize:'0.875rem', textDecoration:'none' }}>{val}</a> : <span style={{ color:'#e2e8f0', fontSize:'0.875rem' }}>{val}</span>}
                  </div>
                </div>
              ))}
              <div className="card" style={{ padding:'1.25rem' }}>
                <h4 style={{ color:'#fff', fontSize:'0.875rem', fontWeight:600, marginBottom:'0.75rem' }}>Response Time</h4>
                {[['General inquiries','24hr'],['Urgent projects','2–4hr'],['Custom quotes','Same day']].map(([l,v]) => (
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'0.375rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:'0.825rem' }}>
                    <span style={{ color:'#94a3b8' }}>{l}</span><span style={{ color:'#f59e0b' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Form */}
            <div>
              {success ? (
                <div className="card" style={{ padding:'4rem 2rem', textAlign:'center' }}>
                  <div style={{ width:'4rem', height:'4rem', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem' }}>
                    <CheckCircle size={28} color="#10b981" />
                  </div>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff', marginBottom:'0.75rem' }}>Message Received!</h3>
                  <p style={{ color:'#94a3b8', marginBottom:'1.5rem', fontSize:'0.9rem' }}>We'll get back to you within 24 hours with a custom quote.</p>
                  <button onClick={()=>setSuccess(false)} className="btn-outline">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card" style={{ padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                  <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.25rem', color:'#fff' }}>Send Us a Message</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                    <div>
                      <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Full Name *</label>
                      <input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Dr. John Doe" required />
                    </div>
                    <div>
                      <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Email *</label>
                      <input type="email" className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@university.edu" required />
                    </div>
                    <div>
                      <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Phone</label>
                      <input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Service Required</label>
                      <select className="input" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} style={{ background:'rgba(255,255,255,0.04)' }}>
                        <option value="">Select...</option>
                        {['Manuscript Writing','Editing & Proofreading','Journal Formatting','Plagiarism Check','Thesis Formatting','Data Analysis','Other'].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Message *</label>
                    <textarea className="input" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5} placeholder="Describe your research project, requirements, and timeline..." required style={{ resize:'vertical' }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-gold" style={{ justifyContent:'center', opacity:loading?0.6:1, cursor:loading?'not-allowed':'pointer' }}>
                    {loading ? 'Sending...' : <><Send size={16} />Send Message</>}
                  </button>
                  <p style={{ color:'#475569', fontSize:'0.75rem', textAlign:'center' }}>Your information is kept strictly confidential.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
