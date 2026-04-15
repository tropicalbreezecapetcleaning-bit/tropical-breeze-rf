'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const API = 'https://vzyz64q319.execute-api.us-east-1.amazonaws.com/prod/booking';
const SPRING = 0.10;

const CARPET_ROOMS = ['LR','BR 1','BR 2','BR 3','BR 4','OF','DN','ST','ENTRY','HALL','DR','LOFT','PORCH','BONUS'];
const HARDWOOD_ROOMS = ['LR','DR','KT','HL','OF','BR 1','ST','LOFT'];
const TILE_ROOMS = ['KT','LR','DN','HL','PORCH','LNDRY','MUD','SUNRM'];
const BATH_ROOMS = ['MB','BT 2','BT 3','HALF','POOL','SHOW'];

const GROUT_COLORS = [
  { id:'white',    name:'White',     hex:'#FFFFFF', light:true  },
  { id:'bone',     name:'Bone',      hex:'#E8DCC8', light:true  },
  { id:'almond',   name:'Almond',    hex:'#D4B896', light:true  },
  { id:'beige',    name:'Beige',     hex:'#C8A882', light:true  },
  { id:'pewter',   name:'Pewter',    hex:'#A89880', light:true  },
  { id:'gray',     name:'Gray',      hex:'#8C8C8C', light:false },
  { id:'silverado',name:'Silverado', hex:'#6B7280', light:false },
  { id:'charcoal', name:'Charcoal',  hex:'#4B4B4B', light:false },
  { id:'brown',    name:'Brown',     hex:'#6B4226', light:false },
  { id:'black',    name:'Black',     hex:'#1A1A1A', light:false },
];

const REFERRAL = [
  { id:'google',    emoji:'🔍', label:'Google'        },
  { id:'facebook',  emoji:'👍', label:'Facebook'      },
  { id:'instagram', emoji:'📸', label:'Instagram'     },
  { id:'neighbor',  emoji:'🏘️', label:'Neighbor'      },
  { id:'returning', emoji:'🔁', label:'Returning'     },
  { id:'airbnb',    emoji:'🏖️', label:'Airbnb / VRBO' },
  { id:'bizcard',   emoji:'🪪', label:'Business Card' },
  { id:'bing',      emoji:'🤖', label:'Bing AI'       },
  { id:'other',     emoji:'✅', label:'Other'         },
];

const PACKAGES = [
  { id:'rf99_starter',      badge:'Most Popular', badgeBg:'#e8f5e9', badgeColor:'#2e7d32', emoji:'🧹', name:'RF99™ Starter',      sub:'Perfect first-time clean · 1 room',     features:['1 Carpet Room','RF99™ Process'],           savings:'Save $26 off regular price', price:99,  original:125, apply:(q)=>({...q,carpetRooms:['LR']}) },
  { id:'home_clean',        badge:'Best Value',   badgeBg:'#fff8e1', badgeColor:'#f57f17', emoji:'🏠', name:'Home Clean',          sub:'3 bedrooms + tile · most booked',       features:['3 Carpet Rooms','1 Tile Room'],             savings:'Saves $47 with Mix & Match',  price:277, original:324, apply:(q)=>({...q,carpetRooms:['LR','BR 1','BR 2'],tileRooms:['KT']}) },
  { id:'upholstery_refresh',badge:'New Package',  badgeBg:'#fce4ec', badgeColor:'#c62828', emoji:'🛋️', name:'Upholstery Refresh',  sub:'Sofa + loveseat + 2 chairs',            features:['1 Sofa','1 Loveseat','2 Chairs','Fabric Protector'], savings:'Saves $27 with Spring discount', price:242, original:269, apply:(q)=>({...q,sofas:1,loveseats:1,chairs:2,upholProtect:true}) },
  { id:'full_house',        badge:'Full Service', badgeBg:'#e8eaf6', badgeColor:'#283593', emoji:'🏡', name:'Full House',          sub:'Whole home deep clean',                  features:['5 Carpet','2 Tile','10 Windows'],          savings:'Saves $98 with Mix & Match',  price:581, original:679, apply:(q)=>({...q,carpetRooms:['LR','BR 1','BR 2','BR 3','BR 4'],tileRooms:['KT','LR'],windows:10}) },
  { id:'pet_home',          badge:'Pet Special',  badgeBg:'#e0f2f1', badgeColor:'#00695c', emoji:'🐾', name:'Pet Home',            sub:'Odor & stain elimination',               features:['3 Carpet','Deodorizer','Scotchgard'],      savings:'Saves $33 with Spring discount', price:301, original:334, apply:(q)=>({...q,carpetRooms:['LR','BR 1','BR 2'],deodorizer:true,scotchgard:true}) },
  { id:'vacation_rental',   badge:'Shore Special',badgeBg:'#e3f2fd', badgeColor:'#1565c0', emoji:'🏖️', name:'Vacation Rental',     sub:'Guest-ready in one visit',               features:['3 Carpet','2 Bathrooms','12 Windows'],     savings:'Saves $88 with Mix & Match',  price:517, original:605, apply:(q)=>({...q,carpetRooms:['LR','BR 1','BR 2'],bathrooms:['MB','BT 2'],windows:12}) },
];

// Deep-sell add-on modal configs — auto-trigger on first room/piece selection
const SERVICE_ADDONS = {
  carpet: {
    headline: 'One quick upgrade before we move on',
    subhead: `73% of customers add at least one of these — here's why`,
    why: `Your RF99™ clean removes everything down to the fiber. These add-ons lock in those results so your carpets don't re-soil in 2 weeks like they did with the last company.`,
    addons: [
      {
        key: 'scotchgard',
        emoji: '🛡️',
        name: 'Scotchgard™ Protector',
        hook: 'Without this, spills go straight into the fiber.',
        desc: 'Creates an invisible barrier on every fiber — repels spills, pet accidents, and foot traffic oils before they can bond. Most customers say their carpets look new 6 months later.',
        social: '68% of repeat customers add this every visit',
        result: 'Extends your clean 3× longer — proven.',
        priceLabel: (q) => q.carpetRooms.length > 0 ? `+$${q.carpetRooms.length * 30}` : '+$30/room',
      },
      {
        key: 'deodorizer',
        emoji: '🌬️',
        name: 'Deodorizer Treatment',
        hook: 'Cleaning removes the stain. This removes the smell.',
        desc: `RF99™ cleans what you can see. Our enzyme-based deodorizer destroys the odor molecules trapped deep in the pad — the ones vacuums and standard cleaning can't reach. Works on pet, smoke, mildew, and everything in between.`,
        social: 'Every pet home customer adds this — no exceptions',
        result: 'Most customers say the difference is immediate.',
        priceLabel: (q) => q.carpetRooms.length > 0 ? `+$${q.carpetRooms.length * 25}` : '+$25/room',
      },
    ],
  },
  tile: {
    headline: 'Your grout is clean — now protect it',
    subhead: 'Most people skip this. Then call us 6 months later.',
    why: 'We just blasted years of buildup out of your grout. But open grout pores re-absorb dirt within days. These treatments seal that work in — permanently.',
    addons: [
      {
        key: 'groutSealing',
        emoji: '🔒',
        name: 'Grout Sealing',
        hook: `Clean grout re-dirties in 7–10 days without this.`,
        desc: `After cleaning, your grout pores are wide open — basically a dirt magnet. Grout sealing closes those pores with a clear penetrating sealer that locks out future staining. Your floors stay cleaner for months, not days.`,
        social: `81% of tile customers add sealing — the ones who skip always regret it`,
        result: 'Same-day application. Dry in 2 hours.',
        priceLabel: (q) => { const tc = q.tileRooms.length + q.bathrooms.length; return tc > 0 ? `+$${Math.round(tc * 125 * 0.5)}` : '+$62/room'; },
      },
      {
        key: 'colorSeal',
        emoji: '🎨',
        name: 'Color Seal',
        hook: 'Restore your grout to any color — permanently.',
        desc: 'If your grout has stained, faded, or turned orange from sprinkler water, color seal restores and permanently dyes it to the color of your choice. Unlike paint, it penetrates the grout — it won't chip, peel, or wash off. This is a permanent transformation.',
        social: 'Our most-requested service in vacation rentals and flips',
        result: 'Looks like new tile. Costs a fraction of replacement.',
        priceLabel: (q) => { const tc = q.tileRooms.length + q.bathrooms.length; return tc > 0 ? `+$${tc * 125}` : '+$125/room'; },
      },
    ],
  },
  upholstery: {
    headline: 'Protect what you just cleaned',
    subhead: 'Your furniture took years to get dirty. These keep it clean.',
    why: `Clean fabric is actually the best time to apply protection — the fibers are open and the treatment bonds at the deepest level. Waiting until next time means the dirt gets there first.`,
    addons: [
      {
        key: 'upholProtect',
        emoji: '🛡️',
        name: 'Fabric Protector',
        hook: 'One spill can undo everything we just did.',
        desc: 'Applied right after cleaning while fibers are open, our fabric protector creates a molecular shield around each fiber. Spills bead up and wipe away instead of soaking in. Works on all fabric types — sofa, loveseat, chairs, ottomans.',
        social: '76% of customers with kids or pets add this',
        result: '$20/piece. The sofa alone costs $85 to reclean.',
        priceLabel: (q) => { const p = q.sofas + q.loveseats + q.chairs + q.ottomans; return p > 0 ? `+$${p * 20}` : '+$20/piece'; },
      },
      {
        key: 'upholDeodor',
        emoji: '🌬️',
        name: 'Deodorizer Treatment',
        hook: 'Fabric holds odors long after the stain is gone.',
        desc: 'Furniture absorbs every cooking smell, pet accident, sweat, and smoke odor over years — and fabric cleaning alone doesn't break those molecules down. Our enzyme-based deodorizer destroys odor at the molecular level, not just masks it with fragrance.',
        social: 'Standard addition on every pet home and vacation rental',
        result: 'Guests and family notice the difference immediately.',
        priceLabel: (q) => { const p = q.sofas + q.loveseats + q.chairs + q.ottomans; return p > 0 ? `+$${p * 25}` : '+$25/piece'; },
      },
    ],
  },
  windows: {
    headline: `While we're already on your windows`,
    subhead: 'Takes 10 minutes. Makes a visible difference.',
    why: `Screens and tracks are the most neglected part of any window — and the dirtiest. Salt air, pollen, and mold build up in the tracks and blow back onto your clean glass every time you open the window.`,
    addons: [
      {
        key: 'screenTrack',
        emoji: '🔘',
        name: 'Screen & Track Cleaning',
        hook: 'Dirty tracks blow dust back onto clean glass.',
        desc: 'We remove every screen, deep-clean the mesh with a soft brush and solution, and extract years of grime from the tracks. Shore homes especially accumulate salt residue and pollen in the tracks that standard cleaning misses entirely.',
        social: 'Included at no charge when added today',
        result: 'Clean glass. Clean screens. No recontamination.',
        priceLabel: () => 'Included today',
      },
    ],
  },
};

