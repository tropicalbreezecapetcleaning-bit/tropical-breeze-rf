"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface BookingState {
  carpetRooms: string[];
  tileRooms: string[];
  bathrooms: string[];
  scotchgard: boolean;
  deodorizer: boolean;
  groutSealing: boolean;
  colorSeal: boolean;
  groutColor: string;
  sofas: number;
  loveseats: number;
  chairs: number;
  diningChairs: number;
  diningChairType: string;
  ottomans: number;
  sectionalFt: number;
  upholProtect: boolean;
  upholDeodor: boolean;
  windows: number;
  ezBreeze: number;
  glassDoors: number;
  rugSmall: number;
  rugMedium: number;
  rugLarge: number;
  rugOversized: number;
  hardwoodSqft: number;
  referral: string;
  upsellStarter: boolean;
}

interface LineItem { label: string; value: number; cls?: string; }

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const SPRING = 0.10;
const CARPET_ROOMS = ["LR","BR 1","BR 2","BR 3","BR 4","OF","DN","ST","ENTRY","HALL","DR","LOFT","PORCH","BONUS"];
const TILE_ROOMS = ["KT","LR","DN","HL","PORCH","LNDRY","MUD","SUNRM"];
const BATH_ROOMS = ["MB","BT 2","BT 3","HALF","POOL","SHOW"];
const REFERRAL_OPTIONS = [
  {id:"google",label:"Google"},{id:"facebook",label:"Facebook"},
  {id:"instagram",label:"Instagram"},{id:"neighbor",label:"Neighbor"},
  {id:"returning",label:"Returning Customer"},{id:"airbnb",label:"Airbnb / VRBO"},
  {id:"bing",label:"Bing AI"},{id:"other",label:"Other"},
];
const GROUT_COLORS = [
  {id:"white",name:"White",hex:"#FFFFFF",light:true},
  {id:"bone",name:"Bone",hex:"#E8DCC8",light:true},
  {id:"almond",name:"Almond",hex:"#D4B896",light:true},
  {id:"beige",name:"Beige",hex:"#C8A882",light:true},
  {id:"pewter",name:"Pewter",hex:"#A89880",light:true},
  {id:"gray",name:"Gray",hex:"#8C8C8C",light:false},
  {id:"silver",name:"Silverado",hex:"#6B7280",light:false},
  {id:"charcoal",name:"Charcoal",hex:"#4B4B4B",light:false},
  {id:"brown",name:"Brown",hex:"#6B4226",light:false},
  {id:"black",name:"Black",hex:"#1A1A1A",light:false},
];
const PACKAGES = [
  {id:"rf99",badge:"Most Popular",badgeColor:"#2e7d32",badgeBg:"#e8f5e9",emoji:"🧹",name:"RF99 Starter",sub:"Perfect first-time clean",features:["1 Carpet Room","RF99 Process","Deodorizer or Protector"],price:99,original:125,
    apply:(s:BookingState)=>({...s,carpetRooms:["LR"]})},
  {id:"home",badge:"Best Value",badgeColor:"#f57f17",badgeBg:"#fff8e1",emoji:"🏠",name:"Home Clean",sub:"3 bedrooms + tile kitchen",features:["3 Carpet Rooms","1 Tile Room","Mix & Match Savings"],price:277,original:324,
    apply:(s:BookingState)=>({...s,carpetRooms:["LR","BR 1","BR 2"],tileRooms:["KT"]})},
  {id:"upholstery",badge:"New",badgeColor:"#c62828",badgeBg:"#fce4ec",emoji:"🛋️",name:"Upholstery Refresh",sub:"Sofa + loveseat + 2 chairs",features:["1 Sofa","1 Loveseat","2 Chairs","Fabric Protector"],price:242,original:269,
    apply:(s:BookingState)=>({...s,sofas:1,loveseats:1,chairs:2,upholProtect:true})},
  {id:"full",badge:"Full Service",badgeColor:"#283593",badgeBg:"#e8eaf6",emoji:"🏡",name:"Full House",sub:"Whole home deep clean",features:["5 Carpet Rooms","2 Tile Rooms","10 Windows"],price:581,original:679,
    apply:(s:BookingState)=>({...s,carpetRooms:["LR","BR 1","BR 2","BR 3","BR 4"],tileRooms:["KT","LR"],windows:10})},
  {id:"pet",badge:"Pet Special",badgeColor:"#00695c",badgeBg:"#e0f2f1",emoji:"🐾",name:"Pet Home",sub:"Odor & stain elimination",features:["3 Carpet Rooms","Enzyme Deodorizer","Scotchgard Protector"],price:301,original:334,
    apply:(s:BookingState)=>({...s,carpetRooms:["LR","BR 1","BR 2"],deodorizer:true,scotchgard:true})},
  {id:"rental",badge:"Shore Special",badgeColor:"#1565c0",badgeBg:"#e3f2fd",emoji:"🏖️",name:"Vacation Rental",sub:"Guest-ready in one visit",features:["3 Carpet Rooms","2 Bathrooms","12 Windows"],price:517,original:605,
    apply:(s:BookingState)=>({...s,carpetRooms:["LR","BR 1","BR 2"],bathrooms:["MB","BT 2"],windows:12})},
];

