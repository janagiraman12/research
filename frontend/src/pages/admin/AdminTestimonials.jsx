import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

const empty = { name:'', designation:'Researcher', institution:'', feedback:'', rating:5, isActive:true };

export default function AdminTestimonials() {
  const { data: testimonials, loading, refetch } = useFetch('/testimonials/admin');
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const openAdd  = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ name:t.name, designation:t.designation, institution:t.institution||'', feedback:t.feedback, rating:t.rating, isActive:t.isActive }); setEditing(t.id||t._id); setShowForm(true); };
  const close = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      editing ? await api.put(`/testimonials/${editing}`, form) : await api.post('/testimonials', form);
      toast.success(editing ? 'Updated!' : 'Added!');
      close(); refetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted.'); refetch(); }
    catch { toast.error('Failed.'); }
  };

  const lbl = (text) => <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>{text}</label>;

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff' }}>Testimonials</h1>
          <p style={{ color:'#64748b', fontSize:'0.8rem' }}>{Array.isArray(testimonials)?testimonials.length:0} reviews</p>
        </div>
        <button onClick={openAdd} className="btn-gold" style={{ padding:'0.625rem 1.125rem', fontSize:'0.875rem', gap:'0.375rem' }}><Plus size={16}/>Add Testimonial</button>
      </div>

      {showForm && (
        <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'4rem 1rem', overflowY:'auto' }}>
          <div style={{ background:'#0d1a2e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'1rem', width:'100%', maxWidth:'28rem', padding:'1.75rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h2 style={{ color:'#fff', fontWeight:600, fontSize:'1rem' }}>{editing?'Edit':'Add'} Testimonial</h2>
              <button onClick={close} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer' }}><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>{lbl('Name *')}<input className="admin-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Dr. Jane Smith" required /></div>
                <div>{lbl('Designation')}<input className="admin-input" value={form.designation} onChange={e=>setForm({...form,designation:e.target.value})} placeholder="PhD Scholar" /></div>
              </div>
              <div>{lbl('Institution')}<input className="admin-input" value={form.institution} onChange={e=>setForm({...form,institution:e.target.value})} placeholder="IIT Madras" /></div>
              <div>{lbl('Feedback *')}<textarea className="admin-input" rows={4} value={form.feedback} onChange={e=>setForm({...form,feedback:e.target.value})} placeholder="Write the testimonial..." required style={{ resize:'vertical' }} /></div>
              <div>
                {lbl('Rating')}
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={()=>setForm({...form,rating:n})} style={{ background:'none', border:'none', cursor:'pointer', padding:'0.25rem' }}>
                      <Star size={22} color="#f59e0b" fill={n<=form.rating?'#f59e0b':'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#94a3b8', fontSize:'0.875rem', cursor:'pointer' }}>
                <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} /> Show on website
              </label>
              <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.5rem' }}>
                <button type="submit" disabled={saving} className="btn-gold" style={{ flex:1, justifyContent:'center', opacity:saving?0.6:1 }}><Save size={14}/>{saving?'Saving...':'Save'}</button>
                <button type="button" onClick={close} className="btn-outline" style={{ padding:'0.625rem 1rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div style={{ textAlign:'center', padding:'4rem', color:'#64748b' }}>Loading...</div> : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1rem' }}>
          {(Array.isArray(testimonials)?testimonials:[]).map(t => (
            <div key={t.id||t._id} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'1rem', padding:'1.25rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem' }}>{t.name}</div>
                  <div style={{ color:'#64748b', fontSize:'0.75rem' }}>{t.designation}{t.institution?`, ${t.institution}`:''}</div>
                </div>
                <div style={{ display:'flex', gap:'0.25rem' }}>
                  <button onClick={()=>openEdit(t)} style={{ padding:'0.35rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#f59e0b';e.currentTarget.style.background='rgba(245,158,11,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Pencil size={13}/></button>
                  <button onClick={()=>handleDelete(t.id||t._id)} style={{ padding:'0.35rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Trash2 size={13}/></button>
                </div>
              </div>
              <p style={{ color:'#94a3b8', fontSize:'0.8rem', lineHeight:1.7, flexGrow:1 }}>"{t.feedback}"</p>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.5rem', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display:'flex', gap:'2px' }}>{[1,2,3,4,5].map(n=><Star key={n} size={12} color="#f59e0b" fill={n<=t.rating?'#f59e0b':'none'}/>)}</div>
                <span style={{ padding:'0.15rem 0.5rem', borderRadius:'9999px', fontSize:'0.7rem', background:t.isActive?'rgba(16,185,129,0.1)':'rgba(248,113,113,0.1)', color:t.isActive?'#34d399':'#f87171' }}>{t.isActive?'Active':'Hidden'}</span>
              </div>
            </div>
          ))}
          {(!testimonials||testimonials.length===0) && <p style={{ color:'#64748b', gridColumn:'1/-1', textAlign:'center', padding:'3rem', fontSize:'0.875rem' }}>No testimonials yet.</p>}
        </div>
      )}
    </div>
  );
}