// Simulated booked slots
function fmtDate(d) {
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function daysFrom(n) { const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return d; }
const BOOKED_SLOTS = {
  [fmtDate(new Date())]: ['morning'],
  [fmtDate(daysFrom(1))]: ['morning','midday'],
  [fmtDate(daysFrom(3))]: ['morning','midday','afternoon'],
  [fmtDate(daysFrom(7))]: ['morning'],
  [fmtDate(daysFrom(8))]: ['midday'],
  [fmtDate(daysFrom(10))]: ['morning','midday'],
};
const TIME_SLOTS = [
  { id:'morning',   label:'Morning',   sub:'8–11am'    },
  { id:'midday',    label:'Midday',    sub:'11am–2pm'  },
  { id:'afternoon', label:'Afternoon', sub:'2–5pm'     },
];

// ─── INITIAL STATE ────────────────────────────────────────────────────────────
const initQuote = () => ({
  carpetRooms:[], tileRooms:[], bathrooms:[],
  scotchgard:false, deodorizer:false,
  hardwoodSqft:'',
  groutSealing:false, colorSeal:false, groutColor:'',
  sofas:0, loveseats:0, chairs:0, ottomans:0,
  diningChairs:0, diningChairType:'seat_back', sectionalFt:'',
  upholProtect:false, upholDeodor:false,
  windows:0, ezBreeze:0, stormWindows:0, glassDoors:0, screenTrack:false,
  rugSmall:0, rugMedium:0, rugLarge:0, rugOversized:0,
});
const initForm = () => ({
  name:'', phone:'', email:'',
  date:'', time:'',
  address:'', city:'', state:'MD', zip:'',
  textConfirm:true, referral:'', promoCode:'', promoApplied:false, notes:'',
});

// ─── PRICE CALC ───────────────────────────────────────────────────────────────
function calcTotal(q, hardwoodSqft, sectionalFt) {
  let t = 0;
  const cr = q.carpetRooms.length;
  if (cr>0) t += 99 + Math.max(0,cr-1)*50;
  if (q.scotchgard) t += 30*cr;
  if (q.deodorizer) t += 25*cr;
  t += (parseFloat(hardwoodSqft)||0)*1.0;
  const tc = q.tileRooms.length+q.bathrooms.length;
  t += tc*125;
  if (q.groutSealing) t += Math.round(tc*125*0.5);
  if (q.colorSeal)    t += tc*125;
  const pieces = q.sofas+q.loveseats+q.chairs+q.ottomans;
  t += q.sofas*85+q.loveseats*75+q.chairs*50+q.ottomans*35;
  t += q.diningChairs*(q.diningChairType==='seat_only'?10:13);
  t += (parseFloat(sectionalFt)||0)*11;
  if (q.upholProtect && pieces>0) t += pieces*20;
  if (q.upholDeodor  && pieces>0) t += pieces*25;
  t += q.windows*13+(q.glassDoors||0)*25+q.ezBreeze*15;
  if (q.ezBreeze>0) t += 35;
  t += q.rugSmall*150+q.rugMedium*200+q.rugLarge*270+q.rugOversized*370;
  const svcTypes = [cr>0,(parseFloat(hardwoodSqft)||0)>0,tc>0,pieces>0,(q.windows+q.ezBreeze+q.glassDoors)>0,(q.rugSmall+q.rugMedium+q.rugLarge+q.rugOversized)>0].filter(Boolean).length;
  if (svcTypes>=2) t *= 0.95;
  t *= (1-SPRING);
  return Math.round(t);
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BookingPage() {
  const [step, setStep]               = useState('packages');
  const [quote, setQuote]             = useState(initQuote());
  const [form, setForm]               = useState(initForm());
  const [hardwoodSqft, setHardwoodSqft] = useState('');
  const [sectionalFt, setSectionalFt]   = useState('');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [upsells, setUpsells]         = useState({ starter:false, mix:false });
  const [errors, setErrors]           = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [confNum, setConfNum]         = useState('');

  // Popups
  const [entryPopup, setEntryPopup]   = useState(false);
  const [addonModal, setAddonModal]   = useState(null);
  const [shownAddons, setShownAddons]   = useState(new Set()); // tracks which services already auto-triggered
  const addonTimerRef = useRef(null);

  // Calendar
  const [calYear, setCalYear]   = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selDate, setSelDate]   = useState('');
  const [selSlot, setSelSlot]   = useState('');

  // Chat
  const [chatOpen, setChatOpen]     = useState(false);
  const [chatMsgs, setChatMsgs]     = useState([{ from:'bot', text:"Hey! 👋 I'm Dalton — owner of Tropical Breeze RF™. What can I help you with today?" }]);
  const [chatInput, setChatInput]   = useState('');
  const [chatQuickDone, setChatQuickDone] = useState(false);

  const total = calcTotal(quote, hardwoodSqft, sectionalFt);

  // Auto-trigger add-on modal once per service when customer first selects
  function autoTrigger(service) {
    if (shownAddons.has(service) || addonModal) return;
    if (addonTimerRef.current) clearTimeout(addonTimerRef.current);
    addonTimerRef.current = setTimeout(() => {
      setAddonModal(service);
      setShownAddons(prev => new Set([...prev, service]));
    }, 800);
  }

  // Entry popup — fire after 2s
  useEffect(() => {
    const t = setTimeout(() => setEntryPopup(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // helpers
  const setQ = useCallback((key, val) => setQuote(p => ({...p, [key]:val})), []);
  const setF = useCallback((key, val) => { setForm(p => ({...p, [key]:val})); setErrors(p => ({...p, [key]:false})); }, []);

  function toggleRoom(arr, room) {
    return arr.includes(room) ? arr.filter(r=>r!==room) : [...arr, room];
  }

  function applyPackage(pkg) {
    const reset = initQuote();
    setQuote(pkg.apply(reset));
    setSelectedPkg(pkg);
    setStep('builder');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g,''))) e.phone = true;
    if (!form.date || !form.time) e.date = true;
    if (!form.address.trim()) e.address = true;
    if (!form.city.trim()) e.city = true;
    if (!/^\d{5}$/.test(form.zip)) e.zip = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitBooking() {
    setSubmitting(true);
    const payload = { quote, form, hardwoodSqft, sectionalFt, upsells, total, selectedPackage: selectedPkg?.id||'custom', timestamp: new Date().toISOString() };
    try {
      const res = await fetch(API, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      setConfNum(data.confirmationNumber || 'TB'+Date.now().toString().slice(-6));
    } catch {
      setConfNum('TB'+Date.now().toString().slice(-6));
    }
    setStep('done');
    setSubmitting(false);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function resetAll() {
    setStep('packages'); setQuote(initQuote()); setForm(initForm());
    setHardwoodSqft(''); setSectionalFt(''); setSelectedPkg(null);
    setUpsells({starter:false,mix:false}); setSelDate(''); setSelSlot('');
    setErrors({}); setConfNum('');
  }

  // Chat
  function sendChat(text) {
    setChatMsgs(p=>[...p,{from:'user',text}]);
    setChatQuickDone(true);
    const replies = {
      'Pricing question':"RF99™ starts at $99/room, $50 each additional. Tile is $125/room. Spring discount is live — 10% off everything!",
      'Do you service my area?':"We serve 33+ cities across MD and DE Eastern Shore — Salisbury, Ocean City, Rehoboth, Georgetown, and everywhere in between.",
      'Pet odor help':"Our deodorizer eliminates odors at the source. Combined with RF99™ carpet cleaning it's our most effective pet home combo.",
      'Vacation rental':"We work with tons of Airbnb & VRBO owners. Our Vacation Rental package — 3 carpets + 2 baths + 12 windows — gets you guest-ready in one visit.",
    };
    setTimeout(()=>setChatMsgs(p=>[...p,{from:'bot',text:replies[text]||"Great question! Call us at (443) 856-3244 and we'll sort you out right away."}]),700);
  }

  // Calendar helpers
  function getDayStatus(dateStr) {
    const booked = BOOKED_SLOTS[dateStr]||[];
    const d = new Date(dateStr);
    if (d.getDay()===0) return 'full';
    if (booked.length===0) return 'avail';
    if (booked.length<=2) return 'limited';
    return 'full';
  }
  function nextAvailable() {
    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    for(let i=0;i<14;i++){
      const d=daysFrom(i); const ds=fmtDate(d);
      if(d.getDay()!==0 && getDayStatus(ds)!=='full') return days[d.getDay()]+', '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
    }
    return 'Contact us';
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* ── ENTRY POPUP ── */}
      {entryPopup && (
        <div style={s.overlay} onClick={()=>setEntryPopup(false)}>
          <div style={s.entryModal} onClick={e=>e.stopPropagation()}>
            <button style={s.modalClose} onClick={()=>setEntryPopup(false)}>✕</button>
            <div style={s.entryEmoji}>🌴</div>
            <h2 style={s.entryTitle}>Book in 30 Seconds</h2>
            <p style={s.entrySub}>Pick a package below — we handle the rest. Spring discount applied automatically.</p>
            <div style={s.entryPackages}>
              {PACKAGES.slice(0,3).map(pkg=>(
                <button key={pkg.id} style={s.entryPkgBtn} onClick={()=>{ setEntryPopup(false); applyPackage(pkg); }}>
                  <span style={{fontSize:18}}>{pkg.emoji}</span>
                  <div style={{flex:1,textAlign:'left'}}>
                    <div style={{fontWeight:700,fontSize:13}}>{pkg.name}</div>
                    <div style={{fontSize:11,color:'#888'}}>{pkg.sub}</div>
                  </div>
                  <span style={{fontWeight:800,color:TEAL,fontSize:15}}>${pkg.price}</span>
                </button>
              ))}
            </div>
            <button style={s.entryCustomBtn} onClick={()=>{ setEntryPopup(false); setStep('builder'); }}>
              Build Custom Quote →
            </button>
            <p style={{fontSize:11,color:'#aaa',marginTop:8,textAlign:'center'}}>🌸 Spring 10% off applied automatically</p>
          </div>
        </div>
      )}

      {/* ── ADD-ON MODAL ── */}
      {addonModal && (
        <div style={s.overlay} onClick={()=>setAddonModal(null)}>
          <div style={s.addonModal} onClick={e=>e.stopPropagation()}>
            <button style={s.modalClose} onClick={()=>setAddonModal(null)}>✕</button>

            {/* HEADLINE */}
            <div style={{background:`linear-gradient(135deg,${TEAL},${TEAL_DARK})`,borderRadius:14,padding:'16px 18px',marginBottom:16,color:'#fff'}}>
              <div style={{fontSize:11,letterSpacing:2,opacity:0.75,textTransform:'uppercase',fontWeight:600,marginBottom:4}}>Before You Continue</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,margin:'0 0 6px',lineHeight:1.2}}>{SERVICE_ADDONS[addonModal].headline}</h3>
              <p style={{fontSize:13,opacity:0.85,margin:0,lineHeight:1.4}}>{SERVICE_ADDONS[addonModal].subhead}</p>
            </div>

            {/* WHY BLOCK */}
            <div style={{background:'#fffbf0',border:'1px solid #f4e4a0',borderRadius:10,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#7a5c00',lineHeight:1.45}}>
              💡 {SERVICE_ADDONS[addonModal].why}
            </div>

            {/* ADD-ONS */}
            {SERVICE_ADDONS[addonModal].addons.map(addon=>(
              <div key={addon.key} style={{marginBottom:12,borderRadius:14,border: quote[addon.key]?`2px solid ${TEAL}`:'2px solid #e8e8e8',overflow:'hidden',background:'#fff',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                {/* Hook bar */}
                <div style={{background: quote[addon.key]?TEAL:'#f5f5f0',padding:'9px 14px',display:'flex',alignItems:'center',gap:8,borderBottom:'1px solid #eee'}}>
                  <span style={{fontSize:18}}>{addon.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:14,color: quote[addon.key]?'#fff':'#1a1a1a'}}>{addon.name}</div>
                    <div style={{fontSize:11,color: quote[addon.key]?'rgba(255,255,255,0.8)':'#c62828',fontWeight:600,marginTop:1}}>⚠ {addon.hook}</div>
                  </div>
                  <div style={{fontWeight:800,color: quote[addon.key]?'#fff':TEAL,fontSize:14,whiteSpace:'nowrap'}}>{addon.priceLabel(quote)}</div>
                </div>
                {/* Description */}
                <div style={{padding:'10px 14px'}}>
                  <p style={{fontSize:13,color:'#444',lineHeight:1.5,margin:'0 0 8px'}}>{addon.desc}</p>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
                    <span style={{fontSize:11,background:'#e8f5e9',color:'#2e7d32',padding:'3px 9px',borderRadius:20,fontWeight:700}}>👥 {addon.social}</span>
                  </div>
                  <div style={{fontSize:12,color:'#2e7d32',fontWeight:600,marginBottom:10}}>✓ {addon.result}</div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <button
                      style={{flex:1,background: quote[addon.key]?'#e8f5e9':TEAL,color: quote[addon.key]?'#2e7d32':'#fff',border: quote[addon.key]?'2px solid #a5d6a7':'none',borderRadius:10,padding:'11px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",transition:'all 0.15s'}}
                      onClick={()=>setQ(addon.key,!quote[addon.key])}
                    >
                      {quote[addon.key] ? '✓ Added to my booking' : `Yes — Add ${addon.name}`}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Grout color inside tile modal */}
            {addonModal==='tile' && quote.colorSeal && (
              <div style={{marginTop:4,marginBottom:12,background:'#fafafa',borderRadius:12,padding:'12px 14px',border:'1px solid #e0e0e0'}}>
                <p style={{fontSize:13,fontWeight:700,color:TEAL,marginBottom:8}}>🎨 Pick Your Grout Color</p>
                <p style={{fontSize:12,color:'#777',marginBottom:10}}>Tap your closest match — we confirm exact shade on-site</p>
                <div style={s.groutGrid}>
                  {GROUT_COLORS.map(c=>(
                    <div key={c.id} onClick={()=>setQ('groutColor',c.name)} style={{...s.groutSwatch, background:c.hex, border: quote.groutColor===c.name?`3px solid ${TEAL}`:'2px solid #ddd'}}>
                      <span style={{fontSize:9,fontWeight:800,color:c.light?'#333':'#fff'}}>{c.name}</span>
                      {quote.groutColor===c.name && <span style={s.groutCheckMark}>✓</span>}
                    </div>
                  ))}
                </div>
                {quote.groutColor && <p style={{fontSize:12,color:TEAL,fontWeight:600,marginTop:8}}>Selected: {quote.groutColor}</p>}
              </div>
            )}

            <button style={s.addonDoneBtn} onClick={()=>setAddonModal(null)}>Save & Continue Building Quote</button>
            <button style={{width:'100%',background:'none',border:'none',color:'#bbb',fontSize:12,cursor:'pointer',padding:'8px',marginTop:4,fontFamily:"'DM Sans',sans-serif"}} onClick={()=>setAddonModal(null)}>
              No thanks, skip add-ons
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={s.header}>
        <p style={s.eyebrow}>RF™ Residue-Free Cleaning</p>
        <h1 style={s.headerTitle}>Book Your Cleaning</h1>
        <p style={s.headerSub}>Eastern Shore · Maryland · Delaware</p>
        <a href="tel:4438563244" style={s.phoneBtn}>📞 (443) 856-3244</a>
        <div style={s.springBanner}>🌸 <strong>Spring Special</strong> — Save 10% Automatically</div>
        <div style={s.trustBar}>
          <span>⭐ 219 Five-Star Reviews</span>
          <span>🧼 RF™ Residue-Free</span>
          <span>📍 33+ Cities Served</span>
          <span>⚡ Fast Scheduling</span>
        </div>
        <div style={s.testimonial}>
          <div style={s.testimonialHead}>
            <div style={s.avatar}>s</div>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>sistaofZion</div>
              <div style={{fontSize:11,color:'#666'}}>Local Guide · 57 reviews · 8 hours ago</div>
            </div>
            <div style={{marginLeft:'auto',color:'#fbbc04',fontSize:13}}>★★★★★</div>
          </div>
          <p style={s.testimonialText}>"My agent stated <strong>'I prefer No One Else!'</strong> — windows, double pane, double the work. Need windows? Floors? Call Dalton — he believes in superior service."</p>
          <p style={{fontSize:11,color:'#999',margin:0}}>Verified Google Review · Realtor Referral</p>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      {step==='packages' && (
        <div style={s.section}>
          <h2 style={s.sectionTitle}>⚡ Book in Under 30 Seconds</h2>
          <p style={s.sectionSub}>Pick your package — we handle the rest</p>
          <div style={s.pkgGrid}>
            {PACKAGES.map(pkg=>(
              <div key={pkg.id} style={s.pkgCard}>
                <span style={{...s.pkgBadge,background:pkg.badgeBg,color:pkg.badgeColor}}>{pkg.badge}</span>
                <div style={{fontSize:28,marginBottom:6}}>{pkg.emoji}</div>
                <h3 style={s.pkgName}>{pkg.name}</h3>
                <p style={s.pkgSub}>{pkg.sub}</p>
                <div style={{marginBottom:8}}>{pkg.features.map(f=><div key={f} style={s.pkgFeat}>✓ {f}</div>)}</div>
                <p style={s.pkgSavings}>✂ {pkg.savings}</p>
                <div style={s.pkgPriceRow}>
                  <span style={s.pkgOriginal}>${pkg.original}</span>
                  <span style={s.pkgPrice}>${pkg.price}</span>
                </div>
                <button style={s.pkgBtn} onClick={()=>applyPackage(pkg)}>TAP TO BOOK 🛋️</button>
              </div>
            ))}
          </div>
          {/* Custom quote */}
          <div style={s.customCTA}>
            <span style={{fontSize:24}}>🔧</span>
            <div>
              <strong style={{fontSize:14}}>Build a Custom Quote</strong>
              <p style={{fontSize:12,color:'#666',margin:'2px 0 0'}}>Choose exactly what you need</p>
            </div>
            <button style={s.customBtn} onClick={()=>setStep('builder')}>Build Quote ›</button>
          </div>
          {/* Marcus AI */}
          <MarcusCard onApply={()=>setStep('builder')} />
        </div>
      )}

      {/* ── BUILDER ── */}
      {step==='builder' && (
        <div style={s.section}>
          {selectedPkg && (
            <div style={s.pkgBanner}>
              <span>{selectedPkg.emoji} {selectedPkg.name} applied</span>
              <button style={s.clearBtn} onClick={()=>setSelectedPkg(null)}>Skip — build my own</button>
            </div>
          )}

          {/* CARPET */}
          <ServiceCard
            title="🧹 Carpet Cleaning RF99™"
            sub="$99 first room · $50 each additional"
            addonCount={[quote.scotchgard,quote.deodorizer].filter(Boolean).length}
            onAddons={()=>setAddonModal('carpet')}
          >
            <RoomGrid rooms={CARPET_ROOMS} selected={quote.carpetRooms} onToggle={r=>{
              const next = toggleRoom(quote.carpetRooms, r);
              setQ('carpetRooms', next);
              if (next.length === 1) autoTrigger('carpet');
            }} />
            <p style={s.roomCount}>Rooms selected: <strong>{quote.carpetRooms.length}</strong></p>
          </ServiceCard>

          {/* HARDWOOD */}
          <ServiceCard title="🪵 Hardwood Floor Cleaning" sub="$1.00 per square foot">
            <RoomGrid rooms={HARDWOOD_ROOMS} selected={[]} onToggle={()=>{}} label="Tap rooms with hardwood" />
            <InputBlock label="Total Square Feet">
              <input style={s.numInput} type="number" min="0" placeholder="0" value={hardwoodSqft} onChange={e=>setHardwoodSqft(e.target.value)} />
            </InputBlock>
          </ServiceCard>

          {/* TILE */}
          <ServiceCard
            title="◼ Tile & Grout Cleaning"
            sub="$125/room"
            addonCount={[quote.groutSealing,quote.colorSeal].filter(Boolean).length}
            onAddons={()=>setAddonModal('tile')}
          >
            <RoomGrid rooms={TILE_ROOMS} selected={quote.tileRooms} onToggle={r=>{
              const next = toggleRoom(quote.tileRooms, r);
              setQ('tileRooms', next);
              if (next.length === 1 && quote.bathrooms.length === 0) autoTrigger('tile');
            }} />
            <p style={s.svcSubLabel}>🚿 Bathroom Tile · $125/bath</p>
            <RoomGrid rooms={BATH_ROOMS} selected={quote.bathrooms} onToggle={r=>{
              const next = toggleRoom(quote.bathrooms, r);
              setQ('bathrooms', next);
              if (next.length === 1 && quote.tileRooms.length === 0) autoTrigger('tile');
            }} />
            <p style={s.roomCount}>Rooms selected: <strong>{quote.tileRooms.length+quote.bathrooms.length}</strong></p>
          </ServiceCard>

          {/* UPHOLSTERY */}
          <ServiceCard
            title="🛋️ Upholstery Cleaning"
            sub=""
            addonCount={[quote.upholProtect,quote.upholDeodor].filter(Boolean).length}
            onAddons={()=>setAddonModal('upholstery')}
          >
            <CounterRow label="Sofas"      price="$85/sofa"      val={quote.sofas}      onChange={v=>{ setQ('sofas',v); if(v===1&&(quote.loveseats+quote.chairs+quote.ottomans)===0) autoTrigger('upholstery'); }} />
            <CounterRow label="Loveseats"  price="$75/loveseat"  val={quote.loveseats}  onChange={v=>{ setQ('loveseats',v); if(v===1&&(quote.sofas+quote.chairs+quote.ottomans)===0) autoTrigger('upholstery'); }} />
            <CounterRow label="Chairs"     price="$50/chair"     val={quote.chairs}     onChange={v=>{ setQ('chairs',v); if(v===1&&(quote.sofas+quote.loveseats+quote.ottomans)===0) autoTrigger('upholstery'); }} />
            <CounterRow label="Ottoman"    price="$35/ottoman"   val={quote.ottomans}   onChange={v=>setQ('ottomans',v)} />
            <div style={{borderBottom:`1px solid #f0f0f0`,paddingBottom:8}}>
              <CounterRow label="Dining Room Chairs" price="" val={quote.diningChairs} onChange={v=>setQ('diningChairs',v)} />
              <div style={{display:'flex',gap:6,marginTop:6}}>
                <button style={{...s.diningBtn,...(quote.diningChairType==='seat_back'?s.diningBtnActive:{})}} onClick={()=>setQ('diningChairType','seat_back')}>🪑 Seat & Back $13</button>
                <button style={{...s.diningBtn,...(quote.diningChairType==='seat_only'?s.diningBtnActive:{})}} onClick={()=>setQ('diningChairType','seat_only')}>👆 Seat Only $10</button>
              </div>
            </div>
            <InputBlock label="Sectional Linear Feet · $11/ft">
              <input style={s.numInput} type="number" min="0" placeholder="0" value={sectionalFt} onChange={e=>setSectionalFt(e.target.value)} />
            </InputBlock>
          </ServiceCard>

          {/* WINDOWS */}
          <ServiceCard
            title="🪟 Window Cleaning"
            sub=""
            addonCount={quote.screenTrack?1:0}
            onAddons={()=>setAddonModal('windows')}
          >
            <CounterRow label="Standard Windows"      price="$13/window"             val={quote.windows}      onChange={v=>{ setQ('windows',v); if(v===1&&quote.ezBreeze===0) autoTrigger('windows'); }} />
            <CounterRow label="EZ Breeze Panels"      price="$15/panel + $35 track"  val={quote.ezBreeze}     onChange={v=>setQ('ezBreeze',v)} />
            <CounterRow label="🚪 Glass Sliding Doors" price="$25/glass panel"        val={quote.glassDoors}   onChange={v=>setQ('glassDoors',v)} />
            <CounterRow label="🌩️ Storm Windows"       price="TBD on-site"            val={quote.stormWindows} onChange={v=>setQ('stormWindows',v)} />
          </ServiceCard>

          {/* RUGS */}
          <ServiceCard title="🪄 Rug Cleaning (Pickup Included)" sub="No drop-offs — pickup & return">
            <CounterRow label="Small Rug"    price="$75 + $75 pickup"  val={quote.rugSmall}    onChange={v=>setQ('rugSmall',v)} />
            <CounterRow label="Medium Rug"   price="$125 + $75 pickup" val={quote.rugMedium}   onChange={v=>setQ('rugMedium',v)} />
            <CounterRow label="Large Rug"    price="$195 + $75 pickup" val={quote.rugLarge}    onChange={v=>setQ('rugLarge',v)} />
            <CounterRow label="Oversized Rug" price="$295 + $75 pickup" val={quote.rugOversized} onChange={v=>setQ('rugOversized',v)} />
          </ServiceCard>

          {/* REFERRAL */}
          <ServiceCard title="💬 How Did You Hear About Us?" sub="Tap one — helps us serve the Shore better">
            <div style={s.referralGrid}>
              {REFERRAL.map(r=>(
                <button key={r.id} style={{...s.referralBtn,...(form.referral===r.id?s.referralActive:{})}} onClick={()=>setF('referral',r.id)}>
                  {r.emoji} {r.label}
                </button>
              ))}
            </div>
          </ServiceCard>

          {/* ESTIMATE */}
          <div style={s.estimateBox}>
            <div style={{fontSize:13,opacity:0.8,marginBottom:4}}>🧮 Your Estimate</div>
            <div style={s.estimateTotal}>${total.toLocaleString()}</div>
            <p style={{fontSize:12,opacity:0.7,margin:'6px 0 0'}}>Final price confirmed on-site. All discounts applied.</p>
          </div>

          {/* CALLBACK */}
          <CallbackCard />

          {/* FORM */}
          <ServiceCard title="👤 Your Information" sub="">
            <div style={s.formGrid}>
              <FormField label="Name *" error={errors.name} errorMsg="Name is required">
                <input style={{...s.textInput,...(errors.name?s.inputErr:{})}} type="text" placeholder="Full name" value={form.name} onChange={e=>setF('name',e.target.value)} />
              </FormField>
              <FormField label="Phone *" error={errors.phone} errorMsg="Valid 10-digit phone required">
                <input style={{...s.textInput,...(errors.phone?s.inputErr:{})}} type="tel" placeholder="(443) 000-0000" value={form.phone} onChange={e=>setF('phone',e.target.value)} />
              </FormField>
              <FormField label="Email" full>
                <input style={s.textInput} type="email" placeholder="Optional" value={form.email} onChange={e=>setF('email',e.target.value)} />
              </FormField>

              {/* CALENDAR */}
              <FormField label="Preferred Date & Time *" full error={errors.date} errorMsg="Please select a date and time slot">
                <div style={s.availBanner}>
                  <span style={s.availDot}></span>
                  <span>Next available: <strong>{nextAvailable()}</strong></span>
                </div>
                <CalendarPicker
                  calYear={calYear} calMonth={calMonth}
                  onPrev={()=>{ if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); }}
                  onNext={()=>{ if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); }}
                  selDate={selDate}
                  onSelectDate={(ds)=>{ setSelDate(ds); setSelSlot(''); setF('date',ds); setF('time',''); }}
                  getDayStatus={getDayStatus}
                />
                {selDate && (
                  <TimeSlots
                    dateStr={selDate} selSlot={selSlot}
                    booked={BOOKED_SLOTS[selDate]||[]}
                    onSelect={(id,label)=>{ setSelSlot(id); setF('time',label); }}
                  />
                )}
              </FormField>

              <FormField label="Street Address *" full error={errors.address} errorMsg="Street address required">
                <input style={{...s.textInput,...(errors.address?s.inputErr:{})}} type="text" placeholder="123 Main St" value={form.address} onChange={e=>setF('address',e.target.value)} />
              </FormField>
              <FormField label="City *" error={errors.city} errorMsg="City required">
                <input style={{...s.textInput,...(errors.city?s.inputErr:{})}} type="text" placeholder="Salisbury" value={form.city} onChange={e=>setF('city',e.target.value)} />
              </FormField>
              <FormField label="State">
                <select style={s.select} value={form.state} onChange={e=>setF('state',e.target.value)}>
                  <option>MD</option><option>DE</option><option>VA</option>
                </select>
              </FormField>
              <FormField label="ZIP *" error={errors.zip} errorMsg="Valid ZIP required">
                <input style={{...s.textInput,...(errors.zip?s.inputErr:{})}} type="text" maxLength={5} placeholder="21801" value={form.zip} onChange={e=>setF('zip',e.target.value)} />
              </FormField>
              <FormField label="Promo Code" full>
                <div style={{display:'flex',gap:8}}>
                  <input style={{...s.textInput,flex:1}} type="text" placeholder="Enter code" value={form.promoCode} onChange={e=>setF('promoCode',e.target.value.toUpperCase())} />
                  <button style={s.promoBtn} onClick={()=>setF('promoApplied',form.promoCode==='BREEZE15')}>Apply</button>
                </div>
                {form.promoApplied && <p style={{color:'#2e7d32',fontSize:12,margin:'4px 0 0',fontWeight:500}}>✂ Code applied!</p>}
                {form.promoCode && !form.promoApplied && form.promoCode.length>3 && <p style={{color:'#c62828',fontSize:12,margin:'4px 0 0'}}>✗ Invalid. Try BREEZE15 for 15% off.</p>}
              </FormField>
              <FormField label="Special Instructions" full>
                <textarea style={{...s.textInput,minHeight:72}} placeholder="Gate codes, pets, parking..." value={form.notes} onChange={e=>setF('notes',e.target.value)} />
              </FormField>
            </div>
            <label style={s.checkRow}>
              <input type="checkbox" checked={form.textConfirm} onChange={e=>setF('textConfirm',e.target.checked)} style={{accentColor:TEAL}} />
              <span style={{fontSize:13,lineHeight:1.4}}>
                📱 Text me my confirmation + reminder the day before
                <br /><small style={{color:'#aaa'}}>Standard rates apply · Opt out anytime</small>
              </span>
            </label>
            <button style={s.confirmBtn} onClick={()=>{ if(validateForm()) setStep('upsell'); }}>
              Continue to Confirm — ${total.toLocaleString()}
            </button>
          </ServiceCard>
        </div>
      )}

      {/* ── UPSELL ── */}
      {step==='upsell' && (
        <div style={s.section}>
          <div style={{textAlign:'center',marginBottom:16}}>
            <div style={{fontSize:40}}>🎁</div>
            <h2 style={s.sectionTitle}>One Last Upgrade!</h2>
            <p style={s.sectionSub}>Popular add-ons — tap to include before you confirm</p>
          </div>
          {[
            { key:'starter', badge:'Best Value',   emoji:'🧴', name:'RF99™ Starter Pack',      desc:'Take-home maintenance kit — extends results between visits.', price:'+$49' },
            { key:'mix',     badge:'Mix & Match',  emoji:'📸', name:'Multi-Service Discount',   desc:'Combining services? Lock in an extra 5% off!',               price:'✂5%'  },
          ].map(u=>(
            <div key={u.key} style={{...s.upsellCard,...(upsells[u.key]?s.upsellActive:{})}} onClick={()=>setUpsells(p=>({...p,[u.key]:!p[u.key]}))}>
              <div style={{...s.upsellBadge}}>{u.badge}</div>
              <span style={{fontSize:26}}>{u.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14}}>{u.name}</div>
                <div style={{fontSize:12,color:'#666',marginTop:2}}>{u.desc}</div>
              </div>
              <div style={{fontWeight:700,color:TEAL,marginRight:8}}>{u.price}</div>
              <div style={{...s.upsellCheck,...(upsells[u.key]?s.upsellCheckOn:{})}}>{upsells[u.key]?'✓':''}</div>
            </div>
          ))}
          <button style={s.confirmBtn} onClick={submitBooking} disabled={submitting}>
            {submitting ? 'Submitting...' : `Add Selected — $${(total+(upsells.starter?49:0)).toLocaleString()}`}
          </button>
          <button style={s.skipBtn} onClick={submitBooking} disabled={submitting}>No thanks, continue to booking</button>
        </div>
      )}

      {/* ── DONE ── */}
      {step==='done' && (
        <div style={s.section}>
          <div style={s.doneCard}>
            <div style={{fontSize:56,marginBottom:14}}>✅</div>
            <h2 style={{fontSize:26,color:'#1b5e20',marginBottom:8,fontFamily:'Playfair Display, serif'}}>You're All Set!</h2>
            <p style={{fontSize:18,color:TEAL,margin:'0 0 8px'}}>Confirmation # <strong>TB{confNum}</strong></p>
            <p style={{fontSize:14,color:'#555',marginBottom:20}}>We'll see you on <strong>{form.date}</strong> · {form.time}</p>
            <a href="tel:4438563244" style={s.phoneBtn}>Questions? Call (443) 856-3244</a>
            <br /><button style={{...s.skipBtn,marginTop:16}} onClick={resetAll}>📅 Book Another Service</button>
          </div>
        </div>
      )}

      {/* ── FLOATING TOTAL ── */}
      {(step==='builder'||step==='upsell') && (
        <div style={s.floatingBar}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <span style={{fontSize:10,color:'rgba(255,255,255,0.65)',fontWeight:600,letterSpacing:1,textTransform:'uppercase',marginBottom:1}}>Your Estimate</span>
            <span style={s.floatingTotal}>${total.toLocaleString()}</span>
            <span style={{fontSize:10,color:'rgba(255,255,255,0.5)',marginTop:2}}>Spring 10% applied · final confirmed on-site</span>
          </div>
          {step==='builder' && (
            <button style={s.floatingBtn} onClick={()=>{ if(validateForm()) setStep('upsell'); }}>Confirm Booking</button>
          )}
          {step==='upsell' && (
            <button style={s.floatingBtn} onClick={submitBooking} disabled={submitting}>{submitting?'...':'Confirm'}</button>
          )}
        </div>
      )}

      {/* ── CHAT ── */}
      <div style={s.chatWidget}>
        {chatOpen && (
          <div style={s.chatBox}>
            <div style={s.chatHead}>
              <div style={s.chatAvatar}>🌴</div>
              <div>
                <strong style={{fontSize:13}}>Tropical Breeze RF™</strong>
                <div style={{fontSize:11,opacity:0.75}}>Typically replies in minutes</div>
              </div>
              <button style={s.chatClose} onClick={()=>setChatOpen(false)}>✕</button>
            </div>
            <div style={s.chatMsgs}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{...s.chatMsg,...(m.from==='user'?s.chatUser:s.chatBot)}}>{m.text}</div>
              ))}
            </div>
            {!chatQuickDone && (
              <div style={{padding:'0 12px 8px',display:'flex',flexDirection:'column',gap:4}}>
                {['Pricing question','Do you service my area?','Pet odor help','Vacation rental'].map(q=>(
                  <button key={q} style={s.chatQuickBtn} onClick={()=>sendChat(q)}>{q}</button>
                ))}
              </div>
            )}
            <div style={s.chatInputRow}>
              <input style={s.chatInput} type="text" placeholder="Type a message..." value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter'&&chatInput.trim()){ sendChat(chatInput.trim()); setChatInput(''); }}}
              />
              <button style={s.chatSend} onClick={()=>{ if(chatInput.trim()){ sendChat(chatInput.trim()); setChatInput(''); }}}>➤</button>
            </div>
          </div>
        )}
        <button style={s.chatToggle} onClick={()=>setChatOpen(o=>!o)}>
          <span>{chatOpen?'✕':'💬'}</span>
          {!chatOpen && <span style={{fontSize:12,fontWeight:600,whiteSpace:'nowrap'}}>👋 Hey! Questions about pricing?</span>}
        </button>
      </div>

      {/* ── FOOTER ── */}
      <div style={s.footer}>
        <a href="tel:4438563244" style={{display:'block',fontSize:16,fontWeight:700,color:TEAL,textDecoration:'none',marginBottom:4}}>📞 (443) 856-3244</a>
        <p style={{fontSize:12,color:'#999',margin:0}}>tropicalbreezerf.com · Salisbury, MD · Eastern Shore</p>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ServiceCard({ title, sub, addonCount, onAddons, children }) {
  return (
    <div style={s.svcCard}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:sub?2:8}}>
        <h3 style={s.svcTitle}>{title}</h3>
        {onAddons && (
          <button style={{...s.addonsTrigger,...(addonCount>0?s.addonsTriggerActive:{})}} onClick={onAddons}>
            {addonCount>0 ? `✓ ${addonCount} add-on${addonCount>1?'s':''}` : '+ Add-ons'}
          </button>
        )}
      </div>
      {sub && <p style={s.svcSub}>{sub}</p>}
      {children}
    </div>
  );
}

function RoomGrid({ rooms, selected, onToggle, label }) {
  return (
    <>
      {label && <p style={s.svcSubLabel}>{label}</p>}
      <div style={s.roomGrid}>
        {rooms.map(r=>(
          <button key={r} style={{...s.roomBtn,...(selected.includes(r)?s.roomBtnActive:{})}} onClick={()=>onToggle(r)}>{r}</button>
        ))}
      </div>
    </>
  );
}

function CounterRow({ label, price, val, onChange }) {
  return (
    <div style={s.counterRow}>
      <div style={{flex:1}}>
        <span style={{fontSize:14,fontWeight:600}}>{label}</span>
        {price && <span style={{fontSize:12,color:'#888'}}> · {price}</span>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button style={s.counterBtn} onClick={()=>onChange(Math.max(0,val-1))}>−</button>
        <span style={{fontSize:16,fontWeight:700,minWidth:20,textAlign:'center'}}>{val}</span>
        <button style={s.counterBtn} onClick={()=>onChange(val+1)}>+</button>
      </div>
    </div>
  );
}

function InputBlock({ label, children }) {
  return (
    <div style={{padding:'8px 0'}}>
      <label style={{display:'block',fontSize:12,fontWeight:600,color:'#555',marginBottom:4}}>{label}</label>
      {children}
    </div>
  );
}

function FormField({ label, full, error, errorMsg, children }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gridColumn:full?'1 / -1':undefined}}>
      <label style={{fontSize:12,fontWeight:600,color:'#555',marginBottom:4}}>{label}</label>
      {children}
      {error && <span style={{fontSize:11,color:'#c62828',marginTop:3}}>{errorMsg}</span>}
    </div>
  );
}

function CalendarPicker({ calYear, calMonth, onPrev, onNext, selDate, onSelectDate, getDayStatus }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const dayColors = { avail:'#e8f5e9', limited:'#fff8e1', full:'#fce4ec' };
  const dayTextColors = { avail:'#2e7d32', limited:'#f57f17', full:'#c62828' };

  return (
    <div style={s.calWrap}>
      <div style={s.calNav}>
        <button style={s.calNavBtn} onClick={onPrev}>‹</button>
        <span style={{fontWeight:700,fontSize:15,fontFamily:'Playfair Display, serif'}}>{monthNames[calMonth]} {calYear}</span>
        <button style={s.calNavBtn} onClick={onNext}>›</button>
      </div>
      <div style={s.calDow}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><span key={d} style={s.calDowCell}>{d}</span>)}
      </div>
      <div style={s.calGrid}>
        {Array(firstDay).fill(null).map((_,i)=><div key={'e'+i} />)}
        {Array(daysInMonth).fill(null).map((_,i)=>{
          const d = i+1;
          const date = new Date(calYear,calMonth,d);
          const ds = fmtDate(date);
          const isPast = date < today;
          const status = isPast ? 'past' : getDayStatus(ds);
          const isSel = selDate===ds;
          return (
            <button
              key={d}
              disabled={isPast||status==='full'}
              onClick={()=>!isPast&&status!=='full'&&onSelectDate(ds)}
              style={{
                aspectRatio:'1', borderRadius:9, border:'none', fontSize:13, fontWeight:600,
                cursor: isPast||status==='full'?'default':'pointer',
                background: isSel ? TEAL : isPast ? 'transparent' : dayColors[status]||'transparent',
                color: isSel ? '#fff' : isPast ? '#ccc' : dayTextColors[status]||'#333',
                transform: isSel ? 'scale(1.08)' : 'none',
                transition:'all 0.1s', fontFamily:'DM Sans, sans-serif',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
              }}
            >
              <span>{d}</span>
              {!isPast && status!=='past' && (
                <span style={{width:5,height:5,borderRadius:'50%',background:isSel?'rgba(255,255,255,0.6)':dayTextColors[status]||'transparent'}} />
              )}
            </button>
          );
        })}
      </div>
      <div style={s.calLegend}>
        <span><span style={{...s.legDot,background:'#43a047'}} /> Available</span>
        <span><span style={{...s.legDot,background:'#fb8c00'}} /> Limited</span>
        <span><span style={{...s.legDot,background:'#e53935'}} /> Booked</span>
      </div>
    </div>
  );
}