const defaultState: BookingState = {
  carpetRooms:[],tileRooms:[],bathrooms:[],scotchgard:false,deodorizer:false,
  groutSealing:false,colorSeal:false,groutColor:"",
  sofas:0,loveseats:0,chairs:0,diningChairs:0,diningChairType:"seat_back",
  ottomans:0,sectionalFt:0,upholProtect:false,upholDeodor:false,
  windows:0,ezBreeze:0,glassDoors:0,
  rugSmall:0,rugMedium:0,rugLarge:0,rugOversized:0,
  hardwoodSqft:0,referral:"",upsellStarter:false,
};

// ── CALC ──────────────────────────────────────────────────────────────────────
function calcTotal(s: BookingState): number {
  let t = 0;
  const cr = s.carpetRooms.length;
  if (cr > 0) t += 99 + Math.max(0, cr-1)*50;
  if (s.scotchgard) t += 30*cr;
  if (s.deodorizer) t += 25*cr;
  t += s.hardwoodSqft;
  const tc = s.tileRooms.length + s.bathrooms.length;
  t += tc*125;
  if (s.groutSealing) t += tc*125*0.5;
  if (s.colorSeal) t += tc*125;
  t += s.sofas*85 + s.loveseats*75 + s.chairs*50 + s.ottomans*35;
  t += s.diningChairs*(s.diningChairType==="seat_only"?10:13);
  t += s.sectionalFt*11;
  const up = s.sofas+s.loveseats+s.chairs+s.ottomans;
  if (s.upholProtect && up>0) t += up*20;
  if (s.upholDeodor && up>0) t += up*25;
  t += s.windows*13 + s.glassDoors*25 + s.ezBreeze*15;
  if (s.ezBreeze>0) t += 35;
  t += s.rugSmall*150 + s.rugMedium*200 + s.rugLarge*270 + s.rugOversized*370;
  const svcTypes = [cr>0,s.hardwoodSqft>0,tc>0,up>0,(s.windows+s.ezBreeze)>0,(s.rugSmall+s.rugMedium+s.rugLarge+s.rugOversized)>0].filter(Boolean).length;
  if (svcTypes>=2) t *= 0.95;
  t *= (1-SPRING);
  return Math.round(t);
}

function buildLineItems(s: BookingState): LineItem[] {
  const lines: LineItem[] = [];
  const cr = s.carpetRooms.length;
  if (cr>0) {
    lines.push({label:`Carpet - 1st Room (${s.carpetRooms[0]||"LR"})`,value:99});
    for (let i=1;i<cr;i++) lines.push({label:`Carpet - Additional (${s.carpetRooms[i]})`,value:50});
  }
  if (s.scotchgard&&cr>0) lines.push({label:`Scotchgard x${cr}`,value:cr*30});
  if (s.deodorizer&&cr>0) lines.push({label:`Carpet Deodorizer x${cr}`,value:cr*25});
  if (s.hardwoodSqft>0) lines.push({label:`Hardwood - ${s.hardwoodSqft} sq ft`,value:s.hardwoodSqft});
  s.tileRooms.forEach(r=>lines.push({label:`Tile - ${r}`,value:125}));
  s.bathrooms.forEach(r=>lines.push({label:`Bathroom Tile - ${r}`,value:125}));
  const tc=s.tileRooms.length+s.bathrooms.length;
  if (s.groutSealing&&tc>0) lines.push({label:"Grout Sealing",value:Math.round(tc*125*0.5)});
  if (s.colorSeal&&tc>0) lines.push({label:`Color Seal${s.groutColor?" - "+s.groutColor:""}`,value:tc*125});
  if (s.sofas>0) lines.push({label:`Sofas x${s.sofas}`,value:s.sofas*85});
  if (s.loveseats>0) lines.push({label:`Loveseats x${s.loveseats}`,value:s.loveseats*75});
  if (s.chairs>0) lines.push({label:`Chairs x${s.chairs}`,value:s.chairs*50});
  if (s.ottomans>0) lines.push({label:`Ottomans x${s.ottomans}`,value:s.ottomans*35});
  if (s.diningChairs>0) lines.push({label:`Dining Chairs x${s.diningChairs}`,value:s.diningChairs*(s.diningChairType==="seat_only"?10:13)});
  if (s.sectionalFt>0) lines.push({label:`Sectional - ${s.sectionalFt}ft`,value:s.sectionalFt*11});
  const up=s.sofas+s.loveseats+s.chairs+s.ottomans;
  if (s.upholProtect&&up>0) lines.push({label:`Fabric Protector x${up}`,value:up*20});
  if (s.upholDeodor&&up>0) lines.push({label:`Upholstery Deodorizer x${up}`,value:up*25});
  if (s.windows>0) lines.push({label:`Windows x${s.windows}`,value:s.windows*13});
  if (s.glassDoors>0) lines.push({label:`Glass Doors x${s.glassDoors}`,value:s.glassDoors*25});
  if (s.ezBreeze>0) lines.push({label:`EZ Breeze x${s.ezBreeze}`,value:s.ezBreeze*15+35});
  if (s.rugSmall>0) lines.push({label:`Small Rugs x${s.rugSmall}`,value:s.rugSmall*150});
  if (s.rugMedium>0) lines.push({label:`Medium Rugs x${s.rugMedium}`,value:s.rugMedium*200});
  if (s.rugLarge>0) lines.push({label:`Large Rugs x${s.rugLarge}`,value:s.rugLarge*270});
  if (s.rugOversized>0) lines.push({label:`Oversized Rugs x${s.rugOversized}`,value:s.rugOversized*370});
  const subtotal = lines.reduce((a,l)=>a+l.value,0);
  if (subtotal>0) {
    const svcCount=[cr>0,s.hardwoodSqft>0,(s.tileRooms.length+s.bathrooms.length)>0,up>0,(s.windows+s.ezBreeze)>0,(s.rugSmall+s.rugMedium+s.rugLarge+s.rugOversized)>0].filter(Boolean).length;
    if (svcCount>=2) lines.push({label:"Mix & Match Discount (5%)",value:-Math.round(subtotal*0.05),cls:"disc"});
    lines.push({label:"Spring Discount (10%)",value:-Math.round(subtotal*0.10),cls:"disc"});
  }
  return lines;
}

