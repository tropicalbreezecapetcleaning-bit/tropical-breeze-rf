'use client';import { useState, useEffect, useRef } from "react";

// ─── CONFIGURABLE PRICING ─────────────────────────────────────────────────────
const PRICING = {
  carpet_first_room: 99,
  carpet_additional: 50,
  hardwood_per_sqft: 1.00,
  tile_per_room: 125,
  chair: 50,
  loveseat: 75,
  sofa: 85,
  sectional_per_ft: 11,
  window: 13,
  scotchgard_per_room: 25,
  carpet_deod_per_room: 20,
  grout_per_room: 45,
  fabric_protector_per_piece: 25,
  fabric_protector_per_ft: 3,
  upholstery_deod_per_piece: 15,
  upholstery_deod_per_ft: 2,
  screens_per_window: 4,
  starter_pack: 49,
  seasonal_discount: 0.10,
  multiservice_discount: 0.05,
};

const PACKAGES = [
  { id:"rf99",  icon:"🏠", name:"RF99™ Carpet Refresh",    desc:"Perfect first-time clean",        tag:"Most Popular", color:"#006978",
    services:{ carpet:1 }, addons:{}, get price(){ return PRICING.carpet_first_room; } },
  { id:"home",  icon:"🏡", name:"Whole Home Refresh",       desc:"Carpet + Upholstery + Windows",   tag:"Best Value",   color:"#2e7d32",
    services:{ carpet:2, chairs:1, sofas:1, windows:8 }, addons:{}, price: 386 },
  { id:"pet",   icon:"🐾", name:"Pet Recovery Package",     desc:"Carpet + Deodorizer + Protector", tag:"🐾 Pet Homes", color:"#e65100",
    services:{ carpet:2 }, addons:{ scotchgard:true, carpetDeod:true }, price: 248 },
  { id:"coast", icon:"🪟", name:"Coastal Window Package",   desc:"Inside & Out + Screen & Track",   tag:"Beach Homes",  color:"#0277bd",
    services:{ windows:12 }, addons:{ screens:true }, price: 204 },
  { id:"move",  icon:"📦", name:"Move-In / Move-Out Clean", desc:"Full deep clean package",         tag:"Full Clean",   color:"#7b1fa2",
    services:{ carpet:3, tile:1, windows:10 }, addons:{ carpetDeod:true, grout:true }, price: 649 },
];

const SEASONS = [
  { months:[2,3,4],  icon:"🌸", name:"Spring", bg:"#2e7d32" },
  { months:[5,6,7],  icon:"☀️",  name:"Summer", bg:"#e65100" },
  { months:[8,9,10], icon:"🍂", name:"Fall",   bg:"#bf360c" },
  { months:[11,0,1], icon:"❄️",  name:"Winter", bg:"#0277bd" },
];

const TRUST = [
  { icon:"⭐", label:"200+ Reviews" },
  { icon:"💧", label:"Residue-Free" },
  { icon:"⚡", label:"4–6hr Dry" },
  { icon:"🛡️", label:"Fully Insured" },
];

