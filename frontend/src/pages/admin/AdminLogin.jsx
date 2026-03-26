import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ email:'', password:'' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) { toast.success('Welcome back!'); navigate('/admin'); }
    else toast.error(result.message);
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0d1526 0%,#1c2a4a 50%,#0d1526 100%)', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:'22rem' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:'3.5rem', height:'3.5rem', background:'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius:'1rem', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', boxShadow:'0 8px 25px rgba(245,158,11,0.25)' }}>
            <BookOpen size={22} color="#0d1526" />
          </div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.75rem', color:'#fff', marginBottom:'0.25rem' }}>Admin Panel</h1>
          <p style={{ color:'#64748b', fontSize:'0.875rem' }}>ResearchAssist Pro</p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <div>
            <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Email Address</label>
            <div style={{ position:'relative' }}>
              <Mail size={15} color="#475569" style={{ position:'absolute', left:'0.875rem', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
              <input type="email" className="input" style={{ paddingLeft:'2.5rem' }} placeholder="admin@researchassistpro.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
          </div>
          <div>
            <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={15} color="#475569" style={{ position:'absolute', left:'0.875rem', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
              <input type="password" className="input" style={{ paddingLeft:'2.5rem' }} placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-gold" style={{ justifyContent:'center', marginTop:'0.25rem', opacity:loading?0.6:1 }}>
            {loading ? 'Signing in...' : 'Sign In to Admin'}
          </button>
        </form>
        <p style={{ textAlign:'center', color:'#475569', fontSize:'0.75rem', marginTop:'1rem' }}>
          Default: admin@researchassistpro.com / Admin@123
        </p>
      </div>
    </div>
  );
}