function TimeSlots({ dateStr, selSlot, booked, onSelect }) {
  const d = new Date(dateStr);
  return (
    <div style={{marginTop:12}}>
      <p style={{fontSize:13,fontWeight:600,color:'#555',marginBottom:8}}>
        Available times on <strong>{d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</strong>
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {TIME_SLOTS.map(slot=>{
          const isBooked = booked.includes(slot.id);
          const isSel = selSlot===slot.id;
          return (
            <button
              key={slot.id}
              disabled={isBooked}
              onClick={()=>!isBooked&&onSelect(slot.id,`${slot.label} (${slot.sub})`)}
              style={{
                padding:'10px 6px', borderRadius:10, fontSize:12, fontWeight:700,
                fontFamily:'DM Sans, sans-serif', textAlign:'center', cursor:isBooked?'not-allowed':'pointer',
                border: isSel?`1.5px solid ${TEAL}`:'1.5px solid #ddd',
                background: isSel?TEAL:isBooked?'#f5f5f5':'#fafafa',
                color: isSel?'#fff':isBooked?'#bbb':'#333',
                textDecoration: isBooked?'line-through':'none',
                transition:'all 0.1s',
              }}
            >
              <div>{slot.label}</div>
              <div style={{fontSize:10,opacity:0.75,fontWeight:400}}>{slot.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MarcusCard({ onApply }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function ask() {
    if (!input.trim()) return;
    setLoading(true); setResult('');
    const lower = input.toLowerCase();
    await new Promise(r=>setTimeout(r,900));
    if (lower.includes('pet')||lower.includes('dog')||lower.includes('cat'))
      setResult("I'd recommend our Pet Home package — 3 carpet rooms with Deodorizer & Scotchgard. Perfect for eliminating pet odors at the source.");
    else if (lower.includes('rental')||lower.includes('airbnb')||lower.includes('vrbo'))
      setResult("Our Vacation Rental package covers 3 carpets + 2 baths + 12 windows — everything to get guest-ready in one visit.");
    else if (lower.includes('move')||lower.includes('moving'))
      setResult("For a move-out clean I'd suggest Full House — 5 carpet + 2 tile + 10 windows. We can add hardwood too.");
    else
      setResult("Based on your home I'd recommend Home Clean — 3 carpet rooms + tile kitchen. Our most popular combo.");
    setLoading(false);
  }

  return (
    <div style={s.marcusCard}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
        <span style={{fontSize:22}}>✨</span>
        <div><div style={{fontWeight:700,fontSize:15}}>AI Quote Builder</div><div style={{fontSize:11,color:'#888'}}>Tell us about your home</div></div>
      </div>
      <p style={{fontSize:13,color:'#555',marginBottom:10,lineHeight:1.45}}>Describe your space — rooms, pets, surfaces, rental — and our AI builds your quote instantly.</p>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
        {['🐾 Pet home','🏖️ Vacation rental','📦 Move-out'].map(t=>(
          <span key={t} style={s.marcusTag}>{t}</span>
        ))}
      </div>
      <textarea style={s.marcusTextarea} rows={3} placeholder="e.g. 3 bed 2 bath with dog, tile kitchen and hardwood hallway..." value={input} onChange={e=>setInput(e.target.value)} />
      <button style={s.marcusBtn} onClick={ask} disabled={loading}>{loading?'Building your quote...':'Get My Quote ✨'}</button>
      {result && (
        <div style={s.marcusResult}>
          <strong>✨ AI Recommendation</strong>
          <p style={{margin:'8px 0 0',fontSize:13}}>{result}</p>
          <button style={s.applyBtn} onClick={onApply}>✂ Apply these suggestions to my quote</button>
        </div>
      )}
    </div>
  );
}

function CallbackCard() {
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('Anytime');
  const [sent, setSent] = useState(false);
  return (
    <div style={{...s.svcCard,marginBottom:12}}>
      <p style={{fontWeight:700,fontSize:15,margin:'0 0 4px'}}>📞 Prefer a Call?</p>
      <p style={{fontSize:13,color:'#666',margin:'0 0 10px'}}>Not ready to book online? Leave your number and we'll call you back.</p>
      <select style={s.select} value={time} onChange={e=>setTime(e.target.value)}>
        {['Morning (8–11am)','Midday (11am–2pm)','Afternoon (2–5pm)','Anytime'].map(t=><option key={t}>{t}</option>)}
      </select>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input style={{...s.textInput,flex:1}} type="tel" placeholder="Your phone number" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button style={{background:TEAL,color:'#fff',border:'none',borderRadius:9,padding:'10px 16px',fontSize:13,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}} onClick={()=>setSent(true)}>Call Me</button>
      </div>
      {sent && <p style={{color:'#2e7d32',fontSize:13,marginTop:8,fontWeight:500}}>✂ Got it! We'll call you back · (443) 856-3244</p>}
    </div>
  );
}

// ─── THEME / STYLES ───────────────────────────────────────────────────────────
const TEAL = '#1a7f7a';
const TEAL_DARK = '#145f5b';
const TEAL_LIGHT = '#e6f7f6';

const s = {
  page:{ fontFamily:"'DM Sans',sans-serif", background:'#f4f3ef', color:'#1a1a1a', maxWidth:480, margin:'0 auto', minHeight:'100vh', paddingBottom:120 },

  // OVERLAY & MODALS
  overlay:{ position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16 },
  entryModal:{ background:'#fff',borderRadius:24,padding:28,width:'100%',maxWidth:420,maxHeight:'90vh',overflowY:'auto',position:'relative',boxShadow:'0 20px 60px rgba(0,0,0,0.25)' },
  addonModal:{ background:'#fff',borderRadius:24,padding:24,width:'100%',maxWidth:420,maxHeight:'90vh',overflowY:'auto',position:'relative',boxShadow:'0 20px 60px rgba(0,0,0,0.25)' },
  modalClose:{ position:'absolute',top:14,right:16,background:'#f0f0f0',border:'none',borderRadius:'50%',width:30,height:30,fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' },

  // ENTRY POPUP
  entryEmoji:{ fontSize:44,textAlign:'center',marginBottom:8 },
  entryTitle:{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,textAlign:'center',margin:'0 0 8px' },
  entrySub:{ fontSize:13,color:'#666',textAlign:'center',lineHeight:1.45,margin:'0 0 16px' },
  entryPackages:{ display:'flex',flexDirection:'column',gap:8,marginBottom:12 },
  entryPkgBtn:{ display:'flex',alignItems:'center',gap:12,background:'#f9f9f9',border:'1.5px solid #e0e0e0',borderRadius:12,padding:'11px 14px',cursor:'pointer',textAlign:'left',fontFamily:"'DM Sans',sans-serif" },
  entryCustomBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:12,padding:'12px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif" },

  // ADDON MODAL
  addonTitle:{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,margin:'0 0 4px' },
  addonSub:{ fontSize:13,color:'#666',margin:'0 0 16px' },
  addonItem:{ display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:12,border:'1.5px solid #e0e0e0',cursor:'pointer',marginBottom:8,background:'#fafafa',transition:'all 0.15s' },
  addonItemActive:{ border:`1.5px solid ${TEAL}`,background:TEAL_LIGHT },
  addonCheck:{ width:24,height:24,borderRadius:'50%',border:'1.5px solid #ccc',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0,marginTop:6 },
  addonCheckOn:{ background:TEAL,border:`1.5px solid ${TEAL}` },
  addonDoneBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:12,padding:'13px',fontSize:15,fontWeight:700,cursor:'pointer',marginTop:12,fontFamily:"'DM Sans',sans-serif" },

  // HEADER
  header:{ background:`linear-gradient(150deg,${TEAL} 0%,${TEAL_DARK} 100%)`,color:'#fff',padding:'28px 18px 0',borderRadius:'0 0 28px 28px' },
  eyebrow:{ fontSize:11,letterSpacing:'2.5px',opacity:0.75,textTransform:'uppercase',fontWeight:600,marginBottom:4,margin:'0 0 4px' },
  headerTitle:{ fontSize:30,fontWeight:900,lineHeight:1.1,marginBottom:4,fontFamily:"'Playfair Display',serif" },
  headerSub:{ fontSize:13,opacity:0.8,margin:'0 0 14px' },
  phoneBtn:{ display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.15)',color:'#fff',padding:'9px 20px',borderRadius:24,fontSize:14,fontWeight:700,textDecoration:'none',marginBottom:14,border:'1px solid rgba(255,255,255,0.25)' },
  springBanner:{ background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:12,padding:'9px 14px',fontSize:13,fontWeight:500,marginBottom:14,textAlign:'center' },
  trustBar:{ display:'flex',flexWrap:'wrap',gap:'6px 10px',justifyContent:'center',padding:'12px 16px',background:'#fff',fontSize:12,fontWeight:500,color:'#444',borderTop:'1px solid rgba(0,0,0,0.05)' },
  testimonial:{ background:'#fff',padding:'16px 18px',borderTop:'1px solid #f0f0f0' },
  testimonialHead:{ display:'flex',alignItems:'center',gap:10,marginBottom:8 },
  avatar:{ width:38,height:38,borderRadius:'50%',background:TEAL,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,flexShrink:0 },
  testimonialText:{ fontSize:13,color:'#444',lineHeight:1.55,fontStyle:'italic',margin:'0 0 6px' },

  // SECTIONS
  section:{ padding:16 },
  sectionTitle:{ fontSize:20,fontWeight:900,margin:'0 0 4px',fontFamily:"'Playfair Display',serif" },
  sectionSub:{ fontSize:13,color:'#777',margin:'0 0 16px' },

  // PACKAGES
  pkgGrid:{ display:'flex',flexDirection:'column',gap:12,marginBottom:16 },
  pkgCard:{ background:'#fff',borderRadius:18,padding:18,boxShadow:'0 2px 14px rgba(0,0,0,0.07)',position:'relative' },
  pkgBadge:{ display:'inline-block',fontSize:11,fontWeight:700,padding:'3px 11px',borderRadius:20,marginBottom:10,letterSpacing:'0.4px' },
  pkgName:{ fontSize:18,fontWeight:900,margin:'0 0 3px',fontFamily:"'Playfair Display',serif" },
  pkgSub:{ fontSize:13,color:'#777',margin:'0 0 10px' },
  pkgFeat:{ fontSize:13,color:'#444',padding:'2px 0' },
  pkgSavings:{ fontSize:12,color:'#2e7d32',fontWeight:600,margin:'0 0 10px' },
  pkgPriceRow:{ display:'flex',alignItems:'baseline',gap:8,marginBottom:14 },
  pkgOriginal:{ fontSize:14,color:'#bbb',textDecoration:'line-through' },
  pkgPrice:{ fontSize:32,fontWeight:900,color:TEAL,fontFamily:"'Playfair Display',serif" },
  pkgBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:13,padding:'13px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",letterSpacing:'0.3px' },
  customCTA:{ display:'flex',alignItems:'center',gap:12,background:'#fff',borderRadius:14,padding:'14px 16px',marginBottom:14,boxShadow:'0 1px 8px rgba(0,0,0,0.06)' },
  customBtn:{ background:TEAL,color:'#fff',border:'none',borderRadius:20,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',marginLeft:'auto',fontFamily:"'DM Sans',sans-serif" },

  // MARCUS
  marcusCard:{ background:'linear-gradient(135deg,#f0faf9,#e6f7f6)',borderRadius:18,padding:18,border:`1px solid rgba(26,127,122,0.15)`,marginBottom:16 },
  marcusTag:{ background:'#fff',border:`1px solid rgba(26,127,122,0.3)`,borderRadius:16,padding:'4px 11px',fontSize:12,color:TEAL,fontWeight:500 },
  marcusTextarea:{ width:'100%',borderRadius:10,border:'1.5px solid #ccc',padding:'10px 12px',fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:'none',outline:'none',background:'#fff',lineHeight:1.4,boxSizing:'border-box' },
  marcusBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:10,padding:11,fontSize:14,fontWeight:600,cursor:'pointer',marginTop:8,fontFamily:"'DM Sans',sans-serif" },
  marcusResult:{ background:'#fff',borderRadius:10,padding:14,marginTop:12,border:`1px solid rgba(26,127,122,0.2)` },
  applyBtn:{ background:TEAL_LIGHT,color:TEAL_DARK,border:'none',borderRadius:8,padding:'7px 14px',fontSize:12,fontWeight:600,cursor:'pointer',marginTop:8,fontFamily:"'DM Sans',sans-serif" },

  // BUILDER
  pkgBanner:{ background:TEAL_LIGHT,border:`1px solid rgba(26,127,122,0.25)`,borderRadius:10,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,fontSize:13,color:TEAL_DARK,fontWeight:600 },
  clearBtn:{ background:'none',border:'none',color:'#aaa',fontSize:12,cursor:'pointer',textDecoration:'underline' },
  svcCard:{ background:'#fff',borderRadius:18,padding:16,marginBottom:12,boxShadow:'0 1px 8px rgba(0,0,0,0.05)' },
  svcTitle:{ fontSize:16,fontWeight:700,margin:0,fontFamily:"'Playfair Display',serif" },
  svcSub:{ fontSize:12,color:'#888',margin:'0 0 12px' },
  svcSubLabel:{ fontSize:12,color:TEAL,fontWeight:600,margin:'10px 0 6px' },
  addonsTrigger:{ fontSize:12,fontWeight:700,padding:'5px 12px',borderRadius:20,border:`1.5px solid #ddd`,background:'#fafafa',cursor:'pointer',whiteSpace:'nowrap',color:'#666',fontFamily:"'DM Sans',sans-serif" },
  addonsTriggerActive:{ background:TEAL_LIGHT,border:`1.5px solid ${TEAL}`,color:TEAL_DARK },
  roomGrid:{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:6 },
  roomBtn:{ padding:'7px 11px',borderRadius:9,border:'1.5px solid #ddd',background:'#fafafa',fontSize:12,fontWeight:600,cursor:'pointer',color:'#555',fontFamily:"'DM Sans',sans-serif" },
  roomBtnActive:{ background:TEAL,color:'#fff',border:`1.5px solid ${TEAL}` },
  roomCount:{ fontSize:12,color:'#888',margin:'4px 0 0' },
  counterRow:{ display:'flex',alignItems:'center',padding:'9px 0',borderBottom:'1px solid #f0f0f0' },
  counterBtn:{ width:30,height:30,borderRadius:'50%',border:`1.5px solid ${TEAL}`,background:'#fff',color:TEAL,fontSize:20,lineHeight:1,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700 },
  diningBtn:{ flex:1,padding:'7px 8px',borderRadius:9,border:'1.5px solid #ddd',background:'#fafafa',fontSize:12,cursor:'pointer',fontWeight:600,fontFamily:"'DM Sans',sans-serif" },
  diningBtnActive:{ background:TEAL,color:'#fff',border:`1.5px solid ${TEAL}` },
  referralGrid:{ display:'flex',flexWrap:'wrap',gap:7 },
  referralBtn:{ padding:'7px 13px',borderRadius:20,border:'1.5px solid #ddd',background:'#fafafa',fontSize:12,cursor:'pointer',fontWeight:600,fontFamily:"'DM Sans',sans-serif" },
  referralActive:{ background:TEAL,color:'#fff',border:`1.5px solid ${TEAL}` },
  numInput:{ width:'100%',padding:'9px 12px',borderRadius:9,border:'1.5px solid #ddd',fontSize:14,outline:'none',boxSizing:'border-box',fontFamily:"'DM Sans',sans-serif" },

  // ESTIMATE
  estimateBox:{ background:`linear-gradient(135deg,${TEAL},${TEAL_DARK})`,color:'#fff',borderRadius:18,padding:'22px 18px',textAlign:'center',marginBottom:14 },
  estimateTotal:{ fontSize:48,fontWeight:900,fontFamily:"'Playfair Display',serif",lineHeight:1 },

  // CALENDAR
  availBanner:{ display:'flex',alignItems:'center',gap:8,background:'#e8f5e9',border:'1px solid #a5d6a7',borderRadius:10,padding:'9px 14px',marginBottom:12,fontSize:13,fontWeight:600,color:'#2e7d32' },
  availDot:{ width:9,height:9,borderRadius:'50%',background:'#43a047',flexShrink:0 },
  calWrap:{ background:'#fff',borderRadius:14,border:'1.5px solid #e0e0e0',overflow:'hidden' },
  calNav:{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:TEAL,color:'#fff' },
  calNavBtn:{ background:'rgba(255,255,255,0.2)',border:'none',color:'#fff',width:30,height:30,borderRadius:'50%',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' },
  calDow:{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:'#f5f5f0',padding:'6px 8px 2px' },
  calDowCell:{ textAlign:'center',fontSize:11,fontWeight:700,color:'#777',padding:'2px 0' },
  calGrid:{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,padding:8 },
  calLegend:{ display:'flex',justifyContent:'center',gap:16,padding:'8px 12px 12px',fontSize:11,color:'#777',fontWeight:500 },
  legDot:{ display:'inline-block',width:8,height:8,borderRadius:'50%',marginRight:4 },

  // GROUT
  groutGrid:{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8 },
  groutSwatch:{ aspectRatio:'1',borderRadius:11,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative' },
  groutCheckMark:{ position:'absolute',top:3,right:4,background:'#fff',borderRadius:'50%',width:14,height:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:TEAL,fontWeight:900 },

  // FORM
  formGrid:{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12 },
  textInput:{ padding:'10px 12px',borderRadius:9,border:'1.5px solid #ddd',fontSize:14,outline:'none',fontFamily:"'DM Sans',sans-serif",background:'#fff',width:'100%',boxSizing:'border-box' },
  inputErr:{ border:'1.5px solid #c62828' },
  select:{ padding:'10px 12px',borderRadius:9,border:'1.5px solid #ddd',fontSize:14,outline:'none',background:'#fff',width:'100%',fontFamily:"'DM Sans',sans-serif" },
  checkRow:{ display:'flex',alignItems:'flex-start',gap:10,margin:'12px 0',cursor:'pointer' },
  promoBtn:{ background:'#f0f0f0',border:'none',borderRadius:9,padding:'10px 16px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",whiteSpace:'nowrap' },
  confirmBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:14,padding:15,fontSize:16,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",marginTop:10,letterSpacing:'0.2px' },
  skipBtn:{ width:'100%',background:'none',border:'none',color:'#aaa',fontSize:13,cursor:'pointer',marginTop:8,textDecoration:'underline',padding:8,fontFamily:"'DM Sans',sans-serif" },

  // UPSELL
  upsellCard:{ display:'flex',alignItems:'center',gap:12,background:'#fff',borderRadius:16,padding:'18px 16px 16px',marginBottom:10,boxShadow:'0 1px 8px rgba(0,0,0,0.06)',position:'relative',cursor:'pointer',border:'1.5px solid #e0e0e0',transition:'border-color 0.15s' },
  upsellActive:{ border:`1.5px solid ${TEAL}`,background:TEAL_LIGHT },
  upsellBadge:{ position:'absolute',top:-9,left:14,background:TEAL,color:'#fff',fontSize:10,fontWeight:700,padding:'2px 9px',borderRadius:10,letterSpacing:'0.4px' },
  upsellCheck:{ width:24,height:24,borderRadius:'50%',border:'1.5px solid #ccc',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0 },
  upsellCheckOn:{ background:TEAL,border:`1.5px solid ${TEAL}` },

  // DONE
  doneCard:{ background:'#fff',borderRadius:24,padding:'36px 24px',textAlign:'center',boxShadow:'0 4px 24px rgba(0,0,0,0.1)' },

  // FLOATING BAR
  floatingBar:{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,zIndex:999,display:'flex',alignItems:'center',justifyContent:'space-between',background:TEAL_DARK,padding:'12px 18px 20px',boxShadow:'0 -4px 24px rgba(0,0,0,0.18)',borderTop:'1px solid rgba(255,255,255,0.1)' },
  floatingTotal:{ fontSize:28,fontWeight:900,fontFamily:"'Playfair Display',serif",color:'#fff',lineHeight:1 },
  floatingBtn:{ background:'#fff',color:TEAL_DARK,border:'none',borderRadius:22,padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',whiteSpace:'nowrap',boxShadow:'0 2px 8px rgba(0,0,0,0.15)',fontFamily:"'DM Sans',sans-serif" },

  // CHAT
  chatWidget:{ position:'fixed',bottom:18,right:16,zIndex:1000,display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8 },
  chatBox:{ width:300,background:'#fff',borderRadius:18,boxShadow:'0 8px 36px rgba(0,0,0,0.16)',overflow:'hidden',display:'flex',flexDirection:'column' },
  chatHead:{ background:TEAL,color:'#fff',padding:'13px 14px',display:'flex',alignItems:'center',gap:10 },
  chatAvatar:{ width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 },
  chatClose:{ marginLeft:'auto',background:'none',border:'none',color:'#fff',fontSize:18,cursor:'pointer' },
  chatMsgs:{ padding:12,maxHeight:200,overflowY:'auto',display:'flex',flexDirection:'column',gap:8 },
  chatMsg:{ padding:'9px 13px',borderRadius:14,fontSize:13,lineHeight:1.4,maxWidth:'88%' },
  chatBot:{ background:'#f0f0f0',alignSelf:'flex-start',borderBottomLeftRadius:3 },
  chatUser:{ background:TEAL,color:'#fff',alignSelf:'flex-end',borderBottomRightRadius:3 },
  chatQuickBtn:{ background:TEAL_LIGHT,border:`1px solid rgba(26,127,122,0.2)`,borderRadius:9,padding:'7px 11px',fontSize:12,cursor:'pointer',color:TEAL_DARK,textAlign:'left',fontFamily:"'DM Sans',sans-serif",fontWeight:500 },
  chatInputRow:{ display:'flex',borderTop:'1px solid #eee',padding:8,gap:6 },
  chatInput:{ flex:1,border:'1px solid #ddd',borderRadius:9,padding:'7px 11px',fontSize:13,outline:'none',fontFamily:"'DM Sans',sans-serif" },
  chatSend:{ background:TEAL,color:'#fff',border:'none',borderRadius:9,padding:'7px 13px',cursor:'pointer',fontSize:14 },
  chatToggle:{ background:TEAL,color:'#fff',border:'none',borderRadius:28,padding:'13px 18px',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',gap:8,boxShadow:'0 4px 18px rgba(0,0,0,0.22)',fontFamily:"'DM Sans',sans-serif" },

  // FOOTER
  footer:{ textAlign:'center',padding:'22px 16px',borderTop:'1px solid #e8e8e8',marginTop:8 },

  TEAL_DARK,
};