const SOCIAL = [
 const SOCIAL = [
  n=>`<strong>${n} people</strong> booked in the last hour`,

const STEPS = ["Ask AI", "Services", "Review", "Your Info"];
const T_MODAL = 149, T_MULTI = 400;

// ─── AI SUGGESTION PARSER ─────────────────────────────────────────────────────
function parseAISuggestion(text) {
  const lower = text.toLowerCase();
  const result = {
    counts: { carpet:0, tile:0, chairs:0, loveseats:0, sofas:0, windows:0 },
    addons: { scotchgard:false, carpetDeod:false, grout:false, fabricProt:false, upDeod:false, screens:false },
    reasoning: [],
  };

  // Extract JSON if present
  const jsonMatch = text.match(/```json([\s\S]*?)```/) || text.match(/\{[\s\S]*"services"[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      if (parsed.services) {
        if (parsed.services.carpet) result.counts.carpet = parsed.services.carpet;
        if (parsed.services.tile) result.counts.tile = parsed.services.tile;
        if (parsed.services.windows) result.counts.windows = parsed.services.windows;
        if (parsed.services.chairs) result.counts.chairs = parsed.services.chairs;
        if (parsed.services.sofas) result.counts.sofas = parsed.services.sofas;
      }
      if (parsed.addons) {
        if (parsed.addons.deodorizer) { result.addons.carpetDeod = true; result.addons.upDeod = true; }
        if (parsed.addons.scotchgard) result.addons.scotchgard = true;
        if (parsed.addons.fabric_protector) result.addons.fabricProt = true;
        if (parsed.addons.grout_sealing) result.addons.grout = true;
        if (parsed.addons.screen_cleaning) result.addons.screens = true;
      }
      if (parsed.reasoning) result.reasoning = parsed.reasoning;
      return result;
    } catch(e) {}
  }

  // Fallback keyword parsing
  if (lower.includes("carpet") || lower.includes("stain") || lower.includes("rug")) result.counts.carpet = 2;
  if (lower.includes("tile") || lower.includes("grout") || lower.includes("bathroom")) result.counts.tile = 1;
  if (lower.includes("window")) result.counts.windows = 8;
  if (lower.includes("sofa") || lower.includes("couch") || lower.includes("upholster") || lower.includes("furniture")) result.counts.sofas = 1;
  if (lower.includes("chair")) result.counts.chairs = 1;
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat") || lower.includes("odor") || lower.includes("smell")) {
    result.addons.carpetDeod = true; result.addons.upDeod = true;
  }
  if (lower.includes("protect") || lower.includes("scotchgard") || lower.includes("stain guard")) result.addons.scotchgard = true;
  if (lower.includes("grout seal")) result.addons.grout = true;
  if (lower.includes("screen") || lower.includes("track")) result.addons.screens = true;

  return result;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Counter({ value, onChange }) {
  return (
    <div style={{display:"flex",alignItems:"center",border:"1.5px solid #e0e6ea",borderRadius:10,overflow:"hidden"}}>
      <button onClick={()=>onChange(Math.max(0,value-1))} style={{width:34,height:34,background:"#f4f7f8",border:"none",cursor:"pointer",fontSize:17,fontWeight:700,color:"#006978"}}>−</button>
      <span style={{width:36,textAlign:"center",fontWeight:700,fontSize:14}}>{value}</span>
      <button onClick={()=>onChange(value+1)} style={{width:34,height:34,background:"#f4f7f8",border:"none",cursor:"pointer",fontSize:17,fontWeight:700,color:"#006978"}}>+</button>
    </div>
  );
}

function Addon({ icon, title, desc, price, selected, onToggle, tag }) {
  return (
    <div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:selected?"1.5px solid #0097A7":"1.5px solid #e0e6ea",background:selected?"#E0F7FA":"white",cursor:"pointer",marginBottom:7,userSelect:"none",position:"relative"}}>
      {tag && <span style={{position:"absolute",top:-8,right:8,fontSize:9,fontWeight:700,background:"#FF6F00",color:"white",padding:"1px 7px",borderRadius:10}}>{tag}</span>}
      <div style={{width:20,height:20,borderRadius:5,border:selected?"2px solid #0097A7":"2px solid #d1d5db",background:selected?"#0097A7":"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0}}>{selected?"✓":""}</div>
      <span style={{fontSize:17,flexShrink:0}}>{icon}</span>
      <div style={{flex:1}}>
        <div style={{fontWeight:700,fontSize:13}}>{title}</div>
        <div style={{fontSize:11,color:"#6b7280",marginTop:1}}>{desc}</div>
      </div>
      <span style={{fontWeight:800,fontSize:13,color:"#006978",whiteSpace:"nowrap"}}>+${price}</span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState({carpet:0,tile:0,chairs:0,loveseats:0,sofas:0,windows:0});
  const [hw, setHw] = useState("");
  const [sf, setSf] = useState("");
  const [addons, setAddons] = useState({scotchgard:false,carpetDeod:false,grout:false,fabricProt:false,upDeod:false,screens:false});
  const [modal, setModal] = useState({bundle:false,multi:false});
  const [modalOpen, setModalOpen] = useState(false);
  const [mShown, setMShown] = useState(false);
  const [mmShown, setMmShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [social, setSocial] = useState("");
  const [revIdx, setRevIdx] = useState(0);
  const [form, setForm] = useState({name:"",phone:"",email:"",date:"",time:"",street:"",city:"",state:"",zip:"",notes:""});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // AI state
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiApplied, setAiApplied] = useState(false);
  const [aiError, setAiError] = useState("");
  const inputRef = useRef(null);

  const month = new Date().getMonth();
  const season = SEASONS.find(s=>s.months.includes(month))||SEASONS[0];
  const hwN = parseFloat(hw)||0, sfN = parseFloat(sf)||0;
  const upActive = counts.chairs+counts.loveseats+counts.sofas+sfN>0;
  const upPcs = counts.chairs+counts.loveseats+counts.sofas;

  const P = PRICING;
  const carpetCost = counts.carpet>0 ? P.carpet_first_room+(counts.carpet-1)*P.carpet_additional : 0;
  const tileCost = counts.tile * P.tile_per_room;
  const upCost = counts.chairs*P.chair + counts.loveseats*P.loveseat + counts.sofas*P.sofa + Math.round(sfN*P.sectional_per_ft);
  const winCost = counts.windows * P.window;
  const base = carpetCost + Math.round(hwN*P.hardwood_per_sqft) + tileCost + upCost + winCost;
  let inline = 0;
  if(addons.scotchgard) inline += counts.carpet * P.scotchgard_per_room;
  if(addons.carpetDeod) inline += counts.carpet * P.carpet_deod_per_room;
  if(addons.grout) inline += counts.tile * P.grout_per_room;
  if(addons.screens) inline += counts.windows * P.screens_per_window;
  if(addons.fabricProt) inline += upPcs*P.fabric_protector_per_piece + Math.round(sfN*P.fabric_protector_per_ft);
  if(addons.upDeod) inline += upPcs*P.upholstery_deod_per_piece + Math.round(sfN*P.upholstery_deod_per_ft);
  const sub = base + inline;
  const seaDisc = sub > 0 ? Math.round(sub * P.seasonal_discount) : 0;
  const multiDisc = modal.multi ? Math.round(base * P.multiservice_discount) : 0;
  const bundleAdd = modal.bundle ? P.starter_pack : 0;
  const grand = Math.max(0, sub - seaDisc - multiDisc + bundleAdd);
  const saved = seaDisc + multiDisc;
  const activeSvcs = [counts.carpet>0,hwN>0,counts.tile>0,upActive,counts.windows>0].filter(Boolean).length;

  const summaryItems = [];
  if(counts.carpet>0) summaryItems.push(`🏠 ${counts.carpet} carpet room${counts.carpet>1?"s":""}`);
  if(hwN>0) summaryItems.push(`🪵 Hardwood ${hwN} sqft`);
  if(counts.tile>0) summaryItems.push(`⬜ ${counts.tile} tile room${counts.tile>1?"s":""}`);
  if(upActive){ const u=[]; if(counts.chairs)u.push(`${counts.chairs} chair${counts.chairs>1?"s":""}`); if(counts.loveseats)u.push(`${counts.loveseats} loveseat${counts.loveseats>1?"s":""}`); if(counts.sofas)u.push(`${counts.sofas} sofa${counts.sofas>1?"s":""}`); summaryItems.push(`🛋️ ${u.join(", ")}`); }
  if(counts.windows>0) summaryItems.push(`🪟 ${counts.windows} windows`);
  if(addons.scotchgard) summaryItems.push("🛡️ Scotchgard™");
  if(addons.carpetDeod||addons.upDeod) summaryItems.push("🌬️ Deodorizer");
  if(addons.grout) summaryItems.push("🔒 Grout Seal");
  if(addons.fabricProt) summaryItems.push("🛡️ Fabric Guard");
  if(addons.screens) summaryItems.push("🕸️ Screen & Track");

  const hint = base<=0?"":base<T_MULTI?`Add $${T_MULTI-base} more to unlock Mix & Match 5% off!`:"✅ Mix & Match discount unlocked!";

  useEffect(()=>{ if(base>0&&step===1) return; },[base]);
  useEffect(()=>{
    if(base>=T_MODAL&&!mShown){setMShown(true);setTimeout(()=>setModalOpen(true),700);}
    else if(base>=T_MULTI&&!mmShown){setMmShown(true);setTimeout(()=>setModalOpen(true),900);}
  },[base]);
  useEffect(()=>{ const t=()=>{const n=Math.floor(Math.random()*8)+2;setSocial(SOCIAL[Math.floor(Math.random()*SOCIAL.length)](n));}; t();const id=setInterval(t,7000);return()=>clearInterval(id); },[]);

  const applyPackage = (pkg) => {
    setCounts(p=>({...p,...{carpet:0,tile:0,chairs:0,loveseats:0,sofas:0,windows:0},...pkg.services}));
    setAddons(p=>({...p,...{scotchgard:false,carpetDeod:false,grout:false,fabricProt:false,upDeod:false,screens:false},...(pkg.addons||{})}));
    setStep(2);
  };

  const applyAISuggestion = (suggestion) => {
    setCounts(p=>({...p,...suggestion.counts}));
    setAddons(p=>({...p,...suggestion.addons}));
    setAiApplied(true);
    setStep(2);
  };

  const askAI = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiError("");
    setAiResponse(null);

    const systemPrompt = `You are a booking assistant for Tropical Breeze RF™, a residue-free cleaning company serving Maryland and Delaware.

When a customer describes their problem, analyze it and respond with:
1. A friendly 1-2 sentence empathetic response
2. Your service recommendations in JSON format

Available services and pricing:
- Carpet cleaning: $${P.carpet_first_room} first room, $${P.carpet_additional} each additional
- Hardwood floors: $${P.hardwood_per_sqft}/sq ft
- Tile & grout: $${P.tile_per_room}/room
- Upholstery: chairs $${P.chair}, loveseats $${P.loveseat}, sofas $${P.sofa}
- Windows: $${P.window}/window

Add-ons:
- Scotchgard protector: $${P.scotchgard_per_room}/room (best for stain protection)
- Deodorizer: $${P.carpet_deod_per_room}/room (best for odors/pets)
- Grout sealing: $${P.grout_per_room}/room
- Fabric protector: $${P.fabric_protector_per_piece}/piece

Always respond with your message first, then the JSON block like this:
\`\`\`json
{
  "services": {
    "carpet": 2,
    "tile": 0,
    "windows": 0,
    "chairs": 0,
    "sofas": 0
  },
  "addons": {
    "deodorizer": false,
    "scotchgard": false,
    "fabric_protector": false,
    "grout_sealing": false,
    "screen_cleaning": false
  },
  "reasoning": ["reason 1", "reason 2"]
}
\`\`\``;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: aiInput }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const parsed = parseAISuggestion(text);

      // Extract the friendly message (text before JSON block)
      const friendlyMsg = text.split("```")[0].trim();
      setAiResponse({ ...parsed, message: friendlyMsg, raw: text });
    } catch(e) {
      setAiError("Couldn't connect right now. Try one of the quick options below.");
      // Still show fallback suggestions
      const fallback = parseAISuggestion(aiInput);
      setAiResponse({ ...fallback, message: "Based on what you described, here's what I recommend:", raw: "" });
    }
    setAiLoading(false);
  };

  const QUICK_PROBLEMS = [
    { label:"🐾 Pet stains & odors", text:"My dog had accidents on the carpet and the couch smells like pets" },
    { label:"🏠 Dirty carpet", text:"My carpet is dirty and needs a deep clean, 3 bedrooms" },
    { label:"🪟 Grimy windows", text:"My windows are covered in salt spray and grime, need inside and outside cleaned" },
    { label:"⬜ Dark grout lines", text:"My kitchen and bathroom tile grout is very dark and needs cleaning and sealing" },
    { label:"🚪 Moving out", text:"I'm moving out and need everything cleaned — carpet, tile, and windows" },
    { label:"✨ Full refresh", text:"I want a full home refresh, carpet, upholstery, and windows throughout the house" },
  ];

  const s = {
    card:(a)=>({background:"white",borderRadius:16,padding:"15px 16px",marginBottom:10,border:a?"2px solid #0097A7":"2px solid transparent",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}),
    inp:{width:"100%",border:"1.5px solid #e0e6ea",borderRadius:10,padding:"9px 12px",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"},
    lbl:{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4,display:"block"},
    row:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8},
    sec:{fontSize:11,fontWeight:700,color:"#006978",textTransform:"uppercase",letterSpacing:.6,marginBottom:8,marginTop:12,paddingTop:10,borderTop:"1.5px dashed #e0e6ea"},
  };

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#f4f7f8",minHeight:"100vh",paddingBottom:90}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#006978,#0097A7)",color:"white",textAlign:"center",padding:"24px 16px 20px"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:2,opacity:.7,textTransform:"uppercase",marginBottom:5}}>RF™ Certified Residue-Free</div>
        <h1 style={{margin:0,fontSize:22,fontWeight:900}}>🌴 Book Your Cleaning</h1>
        <p style={{margin:"3px 0 0",fontSize:12,opacity:.85,fontStyle:"italic"}}>Residue Doesn't Survive Here™</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:10,flexWrap:"wrap"}}>
          {TRUST.map((t,i)=><span key={i} style={{background:"rgba(255,255,255,.15)",borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:600}}>{t.icon} {t.label}</span>)}
          <span style={{background:"#FF6F00",borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700}}>🌸 {season.name} 10% OFF</span>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{background:"white",borderBottom:"1px solid #e0e6ea",padding:"8px 12px",position:"sticky",top:0,zIndex:30,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
        <div style={{display:"flex",alignItems:"center",maxWidth:680,margin:"0 auto"}}>
          {STEPS.map((st,i)=>(
            <div key={st} style={{display:"flex",alignItems:"center",flex:1}}>
              <button onClick={()=>i<step&&setStep(i)} style={{display:"flex",alignItems:"center",gap:4,background:"none",border:"none",cursor:i<step?"pointer":"default",padding:0}}>
                <span style={{width:20,height:20,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,border:"2px solid",borderColor:i<=step?"#006978":"#e0e6ea",background:i<step?"#006978":"white",color:i<step?"white":i===step?"#006978":"#d1d5db"}}>{i<step?"✓":i+1}</span>
                <span style={{fontSize:10,fontWeight:700,color:i<=step?"#006978":"#d1d5db"}}>{st}</span>
              </button>
              {i<STEPS.length-1&&<div style={{flex:1,height:2,margin:"0 4px",background:"#f0f0f0",borderRadius:2,overflow:"hidden"}}><div style={{width:i<step?"100%":"0%",height:"100%",background:"#006978",transition:"width .4s"}}/></div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"12px 12px 0"}}>

        {/* ── STEP 0: AI ASSISTANT ── */}
        {step===0&&(
          <div>
            {/* AI Input card */}
            <div style={{background:"white",borderRadius:18,padding:"20px 16px",marginBottom:12,boxShadow:"0 4px 20px rgba(0,105,120,.12)",border:"2px solid #E0F7FA"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <div style={{width:40,height:40,borderRadius:20,background:"linear-gradient(135deg,#006978,#0097A7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🤖</div>
                <div>
                  <p style={{margin:0,fontWeight:800,fontSize:15,color:"#1a2e35"}}>RF™ Booking Assistant</p>
                  <p style={{margin:"2px 0 0",fontSize:12,color:"#6b7280"}}>What problem are you trying to solve?</p>
                </div>
              </div>

              <textarea
                ref={inputRef}
                value={aiInput}
                onChange={e=>setAiInput(e.target.value)}
                placeholder="Example: My dog had accidents on the carpet and the couch smells like pets..."
                style={{...s.inp,height:90,resize:"none",fontSize:14,lineHeight:1.5}}
              />

              <button
                onClick={askAI}
                disabled={!aiInput.trim()||aiLoading}
                style={{width:"100%",marginTop:10,padding:"12px",background:!aiInput.trim()?"#d1d5db":"linear-gradient(135deg,#006978,#0097A7)",color:"white",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:!aiInput.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
              >
                {aiLoading ? (
                  <><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> Analyzing your situation...</>
                ) : "✨ Get My Recommendation"}
              </button>
            </div>

            {/* Quick problems */}
            {!aiResponse&&(
              <div style={{background:"white",borderRadius:14,padding:"14px 14px",marginBottom:12,border:"1.5px solid #e0e6ea"}}>
                <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>Or pick a common situation</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {QUICK_PROBLEMS.map((p,i)=>(
                    <button key={i} onClick={()=>{setAiInput(p.text);setTimeout(()=>inputRef.current?.focus(),100);}}
                      style={{padding:"8px 10px",background:"#f4f7f8",border:"1.5px solid #e0e6ea",borderRadius:10,fontSize:12,fontWeight:600,cursor:"pointer",textAlign:"left",color:"#1a2e35",lineHeight:1.3}}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Response */}
            {aiLoading&&(
              <div style={{background:"white",borderRadius:14,padding:16,marginBottom:12,textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:8}}>🤔</div>
                <p style={{margin:0,fontSize:13,color:"#6b7280"}}>Analyzing your situation and building your recommendation...</p>
                <div style={{display:"flex",justifyContent:"center",gap:4,marginTop:10}}>
                  {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:3,background:"#0097A7",animation:`bounce 1s ease ${i*.2}s infinite`}}/>)}
                </div>
              </div>
            )}

            {aiResponse&&!aiLoading&&(
              <div style={{background:"white",borderRadius:16,overflow:"hidden",marginBottom:12,boxShadow:"0 4px 16px rgba(0,105,120,.1)",border:"2px solid #0097A7"}}>
                {/* AI message */}
                <div style={{background:"linear-gradient(135deg,#006978,#0097A7)",padding:"14px 16px",color:"white"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <span style={{fontSize:20,flexShrink:0}}>🤖</span>
                    <p style={{margin:0,fontSize:13,lineHeight:1.6,opacity:.95}}>{aiResponse.message || "Based on what you described, here's what I recommend:"}</p>
                  </div>
                </div>

                {/* Recommended services */}
                <div style={{padding:"14px 16px"}}>
                  <p style={{margin:"0 0 10px",fontSize:11,fontWeight:700,color:"#006978",textTransform:"uppercase",letterSpacing:.5}}>✅ Recommended for you</p>

                  {Object.entries(aiResponse.counts).some(([,v])=>v>0)&&(
                    <div style={{marginBottom:10}}>
                      {aiResponse.counts.carpet>0&&<div style={recItem("🏠",`Carpet Cleaning (${aiResponse.counts.carpet} room${aiResponse.counts.carpet>1?"s":""})`,`$${aiResponse.counts.carpet>1?P.carpet_first_room+(aiResponse.counts.carpet-1)*P.carpet_additional:P.carpet_first_room}`)}/>}
                      {aiResponse.counts.tile>0&&<div style={recItem("⬜",`Tile & Grout (${aiResponse.counts.tile} room${aiResponse.counts.tile>1?"s":""})`,`$${aiResponse.counts.tile*P.tile_per_room}`)}/>}
                      {aiResponse.counts.windows>0&&<div style={recItem("🪟",`Window Cleaning (${aiResponse.counts.windows})`,`$${aiResponse.counts.windows*P.window}`)}/>}
                      {aiResponse.counts.sofas>0&&<div style={recItem("🛋️","Sofa Cleaning",`$${aiResponse.counts.sofas*P.sofa}`)}/>}
                      {aiResponse.counts.chairs>0&&<div style={recItem("🪑","Chair Cleaning",`$${aiResponse.counts.chairs*P.chair}`)}/>}
                    </div>
                  )}

                  {Object.values(aiResponse.addons).some(Boolean)&&(<>
                    <p style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"#FF6F00",textTransform:"uppercase",letterSpacing:.5}}>🎁 Recommended add-ons</p>
                    {aiResponse.addons.carpetDeod&&<div style={recItem("🌬️","Deodorizer Treatment","Removes odors at source")}/>}
                    {aiResponse.addons.scotchgard&&<div style={recItem("🛡️","Scotchgard™ Protector","Prevents future stains")}/>}
                    {aiResponse.addons.fabricProt&&<div style={recItem("🛡️","Fabric Protector","Guards furniture")}/>}
                    {aiResponse.addons.grout&&<div style={recItem("🔒","Grout Sealing","Seals after cleaning")}/>}
                    {aiResponse.addons.screens&&<div style={recItem("🕸️","Screen & Track Cleaning","Full window detail")}/>}
                  </>)}

                  {aiResponse.reasoning?.length>0&&(
                    <div style={{background:"#f4f7f8",borderRadius:10,padding:"10px 12px",marginTop:10,marginBottom:12}}>
                      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"#6b7280"}}>Why I recommended this:</p>
                      {aiResponse.reasoning.map((r,i)=><p key={i} style={{margin:"2px 0",fontSize:12,color:"#4b5563"}}>• {r}</p>)}
                    </div>
                  )}

                  <button onClick={()=>applyAISuggestion(aiResponse)}
                    style={{width:"100%",padding:13,background:"linear-gradient(135deg,#FF6F00,#e65100)",color:"white",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:8}}>
                    ✅ Apply This Recommendation →
                  </button>
                  <button onClick={()=>{setAiResponse(null);setAiInput("");}}
                    style={{width:"100%",padding:10,background:"none",border:"1.5px solid #e0e6ea",borderRadius:12,color:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:13}}>
                    ↩ Ask something else
                  </button>
                </div>
              </div>
            )}

            {/* Skip to packages or manual */}
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:"11px",background:"white",border:"1.5px solid #e0e6ea",borderRadius:12,fontWeight:700,fontSize:13,cursor:"pointer",color:"#1a2e35"}}>
                🔧 Build My Own
              </button>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:"11px",background:"white",border:"1.5px solid #e0e6ea",borderRadius:12,fontWeight:700,fontSize:13,cursor:"pointer",color:"#1a2e35"}}>
                📦 Quick Packages
              </button>
            </div>

            {/* Packages */}
            <div style={{background:"white",borderRadius:14,padding:"14px",marginBottom:12,border:"1.5px solid #e0e6ea"}}>
              <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"#1a2e35"}}>📦 Or choose a package</p>
              {PACKAGES.map(pkg=>(
                <div key={pkg.id} onClick={()=>applyPackage(pkg)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,border:"1.5px solid #e0e6ea",marginBottom:7,cursor:"pointer",background:"#f9fafb"}}>
                  <span style={{fontSize:22}}>{pkg.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13}}>{pkg.name}</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>{pkg.desc}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span style={{fontSize:11,fontWeight:700,background:pkg.color,color:"white",padding:"1px 7px",borderRadius:10,display:"block",marginBottom:2}}>{pkg.tag}</span>
                    <span style={{fontSize:13,fontWeight:800,color:pkg.color}}>~${typeof pkg.price==="function"?pkg.price():pkg.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 1: BUILD SERVICES ── */}
        {step===1&&(<>
          {aiApplied&&(
            <div style={{background:"#E0F7FA",border:"1.5px solid #0097A7",borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
              <span>✅</span>
              <p style={{margin:0,fontSize:12,fontWeight:700,color:"#006978"}}>AI recommendations applied — review and adjust below</p>
              <button onClick={()=>{setAiApplied(false);setStep(0);}} style={{marginLeft:"auto",background:"none",border:"none",color:"#006978",cursor:"pointer",fontSize:11,fontWeight:600}}>Edit</button>
            </div>
          )}

          {summaryItems.length>0&&(
            <div style={{background:"linear-gradient(135deg,#006978,#0097A7)",color:"white",borderRadius:13,padding:"11px 14px",marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,opacity:.75,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📋 Your Order</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {summaryItems.map((item,i)=><span key={i} style={{background:"rgba(255,255,255,.18)",borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:600}}>{item}</span>)}
              </div>
            </div>
          )}

          {/* CARPET */}
          <div style={s.card(counts.carpet>0)}>
            <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:800,display:"flex",alignItems:"center",gap:7}}>🏠 Carpet Cleaning <span style={{fontSize:10,background:"#E0F7FA",color:"#006978",fontWeight:700,padding:"2px 7px",borderRadius:20}}>RF99™</span></h3>
            <p style={{fontSize:11,color:"#9ca3af",margin:"0 0 10px"}}>1st room ${P.carpet_first_room} • Additional ${P.carpet_additional}/room</p>
            <div style={s.row}><span style={{fontSize:13,fontWeight:600}}>Number of Rooms</span><Counter value={counts.carpet} onChange={v=>setCounts(p=>({...p,carpet:v}))}/></div>
            {counts.carpet>0&&(<>
              <p style={s.sec}>✨ Enhance carpet cleaning</p>
              <Addon icon="🛡️" title="Scotchgard™ Protector" desc="Repels stains — extends RF™ clean 3X longer." price={counts.carpet*P.scotchgard_per_room} selected={addons.scotchgard} onToggle={()=>setAddons(p=>({...p,scotchgard:!p.scotchgard}))} tag="Recommended"/>
              <Addon icon="🌬️" title="Deodorizer Treatment" desc="Eliminates pet odors & musty smells." price={counts.carpet*P.carpet_deod_per_room} selected={addons.carpetDeod} onToggle={()=>setAddons(p=>({...p,carpetDeod:!p.carpetDeod}))}/>
            </>)}
          </div>

          {/* HARDWOOD */}
          <div style={s.card(hwN>0)}>
            <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:800}}>🪵 Hardwood Floor Cleaning</h3>
            <p style={{fontSize:11,color:"#9ca3af",margin:"0 0 10px"}}>${P.hardwood_per_sqft.toFixed(2)}/sq ft</p>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{flex:1,fontSize:13,fontWeight:600}}>Square Feet</span>
              <input type="number" min="0" placeholder="0 sq ft" value={hw} onChange={e=>setHw(e.target.value)} style={{...s.inp,width:110,textAlign:"center"}}/>
            </div>
          </div>

          {/* TILE */}
          <div style={s.card(counts.tile>0)}>
            <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:800}}>⬜ Tile & Grout Cleaning</h3>
            <p style={{fontSize:11,color:"#9ca3af",margin:"0 0 10px"}}>${P.tile_per_room}/room</p>
            <div style={s.row}><span style={{fontSize:13,fontWeight:600}}>Number of Rooms</span><Counter value={counts.tile} onChange={v=>setCounts(p=>({...p,tile:v}))}/></div>
            {counts.tile>0&&(<>
              <p style={s.sec}>✨ Enhance tile cleaning</p>
              <Addon icon="🔒" title="Grout Sealing" desc="Seals pores — locks out dirt long-term." price={counts.tile*P.grout_per_room} selected={addons.grout} onToggle={()=>setAddons(p=>({...p,grout:!p.grout}))} tag="Best Protection"/>
            </>)}
          </div>

          {/* UPHOLSTERY */}
          <div style={s.card(upActive)}>
            <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:800}}>🛋️ Upholstery Cleaning</h3>
            <p style={{fontSize:11,color:"#9ca3af",margin:"0 0 10px"}}>Chairs ${P.chair} • Loveseats ${P.loveseat} • Sofas ${P.sofa} • Sectionals ${P.sectional_per_ft}/ft</p>
            {["chairs","loveseats","sofas"].map(k=>(
              <div key={k} style={s.row}><span style={{fontSize:13,fontWeight:600,textTransform:"capitalize"}}>{k}</span><Counter value={counts[k]} onChange={v=>setCounts(p=>({...p,[k]:v}))}/></div>
            ))}
            {upActive&&(<>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{flex:1,fontSize:13,fontWeight:600}}>Sectional (linear ft)</span>
                <input type="number" min="0" placeholder="0 ft" value={sf} onChange={e=>setSf(e.target.value)} style={{...s.inp,width:110,textAlign:"center"}}/>
              </div>
              <p style={s.sec}>✨ Enhance upholstery cleaning</p>
              <Addon icon="🛡️" title="Fabric Protector" desc="Guards against future spills & stains." price={upPcs*P.fabric_protector_per_piece+Math.round(sfN*P.fabric_protector_per_ft)} selected={addons.fabricProt} onToggle={()=>setAddons(p=>({...p,fabricProt:!p.fabricProt}))} tag="🐾 Pet homes"/>
              <Addon icon="🌬️" title="Deodorizer Treatment" desc="Banishes pet, food & smoke odors." price={upPcs*P.upholstery_deod_per_piece+Math.round(sfN*P.upholstery_deod_per_ft)} selected={addons.upDeod} onToggle={()=>setAddons(p=>({...p,upDeod:!p.upDeod}))}/>
            </>)}
          </div>

          {/* WINDOWS */}
          <div style={s.card(counts.windows>0)}>
            <h3 style={{margin:"0 0 2px",fontSize:15,fontWeight:800}}>🪟 Window Cleaning</h3>
            <p style={{fontSize:11,color:"#9ca3af",margin:"0 0 10px"}}>Inside & Outside • ${P.window}/window</p>
            <div style={s.row}><span style={{fontSize:13,fontWeight:600}}>Number of Windows</span><Counter value={counts.windows} onChange={v=>setCounts(p=>({...p,windows:v}))}/></div>
            {counts.windows>0&&(<>
              <p style={s.sec}>✨ Enhance window cleaning</p>
              <Addon icon="🕸️" title="Screen & Track Cleaning" desc="Removes dust, mold & grime." price={counts.windows*P.screens_per_window} selected={addons.screens} onToggle={()=>setAddons(p=>({...p,screens:!p.screens}))} tag="Recommended"/>
            </>)}
          </div>

          {base>0&&<button onClick={()=>setStep(2)} style={{width:"100%",padding:13,background:"#006978",color:"white",border:"none",borderRadius:14,fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:10}}>Continue to Review →</button>}
        </>)}

        {/* ── STEP 2: REVIEW ── */}
        {step===2&&(<>
          {/* Savings celebration */}
          {seaDisc>0&&(
            <div style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",borderRadius:14,padding:"12px 16px",marginBottom:10,textAlign:"center"}}>
              <p style={{margin:0,fontWeight:800,fontSize:14}}>🎉 {season.icon} {season.name} Savings Unlocked!</p>
              <p style={{margin:"2px 0 0",fontSize:12,opacity:.85}}>10% off applied automatically — you're saving ${seaDisc}</p>
            </div>
          )}

          {/* Pricing drawer */}
          <div style={{background:"white",borderRadius:14,border:"1.5px solid #e0e6ea",marginBottom:10,overflow:"hidden"}}>
            <button onClick={()=>setDrawerOpen(p=>!p)} style={{width:"100%",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",fontWeight:700,fontSize:14,color:"#1a2e35"}}>
              <span>📊 Price Breakdown</span>
              <span style={{fontSize:12,color:"#006978"}}>{drawerOpen?"▲":"▼"} {drawerOpen?"Hide":"Show"}</span>
            </button>
            {drawerOpen&&(
              <div style={{padding:"0 16px 14px"}}>
                {carpetCost>0&&<PriceRow label={`Carpet (${counts.carpet} room${counts.carpet>1?"s":""})`} price={carpetCost}/>}
                {hwN>0&&<PriceRow label={`Hardwood (${hwN} sq ft)`} price={Math.round(hwN*P.hardwood_per_sqft)}/>}
                {tileCost>0&&<PriceRow label={`Tile & Grout (${counts.tile} room${counts.tile>1?"s":""})`} price={tileCost}/>}
                {upCost>0&&<PriceRow label="Upholstery" price={upCost}/>}
                {winCost>0&&<PriceRow label={`Windows (${counts.windows})`} price={winCost}/>}
                {inline>0&&<>
                  <div style={{borderTop:"1px solid #f0f0f0",marginTop:6,paddingTop:6}}>
                    {addons.scotchgard&&<PriceRow label="Scotchgard™" price={counts.carpet*P.scotchgard_per_room} accent/>}
                    {addons.carpetDeod&&<PriceRow label="Carpet Deodorizer" price={counts.carpet*P.carpet_deod_per_room} accent/>}
                    {addons.grout&&<PriceRow label="Grout Sealing" price={counts.tile*P.grout_per_room} accent/>}
                    {addons.fabricProt&&<PriceRow label="Fabric Protector" price={upPcs*P.fabric_protector_per_piece+Math.round(sfN*P.fabric_protector_per_ft)} accent/>}
                    {addons.upDeod&&<PriceRow label="Upholstery Deodorizer" price={upPcs*P.upholstery_deod_per_piece+Math.round(sfN*P.upholstery_deod_per_ft)} accent/>}
                    {addons.screens&&<PriceRow label="Screen & Track" price={counts.windows*P.screens_per_window} accent/>}
                    {modal.bundle&&<PriceRow label="RF99™ Starter Pack" price={P.starter_pack} accent/>}
                  </div>
                </>}
                {(seaDisc>0||multiDisc>0)&&<div style={{borderTop:"1px solid #f0f0f0",marginTop:6,paddingTop:6}}>
                  {seaDisc>0&&<PriceRow label={`${season.icon} ${season.name} Discount (10%)`} price={-seaDisc} discount/>}
                  {multiDisc>0&&<PriceRow label="Mix & Match (5%)" price={-multiDisc} discount/>}
                </div>}
                <div style={{borderTop:"2px solid #e0e6ea",marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:900,color:"#006978"}}>
                  <span>Estimated Total</span><span>${grand}</span>
                </div>
                <p style={{margin:"4px 0 0",fontSize:10,color:"#9ca3af",textAlign:"right"}}>Final price confirmed on-site</p>
              </div>
            )}
          </div>

          {/* Social proof */}
          <div style={{background:"white",border:"1.5px solid #e0e6ea",borderRadius:12,padding:"8px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#6b7280"}}>
            <span style={{width:7,height:7,borderRadius:4,background:"#ef4444",flexShrink:0}}/>
            <span dangerouslySetInnerHTML={{__html:social}}/>
          </div>

          <button onClick={()=>setStep(3)} style={{width:"100%",padding:13,background:"#006978",color:"white",border:"none",borderRadius:14,fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:10}}>Continue to Your Info →</button>
        </>)}

        {/* ── STEP 3: FORM ── */}
        {step===3&&(<>
          <div style={{background:"white",borderRadius:16,padding:"16px 14px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
            <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:800,color:"#006978"}}>📋 Your Information</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {[{l:"Name *",k:"name",t:"text",p:"Full name",c:2},{l:"Phone *",k:"phone",t:"tel",p:"(410) 555-0000",c:1},{l:"Email",k:"email",t:"email",p:"you@email.com",c:1},{l:"Date *",k:"date",t:"date",p:"",c:1}].map(f=>(
                <div key={f.k} style={{gridColumn:f.c===2?"1/-1":"auto"}}>
                  <label style={s.lbl}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={s.inp}/>
                </div>
              ))}
              <div><label style={s.lbl}>Time *</label>
                <select value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} style={s.inp}>
                  <option value="">Select</option>
                  {["8:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{gridColumn:"1/-1"}}><label style={s.lbl}>Street Address *</label><input type="text" placeholder="123 Main St" value={form.street} onChange={e=>setForm(p=>({...p,street:e.target.value}))} style={s.inp}/></div>
              <div><label style={s.lbl}>City *</label><input type="text" placeholder="Ocean City" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} style={s.inp}/></div>
              <div><label style={s.lbl}>State *</label>
                <select value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} style={s.inp}>
                  <option value="">Select</option><option>MD</option><option>DE</option>
                </select>
              </div>
              <div style={{gridColumn:"1/-1"}}><label style={s.lbl}>Zip *</label><input type="text" placeholder="21842" value={form.zip} onChange={e=>setForm(p=>({...p,zip:e.target.value}))} style={s.inp}/></div>
              <div style={{gridColumn:"1/-1"}}><label style={s.lbl}>Notes</label><textarea placeholder="Pets, parking, access info..." value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} style={{...s.inp,height:60,resize:"none"}}/></div>
            </div>
          </div>
        </>)}
      </div>

      {/* STICKY BAR */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:40,background:"white",borderTop:"1.5px solid #e0e6ea",boxShadow:"0 -4px 20px rgba(0,0,0,.1)",padding:"10px 12px"}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",gap:10}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"baseline",gap:5}}>
              <span style={{fontSize:22,fontWeight:900,color:"#006978"}}>${grand}</span>
              {saved>0&&<span style={{fontSize:11,color:"#2e7d32",fontWeight:700}}>−${saved} saved</span>}
            </div>
            {hint&&<p style={{margin:0,fontSize:10,color:"#e65100",fontWeight:600,lineHeight:1.2}}>{hint}</p>}
          </div>
          {step<3?(
            <button onClick={()=>setStep(s=>Math.min(3,s+1))} disabled={step===0?false:base===0} style={{padding:"11px 16px",background:step>0&&base===0?"#d1d5db":"linear-gradient(135deg,#006978,#0097A7)",color:"white",border:"none",borderRadius:12,fontWeight:800,fontSize:13,cursor:step>0&&base===0?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
              {step===0?"Skip →":step===1?"Review →":"Continue →"}
            </button>
          ):(
            <button onClick={async()=>{
              if(!form.name||!form.phone||!form.street||!form.city||!form.state||!form.zip||!form.date||!form.time){alert("Please fill in all required fields.");return;}
              setSending(true);await new Promise(r=>setTimeout(r,1200));setSuccess(true);setSending(false);
            }} disabled={sending} style={{padding:"11px 16px",background:"linear-gradient(135deg,#FF6F00,#e65100)",color:"white",border:"none",borderRadius:12,fontWeight:800,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 4px 14px rgba(255,111,0,.3)"}}>
              {sending?"Sending...":"Confirm — $"+grand}
            </button>
          )}
        </div>
      </div>

      {/* SUCCESS */}
      {success&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,105,120,.94)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:14,overflowY:"auto"}}>
          <div style={{background:"white",borderRadius:22,maxWidth:400,width:"100%",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,#006978,#0097A7)",color:"white",textAlign:"center",padding:"24px 18px"}}>
              <div style={{fontSize:40,marginBottom:5}}>🎉</div>
              <h2 style={{margin:0,fontSize:20,fontWeight:900}}>You're All Set, {form.name.split(" ")[0]||"there"}!</h2>
              <p style={{margin:"4px 0 0",fontSize:12,opacity:.88}}>Booking request received</p>
            </div>
            <div style={{background:"#FF6F00",color:"white",textAlign:"center",padding:6,fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>
              Confirmation # TB{Math.floor(100000+Math.random()*900000)}
            </div>
            <div style={{padding:18}}>
              <div style={{background:"#f4f7f8",borderRadius:12,padding:"11px 13px",marginBottom:12}}>
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:800,color:"#1a2e35"}}>📋 What happens next</p>
                {["We'll call within 2–4 hours to confirm","Tech arrives on time with all equipment","RF™ clean with zero residue left behind","Dry in 4–6 hours — enjoy your clean home!"].map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:7,marginBottom:4}}>
                    <span style={{width:16,height:16,borderRadius:8,background:"#006978",color:"white",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</span>
                    <span style={{fontSize:12,color:"#4b5563"}}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#E0F7FA",borderRadius:12,padding:"11px 13px",marginBottom:12}}>
                {form.date&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:"#006978",fontWeight:700}}>📅</span><strong>{form.date} at {form.time}</strong></div>}
                {form.street&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:"#006978",fontWeight:700}}>📍</span><span>{form.street}, {form.city} {form.state}</span></div>}
                <div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:900,color:"#006978",marginTop:6,paddingTop:6,borderTop:"1px solid rgba(0,150,167,.2)"}}><span>💰 Total</span><span>${grand}{saved>0&&<span style={{fontSize:11,color:"#2e7d32",marginLeft:6}}>−${saved} saved</span>}</span></div>
              </div>
              <a href="tel:443-856-3244" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:11,background:"#006978",color:"white",borderRadius:12,fontWeight:800,fontSize:14,textDecoration:"none",marginBottom:7}}>📞 Call Us — 443-856-3244</a>
              <button onClick={()=>setSuccess(false)} style={{width:"100%",padding:10,border:"1.5px solid #e0e6ea",borderRadius:12,background:"white",color:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:13}}>Book another service</button>
            </div>
          </div>
        </div>
      )}

      {/* UPSELL MODAL */}
      {modalOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:40,display:"flex",alignItems:"center",justifyContent:"center",padding:12}} onClick={e=>e.target===e.currentTarget&&setModalOpen(false)}>
          <div style={{background:"white",borderRadius:20,maxWidth:420,width:"100%",overflow:"hidden",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{background:"linear-gradient(135deg,#006978,#0097A7)",color:"white",textAlign:"center",padding:"16px 14px 12px"}}>
              <div style={{fontSize:24,marginBottom:2}}>🎁</div>
              <h2 style={{margin:0,fontSize:16,fontWeight:900}}>One Last Upgrade!</h2>
              <p style={{margin:"2px 0 0",fontSize:11,opacity:.88}}>Add before you confirm</p>
            </div>
            <div style={{padding:"10px 12px 4px"}}>
              {!mmShown&&(
                <div onClick={()=>setModal(p=>({...p,bundle:!p.bundle}))} style={{position:"relative",display:"flex",alignItems:"center",gap:10,padding:"12px",borderRadius:12,border:modal.bundle?"2px solid #FF6F00":"2px solid #ffd9b5",background:"#FFF8F0",cursor:"pointer",marginBottom:8}}>
                  <span style={{position:"absolute",top:-8,left:12,background:"#FF6F00",color:"white",fontSize:9,fontWeight:700,padding:"1px 8px",borderRadius:20}}>🔥 Most Popular</span>
                  <div style={{width:20,height:20,borderRadius:10,border:modal.bundle?"2px solid #0097A7":"2px solid #d1d5db",background:modal.bundle?"#0097A7":"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0}}>{modal.bundle?"✓":""}</div>
                  <div style={{flex:1}}><p style={{margin:0,fontWeight:700,fontSize:13}}>RF99™ Spring Starter Pack</p><p style={{margin:"2px 0 0",fontSize:11,color:"#6b7280"}}>Priority scheduling + free re-clean guarantee</p></div>
                  <span style={{fontWeight:800,fontSize:13,color:"#006978"}}>+${P.starter_pack}</span>
                </div>
              )}
              {activeSvcs>=2&&base>=T_MULTI&&(
                <div onClick={()=>setModal(p=>({...p,multi:!p.multi}))} style={{position:"relative",display:"flex",alignItems:"center",gap:10,padding:"12px",borderRadius:12,border:modal.multi?"2px solid #7b1fa2":"2px solid #e1bee7",background:"#f3e5f5",cursor:"pointer",marginBottom:8}}>
                  <span style={{position:"absolute",top:-8,left:12,background:"#7b1fa2",color:"white",fontSize:9,fontWeight:700,padding:"1px 8px",borderRadius:20}}>🎉 Best Savings</span>
                  <div style={{width:20,height:20,borderRadius:10,border:modal.multi?"2px solid #7b1fa2":"2px solid #d1d5db",background:modal.multi?"#7b1fa2":"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0}}>{modal.multi?"✓":""}</div>
                  <div style={{flex:1}}><p style={{margin:0,fontWeight:700,fontSize:13}}>Mix & Match Discount</p><p style={{margin:"2px 0 0",fontSize:11,color:"#6b7280"}}>5% off your total — you've earned it!</p></div>
                  <span style={{fontWeight:800,fontSize:13,color:"#7b1fa2"}}>−${Math.round(base*P.multiservice_discount)}</span>
                </div>
              )}
            </div>
            <div style={{padding:"4px 12px 14px",display:"flex",flexDirection:"column",gap:6}}>
              <button onClick={()=>setModalOpen(false)} style={{padding:12,background:"linear-gradient(135deg,#FF6F00,#e65100)",color:"white",border:"none",borderRadius:11,fontWeight:800,fontSize:13,cursor:"pointer"}}>
                {modal.bundle||modal.multi?"Add Selected & Continue":"Continue to Booking"}
              </button>
              <button onClick={()=>{setModal({bundle:false,multi:false});setModalOpen(false);}} style={{padding:9,border:"1.5px solid #e0e6ea",borderRadius:11,background:"white",color:"#6b7280",fontWeight:600,cursor:"pointer",fontSize:12}}>No thanks, skip</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}

// Helper components
function PriceRow({ label, price, accent, discount }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"3px 0",borderBottom:"1px solid #f9fafb"}}>
      <span style={{color:discount?"#2e7d32":accent?"#FF6F00":"#4b5563"}}>{label}</span>
      <span style={{fontWeight:700,color:discount?"#2e7d32":accent?"#FF6F00":"#1a2e35"}}>{discount?"−":""}{discount?`$${Math.abs(price)}`:`$${price}`}</span>
    </div>
  );
}

function recItem(icon, label, price) {
  return {
    display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid #f0f0f0",fontSize:13
  };
}