import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

const tiers = ['Basic','Professional','Premium'];
const empty = { serviceName:'', tier:'Basic', price:'', description:'', features:'', isPopular:false, isActive:true };

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'3rem 1rem', overflowY:'auto' }}>
      <div style={{ background:'#0d1a2e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'1rem', width:'100%', maxWidth:'30rem', padding:'1.75rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <h2 style={{ color:'#fff', fontWeight:600, fontSize:'1rem' }}>{title}</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer' }}><X size={18}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminPricing() {
  const { data: pricing, loading, refetch } = useFetch('/pricing/admin');
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const openAdd  = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ serviceName:p.serviceName, tier:p.tier, price:p.price, description:p.description, features:Array.isArray(p.features)?p.features.join('\n'):'', isPopular:p.isPopular, isActive:p.isActive }); setEditing(p.id||p._id); setShowForm(true); };
  const close = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form, features: form.features.split('\n').map(f=>f.trim()).filter(Boolean) };
    setSaving(true);
    try {
      editing ? await api.put(`/pricing/${editing}`, payload) : await api.post('/pricing', payload);
      toast.success(editing ? 'Updated!' : 'Created!');
      close(); refetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try { await api.delete(`/pricing/${id}`); toast.success('Deleted.'); refetch(); }
    catch { toast.error('Failed.'); }
  };

  const lbl = (text) => <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>{text}</label>;
  const tierColor = { Basic:'#94a3b8', Professional:'#f59e0b', Premium:'#a5b9fd' };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff' }}>Pricing Plans</h1>
          <p style={{ color:'#64748b', fontSize:'0.8rem' }}>{Array.isArray(pricing) ? pricing.length : 0} plans</p>
        </div>
        <button onClick={openAdd} className="btn-gold" style={{ padding:'0.625rem 1.125rem', fontSize:'0.875rem', gap:'0.375rem' }}><Plus size={16}/>Add Plan</button>
      </div>

      {showForm && (
        <Modal title={editing?'Edit Plan':'Add Pricing Plan'} onClose={close}>
          <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div>{lbl('Service Name *')}<input className="admin-input" value={form.serviceName} onChange={e=>setForm({...form,serviceName:e.target.value})} placeholder="e.g. Full Paper Writing" required /></div>
              <div>{lbl('Tier *')}<select className="admin-input" value={form.tier} onChange={e=>setForm({...form,tier:e.target.value})}>{tiers.map(t=><option key={t}>{t}</option>)}</select></div>
            </div>
            <div>{lbl('Price *')}<input className="admin-input" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="e.g. ₹5,000 – ₹10,000" required /></div>
            <div>{lbl('Description *')}<textarea className="admin-input" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ resize:'vertical' }} required /></div>
            <div>{lbl('Features (one per line)')}<textarea className="admin-input" rows={5} value={form.features} onChange={e=>setForm({...form,features:e.target.value})} placeholder={'Up to 7000 words\nPlagiarism report\n3 revisions'} style={{ resize:'vertical', fontFamily:'monospace', fontSize:'0.8rem' }} /></div>
            <div style={{ display:'flex', gap:'1.5rem' }}>
              <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#94a3b8', fontSize:'0.875rem', cursor:'pointer' }}><input type="checkbox" checked={form.isPopular} onChange={e=>setForm({...form,isPopular:e.target.checked})} /> Popular</label>
              <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#94a3b8', fontSize:'0.875rem', cursor:'pointer' }}><input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} /> Active</label>
            </div>
            <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.5rem' }}>
              <button type="submit" disabled={saving} className="btn-gold" style={{ flex:1, justifyContent:'center', opacity:saving?0.6:1 }}><Save size={14}/>{saving?'Saving...':'Save Plan'}</button>
              <button type="button" onClick={close} className="btn-outline" style={{ padding:'0.625rem 1rem' }}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'1rem', overflow:'hidden' }}>
        {loading ? <div style={{ textAlign:'center', padding:'4rem', color:'#64748b' }}>Loading...</div> : (
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.875rem' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Service','Tier','Price','Status','Actions'].map(h=>(
                  <th key={h} style={{ textAlign:h==='Actions'?'right':'left', padding:'0.875rem 1.25rem', color:'#64748b', fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(pricing)?pricing:[]).map(p=>(
                <tr key={p.id||p._id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#e2e8f0', fontWeight:500 }}>{p.serviceName}</td>
                  <td style={{ padding:'0.875rem 1.25rem', fontWeight:600, color:tierColor[p.tier]||'#94a3b8' }}>{p.tier}</td>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#94a3b8', fontFamily:'monospace', fontSize:'0.8rem' }}>{p.price}</td>
                  <td style={{ padding:'0.875rem 1.25rem' }}>
                    <span style={{ padding:'0.2rem 0.6rem', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:500, background:p.isActive?'rgba(16,185,129,0.1)':'rgba(248,113,113,0.1)', color:p.isActive?'#34d399':'#f87171' }}>{p.isActive?'Active':'Off'}</span>
                  </td>
                  <td style={{ padding:'0.875rem 1.25rem', textAlign:'right' }}>
                    <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem' }}>
                      <button onClick={()=>openEdit(p)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#f59e0b';e.currentTarget.style.background='rgba(245,158,11,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Pencil size={14}/></button>
                      <button onClick={()=>handleDelete(p.id||p._id)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && Array.isArray(pricing) && pricing.length===0 && <p style={{ textAlign:'center', color:'#64748b', padding:'3rem', fontSize:'0.875rem' }}>No plans yet.</p>}
      </div>
    </div>
  );
}
