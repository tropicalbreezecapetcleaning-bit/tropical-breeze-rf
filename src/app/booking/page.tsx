'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── THEME (declared first — used throughout) ─────────────────────────────────
const TEAL       = '#1a7f7a';
const TEAL_DARK  = '#145f5b';
const TEAL_LIGHT = '#e6f7f6';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const API    = 'https://vzyz64q319.execute-api.us-east-1.amazonaws.com/Stage/booking';
const SPRING = 0.10;

const CARPET_ROOMS   = ['LR','BR 1','BR 2','BR 3','BR 4','BR 5','BR 6','OF','DN','ST','ST 2','ENTRY','HALL','DR','LOFT','PORCH','BONUS'];
const HARDWOOD_ROOMS = ['LR','DR','KT','HL','OF','BR 1','ST','LOFT'];
const TILE_ROOMS     = ['KT','LR','DN','HL','PORCH','LNDRY','MUD','SUNRM'];
const BATH_ROOMS     = ['MB','BT 2','BT 3','HALF','POOL','SHOW'];

const PROMO_CODES: Record<string, number> = {
  BREEZE15: 0.15,
  RF99:     0.10,
  SHORE10:  0.10,
};

const GROUT_COLORS = [
  { id:'white',     name:'White',     hex:'#FFFFFF', light:true  },
  { id:'bone',      name:'Bone',      hex:'#E8DCC8', light:true  },
  { id:'almond',    name:'Almond',    hex:'#D4B896', light:true  },
  { id:'beige',     name:'Beige',     hex:'#C8A882', light:true  },
  { id:'pewter',    name:'Pewter',    hex:'#A89880', light:true  },
  { id:'gray',      name:'Gray',      hex:'#8C8C8C', light:false },
  { id:'silverado', name:'Silverado', hex:'#6B7280', light:false },
  { id:'charcoal',  name:'Charcoal',  hex:'#4B4B4B', light:false },
  { id:'brown',     name:'Brown',     hex:'#6B4226', light:false },
  { id:'black',     name:'Black',     hex:'#1A1A1A', light:false },
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
  { id:'rf99_starter',      badge:'Most Popular', badgeBg:'#e8f5e9', badgeColor:'#2e7d32', emoji:'🧹', name:'RF99™ Starter',      sub:'Perfect first-time clean · 1 room',    features:['1 Carpet Room','RF99™ Process'],                           savings:'Save $26 off regular price',      price:99,  original:125, apply:(q:QuoteState)=>({...q,carpetRooms:['LR']}) },
  { id:'home_clean',        badge:'Best Value',   badgeBg:'#fff8e1', badgeColor:'#f57f17', emoji:'🏠', name:'Home Clean',          sub:'3 bedrooms + tile · most booked',      features:['3 Carpet Rooms','1 Tile Room'],                             savings:'Saves $47 with Mix & Match',      price:277, original:324, apply:(q:QuoteState)=>({...q,carpetRooms:['LR','BR 1','BR 2'],tileRooms:['KT']}) },
  { id:'upholstery_refresh',badge:'New Package',  badgeBg:'#fce4ec', badgeColor:'#c62828', emoji:'🛋️', name:'Upholstery Refresh',  sub:'Sofa + loveseat + 2 chairs',           features:['1 Sofa','1 Loveseat','2 Chairs','Fabric Protector'],        savings:'Saves $27 with Spring discount',  price:242, original:269, apply:(q:QuoteState)=>({...q,sofas:1,loveseats:1,chairs:2,upholProtect:true}) },
  { id:'full_house',        badge:'Full Service', badgeBg:'#e8eaf6', badgeColor:'#283593', emoji:'🏡', name:'Full House',          sub:'Whole home deep clean',                features:['5 Carpet','2 Tile','10 Windows'],                           savings:'Saves $98 with Mix & Match',      price:581, original:679, apply:(q:QuoteState)=>({...q,carpetRooms:['LR','BR 1','BR 2','BR 3','BR 4'],tileRooms:['KT','LR'],windows:10}) },
  { id:'pet_home',          badge:'Pet Special',  badgeBg:'#e0f2f1', badgeColor:'#00695c', emoji:'🐾', name:'Pet Home',            sub:'Odor & stain elimination',             features:['3 Carpet','Deodorizer','Scotchgard'],                       savings:'Saves $33 with Spring discount',  price:301, original:334, apply:(q:QuoteState)=>({...q,carpetRooms:['LR','BR 1','BR 2'],deodorizer:true,scotchgard:true}) },
  { id:'vacation_rental',   badge:'Shore Special',badgeBg:'#e3f2fd', badgeColor:'#1565c0', emoji:'🏖️', name:'Vacation Rental',     sub:'Guest-ready in one visit',             features:['3 Carpet','2 Bathrooms','12 Windows'],                     savings:'Saves $88 with Mix & Match',      price:517, original:605, apply:(q:QuoteState)=>({...q,carpetRooms:['LR','BR 1','BR 2'],bathrooms:['MB','BT 2'],windows:12}) },
];

