with open('src/app/booking/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the broken button and replace everything between the two onClick markers
start_marker = '<button onClick={async()=>{\n              if(!form.name||!form.phone||!form.street||!form.city||!form.state||!form.zip||!form.date||!form.time){alert("Please fill in all required fields.");return;}\n              onClick={async()=>{'
end_marker = '  setSending(false);\n}}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx) + len(end_marker)

if start_idx == -1:
    print("NOT FOUND - check the file manually")
else:
    new_button = '''<button onClick={async()=>{
              if(!form.name||!form.phone||!form.street||!form.city||!form.state||!form.zip||!form.date||!form.time){alert("Please fill in all required fields.");return;}
              setSending(true);
              try {
                const res = await fetch("/api/booking", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...form,
                    services: {
                      [`Carpet (${counts.carpet} rooms)`]: counts.carpet > 0 ? `$${carpetCost}` : null,
                      [`Hardwood (${hw} sqft)`]: hwN > 0 ? `$${Math.round(hwN*P.hardwood_per_sqft)}` : null,
                      [`Tile & Grout (${counts.tile} rooms)`]: counts.tile > 0 ? `$${tileCost}` : null,
                      ["Upholstery"]: upActive ? `$${upCost}` : null,
                      [`Windows (${counts.windows})`]: counts.windows > 0 ? `$${winCost}` : null,
                    },
                    addons: {
                      "Scotchgard": addons.scotchgard || null,
                      "Carpet Deodorizer": addons.carpetDeod || null,
                      "Grout Sealing": addons.grout || null,
                      "Fabric Protector": addons.fabricProt || null,
                      "Upholstery Deodorizer": addons.upDeod || null,
                      "Screen and Track": addons.screens || null,
                    },
                    total: grand,
                    saved: saved > 0 ? saved : null,
                  }),
                });
                const data = await res.json();
                if (data.success) { setSuccess(true); } else { alert("Something went wrong. Please call 443-856-3244 to book."); }
              } catch(e) { alert("Something went wrong. Please call 443-856-3244 to book."); }
              setSending(false);
            }}'''

    content = content[:start_idx] + new_button + content[end_idx:]

    with open('src/app/booking/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"SUCCESS - replaced from index {start_idx} to {end_idx}")