// ── SUB COMPONENTS ────────────────────────────────────────────────────────────
function Counter({label,price,value,onChange}:{label:string;price:string;value:number;onChange:(n:number)=>void}) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <span className="font-semibold text-sm text-gray-800">{label}</span>
        <span className="text-xs text-gray-400 ml-1">{price}</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={()=>onChange(Math.max(0,value-1))} className="w-8 h-8 rounded-full border-2 border-teal-600 text-teal-600 font-bold text-lg flex items-center justify-center hover:bg-teal-50 transition-colors">−</button>
        <span className="w-6 text-center font-bold text-gray-800">{value}</span>
        <button onClick={()=>onChange(value+1)} className="w-8 h-8 rounded-full border-2 border-teal-600 text-teal-600 font-bold text-lg flex items-center justify-center hover:bg-teal-50 transition-colors">+</button>
      </div>
    </div>
  );
}

function RoomGrid({rooms,selected,onToggle}:{rooms:string[];selected:string[];onToggle:(r:string)=>void}) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {rooms.map(r=>(
        <button key={r} onClick={()=>onToggle(r)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${selected.includes(r)?"bg-teal-600 text-white border-teal-600":"bg-gray-50 text-gray-500 border-gray-200 hover:border-teal-300"}`}>
          {r}
        </button>
      ))}
    </div>
  );
}

function EnhanceToggle({icon,name,desc,price,active,onToggle}:{icon:string;name:string;desc:string;price:string;active:boolean;onToggle:()=>void}) {
  return (
    <div onClick={onToggle} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${active?"border-teal-500 bg-teal-50":"border-gray-200 bg-gray-50 hover:border-teal-300"}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="font-bold text-sm text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      <div className="text-right">
        <div className="text-xs font-bold text-teal-600">{price}</div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold mt-1 ml-auto ${active?"bg-teal-600 border-teal-600":"border-gray-300"}`}>
          {active?"✓":""}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [s, setS] = useState<BookingState>(defaultState);
  const [modal, setModal] = useState<"builder"|"upsell"|"confirm"|null>(null);
  const [selectedPkg, setSelectedPkg] = useState<typeof PACKAGES[0]|null>(null);
  const [form, setForm] = useState({name:"",phone:"",email:"",date:"",time:"",street:"",city:"",state:"MD",zip:"",notes:"",sms:true,promo:""});
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [promoStatus, setPromoStatus] = useState<"idle"|"ok"|"err">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{confNum:string;date:string;time:string}|null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const modalRef = useRef<HTMLDivElement>(null);
  const total = calcTotal(s);

  // Close modal on backdrop click
  useEffect(()=>{
    function handleClick(e:MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Don't close builder — too much data loss
      }
    }
    document.addEventListener("mousedown",handleClick);
    return ()=>document.removeEventListener("mousedown",handleClick);
  },[]);

  // Lock body scroll when modal open
  useEffect(()=>{
    document.body.style.overflow = modal ? "hidden" : "";
    return ()=>{document.body.style.overflow=""};
  },[modal]);

  const TODAY = new Date(); TODAY.setHours(0,0,0,0);
  const BOOKED: Record<string,string[]> = {};
  const fmt=(d:Date)=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const dayOffset=(n:number)=>{const d=new Date(TODAY);d.setDate(d.getDate()+n);return d;};
  BOOKED[fmt(TODAY)]=["morning"];
  BOOKED[fmt(dayOffset(1))]=["morning","midday"];
  BOOKED[fmt(dayOffset(3))]=["morning","midday","afternoon"];
  BOOKED[fmt(dayOffset(7))]=["morning"];

  function getDayStatus(ds:string) {
    const b=BOOKED[ds]||[];
    const d=new Date(ds);
    if(d.getDay()===0) return "full";
    if(b.length===0) return "avail";
    if(b.length<=2) return "limited";
    return "full";
  }

  function openBuilder(pkg:typeof PACKAGES[0]|null) {
    if (pkg) {
      setSelectedPkg(pkg);
      setS(pkg.apply({...defaultState}));
    } else {
      setSelectedPkg(null);
    }
    setModal("builder");
  }

  function validateForm() {
    const errs:Record<string,string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (form.phone.replace(/\D/g,"").length!==10) errs.phone = "Valid 10-digit phone required";
    if (!form.street.trim()) errs.street = "Street address required";
    if (!form.city.trim()) errs.city = "City required";
    if (!/^\d{5}$/.test(form.zip)) errs.zip = "Valid ZIP required";
    if (!selectedDate) errs.date = "Please select a date";
    else if (!selectedSlot) errs.date = "Please select a time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    setSubmitting(true);
    const lineItems = buildLineItems(s);
    const payload = {
      customer: {name:form.name,phone:form.phone,email:form.email,date:selectedDate,time:selectedSlot,street:form.street,city:form.city,state:form.state,zip:form.zip,notes:form.notes,sms_optin:form.sms},
      services: {counts:{carpet:s.carpetRooms.length,tile:s.tileRooms.length,bath_tile:s.bathrooms.length,windows:s.windows,ezbreeze:s.ezBreeze,sofas:s.sofas,loveseats:s.loveseats,chairs:s.chairs,dining:s.diningChairs,rug_small:s.rugSmall,rug_medium:s.rugMedium,rug_large:s.rugLarge,rug_oversized:s.rugOversized},hardwood_sqft:s.hardwoodSqft,sectional_ft:s.sectionalFt},
      addons:{scotchgard:s.scotchgard,carpetDeod:s.deodorizer,grout:s.groutSealing,colorSeal:s.colorSeal,fabricProt:s.upholProtect,upDeod:s.upholDeodor},
      grout_color:s.groutColor||null,
      promo_code:form.promo||null,
      hear_source:s.referral,
      grand_total:total,
      line_items:lineItems,
      season:"Spring",
      source:"booking_nextjs",
      timestamp:new Date().toISOString(),
    };
    try { await fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); } catch{}
    const confNum = "TB"+Math.floor(100000+Math.random()*900000);
    setDone({confNum,date:selectedDate,time:selectedSlot});
    setModal(null);
    setSubmitting(false);
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#006978] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-black text-[#0a1628] text-3xl mb-2">You're All Set!</h1>
          <p className="text-teal-600 font-bold text-lg mb-1">Confirmation #{done.confNum}</p>
          <p className="text-gray-500 mb-6">We'll see you on <strong>{done.date}</strong> · {done.time}</p>
          <p className="text-sm text-gray-500 mb-6">We will call to confirm within 2-4 hours.</p>
          <a href="tel:4438563244" className="block bg-teal-600 text-white font-bold py-3 rounded-full mb-3 hover:bg-teal-700 transition-colors">📞 Questions? (443) 856-3244</a>
          <button onClick={()=>{setDone(null);setS(defaultState);setForm({name:"",phone:"",email:"",date:"",time:"",street:"",city:"",state:"MD",zip:"",notes:"",sms:true,promo:""});}} className="text-sm text-gray-400 underline">Book Another Service</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] pb-24 font-sans">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-[#145f5b] to-[#1a7f7a] text-white rounded-b-3xl overflow-hidden">
        <div className="text-center px-5 pt-8 pb-0">
          <p className="text-xs tracking-widest uppercase opacity-70 font-semibold mb-1">RF Residue-Free Cleaning</p>
          <h1 className="text-3xl font-black mb-1">Book Your Cleaning</h1>
          <p className="text-sm opacity-80 mb-4">Eastern Shore · Maryland · Delaware</p>
          <a href="tel:4438563244" className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white font-bold px-5 py-2.5 rounded-full text-sm mb-4 hover:bg-white/25 transition-colors">
            📞 (443) 856-3244
          </a>
          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-medium mb-4">
            🌸 <strong>Spring Special</strong> — Save 10% Automatically
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-white flex flex-wrap gap-x-4 gap-y-1 justify-center px-4 py-3 text-xs font-medium text-gray-600">
          <span>⭐ 219 Five-Star Reviews</span>
          <span>🧼 RF Residue-Free</span>
          <span>📍 33+ Cities Served</span>
          <span>⚡ Fast Scheduling</span>
        </div>

        {/* Testimonial */}
        <div className="bg-white px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">S</div>
            <div>
              <div className="font-bold text-sm text-gray-800">sistaofZion</div>
              <div className="text-xs text-gray-400">Local Guide · 57 reviews</div>
            </div>
            <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
          </div>
          <p className="text-xs text-gray-600 italic leading-relaxed">"My agent suggested Tropical Breeze and stated <strong>'I prefer No One Else!'</strong> Call Dalton — he believes in superior service."</p>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="px-4 pt-6">
        <h2 className="font-black text-xl text-gray-900 mb-1">⚡ Book in Under 30 Seconds</h2>
        <p className="text-sm text-gray-500 mb-5">Pick a package — we handle the rest 🌸</p>

        <div className="flex flex-col gap-3 mb-4">
          {PACKAGES.map(pkg=>(
            <div key={pkg.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:scale-[0.99] transition-transform">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3" style={{background:pkg.badgeBg,color:pkg.badgeColor}}>{pkg.badge}</span>
              <div className="text-3xl mb-2">{pkg.emoji}</div>
              <h3 className="font-black text-lg text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{pkg.sub}</p>
              <div className="mb-3">
                {pkg.features.map(f=>(
                  <div key={f} className="text-sm text-gray-600 py-0.5 before:content-['✓_'] before:text-teal-600 before:font-bold">{f}</div>
                ))}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm text-gray-300 line-through">${pkg.original}</span>
                <span className="text-3xl font-black text-teal-600">${pkg.price}</span>
              </div>
              <button onClick={()=>openBuilder(pkg)} className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 active:bg-teal-800 transition-colors text-sm">
                TAP TO BOOK →
              </button>
            </div>
          ))}
        </div>

        {/* Custom quote */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 mb-4">
          <span className="text-2xl">🔧</span>
          <div className="flex-1">
            <div className="font-bold text-sm text-gray-800">Build a Custom Quote</div>
            <div className="text-xs text-gray-500">Choose exactly what you need</div>
          </div>
          <button onClick={()=>openBuilder(null)} className="bg-teal-600 text-white font-semibold text-xs px-4 py-2 rounded-full hover:bg-teal-700 transition-colors">
            Build Quote
          </button>
        </div>
      </div>

      {/* MODAL BACKDROP */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end md:justify-center md:items-center">
          <div ref={modalRef} className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            style={{animation:"slideUp 0.3s ease-out"}}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
              <div>
                <div className="font-black text-lg text-gray-900">
                  {modal==="builder" ? (selectedPkg ? `${selectedPkg.emoji} ${selectedPkg.name}` : "Custom Quote") :
                   modal==="upsell" ? "🎁 One Last Upgrade" :
                   "📋 Confirm Booking"}
                </div>
                {modal==="builder" && (
                  <div className="text-xs text-gray-400">Select your services below</div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {modal==="builder" && (
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Estimate</div>
                    <div className="text-xl font-black text-teal-600">${total.toLocaleString()}</div>
                  </div>
                )}
                <button onClick={()=>setModal(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors text-sm font-bold">✕</button>
              </div>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 px-5 py-4">

              {/* ── BUILDER ── */}
              {modal==="builder" && (
                <div className="space-y-4">

                  {selectedPkg && (
                    <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 flex justify-between items-center text-sm">
                      <span className="text-teal-800 font-semibold">{selectedPkg.name} applied</span>
                      <button onClick={()=>setSelectedPkg(null)} className="text-gray-400 text-xs underline">Clear</button>
                    </div>
                  )}

                  {/* Carpet */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-1">🧹 Carpet Cleaning RF99</div>
                    <div className="text-xs text-gray-500 mb-3">$99 first room · $50 each additional</div>
                    <RoomGrid rooms={CARPET_ROOMS} selected={s.carpetRooms} onToggle={r=>{const a=s.carpetRooms;setS({...s,carpetRooms:a.includes(r)?a.filter(x=>x!==r):[...a,r]});}} />
                    <div className="text-xs text-gray-400 mb-3">Selected: <strong>{s.carpetRooms.length}</strong> rooms</div>
                    <div className="space-y-2">
                      <EnhanceToggle icon="🛡️" name="Scotchgard Protector" desc="Extends your RF clean 3x longer" price={s.carpetRooms.length>0?`+$${s.carpetRooms.length*30}`:"+$30/room"} active={s.scotchgard} onToggle={()=>setS({...s,scotchgard:!s.scotchgard})} />
                      <EnhanceToggle icon="🌬️" name="Deodorizer Treatment" desc="Eliminates pet odors at the source" price={s.carpetRooms.length>0?`+$${s.carpetRooms.length*25}`:"+$25/room"} active={s.deodorizer} onToggle={()=>setS({...s,deodorizer:!s.deodorizer})} />
                    </div>
                  </div>

                  {/* Hardwood */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-1">🪵 Hardwood Floor Cleaning</div>
                    <div className="text-xs text-gray-500 mb-3">$1.00 per square foot</div>
                    <input type="number" min={0} value={s.hardwoodSqft||""} onChange={e=>setS({...s,hardwoodSqft:parseFloat(e.target.value)||0})} placeholder="Square feet (e.g. 400)" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400" />
                  </div>

                  {/* Tile */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-1">⬜ Tile & Grout Cleaning</div>
                    <div className="text-xs text-gray-500 mb-2">$125 per room</div>
                    <div className="text-xs font-semibold text-teal-600 mb-2">Kitchen / Living Tile</div>
                    <RoomGrid rooms={TILE_ROOMS} selected={s.tileRooms} onToggle={r=>{const a=s.tileRooms;setS({...s,tileRooms:a.includes(r)?a.filter(x=>x!==r):[...a,r]});}} />
                    <div className="text-xs font-semibold text-teal-600 mt-3 mb-2">🚿 Bathroom Tile</div>
                    <RoomGrid rooms={BATH_ROOMS} selected={s.bathrooms} onToggle={r=>{const a=s.bathrooms;setS({...s,bathrooms:a.includes(r)?a.filter(x=>x!==r):[...a,r]});}} />
                    <div className="text-xs text-gray-400 mt-2 mb-3">Selected: <strong>{s.tileRooms.length+s.bathrooms.length}</strong> rooms</div>
                    <div className="space-y-2">
                      <EnhanceToggle icon="🔒" name="Grout Sealing" desc="Locks out dirt long-term" price={`+$${Math.round((s.tileRooms.length+s.bathrooms.length)*125*0.5)||"TBD"}`} active={s.groutSealing} onToggle={()=>setS({...s,groutSealing:!s.groutSealing})} />
                      <EnhanceToggle icon="🎨" name="Color Seal" desc="Restore & lock in grout color permanently" price={`+$${(s.tileRooms.length+s.bathrooms.length)*125||"TBD"}`} active={s.colorSeal} onToggle={()=>setS({...s,colorSeal:!s.colorSeal})} />
                    </div>
                    {s.colorSeal && (
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-teal-600 mb-2">Pick Your Grout Color</div>
                        <div className="grid grid-cols-5 gap-2">
                          {GROUT_COLORS.map(c=>(
                            <button key={c.id} onClick={()=>setS({...s,groutColor:c.name})}
                              className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold border-2 transition-all ${s.groutColor===c.name?"border-teal-500 scale-105":"border-gray-200"}`}
                              style={{background:c.hex,color:c.light?"#333":"#fff"}}>
                              {s.groutColor===c.name?"✓":c.name.slice(0,3)}
                            </button>
                          ))}
                        </div>
                        {s.groutColor && <p className="text-xs text-teal-600 font-semibold mt-2">Selected: {s.groutColor}</p>}
                      </div>
                    )}
                  </div>

                  {/* Upholstery */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-3">🛋️ Upholstery Cleaning</div>
                    <Counter label="Sofas" price="$85/sofa" value={s.sofas} onChange={v=>setS({...s,sofas:v})} />
                    <Counter label="Loveseats" price="$75/loveseat" value={s.loveseats} onChange={v=>setS({...s,loveseats:v})} />
                    <Counter label="Chairs" price="$50/chair" value={s.chairs} onChange={v=>setS({...s,chairs:v})} />
                    <Counter label="Ottomans" price="$35/ottoman" value={s.ottomans} onChange={v=>setS({...s,ottomans:v})} />
                    <Counter label="Dining Chairs" price="$10-13 each" value={s.diningChairs} onChange={v=>setS({...s,diningChairs:v})} />
                    {s.diningChairs>0 && (
                      <div className="flex gap-2 mt-2 mb-1">
                        <button onClick={()=>setS({...s,diningChairType:"seat_back"})} className={`flex-1 text-xs font-bold py-2 rounded-lg border-2 transition-all ${s.diningChairType==="seat_back"?"bg-teal-600 text-white border-teal-600":"border-gray-200 text-gray-500"}`}>Seat & Back $13</button>
                        <button onClick={()=>setS({...s,diningChairType:"seat_only"})} className={`flex-1 text-xs font-bold py-2 rounded-lg border-2 transition-all ${s.diningChairType==="seat_only"?"bg-teal-600 text-white border-teal-600":"border-gray-200 text-gray-500"}`}>Seat Only $10</button>
                      </div>
                    )}
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 block mb-1">Sectional Linear Feet · $11/ft</label>
                      <input type="number" min={0} value={s.sectionalFt||""} onChange={e=>setS({...s,sectionalFt:parseFloat(e.target.value)||0})} placeholder="0" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-400" />
                    </div>
                    <div className="space-y-2 mt-3">
                      <EnhanceToggle icon="🛡️" name="Fabric Protector" desc="Guards against spills per piece" price={`+$${(s.sofas+s.loveseats+s.chairs+s.ottomans)*20||20}/piece`} active={s.upholProtect} onToggle={()=>setS({...s,upholProtect:!s.upholProtect})} />
                      <EnhanceToggle icon="🌬️" name="Upholstery Deodorizer" desc="Eliminates pet & smoke odors" price={`+$${(s.sofas+s.loveseats+s.chairs+s.ottomans)*25||25}/piece`} active={s.upholDeodor} onToggle={()=>setS({...s,upholDeodor:!s.upholDeodor})} />
                    </div>
                  </div>

                  {/* Windows */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-3">🪟 Window Cleaning</div>
                    <Counter label="Standard Windows" price="$13/window" value={s.windows} onChange={v=>setS({...s,windows:v})} />
                    <Counter label="EZ Breeze Panels" price="$15/panel + $35 track" value={s.ezBreeze} onChange={v=>setS({...s,ezBreeze:v})} />
                    <Counter label="Glass Sliding Doors" price="$25/panel" value={s.glassDoors} onChange={v=>setS({...s,glassDoors:v})} />
                  </div>

                  {/* Rugs */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-1">🪄 Rug Cleaning</div>
                    <div className="text-xs text-gray-500 mb-3">Pickup & delivery included</div>
                    <Counter label="Small Rug" price="$75 + $75 pickup" value={s.rugSmall} onChange={v=>setS({...s,rugSmall:v})} />
                    <Counter label="Medium Rug" price="$125 + $75 pickup" value={s.rugMedium} onChange={v=>setS({...s,rugMedium:v})} />
                    <Counter label="Large Rug" price="$195 + $75 pickup" value={s.rugLarge} onChange={v=>setS({...s,rugLarge:v})} />
                    <Counter label="Oversized Rug" price="$295 + $75 pickup" value={s.rugOversized} onChange={v=>setS({...s,rugOversized:v})} />
                  </div>

                  {/* Referral */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-3">💬 How Did You Hear About Us?</div>
                    <div className="flex flex-wrap gap-2">
                      {REFERRAL_OPTIONS.map(r=>(
                        <button key={r.id} onClick={()=>setS({...s,referral:r.id})}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${s.referral===r.id?"bg-teal-600 text-white border-teal-600":"border-gray-200 text-gray-500 hover:border-teal-300"}`}>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimate */}
                  <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-center text-white">
                    <div className="text-sm opacity-80 mb-1">Your Estimate</div>
                    <div className="text-5xl font-black">${total.toLocaleString()}</div>
                    <div className="text-xs opacity-70 mt-2">Final price confirmed on-site. Spring 10% applied.</div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-4">👤 Your Information</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 md:col-span-1">
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Name *</label>
                        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 ${errors.name?"border-red-400":"border-gray-200"}`} />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Phone *</label>
                        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(443) 000-0000" type="tel" className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 ${errors.phone?"border-red-400":"border-gray-200"}`} />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Email</label>
                        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Optional" type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400" />
                      </div>
                    </div>

                    {/* Calendar */}
                    <div className="mt-4">
                      <label className="text-xs font-semibold text-gray-500 block mb-2">Preferred Date *</label>
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-teal-600 text-white">
                          <button onClick={()=>{let m=calMonth-1,y=calYear;if(m<0){m=11;y--;}setCalMonth(m);setCalYear(y);}} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">‹</button>
                          <span className="font-bold text-sm">{["January","February","March","April","May","June","July","August","September","October","November","December"][calMonth]} {calYear}</span>
                          <button onClick={()=>{let m=calMonth+1,y=calYear;if(m>11){m=0;y++;}setCalMonth(m);setCalYear(y);}} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">›</button>
                        </div>
                        <div className="grid grid-cols-7 bg-gray-50 px-2 py-1">
                          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} className="text-center text-xs font-bold text-gray-400 py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1 p-2">
                          {Array.from({length:new Date(calYear,calMonth,1).getDay()}).map((_,i)=><div key={i}/>)}
                          {Array.from({length:new Date(calYear,calMonth+1,0).getDate()}).map((_,i)=>{
                            const d=new Date(calYear,calMonth,i+1);
                            const ds=fmt(d);
                            const isPast=d<TODAY;
                            const status=getDayStatus(ds);
                            const isSelected=selectedDate===ds;
                            return (
                              <button key={i} disabled={isPast||status==="full"}
                                onClick={()=>{setSelectedDate(ds);setSelectedSlot("");}}
                                className={`aspect-square rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition-all
                                  ${isSelected?"bg-teal-600 text-white scale-105":
                                    isPast?"text-gray-200 cursor-not-allowed":
                                    status==="avail"?"bg-green-50 text-green-700 hover:bg-green-100":
                                    status==="limited"?"bg-yellow-50 text-yellow-700 hover:bg-yellow-100":
                                    "bg-red-50 text-red-300 cursor-not-allowed"}`}>
                                <span>{i+1}</span>
                                {!isPast&&<span className={`w-1 h-1 rounded-full ${isSelected?"bg-white/60":status==="avail"?"bg-green-500":status==="limited"?"bg-yellow-500":"bg-red-300"}`}/>}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-center gap-4 px-3 pb-2 text-xs text-gray-400">
                          <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"/>Available</span>
                          <span><span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"/>Limited</span>
                          <span><span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"/>Booked</span>
                        </div>
                      </div>
                      {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}

                      {selectedDate && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Available times on <strong>{new Date(selectedDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</strong></p>
                          <div className="grid grid-cols-3 gap-2">
                            {[{id:"morning",label:"Morning",sub:"8-11am"},{id:"midday",label:"Midday",sub:"11am-2pm"},{id:"afternoon",label:"Afternoon",sub:"2-5pm"}].map(slot=>{
                              const booked=(BOOKED[selectedDate]||[]).includes(slot.id);
                              return (
                                <button key={slot.id} disabled={booked} onClick={()=>setSelectedSlot(slot.label+" ("+slot.sub+")")}
                                  className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedSlot.startsWith(slot.label)?"bg-teal-600 text-white border-teal-600":booked?"text-gray-300 border-gray-100 line-through cursor-not-allowed":"border-gray-200 text-gray-600 hover:border-teal-400"}`}>
                                  <div>{slot.label}</div><div className="opacity-60 font-normal">{slot.sub}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Street Address *</label>
                        <input value={form.street} onChange={e=>setForm({...form,street:e.target.value})} placeholder="123 Main St" className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 ${errors.street?"border-red-400":"border-gray-200"}`} />
                        {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">City *</label>
                        <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Salisbury" className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 ${errors.city?"border-red-400":"border-gray-200"}`} />
                        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">ZIP *</label>
                        <input value={form.zip} onChange={e=>setForm({...form,zip:e.target.value})} placeholder="21801" maxLength={5} className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 ${errors.zip?"border-red-400":"border-gray-200"}`} />
                        {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">State</label>
                        <select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400">
                          <option>MD</option><option>DE</option><option>VA</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Promo Code</label>
                        <div className="flex gap-2">
                          <input value={form.promo} onChange={e=>setForm({...form,promo:e.target.value})} placeholder="Code" className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400" />
                          <button onClick={()=>{const c=form.promo.toUpperCase().trim();setPromoStatus(["BREEZE15","RF99","SHORE10"].includes(c)?"ok":"err");}} className="bg-gray-100 font-semibold text-xs px-3 rounded-xl hover:bg-gray-200 transition-colors">Apply</button>
                        </div>
                        {promoStatus==="ok"&&<p className="text-xs text-green-600 mt-1 font-medium">✓ Code applied!</p>}
                        {promoStatus==="err"&&<p className="text-xs text-red-500 mt-1">Invalid code. Try BREEZE15</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-gray-500 block mb-1">Special Instructions</label>
                        <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Gate codes, pets, parking..." rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400 resize-none" />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 mt-3 cursor-pointer">
                      <input type="checkbox" checked={form.sms} onChange={e=>setForm({...form,sms:e.target.checked})} className="mt-0.5 accent-teal-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-xs text-gray-600 leading-relaxed">📱 Text me my confirmation + reminder the day before<br/><span className="text-gray-400">Standard rates apply · Opt out anytime</span></span>
                    </label>
                  </div>

                  <button onClick={()=>setModal("upsell")} className="w-full bg-teal-600 text-white font-black py-4 rounded-2xl text-base hover:bg-teal-700 active:bg-teal-800 transition-colors">
                    Continue — ${total.toLocaleString()}
                  </button>
                </div>
              )}

              {/* ── UPSELL ── */}
              {modal==="upsell" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">🎁</div>
                    <p className="text-gray-500 text-sm">Popular add-ons before you confirm</p>
                  </div>

                  <div onClick={()=>setS({...s,upsellStarter:!s.upsellStarter})} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${s.upsellStarter?"border-teal-500 bg-teal-50":"border-gray-200 hover:border-teal-300"}`}>
                    <span className="text-3xl">🧴</span>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">RF99 Starter Pack</div>
                      <div className="text-xs text-gray-500">Take-home maintenance kit</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-teal-600">+$49</div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold mt-1 ml-auto ${s.upsellStarter?"bg-teal-600 border-teal-600":"border-gray-300"}`}>{s.upsellStarter?"✓":""}</div>
                    </div>
                  </div>

                  {/* Line items preview */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-bold text-gray-800 mb-3 text-sm">Order Summary</div>
                    {buildLineItems(s).map((item,i)=>(
                      <div key={i} className={`flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0 ${item.cls==="disc"?"text-green-600 font-semibold":"text-gray-700"}`}>
                        <span>{item.label}</span>
                        <span className="font-bold">{item.value<0?`-$${Math.abs(item.value)}`:`$${item.value}`}</span>
                      </div>
                    ))}
                    {s.upsellStarter && <div className="flex justify-between text-sm py-1.5 text-gray-700"><span>RF99 Starter Pack</span><span className="font-bold">$49</span></div>}
                    <div className="flex justify-between mt-3 pt-3 border-t-2 border-teal-500">
                      <span className="font-black text-gray-900">Total</span>
                      <span className="font-black text-teal-600 text-xl">${(total+(s.upsellStarter?49:0)).toLocaleString()}</span>
                    </div>
                  </div>

                  <button onClick={handleSubmit} disabled={submitting} className="w-full bg-teal-600 text-white font-black py-4 rounded-2xl text-base hover:bg-teal-700 disabled:opacity-50 transition-colors">
                    {submitting?"Submitting...":"Confirm Booking ✓"}
                  </button>
                  <button onClick={handleSubmit} disabled={submitting} className="w-full text-sm text-gray-400 underline py-2">
                    No thanks, skip upgrades
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (min-width: 768px) {
          @keyframes slideUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        }
      `}</style>

      {/* Footer */}
      <div className="text-center py-6 px-4 mt-4">
        <a href="tel:4438563244" className="block font-bold text-teal-600 text-base mb-1">📞 (443) 856-3244</a>
        <p className="text-xs text-gray-400">tropicalbreezerf.com · Salisbury, MD · Eastern Shore</p>
      </div>

    </main>
  );
}
