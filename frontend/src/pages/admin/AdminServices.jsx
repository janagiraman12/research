import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

const categories = ['Manuscript Writing Support','Journal Support','Thesis/Dissertation','Conference Support','Technical Services'];
const empty = { title:'', description:'', category:'Manuscript Writing Support', icon:'DocumentText', order:0, isActive:true };

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'4rem 1rem', overflowY:'auto' }}>
      <div style={{ background:'#0d1a2e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'1rem', width:'100%', maxWidth:'30rem', padding:'1.75rem', boxShadow:'0 25px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <h2 style={{ color:'#fff', fontWeight:600, fontSize:'1rem' }}>{title}</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer' }}><X size={18}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminServices() {
  const { data: services, loading, refetch } = useFetch('/services/admin');
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const openAdd  = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ title:s.title, description:s.description, category:s.category, icon:s.icon||'DocumentText', order:s.order||0, isActive:s.isActive }); setEditing(s.id||s._id); setShowForm(true); };
  const close    = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title||!form.description) return toast.error('Title and description required.');
    setSaving(true);
    try {
      editing ? await api.put(`/services/${editing}`, form) : await api.post('/services', form);
      toast.success(editing ? 'Updated!' : 'Created!');
      close(); refetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}`); toast.success('Deleted.'); refetch(); }
    catch { toast.error('Failed.'); }
  };

  const lbl = (text) => <label style={{ display:'block', color:'#94a3b8', fontSize:'0.75rem', marginBottom:'0.375rem' }}>{text}</label>;

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff' }}>Services</h1>
          <p style={{ color:'#64748b', fontSize:'0.8rem' }}>{Array.isArray(services) ? services.length : 0} total</p>
        </div>
        <button onClick={openAdd} className="btn-gold" style={{ padding:'0.625rem 1.125rem', fontSize:'0.875rem', gap:'0.375rem' }}><Plus size={16}/>Add Service</button>
      </div>

      {showForm && (
        <Modal title={editing ? 'Edit Service' : 'Add New Service'} onClose={close}>
          <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div>{lbl('Title *')}<input className="admin-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Full Draft Writing" required /></div>
            <div>{lbl('Category *')}<select className="admin-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
            <div>{lbl('Description *')}<textarea className="admin-input" rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ resize:'vertical' }} required /></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div>{lbl('Icon Name')}<input className="admin-input" value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} placeholder="DocumentText" /></div>
              <div>{lbl('Order')}<input type="number" className="admin-input" value={form.order} onChange={e=>setForm({...form,order:+e.target.value})} /></div>
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#94a3b8', fontSize:'0.875rem', cursor:'pointer' }}>
              <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} /> Active (visible on website)
            </label>
            <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.5rem' }}>
              <button type="submit" disabled={saving} className="btn-gold" style={{ flex:1, justifyContent:'center', opacity:saving?0.6:1 }}><Save size={14}/>{saving?'Saving...':'Save'}</button>
              <button type="button" onClick={close} className="btn-outline" style={{ padding:'0.625rem 1rem' }}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'1rem', overflow:'hidden' }}>
        {loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'#64748b' }}>Loading...</div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.875rem' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Title','Category','Status','Actions'].map(h => (
                  <th key={h} style={{ textAlign:h==='Actions'?'right':'left', padding:'0.875rem 1.25rem', color:'#64748b', fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(services)?services:[]).map(s => (
                <tr key={s.id||s._id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#e2e8f0', fontWeight:500 }}>{s.title}</td>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#94a3b8' }}>{s.category}</td>
                  <td style={{ padding:'0.875rem 1.25rem' }}>
                    <span style={{ padding:'0.2rem 0.6rem', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:500, background:s.isActive?'rgba(16,185,129,0.1)':'rgba(248,113,113,0.1)', color:s.isActive?'#34d399':'#f87171' }}>
                      {s.isActive?'Active':'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding:'0.875rem 1.25rem', textAlign:'right' }}>
                    <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem' }}>
                      <button onClick={()=>openEdit(s)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer', transition:'all 0.15s' }} onMouseEnter={e=>{e.currentTarget.style.color='#f59e0b';e.currentTarget.style.background='rgba(245,158,11,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Pencil size={14}/></button>
                      <button onClick={()=>handleDelete(s.id||s._id)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer', transition:'all 0.15s' }} onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && Array.isArray(services) && services.length === 0 && (
          <p style={{ textAlign:'center', color:'#64748b', padding:'3rem', fontSize:'0.875rem' }}>No services yet. Click "Add Service" to create one.</p>
        )}
      </div>
    </div>
  );
}
