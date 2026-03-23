'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hi! I'm your RF™ Booking Assistant 🌴 What cleaning problem can I help you solve today?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, userMsg] }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry! Call us at 443-856-3244!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, width: 60, height: 60, borderRadius: 30, background: 'linear-gradient(135deg,#006978,#0097A7)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,105,120,0.4)', fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {open ? '✕' : '🌴'}
      </button>
      {open && (
        <div style={{ position: 'fixed', bottom: 96, right: 24, zIndex: 999, width: 340, height: 480, borderRadius: 20, background: 'white', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1.5px solid #e0e6ea' }}>
          <div style={{ background: 'linear-gradient(135deg,#006978,#0097A7)', padding: '14px 16px', color: 'white' }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>🌴 RF™ Booking Assistant</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Residue Doesn't Survive Here™</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '9px 12px', borderRadius: 14, background: m.role === 'user' ? '#006978' : '#f4f7f8', color: m.role === 'user' ? 'white' : '#1a2e35', fontSize: 13, lineHeight: 1.5 }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ background: '#f4f7f8', padding: '9px 12px', borderRadius: 14, fontSize: 13, color: '#6b7280' }}>Thinking...</div></div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Carpet cleaning price?', 'Do you serve my area?', 'Book now'].map((q) => (
              <button key={q} onClick={() => setInput(q)} style={{ background: '#E0F7FA', border: '1px solid #0097A7', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: '#006978', cursor: 'pointer', fontWeight: 600 }}>{q}</button>
            ))}
          </div>
          <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about services, pricing..." style={{ flex: 1, border: '1.5px solid #e0e6ea', borderRadius: 10, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
            <button onClick={send} disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 18, background: !input.trim() ? '#d1d5db' : '#006978', border: 'none', cursor: !input.trim() ? 'not-allowed' : 'pointer', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}