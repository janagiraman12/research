import { useState } from 'react';
import { Mail, Trash2, Eye, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

const statusStyle = {
  new:     { background:'rgba(245,158,11,0.1)',  color:'#f59e0b',  border:'1px solid rgba(245,158,11,0.2)' },
  read:    { background:'rgba(59,130,246,0.1)',  color:'#60a5fa',  border:'1px solid rgba(59,130,246,0.2)' },
  replied: { background:'rgba(16,185,129,0.1)',  color:'#34d399',  border:'1px solid rgba(16,185,129,0.2)' },
};

export default function AdminContacts() {
  const { data: contacts, loading, refetch } = useFetch('/contacts');
  const [selected, setSelected] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contacts/${id}`, { status });
      refetch();
      if (selected?._id === id || selected?.id === id) setSelected({ ...selected, status });
    } catch { toast.error('Failed to update.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try { await api.delete(`/contacts/${id}`); toast.success('Deleted.'); setSelected(null); refetch(); }
    catch { toast.error('Failed.'); }
  };

  const openContact = (c) => {
    setSelected(c);
    if (c.status === 'new') updateStatus(c.id || c._id, 'read');
  };

  const newCount = Array.isArray(contacts) ? contacts.filter(c=>c.status==='new').length : 0;

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.75rem' }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', color:'#fff' }}>Contact Submissions</h1>
          <p style={{ color:'#64748b', fontSize:'0.8rem' }}>{Array.isArray(contacts)?contacts.length:0} total · {newCount} new</p>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'4rem 1rem', overflowY:'auto' }}>
          <div style={{ background:'#0d1a2e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'1rem', width:'100%', maxWidth:'28rem', padding:'1.75rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h2 style={{ color:'#fff', fontWeight:600, fontSize:'1rem' }}>Contact Detail</h2>
              <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer' }}><X size={18}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem', fontSize:'0.875rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                {[['Name',selected.name,null],['Email',selected.email,`mailto:${selected.email}`]].map(([l,v,h])=>(
                  <div key={l}><div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.25rem' }}>{l}</div>{h?<a href={h} style={{ color:'#f59e0b', textDecoration:'none' }}>{v}</a>:<span style={{ color:'#e2e8f0' }}>{v}</span>}</div>
                ))}
                {selected.phone && <div><div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.25rem' }}>Phone</div><span style={{ color:'#e2e8f0' }}>{selected.phone}</span></div>}
                {selected.subject && <div><div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.25rem' }}>Subject</div><span style={{ color:'#e2e8f0' }}>{selected.subject}</span></div>}
              </div>
              <div><div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.5rem' }}>Message</div><div style={{ background:'rgba(255,255,255,0.04)', borderRadius:'0.625rem', padding:'1rem', color:'#94a3b8', lineHeight:1.7 }}>{selected.message}</div></div>
              <div><div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.25rem' }}>Received</div><span style={{ color:'#e2e8f0' }}>{new Date(selected.createdAt).toLocaleString('en-IN')}</span></div>
              <div>
                <div style={{ color:'#64748b', fontSize:'0.7rem', marginBottom:'0.5rem' }}>Update Status</div>
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  {['new','read','replied'].map(s=>(
                    <button key={s} onClick={()=>updateStatus(selected.id||selected._id,s)} style={{ padding:'0.25rem 0.75rem', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:600, cursor:'pointer', textTransform:'capitalize', transition:'all 0.15s', ...statusStyle[s], opacity:selected.status===s?1:0.4 }}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.5rem' }}>
                <a href={`mailto:${selected.email}`} className="btn-gold" style={{ flex:1, justifyContent:'center', textDecoration:'none' }}><Mail size={14}/>Reply via Email</a>
                <button onClick={()=>handleDelete(selected.id||selected._id)} className="btn-outline" style={{ padding:'0.625rem 1rem', color:'#f87171', borderColor:'rgba(248,113,113,0.3)' }}><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'1rem', overflow:'hidden' }}>
        {loading ? <div style={{ textAlign:'center', padding:'4rem', color:'#64748b' }}>Loading...</div> : (
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.875rem' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                {['Name','Email','Subject','Status','Date',''].map((h,i)=>(
                  <th key={i} style={{ textAlign:i===5?'right':'left', padding:'0.875rem 1.25rem', color:'#64748b', fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(contacts)?contacts:[]).map(c=>(
                <tr key={c.id||c._id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background:c.status==='new'?'rgba(245,158,11,0.02)':'transparent' }}>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#e2e8f0', fontWeight:500 }}>{c.name}</td>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#94a3b8' }}>{c.email}</td>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#64748b', maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.subject||'—'}</td>
                  <td style={{ padding:'0.875rem 1.25rem' }}><span style={{ padding:'0.2rem 0.6rem', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:600, textTransform:'capitalize', ...statusStyle[c.status] }}>{c.status}</span></td>
                  <td style={{ padding:'0.875rem 1.25rem', color:'#475569', fontSize:'0.8rem' }}>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding:'0.875rem 1.25rem', textAlign:'right' }}>
                    <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem' }}>
                      <button onClick={()=>openContact(c)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#60a5fa';e.currentTarget.style.background='rgba(59,130,246,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Eye size={14}/></button>
                      <button onClick={()=>handleDelete(c.id||c._id)} style={{ padding:'0.375rem', borderRadius:'0.5rem', background:'none', border:'none', color:'#64748b', cursor:'pointer' }} onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.1)';}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='none';}}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && Array.isArray(contacts) && contacts.length===0 && <p style={{ textAlign:'center', color:'#64748b', padding:'3rem', fontSize:'0.875rem' }}>No contact submissions yet.</p>}
      </div>
    </div>
  );
}