// ─── SIMULATED BOOKED SLOTS ───────────────────────────────────────────────────
function fmtDate(d: Date) {
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function daysFrom(n: number) {
  const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return d;
}
const BOOKED_SLOTS: Record<string,string[]> = {
  [fmtDate(new Date())]:    ['morning'],
  [fmtDate(daysFrom(1))]:   ['morning','midday'],
  [fmtDate(daysFrom(3))]:   ['morning','midday','afternoon'],
  [fmtDate(daysFrom(7))]:   ['morning'],
  [fmtDate(daysFrom(8))]:   ['midday'],
  [fmtDate(daysFrom(10))]:  ['morning','midday'],
};
const TIME_SLOTS = [
  { id:'morning',   label:'Morning',   sub:'8–11am'   },
  { id:'midday',    label:'Midday',    sub:'11am–2pm' },
  { id:'afternoon', label:'Afternoon', sub:'2–5pm'    },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface QuoteState {
  carpetRooms: string[];
  tileRooms: string[];
  bathrooms: string[];
  scotchgard: boolean;
  deodorizer: boolean;
  petTreatment: boolean;
  groutSealing: boolean;
  colorSeal: boolean;
  groutColor: string;
  sofas: number;
  loveseats: number;
  chairs: number;
  ottomans: number;
  diningChairs: number;
  diningChairType: string;
  upholProtect: boolean;
  upholDeodor: boolean;
  windows: number;
  ezBreeze: number;
  stormWindows: number;
  glassDoors: number;
  screenTrack: boolean;
  rugSmall: number;
  rugMedium: number;
  rugLarge: number;
  rugOversized: number;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  textConfirm: boolean;
  referral: string;
  promoCode: string;
  promoApplied: boolean;
  promoDiscount: number;
  notes: string;
  jobType: string;
}

// ─── INITIAL STATE ────────────────────────────────────────────────────────────
const initQuote = (): QuoteState => ({
  carpetRooms:[], tileRooms:[], bathrooms:[],
  scotchgard:false, deodorizer:false, petTreatment:false,
  groutSealing:false, colorSeal:false, groutColor:'',
  sofas:0, loveseats:0, chairs:0, ottomans:0,
  diningChairs:0, diningChairType:'seat_back',
  upholProtect:false, upholDeodor:false,
  windows:0, ezBreeze:0, stormWindows:0, glassDoors:0, screenTrack:false,
  rugSmall:0, rugMedium:0, rugLarge:0, rugOversized:0,
});

const initForm = (): FormState => ({
  name:'', phone:'', email:'',
  date:'', time:'',
  address:'', city:'', state:'MD', zip:'',
  textConfirm:true, referral:'', promoCode:'', promoApplied:false, promoDiscount:0, notes:'',
  jobType:'residential',
});

// ─── PRICE CALC ───────────────────────────────────────────────────────────────
function calcTotal(q: QuoteState, hardwoodSqft: string, sectionalFt: string, promoDiscount = 0) {
  let t = 0;
  const cr = q.carpetRooms.length;
  if (cr > 0) t += 99 + Math.max(0, cr-1)*50;
  if (q.scotchgard)    t += 30*cr;
  if (q.deodorizer)    t += 25*cr;
  if (q.petTreatment)  t += cr*45;
  t += (parseFloat(hardwoodSqft)||0)*1.0;
  const tc = q.tileRooms.length + q.bathrooms.length;
  t += tc*125;
  if (q.groutSealing) t += Math.round(tc*125*0.5);
  if (q.colorSeal)    t += tc*250;
  const pieces = q.sofas+q.loveseats+q.chairs+q.ottomans;
  t += q.sofas*85 + q.loveseats*75 + q.chairs*50 + q.ottomans*35;
  t += q.diningChairs*(q.diningChairType==='seat_only' ? 10 : 13);
  t += (parseFloat(sectionalFt)||0)*11;
  if (q.upholProtect && pieces>0) t += pieces*20;
  if (q.upholDeodor  && pieces>0) t += pieces*25;
  t += q.windows*13 + (q.glassDoors||0)*25 + q.ezBreeze*15;
  if (q.screenTrack) t += (q.windows+(q.glassDoors||0))*4;
  if (q.ezBreeze>0)  t += 35;
  t += q.rugSmall*150 + q.rugMedium*200 + q.rugLarge*270 + q.rugOversized*370;

  // Mix & Match — 5% off when 2+ service types
  const svcTypes = [
    cr>0,
    (parseFloat(hardwoodSqft)||0)>0,
    tc>0,
    pieces>0,
    (q.windows+q.ezBreeze+q.glassDoors)>0,
    (q.rugSmall+q.rugMedium+q.rugLarge+q.rugOversized)>0,
  ].filter(Boolean).length;
  if (svcTypes >= 2) t *= 0.95;

  // Spring 10% off
  t *= (1 - SPRING);

  // Promo code discount (applied after other discounts)
  if (promoDiscount > 0) t *= (1 - promoDiscount);

  if (t > 0) t = Math.max(125, t);
  return Math.round(t);
}

// ─── SERVICE AREA ZIPS ────────────────────────────────────────────────────────
const SERVICE_ZIPS = new Set([
  '21801','21802','21803','21804','21811','21842','21843','21851','21853',
  '21813','21814','21817','21821','21822','21824','21826','21829','21830',
  '21835','21836','21837','21838','21840','21841','21849','21850','21852',
  '21854','21856','21861','21863','21864','21865','21866','21867','21869',
  '21871','21872','21874','21875','21890','21901','21902','21903','21904',
  '19930','19931','19933','19934','19938','19939','19940','19941','19943',
  '19944','19945','19946','19947','19950','19951','19952','19953','19954',
  '19955','19956','19958','19960','19962','19963','19964','19966','19967',
  '19968','19969','19970','19971','19973','19975','19977','19979','19980',
]);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BookingPage() {
  const [step, setStep]                 = useState<'packages'|'builder'|'upsell'|'done'>('packages');
  const [quote, setQuote]               = useState<QuoteState>(initQuote());
  const [form, setForm]                 = useState<FormState>(initForm());
  const [hardwoodSqft, setHardwoodSqft] = useState('');
  const [sectionalFt, setSectionalFt]   = useState('');
  const [selectedPkg, setSelectedPkg]   = useState<typeof PACKAGES[0]|null>(null);
  const [upsells, setUpsells]           = useState({ priority:false, mix:false });
  const [jobType, setJobType]           = useState('residential');
  const [photos, setPhotos]             = useState<{name:string;url:string}[]>([]);
  const [zipWarning, setZipWarning]     = useState(false);
  const [progStep, setProgStep]         = useState(1);
  const [commercialSent, setCommercialSent]   = useState(false);
  const [commercialName, setCommercialName]   = useState('');
  const [commercialPhone, setCommercialPhone] = useState('');
  const [commercialNotes, setCommercialNotes] = useState('');
  const [errors, setErrors]             = useState<Record<string,boolean>>({});
  const [submitting, setSubmitting]     = useState(false);
  const [confNum, setConfNum]           = useState('');

  // Popups
  const [entryPopup, setEntryPopup] = useState(false);
  const [mixPopup, setMixPopup]     = useState(false);
  const mixPopupShown = useRef(false);
  const prevTotal     = useRef(0);

  // Calendar
  const [calYear, setCalYear]   = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selDate, setSelDate]   = useState('');
  const [selSlot, setSelSlot]   = useState('');

  // Chat
  const [chatOpen, setChatOpen]         = useState(false);
  const [chatMsgs, setChatMsgs]         = useState([{ from:'bot', text:"Hey! 👋 I'm Dalton — owner of Tropical Breeze RF™. What can I help you with today?" }]);
  const [chatInput, setChatInput]       = useState('');
  const [chatQuickDone, setChatQuickDone] = useState(false);

  const total = calcTotal(quote, hardwoodSqft, sectionalFt, form.promoDiscount);

  // Mix & Match popup — fires once when total crosses $450
  useEffect(() => {
    if (step !== 'builder') return;
    if (!mixPopupShown.current && total >= 450 && prevTotal.current < 450) {
      mixPopupShown.current = true;
      setMixPopup(true);
      setTimeout(() => setMixPopup(false), 6000);
    }
    prevTotal.current = total;
  }, [total, step]);

  // Entry popup — fire after 2s
  useEffect(() => {
    const t = setTimeout(() => setEntryPopup(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const setQ = useCallback((key: keyof QuoteState, val: unknown) =>
    setQuote(p => ({...p, [key]:val})), []);

  const setF = useCallback((key: keyof FormState, val: unknown) => {
    setForm(p => ({...p, [key]:val}));
    setErrors(p => ({...p, [key]:false}));
  }, []);

  function toggleRoom(arr: string[], room: string) {
    return arr.includes(room) ? arr.filter(r=>r!==room) : [...arr, room];
  }

  function applyPackage(pkg: typeof PACKAGES[0]) {
    const reset = initQuote();
    setQuote(pkg.apply(reset));
    setSelectedPkg(pkg);
    setStep('builder');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function validateForm() {
    const e: Record<string,boolean> = {};
    if (!form.name.trim())                              e.name    = true;
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g,''))) e.phone   = true;
    if (!form.date || !form.time)                       e.date    = true;
    if (!form.address.trim())                           e.address = true;
    if (!form.city.trim())                              e.city    = true;
    if (!/^\d{5}$/.test(form.zip)) {
      e.zip = true;
    } else if (!SERVICE_ZIPS.has(form.zip)) {
      e.zip = true;
      setZipWarning(true);
    } else {
      setZipWarning(false);
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function applyPromo() {
    const code = form.promoCode.trim().toUpperCase();
    const discount = PROMO_CODES[code];
    if (discount) {
      setF('promoApplied', true);
      setF('promoDiscount', discount);
    } else {
      setF('promoApplied', false);
      setF('promoDiscount', 0);
    }
  }

  async function submitBooking() {
    setSubmitting(true);
    // Strip base64 data from photos — send only filename + size to avoid API Gateway 10 MB limit
    const safePhotos = photos.map(p => ({ name: p.name }));
    const payload = {
      quote,
      form: { ...form, promoDiscount: undefined }, // don't expose internal field
      hardwoodSqft,
      sectionalFt,
      upsells,
      total,
      jobType,
      photos: safePhotos,
      selectedPackage: selectedPkg?.id || 'custom',
      timestamp: new Date().toISOString(),
    };
    try {
      const res  = await fetch(API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      setConfNum(data.confirmationNumber || 'TB' + Date.now().toString().slice(-6));
    } catch {
      // Network failure — still show confirmation so customer isn't stuck
      setConfNum('TB' + Date.now().toString().slice(-6));
    }
    setSubmitting(false);
    setProgStep(4);
    setStep('done');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function resetAll() {
    setStep('packages');
    setQuote(initQuote());
    setForm(initForm());
    setHardwoodSqft('');
    setSectionalFt('');
    setSelectedPkg(null);
    setUpsells({priority:false, mix:false});
    setSelDate('');
    setSelSlot('');
    setErrors({});
    setConfNum('');
    mixPopupShown.current = false;
  }

  function sendChat(text: string) {
    setChatMsgs(p=>[...p,{from:'user',text}]);
    setChatQuickDone(true);
    const replies: Record<string,string> = {
      'Pricing question':        "RF99™ starts at $99/room, $50 each additional. Tile is $125/room. Spring discount is live — 10% off everything!",
      'Do you service my area?': "We serve 33+ cities across MD and DE Eastern Shore — Salisbury, Ocean City, Rehoboth, Georgetown, and everywhere in between.",
      'Pet odor help':           "Our deodorizer eliminates odors at the source. Combined with RF99™ carpet cleaning it's our most effective pet home combo.",
      'Vacation rental':         "We work with tons of Airbnb & VRBO owners. Our Vacation Rental package — 3 carpets + 2 baths + 12 windows — gets you guest-ready in one visit.",
    };
    setTimeout(() => setChatMsgs(p=>[...p,{from:'bot',text:replies[text]||"Great question! Call us at (443) 856-3244 and we'll sort you out right away."}]), 700);
  }

  function getDayStatus(dateStr: string) {
    const booked = BOOKED_SLOTS[dateStr] || [];
    const d = new Date(dateStr);
    if (d.getDay() === 0) return 'full';
    if (booked.length === 0) return 'avail';
    if (booked.length <= 2)  return 'limited';
    return 'full';
  }

  function nextAvailable() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    for (let i = 0; i < 14; i++) {
      const d  = daysFrom(i);
      const ds = fmtDate(d);
      if (d.getDay() !== 0 && getDayStatus(ds) !== 'full')
        return days[d.getDay()] + ', ' + d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
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

      {/* ── MIX & MATCH POPUP ── */}
      {mixPopup && (
        <div
          style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,zIndex:3000}}
          onClick={()=>setMixPopup(false)}
        >
          <style>{`
            @keyframes slideUp {
              from { transform: translateX(-50%) translateY(100%); opacity:0; }
              to   { transform: translateX(-50%) translateY(0);    opacity:1; }
            }
          `}</style>
          <div style={{background:'linear-gradient(135deg,#f57f17,#e65100)',borderRadius:'24px 24px 0 0',padding:'20px 20px 32px',boxShadow:'0 -8px 40px rgba(0,0,0,0.3)'}}>
            <div style={{width:40,height:4,background:'rgba(255,255,255,0.4)',borderRadius:2,margin:'0 auto 16px'}} />
            <div style={{display:'flex',alignItems:'flex-start',gap:14}}>
              <div style={{fontSize:40}}>💰</div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,letterSpacing:2,color:'rgba(255,255,255,0.8)',fontWeight:700,textTransform:'uppercase',marginBottom:4}}>You're almost there</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:'#fff',margin:'0 0 6px',lineHeight:1.15}}>
                  Your quote just hit ${total.toLocaleString()}.
                </h3>
                <p style={{fontSize:13,color:'rgba(255,255,255,0.9)',lineHeight:1.5,margin:'0 0 14px'}}>
                  Add one more service and unlock <strong>5% off your entire booking</strong> — that's <strong>${Math.round(total*0.05)}+ back in your pocket</strong>. Mix & Match kicks in automatically.
                </p>
                <div style={{display:'flex',gap:8}}>
                  <button style={{flex:1,background:'#fff',color:'#e65100',border:'none',borderRadius:12,padding:'12px',fontSize:14,fontWeight:800,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}
                    onClick={e=>{e.stopPropagation();setMixPopup(false);}}>Add a Service ›</button>
                  <button style={{background:'rgba(255,255,255,0.2)',color:'#fff',border:'1px solid rgba(255,255,255,0.3)',borderRadius:12,padding:'12px 16px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}
                    onClick={e=>{e.stopPropagation();setMixPopup(false);}}>Skip</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STICKY PROGRESS BAR ── */}
      {(step==='builder'||step==='upsell') && (
        <div style={{position:'fixed',top:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,zIndex:998,background:'#fff',boxShadow:'0 2px 12px rgba(0,0,0,0.1)',padding:'10px 16px 8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:0}}>
            {[{n:1,label:'Services'},{n:2,label:'Your Info'},{n:3,label:'Confirm'},{n:4,label:'Done'}].map((s2,i)=>{
              const active = step==='builder' ? progStep : step==='upsell' ? 3 : 4;
              const done    = s2.n < active;
              const current = s2.n === active;
              return (
                <div key={s2.n} style={{display:'flex',alignItems:'center',flex:1}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
                    <div style={{width:26,height:26,borderRadius:'50%',background:done?'#2e7d32':current?TEAL:'#e8e8e8',color:done||current?'#fff':'#bbb',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,marginBottom:2,transition:'all 0.3s',boxShadow:current?`0 0 0 3px ${TEAL}33`:'none'}}>
                      {done ? '✓' : s2.n}
                    </div>
                    <span style={{fontSize:9,fontWeight:700,color:done?'#2e7d32':current?TEAL:'#ccc',letterSpacing:0.3,textTransform:'uppercase'}}>{s2.label}</span>
                  </div>
                  {i<3 && <div style={{height:2,flex:0.4,marginBottom:14,background:done?'#2e7d32':'#e8e8e8',transition:'background 0.3s'}} />}
                </div>
              );
            })}
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
          <div style={s.customCTA}>
            <span style={{fontSize:24}}>🔧</span>
            <div>
              <strong style={{fontSize:14}}>Build a Custom Quote</strong>
              <p style={{fontSize:12,color:'#666',margin:'2px 0 0'}}>Choose exactly what you need</p>
            </div>
            <button style={s.customBtn} onClick={()=>setStep('builder')}>Build Quote ›</button>
          </div>
          <MarcusCard onApply={()=>setStep('builder')} />
        </div>
      )}

      {/* ── BUILDER ── */}
      {step==='builder' && (
        <div style={{...s.section,paddingTop:72}}>

          {/* JOB TYPE */}
          <div style={{background:'#fff',borderRadius:16,padding:14,marginBottom:12,boxShadow:'0 1px 6px rgba(0,0,0,0.05)'}}>
            <p style={{fontSize:12,fontWeight:700,color:'#555',margin:'0 0 10px',letterSpacing:0.5}}>JOB TYPE</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
              {[
                {id:'residential',emoji:'🏠',label:'Residential'},
                {id:'vacation',   emoji:'🏖️',label:'Vacation Rental'},
                {id:'moveout',    emoji:'📦',label:'Move-Out'},
                {id:'commercial', emoji:'🏢',label:'Commercial'},
              ].map(jt=>(
                <button key={jt.id} style={{padding:'10px 8px',borderRadius:10,border:jobType===jt.id?`2px solid ${TEAL}`:'1.5px solid #e0e0e0',background:jobType===jt.id?TEAL_LIGHT:'#fafafa',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:12,color:jobType===jt.id?TEAL_DARK:'#555',display:'flex',alignItems:'center',justifyContent:'center',gap:5}}
                  onClick={()=>setJobType(jt.id)}>
                  {jt.emoji} {jt.label}
                </button>
              ))}
            </div>
            {jobType==='commercial' && (
              <div style={{marginTop:10,background:'#e3f2fd',border:'1px solid #90caf9',borderRadius:12,padding:'14px'}}>
                <div style={{fontWeight:700,fontSize:13,color:'#1565c0',marginBottom:4}}>📋 Commercial Estimate Request</div>
                <p style={{fontSize:12,color:'#1565c0',margin:'0 0 10px',lineHeight:1.4}}>Commercial jobs require a free on-site estimate. Drop your info and we'll call within 2 hours.</p>
                {!commercialSent ? (
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    <input style={{...s.textInput,fontSize:13}} type="text" placeholder="Your name *" value={commercialName} onChange={e=>setCommercialName(e.target.value)} />
                    <input style={{...s.textInput,fontSize:13}} type="tel" placeholder="Phone number *" value={commercialPhone} onChange={e=>setCommercialPhone(e.target.value)} />
                    <textarea style={{...s.textInput,fontSize:13,minHeight:60}} placeholder="Brief description..." value={commercialNotes} onChange={e=>setCommercialNotes(e.target.value)} />
                    <button style={{background:'#1565c0',color:'#fff',border:'none',borderRadius:9,padding:'11px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}
                      onClick={async()=>{
                        if(!commercialName||!commercialPhone) return;
                        try {
                          await fetch(API, {method:'POST',headers:{'Content-Type':'application/json'},
                            body:JSON.stringify({type:'commercial_estimate',name:commercialName,phone:commercialPhone,notes:commercialNotes,timestamp:new Date().toISOString()})});
                        } catch {}
                        setCommercialSent(true);
                      }}>
                      Request Free Estimate →
                    </button>
                  </div>
                ) : (
                  <div style={{background:'#fff',borderRadius:9,padding:'12px',textAlign:'center'}}>
                    <div style={{fontSize:20,marginBottom:6}}>✅</div>
                    <div style={{fontWeight:700,fontSize:13,color:'#1565c0'}}>Got it, {commercialName}!</div>
                    <div style={{fontSize:12,color:'#555',marginTop:4}}>We'll call {commercialPhone} within 2 hours to schedule your free estimate.</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedPkg && (
            <div style={s.pkgBanner}>
              <span>{selectedPkg.emoji} {selectedPkg.name} applied</span>
              <button style={s.clearBtn} onClick={()=>setSelectedPkg(null)}>Skip — build my own</button>
            </div>
          )}

          {/* CARPET */}
          <ServiceCard title="🧹 Carpet Cleaning RF99™" sub="$99 first room · $50 each additional">
            <RoomGrid rooms={CARPET_ROOMS} selected={quote.carpetRooms} onToggle={r=>setQ('carpetRooms',toggleRoom(quote.carpetRooms,r))} />
            <div style={{display:'flex',alignItems:'center',padding:'10px 0',borderTop:'1px solid #f5f5f5',marginTop:6}}>
              <div style={{flex:1}}>
                <span style={{fontSize:14,fontWeight:600}}>Total Rooms</span>
                <span style={{fontSize:12,color:'#888'}}> · $99 first · $50 each additional</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <button style={s.counterBtn} onClick={()=>{if(quote.carpetRooms.length>0)setQ('carpetRooms',quote.carpetRooms.slice(0,-1));}}>−</button>
                <span style={{fontSize:16,fontWeight:700,minWidth:20,textAlign:'center'}}>{quote.carpetRooms.length}</span>
                <button style={s.counterBtn} onClick={()=>setQ('carpetRooms',[...quote.carpetRooms,'RM '+(quote.carpetRooms.length+1)])}>+</button>
              </div>
            </div>
            {quote.carpetRooms.length > 0 && (
              <InlineAddons addons={[
                {key:'scotchgard',   label:'Scotchgard™ Protector',  price:`+$${quote.carpetRooms.length*30}`,  hook:'Without this, spills re-bond to the fiber within days. Extends your clean 3x longer.'},
                {key:'deodorizer',   label:'Deodorizer Treatment',    price:`+$${quote.carpetRooms.length*25}`,  hook:'Cleaning removes the stain. This destroys the odor molecules in the pad.'},
                {key:'petTreatment', label:'Enzyme Pet Treatment',    price:`+$${quote.carpetRooms.length*45}`,  hook:'Heavy pet home? Enzyme pre-treatment breaks down urine proteins standard cleaning misses.'},
              ]} quote={quote} setQ={setQ} />
            )}
          </ServiceCard>

          {/* HARDWOOD */}
          <ServiceCard title="🪵 Hardwood Floor Cleaning" sub="$1.00 per square foot">
            <RoomGrid rooms={HARDWOOD_ROOMS} selected={[]} onToggle={()=>{}} label="Tap rooms with hardwood" />
            <InputBlock label="Total Square Feet">
              <input style={s.numInput} type="number" min="0" placeholder="0" value={hardwoodSqft} onChange={e=>setHardwoodSqft(e.target.value)} />
            </InputBlock>
          </ServiceCard>

          {/* TILE */}
          <ServiceCard title="◼ Tile & Grout Cleaning" sub="$125/room">
            <RoomGrid rooms={TILE_ROOMS} selected={quote.tileRooms} onToggle={r=>setQ('tileRooms',toggleRoom(quote.tileRooms,r))} />
            <p style={s.svcSubLabel}>🚿 Bathroom Tile · $125/bath</p>
            <RoomGrid rooms={BATH_ROOMS} selected={quote.bathrooms} onToggle={r=>setQ('bathrooms',toggleRoom(quote.bathrooms,r))} />
            <p style={s.roomCount}>Rooms selected: <strong>{quote.tileRooms.length+quote.bathrooms.length}</strong></p>
            {(quote.tileRooms.length+quote.bathrooms.length) > 0 && (
              <InlineAddons addons={[
                {key:'groutSealing',label:'Grout Sealing', price:`+$${Math.round((quote.tileRooms.length+quote.bathrooms.length)*125*0.5)}`, hook:'Clean grout re-dirties in 7 days without sealing. Lock in the results.'},
                {key:'colorSeal',   label:'Color Seal',    price:`+$${(quote.tileRooms.length+quote.bathrooms.length)*250}`,                  hook:'Faded or stained grout? Restore it to any color — permanently.'},
              ]} quote={quote} setQ={setQ} />
            )}
            {quote.colorSeal && (
              <div style={{marginTop:10}}>
                <p style={{fontSize:12,fontWeight:700,color:TEAL,marginBottom:8}}>🎨 Pick Your Grout Color</p>
                <div style={s.groutGrid}>
                  {GROUT_COLORS.map(c=>(
                    <div key={c.id} onClick={()=>setQ('groutColor',c.name)} style={{...s.groutSwatch,background:c.hex,border:quote.groutColor===c.name?`3px solid ${TEAL}`:'2px solid #ddd'}}>
                      <span style={{fontSize:9,fontWeight:800,color:c.light?'#333':'#fff'}}>{c.name}</span>
                      {quote.groutColor===c.name && <span style={s.groutCheckMark}>✓</span>}
                    </div>
                  ))}
                </div>
                {quote.groutColor && <p style={{fontSize:12,color:TEAL,fontWeight:600,marginTop:6}}>Selected: {quote.groutColor}</p>}
              </div>
            )}
          </ServiceCard>

          {/* UPHOLSTERY */}
          <ServiceCard title="🛋️ Upholstery Cleaning" sub="">
            <CounterRow label="Sofas"      price="$85/sofa"      val={quote.sofas}      onChange={v=>setQ('sofas',v)} />
            <CounterRow label="Loveseats"  price="$75/loveseat"  val={quote.loveseats}  onChange={v=>setQ('loveseats',v)} />
            <CounterRow label="Chairs"     price="$50/chair"     val={quote.chairs}     onChange={v=>setQ('chairs',v)} />
            <CounterRow label="Ottoman"    price="$35/ottoman"   val={quote.ottomans}   onChange={v=>setQ('ottomans',v)} />
            <div style={{borderBottom:'1px solid #f0f0f0',paddingBottom:8}}>
              <CounterRow label="Dining Room Chairs" price="" val={quote.diningChairs} onChange={v=>setQ('diningChairs',v)} />
              <div style={{display:'flex',gap:6,marginTop:6}}>
                <button style={{...s.diningBtn,...(quote.diningChairType==='seat_back'?s.diningBtnActive:{})}} onClick={()=>setQ('diningChairType','seat_back')}>🪑 Seat & Back $13</button>
                <button style={{...s.diningBtn,...(quote.diningChairType==='seat_only'?s.diningBtnActive:{})}} onClick={()=>setQ('diningChairType','seat_only')}>👆 Seat Only $10</button>
              </div>
            </div>
            <InputBlock label="Sectional Linear Feet · $11/ft">
              <input style={s.numInput} type="number" min="0" placeholder="0" value={sectionalFt} onChange={e=>setSectionalFt(e.target.value)} />
            </InputBlock>
            {(quote.sofas+quote.loveseats+quote.chairs+quote.ottomans) > 0 && (
              <InlineAddons addons={[
                {key:'upholProtect',label:'Fabric Protector',     price:`+$${(quote.sofas+quote.loveseats+quote.chairs+quote.ottomans)*20}`, hook:'One spill undoes everything. Applied now while fibers are open — best time to protect.'},
                {key:'upholDeodor', label:'Deodorizer Treatment', price:`+$${(quote.sofas+quote.loveseats+quote.chairs+quote.ottomans)*25}`, hook:'Fabric holds odors long after the stain is gone. Enzyme treatment destroys them at the source.'},
              ]} quote={quote} setQ={setQ} />
            )}
          </ServiceCard>

          {/* WINDOWS */}
          <ServiceCard title="🪟 Window Cleaning" sub="">
            <CounterRow label="Standard Windows"       price="$13/window"            val={quote.windows}      onChange={v=>setQ('windows',v)} />
            <CounterRow label="EZ Breeze Panels"       price="$15/panel + $35 track" val={quote.ezBreeze}     onChange={v=>setQ('ezBreeze',v)} />
            <CounterRow label="🚪 Glass Sliding Doors" price="$25/glass panel"       val={quote.glassDoors}   onChange={v=>setQ('glassDoors',v)} />
            <CounterRow label="🌩️ Storm Windows"        price="TBD on-site"           val={quote.stormWindows} onChange={v=>setQ('stormWindows',v)} />
            {(quote.windows+quote.ezBreeze+quote.glassDoors) > 0 && (
              <InlineAddons addons={[
                {key:'screenTrack',label:'Screen & Track Cleaning',price:`+$${(quote.windows+(quote.glassDoors||0))*4}`,hook:'Dirty tracks blow salt and pollen back onto clean glass every time you open the window.'},
              ]} quote={quote} setQ={setQ} />
            )}
          </ServiceCard>

          {/* RUGS */}
          <ServiceCard title="🪄 Rug Cleaning (Pickup Included)" sub="No drop-offs — pickup & return">
            <CounterRow label="Small Rug"     price="$75 + $75 pickup"  val={quote.rugSmall}     onChange={v=>setQ('rugSmall',v)} />
            <CounterRow label="Medium Rug"    price="$125 + $75 pickup" val={quote.rugMedium}    onChange={v=>setQ('rugMedium',v)} />
            <CounterRow label="Large Rug"     price="$195 + $75 pickup" val={quote.rugLarge}     onChange={v=>setQ('rugLarge',v)} />
            <CounterRow label="Oversized Rug" price="$295 + $75 pickup" val={quote.rugOversized}  onChange={v=>setQ('rugOversized',v)} />
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

          {/* MIX & MATCH LIVE INDICATOR */}
          {(()=>{
            const cr      = quote.carpetRooms.length;
            const tc      = quote.tileRooms.length+quote.bathrooms.length;
            const pieces  = quote.sofas+quote.loveseats+quote.chairs+quote.ottomans;
            const wins    = (quote.windows+quote.ezBreeze+quote.glassDoors)>0;
            const rugs    = (quote.rugSmall+quote.rugMedium+quote.rugLarge+quote.rugOversized)>0;
            const hw      = (parseFloat(hardwoodSqft)||0)>0;
            const svcCount= [cr>0,hw,tc>0,pieces>0,wins,rugs].filter(Boolean).length;
            const savings  = svcCount>=2 ? Math.round(total/0.95*0.05) : 0;
            if (svcCount>=2) return (
              <div style={{background:'linear-gradient(120deg,#1a7f7a,#145f5b)',borderRadius:14,padding:'10px 16px',marginBottom:12,display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:18}}>🎉</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:13,color:'#fff'}}>Mix & Match active — saving ${savings}</div>
                </div>
                <div style={{fontWeight:900,fontSize:18,color:'#7fffd4',fontFamily:"'Playfair Display',serif"}}>-${savings}</div>
              </div>
            );
            return null;
          })()}

          {/* ESTIMATE */}
          <div style={s.estimateBox}>
            <div style={{fontSize:11,opacity:0.75,fontWeight:600,letterSpacing:1.5,textTransform:'uppercase',marginBottom:8}}>🧮 Your Estimate</div>
            {total > 0 && (
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:6}}>
                <span style={{fontSize:16,opacity:0.5,textDecoration:'line-through',fontWeight:600}}>${Math.round(total/0.9).toLocaleString()}</span>
                <span style={{background:'#7fffd4',color:'#0d5c58',fontSize:11,fontWeight:800,padding:'3px 9px',borderRadius:20}}>🌸 10% OFF</span>
              </div>
            )}
            <div style={s.estimateTotal}>${total.toLocaleString()}</div>
            {total > 0 && (
              <p style={{fontSize:12,color:'#7fffd4',fontWeight:700,margin:'6px 0 2px'}}>
                You're saving ${Math.round(total/0.9*0.1).toLocaleString()} with Spring Special
              </p>
            )}
            {form.promoApplied && (
              <p style={{fontSize:12,color:'#7fffd4',fontWeight:700,margin:'2px 0'}}>
                ✂ Promo code applied — extra {Math.round(form.promoDiscount*100)}% off
              </p>
            )}
            <p style={{fontSize:11,opacity:0.6,margin:0}}>Final price confirmed on-site · Ends April 30</p>
          </div>

          {/* CALLBACK */}
          <CallbackCard />

          {/* FORM */}
          <ServiceCard title="👤 Your Information" sub="">
            <div style={s.formGrid}>
              <FormField label="Name *" error={errors.name} errorMsg="Name is required">
                <input style={{...s.textInput,...(errors.name?s.inputErr:{})}} type="text" placeholder="Full name" value={form.name} onFocus={()=>setProgStep(p=>Math.max(p,2))} onChange={e=>setF('name',e.target.value)} />
              </FormField>
              <FormField label="Phone *" error={errors.phone} errorMsg="Valid 10-digit phone required">
                <input style={{...s.textInput,...(errors.phone?s.inputErr:{})}} type="tel" placeholder="(443) 000-0000" value={form.phone} onChange={e=>setF('phone',e.target.value)} />
              </FormField>
              <FormField label="Email" full>
                <input style={s.textInput} type="email" placeholder="Optional — for confirmation email" value={form.email} onChange={e=>setF('email',e.target.value)} />
              </FormField>

              {/* CALENDAR */}
              <FormField label="Preferred Date & Time *" full error={errors.date} errorMsg="Please select a date and time slot">
                <div style={s.availBanner}>
                  <span style={s.availDot}></span>
                  <span>Next available: <strong>{nextAvailable()}</strong></span>
                </div>
                <CalendarPicker
                  calYear={calYear} calMonth={calMonth}
                  onPrev={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}
                  onNext={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}
                  selDate={selDate}
                  onSelectDate={(ds)=>{setSelDate(ds);setSelSlot('');setF('date',ds);setF('time','');}}
                  getDayStatus={getDayStatus}
                />
                {selDate && (
                  <TimeSlots
                    dateStr={selDate} selSlot={selSlot}
                    booked={BOOKED_SLOTS[selDate]||[]}
                    onSelect={(id,label)=>{setSelSlot(id);setF('time',label);}}
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
              <FormField label="ZIP *" error={errors.zip} errorMsg={zipWarning?"Sorry, that ZIP is outside our service area. Call (443) 856-3244 to confirm.":"Valid ZIP required"}>
                <input style={{...s.textInput,...(errors.zip?s.inputErr:{})}} type="text" maxLength={5} placeholder="21801" value={form.zip} onChange={e=>setF('zip',e.target.value)} />
              </FormField>
              <FormField label="Promo Code" full>
                <div style={{display:'flex',gap:8}}>
                  <input style={{...s.textInput,flex:1}} type="text" placeholder="BREEZE15 · RF99 · SHORE10" value={form.promoCode} onChange={e=>setF('promoCode',e.target.value.toUpperCase())} />
                  <button style={s.promoBtn} onClick={applyPromo}>Apply</button>
                </div>
                {form.promoApplied && <p style={{color:'#2e7d32',fontSize:12,margin:'4px 0 0',fontWeight:500}}>✂ Code applied — {Math.round(form.promoDiscount*100)}% off!</p>}
                {form.promoCode && !form.promoApplied && form.promoCode.length>3 && <p style={{color:'#c62828',fontSize:12,margin:'4px 0 0'}}>✗ Invalid code. Try BREEZE15, RF99, or SHORE10.</p>}
              </FormField>
              <FormField label="Special Instructions" full>
                <textarea style={{...s.textInput,minHeight:72}} placeholder="Gate codes, pets, parking, specific rooms to focus on..." value={form.notes} onChange={e=>setF('notes',e.target.value)} />
              </FormField>
              <FormField label="📷 Upload Photos (Optional)" full>
                <div style={{border:'1.5px dashed #ccc',borderRadius:9,padding:'12px',textAlign:'center',cursor:'pointer',background:'#fafafa'}}
                  onClick={()=>document.getElementById('photo-upload')?.click()}>
                  <input id="photo-upload" type="file" accept="image/*" multiple style={{display:'none'}}
                    onChange={e=>{
                      const files = Array.from(e.target.files||[]).slice(0,4);
                      const readers = files.map(f=>new Promise<{name:string;url:string}>(res=>{
                        const r = new FileReader();
                        r.onload = ev => res({name:f.name, url:ev.target?.result as string});
                        r.readAsDataURL(f);
                      }));
                      Promise.all(readers).then(setPhotos);
                    }}
                  />
                  {photos.length===0
                    ? <p style={{fontSize:13,color:'#aaa',margin:0}}>Tap to add photos of stains, tile, or anything specific · up to 4</p>
                    : <div style={{display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap'}}>
                        {photos.map((p,i)=><img key={i} src={p.url} alt={p.name} style={{width:60,height:60,objectFit:'cover',borderRadius:8,border:'2px solid #1a7f7a'}} />)}
                        <p style={{width:'100%',fontSize:11,color:'#888',margin:'4px 0 0'}}>{photos.length} photo{photos.length>1?'s':''} attached · tap to change</p>
                      </div>
                  }
                </div>
              </FormField>
            </div>
            <label style={s.checkRow}>
              <input type="checkbox" checked={form.textConfirm} onChange={e=>setF('textConfirm',e.target.checked)} style={{accentColor:TEAL}} />
              <span style={{fontSize:13,lineHeight:1.4}}>
                📱 Text me my confirmation + reminder the day before
                <br /><small style={{color:'#aaa'}}>Standard rates apply · Opt out anytime</small>
              </span>
            </label>

            {/* REVIEW NEAR CONFIRM */}
            <div style={{background:'#f9f9f9',borderRadius:12,padding:'12px 14px',margin:'14px 0 10px',border:'1px solid #eee'}}>
              <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <div style={{width:34,height:34,borderRadius:'50%',background:TEAL,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,flexShrink:0}}>D</div>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>Debby DeLoach</div>
                  <div style={{color:'#fbbc04',fontSize:12,margin:'1px 0 4px'}}>★★★★★ <span style={{color:'#999',fontSize:11}}>1 week ago</span></div>
                  <p style={{fontSize:12,color:'#555',lineHeight:1.45,margin:0,fontStyle:'italic'}}>"Tropical Breeze has always given me superior service, often eliminating stains that would seem to be impossible to remove. Very pleasant and courteous and professional."</p>
                  <div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:6}}>
                    {['Responsiveness','Punctuality','Quality','Professionalism','Value'].map(b=>(
                      <span key={b} style={{fontSize:10,background:'#e8f5e9',color:'#2e7d32',padding:'2px 7px',borderRadius:10,fontWeight:600}}>✓ {b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button style={s.confirmBtn} onClick={()=>{ if(validateForm()){ setProgStep(3); setStep('upsell'); } }}>
              Continue to Confirm — ${total.toLocaleString()}
            </button>
          </ServiceCard>
        </div>
      )}

      {/* ── UPSELL ── */}
      {step==='upsell' && (
        <div style={{...s.section,paddingTop:72}}>
          <div style={{textAlign:'center',marginBottom:16}}>
            <div style={{fontSize:40}}>🎁</div>
            <h2 style={s.sectionTitle}>One Last Upgrade!</h2>
            <p style={s.sectionSub}>Popular add-ons — tap to include before you confirm</p>
          </div>
          <div style={{...s.upsellCard,...(upsells.priority?s.upsellActive:{})}} onClick={()=>setUpsells(p=>({...p,priority:!p.priority}))}>
            <div style={s.upsellBadge}>Limited Slots</div>
            <span style={{fontSize:26}}>⚡</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14}}>Priority Scheduling</div>
              <div style={{fontSize:12,color:upsells.priority?TEAL_DARK:'#666',marginTop:2,lineHeight:1.4}}>
                Jump to the front of the line — guaranteed same-day or next-day service. Perfect for vacation rentals and move-outs.
              </div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontWeight:900,color:upsells.priority?TEAL:'#888',fontSize:15}}>+$29</div>
            </div>
            <div style={{...s.upsellCheck,...(upsells.priority?s.upsellCheckOn:{})}}>{upsells.priority?'✓':''}</div>
          </div>
          <div style={{background:'#fffbf0',border:'1px solid #f4d03f',borderRadius:10,padding:'10px 14px',marginBottom:10,fontSize:12,color:'#7a5c00',fontWeight:500}}>
            👥 <strong>43% of Shore homeowners</strong> add priority scheduling — especially during peak season (May–September)
          </div>
          <button style={s.confirmBtn} onClick={submitBooking} disabled={submitting}>
            {submitting ? 'Submitting...' : `Confirm Booking — $${(total+(upsells.priority?29:0)).toLocaleString()}`}
          </button>
          <button style={s.skipBtn} onClick={submitBooking} disabled={submitting}>No thanks, continue to booking</button>
          <button style={{...s.skipBtn,color:'#bbb',fontSize:11}} onClick={()=>setStep('builder')}>← Back to edit quote</button>
        </div>
      )}

      {/* ── DONE ── */}
      {step==='done' && (
        <div style={s.section}>
          <div style={s.doneCard}>
            <div style={{fontSize:56,marginBottom:14}}>✅</div>
            <h2 style={{fontSize:26,color:'#1b5e20',marginBottom:8,fontFamily:"'Playfair Display',serif"}}>You're All Set!</h2>
            <p style={{fontSize:18,color:TEAL,margin:'0 0 8px'}}>Confirmation # <strong>TB{confNum}</strong></p>
            <p style={{fontSize:14,color:'#555',marginBottom:20}}>We'll see you on <strong>{form.date}</strong> · {form.time}</p>
            <a href="tel:4438563244" style={s.phoneBtn}>Questions? Call (443) 856-3244</a>
            <BookingInvoice quote={quote} hardwoodSqft={hardwoodSqft} sectionalFt={sectionalFt} upsells={upsells} total={total} form={form} confNum={confNum} />
            <div style={{marginTop:24,background:`linear-gradient(135deg,${TEAL},${TEAL_DARK})`,borderRadius:18,padding:'20px 18px',textAlign:'left',color:'#fff'}}>
              <div style={{fontSize:11,letterSpacing:2,opacity:0.75,textTransform:'uppercase',fontWeight:600,marginBottom:6}}>Before You Go</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:900,margin:'0 0 8px',lineHeight:1.2}}>Never think about cleaning again.</h3>
              <p style={{fontSize:13,opacity:0.9,lineHeight:1.5,margin:'0 0 14px'}}>RF99™ Members get priority scheduling, locked-in pricing, and automatic seasonal cleanings — all for $99/month. Most members save over $400/year vs booking individually.</p>
              <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:16}}>
                {['Priority booking — skip the waitlist','Locked-in RF99™ pricing forever','Seasonal reminders — we reach out to you','Free deodorizer treatment every visit'].map(b=>(
                  <div key={b} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                    <span style={{color:'#7fffd4',fontWeight:700}}>✓</span>
                    <span style={{opacity:0.92}}>{b}</span>
                  </div>
                ))}
              </div>
              <a href="tel:4438563244" style={{display:'block',background:'#fff',color:TEAL_DARK,borderRadius:12,padding:'12px',textAlign:'center',fontWeight:800,fontSize:14,textDecoration:'none'}}>
                Ask About RF99™ Membership →
              </a>
              <p style={{fontSize:11,opacity:0.6,textAlign:'center',marginTop:8}}>Call us at (443) 856-3244 · No contracts · Cancel anytime</p>
            </div>
            <button style={{...s.skipBtn,marginTop:16}} onClick={resetAll}>📅 Book Another Service</button>
          </div>
        </div>
      )}

      {/* ── FLOATING TOTAL BAR ── */}
      {(step==='builder'||step==='upsell') && (
        <div style={s.floatingBar}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <span style={{fontSize:10,color:'rgba(255,255,255,0.65)',fontWeight:600,letterSpacing:1,textTransform:'uppercase',marginBottom:1}}>Your Estimate</span>
            <span style={s.floatingTotal}>${total.toLocaleString()}</span>
            {total > 0 && <span style={{fontSize:10,color:'#7fffd4',fontWeight:700,marginTop:2}}>🌸 Saving ${Math.round(total/0.9*0.1).toLocaleString()} · Spring Special ends Apr 30</span>}
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

function ServiceCard({ title, sub, children }: { title:string; sub:string; children:React.ReactNode }) {
  return (
    <div style={s.svcCard}>
      <div style={{marginBottom:sub?2:8}}>
        <h3 style={s.svcTitle}>{title}</h3>
      </div>
      {sub && <p style={s.svcSub}>{sub}</p>}
      {children}
    </div>
  );
}

function RoomGrid({ rooms, selected, onToggle, label }: { rooms:string[]; selected:string[]; onToggle:(r:string)=>void; label?:string }) {
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

function CounterRow({ label, price, val, onChange }: { label:string; price:string; val:number; onChange:(v:number)=>void }) {
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

function InputBlock({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div style={{padding:'8px 0'}}>
      <label style={{display:'block',fontSize:12,fontWeight:600,color:'#555',marginBottom:4}}>{label}</label>
      {children}
    </div>
  );
}

function FormField({ label, full, error, errorMsg, children }: { label:string; full?:boolean; error?:boolean; errorMsg?:string; children:React.ReactNode }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gridColumn:full?'1 / -1':undefined}}>
      <label style={{fontSize:12,fontWeight:600,color:'#555',marginBottom:4}}>{label}</label>
      {children}
      {error && <span style={{fontSize:11,color:'#c62828',marginTop:3}}>{errorMsg}</span>}
    </div>
  );
}

function CalendarPicker({ calYear, calMonth, onPrev, onNext, selDate, onSelectDate, getDayStatus }:
  { calYear:number; calMonth:number; onPrev:()=>void; onNext:()=>void; selDate:string; onSelectDate:(ds:string)=>void; getDayStatus:(ds:string)=>string }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const firstDay    = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const dayColors   = { avail:'#e8f5e9', limited:'#fff8e1', full:'#fce4ec' } as Record<string,string>;
  const dayTextColors = { avail:'#2e7d32', limited:'#f57f17', full:'#c62828' } as Record<string,string>;
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
          const d    = i+1;
          const date = new Date(calYear,calMonth,d);
          const ds   = fmtDate(date);
          const isPast = date < today;
          const status = isPast ? 'past' : getDayStatus(ds);
          const isSel  = selDate===ds;
          return (
            <button key={d} disabled={isPast||status==='full'}
              onClick={()=>!isPast&&status!=='full'&&onSelectDate(ds)}
              style={{aspectRatio:'1',borderRadius:9,border:'none',fontSize:13,fontWeight:600,cursor:isPast||status==='full'?'default':'pointer',background:isSel?TEAL:isPast?'transparent':dayColors[status]||'transparent',color:isSel?'#fff':isPast?'#ccc':dayTextColors[status]||'#333',transform:isSel?'scale(1.08)':'none',transition:'all 0.1s',fontFamily:'DM Sans, sans-serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}>
              <span>{d}</span>
              {!isPast&&status!=='past'&&(
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

function TimeSlots({ dateStr, selSlot, booked, onSelect }:
  { dateStr:string; selSlot:string; booked:string[]; onSelect:(id:string,label:string)=>void }) {
  const d = new Date(dateStr);
  return (
    <div style={{marginTop:12}}>
      <p style={{fontSize:13,fontWeight:600,color:'#555',marginBottom:8}}>
        Available times on <strong>{d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</strong>
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {TIME_SLOTS.map(slot=>{
          const isBooked = booked.includes(slot.id);
          const isSel    = selSlot===slot.id;
          return (
            <button key={slot.id} disabled={isBooked}
              onClick={()=>!isBooked&&onSelect(slot.id,`${slot.label} (${slot.sub})`)}
              style={{padding:'10px 6px',borderRadius:10,fontSize:12,fontWeight:700,fontFamily:'DM Sans, sans-serif',textAlign:'center',cursor:isBooked?'not-allowed':'pointer',border:isSel?`1.5px solid ${TEAL}`:'1.5px solid #ddd',background:isSel?TEAL:isBooked?'#f5f5f5':'#fafafa',color:isSel?'#fff':isBooked?'#bbb':'#333',textDecoration:isBooked?'line-through':'none',transition:'all 0.1s'}}>
              <div>{slot.label}</div>
              <div style={{fontSize:10,opacity:0.75,fontWeight:400}}>{slot.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MarcusCard({ onApply }: { onApply:()=>void }) {
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState('');
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
  const [phone, setPhone]   = useState('');
  const [time, setTime]     = useState('Anytime');
  const [sent, setSent]     = useState(false);
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
      {sent && <p style={{color:'#2e7d32',fontSize:13,marginTop:8,fontWeight:500}}>✅ Got it! We'll call you back · (443) 856-3244</p>}
    </div>
  );
}

// ─── BOOKING INVOICE ──────────────────────────────────────────────────────────
function BookingInvoice({ quote, hardwoodSqft, sectionalFt, upsells, total, form, confNum }:
  { quote:QuoteState; hardwoodSqft:string; sectionalFt:string; upsells:{priority:boolean;mix:boolean}; total:number; form:FormState; confNum:string }) {
  const rows: {emoji:string;label:string;items:string[];sub:number}[] = [];
  const cr = quote.carpetRooms.length;
  if (cr > 0) {
    let items: string[] = []; let sub = 99 + Math.max(0,cr-1)*50;
    items.push(`${cr} room${cr>1?'s':''}`);
    if (quote.scotchgard)   { items.push('Scotchgard');      sub += cr*30; }
    if (quote.deodorizer)   { items.push('Deodorizer');      sub += cr*25; }
    if (quote.petTreatment) { items.push('Enzyme Treatment'); sub += cr*45; }
    rows.push({emoji:'🧹',label:'Carpet',items,sub});
  }
  const hw = parseFloat(hardwoodSqft)||0;
  if (hw > 0) rows.push({emoji:'🪵',label:'Hardwood',items:[`${hw} sq ft`],sub:hw});
  const tc = quote.tileRooms.length + quote.bathrooms.length;
  if (tc > 0) {
    let items: string[] = []; let sub = tc*125;
    items.push(`${tc} room${tc>1?'s':''}`);
    if (quote.groutSealing) { items.push('Grout Seal'); sub += Math.round(tc*125*0.5); }
    if (quote.colorSeal)    { items.push('Color Seal'); sub += tc*250; }
    if (quote.groutColor)   { items.push(quote.groutColor); }
    rows.push({emoji:'◼',label:'Tile & Grout',items,sub});
  }
  const pieces = quote.sofas+quote.loveseats+quote.chairs+quote.ottomans;
  if (pieces > 0 || quote.diningChairs > 0 || (parseFloat(sectionalFt)||0)>0) {
    let items: string[] = []; let sub = 0;
    if (quote.sofas)     { items.push(`${quote.sofas} sofa${quote.sofas>1?'s':''}`);         sub += quote.sofas*85; }
    if (quote.loveseats) { items.push(`${quote.loveseats} loveseat${quote.loveseats>1?'s':''}`); sub += quote.loveseats*75; }
    if (quote.chairs)    { items.push(`${quote.chairs} chair${quote.chairs>1?'s':''}`);       sub += quote.chairs*50; }
    if (quote.ottomans)  { items.push(`${quote.ottomans} ottoman${quote.ottomans>1?'s':''}`); sub += quote.ottomans*35; }
    if (quote.diningChairs) { items.push(`${quote.diningChairs} dining`); sub += quote.diningChairs*(quote.diningChairType==='seat_only'?10:13); }
    if ((parseFloat(sectionalFt)||0)>0) { items.push(`${sectionalFt}ft sectional`); sub += parseFloat(sectionalFt)*11; }
    if (quote.upholProtect) { items.push('Protector'); sub += pieces*20; }
    if (quote.upholDeodor)  { items.push('Deodorizer'); sub += pieces*25; }
    rows.push({emoji:'🛋️',label:'Upholstery',items,sub});
  }
  const wins = quote.windows+(quote.glassDoors||0)+quote.ezBreeze;
  if (wins > 0) {
    let items: string[] = []; let sub = 0;
    if (quote.windows)    { items.push(`${quote.windows} windows`);        sub += quote.windows*13; }
    if (quote.glassDoors) { items.push(`${quote.glassDoors} glass doors`); sub += quote.glassDoors*25; }
    if (quote.ezBreeze)   { items.push(`${quote.ezBreeze} EZ Breeze`);     sub += quote.ezBreeze*15+35; }
    if (quote.stormWindows) { items.push(`${quote.stormWindows} storm`); }
    if (quote.screenTrack)  { items.push('Screen & Track'); sub += (quote.windows+(quote.glassDoors||0))*4; }
    rows.push({emoji:'🪟',label:'Windows',items,sub});
  }
  const rugTotal = quote.rugSmall*150+quote.rugMedium*200+quote.rugLarge*270+quote.rugOversized*370;
  if (rugTotal > 0) {
    const items: string[] = [];
    if (quote.rugSmall)     items.push(`${quote.rugSmall} small`);
    if (quote.rugMedium)    items.push(`${quote.rugMedium} medium`);
    if (quote.rugLarge)     items.push(`${quote.rugLarge} large`);
    if (quote.rugOversized) items.push(`${quote.rugOversized} oversized`);
    rows.push({emoji:'🪄',label:'Rugs',items,sub:rugTotal});
  }
  if (upsells?.priority) rows.push({emoji:'⚡',label:'Priority',items:['Same/next day'],sub:29});

  const subtotal   = rows.reduce((a,r)=>a+r.sub, 0);
  const svcTypes   = rows.filter(r=>r.emoji!=='⚡').length;
  const mixSavings = svcTypes>=2 ? Math.round(subtotal*0.05) : 0;
  const afterMix   = subtotal - mixSavings;
  const springSavings = Math.round(afterMix*SPRING);
  const promoSavings  = form.promoDiscount > 0 ? Math.round((afterMix-springSavings)*form.promoDiscount) : 0;

  return (
    <div style={{marginTop:20,borderRadius:16,overflow:'hidden',border:'1px solid #e8e8e8',textAlign:'left'}}>
      <div style={{background:`linear-gradient(120deg,#1a7f7a,#145f5b)`,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:900,color:'#fff'}}>Tropical Breeze RF™</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.7)',marginTop:1}}>Booking #{confNum} · {form.date}</div>
        </div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.8)',textAlign:'right'}}>
          <div>{form.name}</div>
          <div>{form.city}, {form.state}</div>
        </div>
      </div>
      {rows.map((row,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',padding:'10px 14px',borderBottom:'1px solid #f2f2f2',background:i%2===0?'#fff':'#fafafa'}}>
          <span style={{fontSize:16,marginRight:8,flexShrink:0}}>{row.emoji}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,color:'#1a1a1a'}}>{row.label}</div>
            <div style={{fontSize:11,color:'#888',marginTop:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{row.items.join(' · ')}</div>
          </div>
          <div style={{fontWeight:800,fontSize:14,color:'#1a1a1a',marginLeft:8,flexShrink:0}}>${row.sub.toLocaleString()}</div>
        </div>
      ))}
      <div style={{background:'#f9f9f9',borderTop:'1px solid #eee'}}>
        {mixSavings > 0 && (
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',fontSize:13}}>
            <span style={{color:'#2e7d32',fontWeight:600}}>🎉 Mix & Match (5%)</span>
            <span style={{color:'#2e7d32',fontWeight:700}}>-${mixSavings}</span>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',fontSize:13}}>
          <span style={{color:'#1a7f7a',fontWeight:600}}>🌸 Spring Special (10%)</span>
          <span style={{color:'#1a7f7a',fontWeight:700}}>-${springSavings}</span>
        </div>
        {promoSavings > 0 && (
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',fontSize:13}}>
            <span style={{color:'#7b3fa0',fontWeight:600}}>✂ Promo Code ({Math.round(form.promoDiscount*100)}%)</span>
            <span style={{color:'#7b3fa0',fontWeight:700}}>-${promoSavings}</span>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 14px',borderTop:'1px solid #e0e0e0'}}>
          <span style={{fontWeight:800,fontSize:15,fontFamily:"'Playfair Display',serif"}}>Total Due On-Site</span>
          <span style={{fontWeight:900,fontSize:18,color:'#1a7f7a',fontFamily:"'Playfair Display',serif"}}>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ─── INLINE ADD-ONS ───────────────────────────────────────────────────────────
const ADDON_STYLE: Record<string,{icon:string;from:string;to:string;badge:string;badgeBg:string;badgeColor:string}> = {
  scotchgard:   {icon:'🛡️',from:'#1a7f7a',to:'#0d5c58',badge:'73% add this',               badgeBg:'#e0f7f5',badgeColor:'#0d5c58'},
  deodorizer:   {icon:'🌬️',from:'#7b3fa0',to:'#5c2d7a',badge:'Pet owners — must have',      badgeBg:'#f3e8ff',badgeColor:'#7b3fa0'},
  groutSealing: {icon:'🔒',from:'#c47d0e',to:'#9a5f00',badge:'Locks in the clean',          badgeBg:'#fff4e0',badgeColor:'#9a5f00'},
  colorSeal:    {icon:'🎨',from:'#c62828',to:'#8b0000',badge:'Permanent transformation',    badgeBg:'#fce4ec',badgeColor:'#c62828'},
  upholProtect: {icon:'🛡️',from:'#1565c0',to:'#0d3c77',badge:'Applied best when fresh',     badgeBg:'#e3f2fd',badgeColor:'#1565c0'},
  upholDeodor:  {icon:'🌬️',from:'#7b3fa0',to:'#5c2d7a',badge:'Every pet home needs this',   badgeBg:'#f3e8ff',badgeColor:'#7b3fa0'},
  screenTrack:  {icon:'🔘',from:'#2e7d32',to:'#1b5e20',badge:'$4/window — most overlooked', badgeBg:'#e8f5e9',badgeColor:'#2e7d32'},
  petTreatment: {icon:'🐾',from:'#d84315',to:'#bf360c',badge:'Heavy pet homes — non-negotiable',badgeBg:'#fbe9e7',badgeColor:'#d84315'},
};

function InlineAddons({ addons, quote, setQ }:
  { addons:{key:string;label:string;price:string;hook:string}[]; quote:QuoteState; setQ:(k:keyof QuoteState,v:unknown)=>void }) {
  return (
    <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#bbb',paddingLeft:2}}>Recommended Add-ons</div>
      {addons.map(addon=>{
        const a  = ADDON_STYLE[addon.key] || {icon:'✨',from:'#1a7f7a',to:'#145f5b',badge:'Popular',badgeBg:'#e6f7f6',badgeColor:'#1a7f7a'};
        const on = quote[addon.key as keyof QuoteState] as boolean;
        return (
          <div key={addon.key} onClick={()=>setQ(addon.key as keyof QuoteState,!on)}
            style={{borderRadius:13,cursor:'pointer',overflow:'hidden',boxShadow:on?'0 4px 16px rgba(0,0,0,0.15)':'0 1px 4px rgba(0,0,0,0.06)',border:on?'none':'1.5px solid #ebebeb',transform:on?'scale(1.01)':'scale(1)',transition:'all 0.18s'}}>
            <div style={{background:on?`linear-gradient(120deg,${a.from},${a.to})`:`linear-gradient(120deg,${a.from}22,${a.to}11)`,padding:'10px 13px',display:'flex',alignItems:'center',gap:10,transition:'background 0.18s'}}>
              <span style={{fontSize:20,flexShrink:0}}>{a.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:on?'#fff':a.from,marginBottom:1}}>{on?'✓ ':''}{addon.label}</div>
                {addon.hook && <div style={{fontSize:11,color:on?'rgba(255,255,255,0.85)':'#666',lineHeight:1.35}}>{addon.hook}</div>}
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:900,color:on?'#fff':a.from,fontFamily:"'Playfair Display',serif"}}>{addon.price}</div>
                <div style={{fontSize:10,fontWeight:700,color:on?'rgba(255,255,255,0.75)':a.badgeColor,marginTop:2}}>{on?'Added ✓':'Tap to add'}</div>
              </div>
            </div>
            {!on && (
              <div style={{background:a.badgeBg,padding:'5px 13px',display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontSize:10,fontWeight:700,color:a.badgeColor}}>👥 {a.badge}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page:{ fontFamily:"'DM Sans',sans-serif",background:'#f4f3ef',color:'#1a1a1a',maxWidth:480,margin:'0 auto',minHeight:'100vh',paddingBottom:120 },
  overlay:{ position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16 },
  entryModal:{ background:'#fff',borderRadius:24,padding:28,width:'100%',maxWidth:420,maxHeight:'90vh',overflowY:'auto',position:'relative',boxShadow:'0 20px 60px rgba(0,0,0,0.25)' },
  modalClose:{ position:'absolute',top:14,right:16,background:'#f0f0f0',border:'none',borderRadius:'50%',width:30,height:30,fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' },
  entryEmoji:{ fontSize:44,textAlign:'center',marginBottom:8 },
  entryTitle:{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,textAlign:'center',margin:'0 0 8px' },
  entrySub:{ fontSize:13,color:'#666',textAlign:'center',lineHeight:1.45,margin:'0 0 16px' },
  entryPackages:{ display:'flex',flexDirection:'column',gap:8,marginBottom:12 },
  entryPkgBtn:{ display:'flex',alignItems:'center',gap:12,background:'#f9f9f9',border:'1.5px solid #e0e0e0',borderRadius:12,padding:'11px 14px',cursor:'pointer',textAlign:'left',fontFamily:"'DM Sans',sans-serif" },
  entryCustomBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:12,padding:'12px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif" },
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
  section:{ padding:16 },
  sectionTitle:{ fontSize:20,fontWeight:900,margin:'0 0 4px',fontFamily:"'Playfair Display',serif" },
  sectionSub:{ fontSize:13,color:'#777',margin:'0 0 16px' },
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
  marcusCard:{ background:'linear-gradient(135deg,#f0faf9,#e6f7f6)',borderRadius:18,padding:18,border:`1px solid rgba(26,127,122,0.15)`,marginBottom:16 },
  marcusTag:{ background:'#fff',border:`1px solid rgba(26,127,122,0.3)`,borderRadius:16,padding:'4px 11px',fontSize:12,color:TEAL,fontWeight:500 },
  marcusTextarea:{ width:'100%',borderRadius:10,border:'1.5px solid #ccc',padding:'10px 12px',fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:'none',outline:'none',background:'#fff',lineHeight:1.4,boxSizing:'border-box' },
  marcusBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:10,padding:11,fontSize:14,fontWeight:600,cursor:'pointer',marginTop:8,fontFamily:"'DM Sans',sans-serif" },
  marcusResult:{ background:'#fff',borderRadius:10,padding:14,marginTop:12,border:`1px solid rgba(26,127,122,0.2)` },
  applyBtn:{ background:TEAL_LIGHT,color:TEAL_DARK,border:'none',borderRadius:8,padding:'7px 14px',fontSize:12,fontWeight:600,cursor:'pointer',marginTop:8,fontFamily:"'DM Sans',sans-serif" },
  pkgBanner:{ background:TEAL_LIGHT,border:`1px solid rgba(26,127,122,0.25)`,borderRadius:10,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,fontSize:13,color:TEAL_DARK,fontWeight:600 },
  clearBtn:{ background:'none',border:'none',color:'#aaa',fontSize:12,cursor:'pointer',textDecoration:'underline' },
  svcCard:{ background:'#fff',borderRadius:18,padding:16,marginBottom:12,boxShadow:'0 1px 8px rgba(0,0,0,0.05)' },
  svcTitle:{ fontSize:16,fontWeight:700,margin:0,fontFamily:"'Playfair Display',serif" },
  svcSub:{ fontSize:12,color:'#888',margin:'0 0 12px' },
  svcSubLabel:{ fontSize:12,color:TEAL,fontWeight:600,margin:'10px 0 6px' },
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
  estimateBox:{ background:`linear-gradient(135deg,${TEAL},${TEAL_DARK})`,color:'#fff',borderRadius:18,padding:'22px 18px',textAlign:'center',marginBottom:14 },
  estimateTotal:{ fontSize:48,fontWeight:900,fontFamily:"'Playfair Display',serif",lineHeight:1 },
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
  groutGrid:{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8 },
  groutSwatch:{ aspectRatio:'1',borderRadius:11,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative' },
  groutCheckMark:{ position:'absolute',top:3,right:4,background:'#fff',borderRadius:'50%',width:14,height:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:TEAL,fontWeight:900 },
  formGrid:{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12 },
  textInput:{ padding:'10px 12px',borderRadius:9,border:'1.5px solid #ddd',fontSize:14,outline:'none',fontFamily:"'DM Sans',sans-serif",background:'#fff',width:'100%',boxSizing:'border-box' },
  inputErr:{ border:'1.5px solid #c62828' },
  select:{ padding:'10px 12px',borderRadius:9,border:'1.5px solid #ddd',fontSize:14,outline:'none',background:'#fff',width:'100%',fontFamily:"'DM Sans',sans-serif" },
  checkRow:{ display:'flex',alignItems:'flex-start',gap:10,margin:'12px 0',cursor:'pointer' },
  promoBtn:{ background:'#f0f0f0',border:'none',borderRadius:9,padding:'10px 16px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",whiteSpace:'nowrap' },
  confirmBtn:{ width:'100%',background:TEAL,color:'#fff',border:'none',borderRadius:14,padding:15,fontSize:16,fontWeight:700,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",marginTop:10,letterSpacing:'0.2px' },
  skipBtn:{ width:'100%',background:'none',border:'none',color:'#aaa',fontSize:13,cursor:'pointer',marginTop:8,textDecoration:'underline',padding:8,fontFamily:"'DM Sans',sans-serif" },
  upsellCard:{ display:'flex',alignItems:'center',gap:12,background:'#fff',borderRadius:16,padding:'18px 16px 16px',marginBottom:10,boxShadow:'0 1px 8px rgba(0,0,0,0.06)',position:'relative',cursor:'pointer',border:'1.5px solid #e0e0e0',transition:'border-color 0.15s' },
  upsellActive:{ border:`1.5px solid ${TEAL}`,background:TEAL_LIGHT },
  upsellBadge:{ position:'absolute',top:-9,left:14,background:TEAL,color:'#fff',fontSize:10,fontWeight:700,padding:'2px 9px',borderRadius:10,letterSpacing:'0.4px' },
  upsellCheck:{ width:24,height:24,borderRadius:'50%',border:'1.5px solid #ccc',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0 },
  upsellCheckOn:{ background:TEAL,border:`1.5px solid ${TEAL}` },
  doneCard:{ background:'#fff',borderRadius:24,padding:'36px 24px',textAlign:'center',boxShadow:'0 4px 24px rgba(0,0,0,0.1)' },
  floatingBar:{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,zIndex:999,display:'flex',alignItems:'center',justifyContent:'space-between',background:TEAL_DARK,padding:'12px 18px 20px',boxShadow:'0 -4px 24px rgba(0,0,0,0.18)',borderTop:'1px solid rgba(255,255,255,0.1)' },
  floatingTotal:{ fontSize:28,fontWeight:900,fontFamily:"'Playfair Display',serif",color:'#fff',lineHeight:1 },
  floatingBtn:{ background:'#fff',color:TEAL_DARK,border:'none',borderRadius:22,padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',whiteSpace:'nowrap',boxShadow:'0 2px 8px rgba(0,0,0,0.15)',fontFamily:"'DM Sans',sans-serif" },
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
  footer:{ textAlign:'center',padding:'22px 16px',borderTop:'1px solid #e8e8e8',marginTop:8 },
};
