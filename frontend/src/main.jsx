import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight:'100vh', background:'#0d1526', color:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', fontFamily:'sans-serif' }}>
          <div style={{ maxWidth:'600px', textAlign:'center' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>⚠️</div>
            <h2 style={{ color:'#f59e0b', marginBottom:'1rem', fontFamily:'Georgia,serif' }}>App Error</h2>
            <pre style={{ background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'0.5rem', fontSize:'0.8rem', textAlign:'left', overflow:'auto', color:'#f87171' }}>
              {this.state.error?.message}
            </pre>
            <button onClick={() => window.location.reload()} style={{ marginTop:'1.5rem', padding:'0.75rem 2rem', background:'#f59e0b', color:'#0d1526', border:'none', borderRadius:'0.5rem', cursor:'pointer', fontWeight:'600' }}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background:'#1c2a4a', color:'#e2e8f0', border:'1px solid rgba(255,255,255,0.1)' } }} />
    </BrowserRouter>
  </ErrorBoundary>
);
