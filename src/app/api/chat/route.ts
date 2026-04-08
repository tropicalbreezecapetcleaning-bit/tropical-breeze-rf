import { NextRequest, NextResponse } from "next/server";

const RESPONSES: Record<string, string> = {
  carpet: "Carpet cleaning starts at $99 for the first room with our RF99™ process — that includes our Prochem truckmount and Rotovac Powerwand 360° at 300-500 PSI. Each additional room is $50. Dry in 4-6 hours. Book online for instant savings! 🌴",
  upholstery: "Upholstery cleaning starts at $50 for chairs, $75 for loveseats, and $85 for sofas. We use fiber-specific RF™ processes safe for all fabrics. Pet odor enzyme treatment available. Book at /booking for an instant quote!",
  tile: "Tile and grout cleaning is $125 per room — we use up to 1,200+ PSI rotary extraction to reach deep into grout pores. Orange sprinkler stains are our Eastern Shore specialty. Book online for an instant quote!",
  hardwood: "Hardwood floor cleaning is $1.00 per square foot with a free inspection before every job. Our low-moisture RF™ process is safe for all finishes and dries in 1-2 hours. Call 443-856-3244 or book online!",
  window: "Window cleaning is $13 per window — includes inside glass, outside glass, screen cleaning, track cleaning, and sill wipe-down. Pure water process removes salt-air mineral deposits. Book online for an instant quote!",
  ezbreeze: "EZ Breeze panel cleaning starts with a free assessment. We use only vinyl-safe solutions — never ammonia-based cleaners that yellow panels. Call 443-856-3244 for a free quote!",
  price: "Here's a quick price guide: Carpet $99 first room · Upholstery from $50 · Tile $125/room · Hardwood $1.00/sq ft · Windows $13/window. Book online at /booking to get an instant quote with seasonal savings! 🌴",
  area: "We serve 33+ cities across Maryland and Delaware's Eastern Shore — Salisbury, Ocean City, Berlin, Ocean Pines, Rehoboth Beach, Bethany Beach, Lewes, The Peninsula, Bayside, Heritage Shores and more. Book online or call 443-856-3244!",
  residue: "The RF™ process removes dirt AND the cleaning agent itself — traditional cleaning leaves soap residue that re-attracts dirt within 2 weeks. RF™ cleaned surfaces stay cleaner up to 3x longer and are safe for pets and children immediately after drying!",
  pet: "Yes — our RF™ process is completely pet safe. We also offer enzyme deodorizer treatment that eliminates pet odors at the molecular level, not just masks them. Carpet deodorizer is $20 per room. Book online for an instant quote!",
  book: "You can book online at /booking for an instant quote with seasonal savings, or call us at 443-856-3244. Online booking takes about 60 seconds and includes exclusive package discounts! 🌴",
  dry: "Carpets are walk-ready in 4-6 hours with RF™ — not 24-48 hours like traditional cleaning. Upholstery dries in 2-4 hours. Hardwood dries in 1-2 hours.",
  prochem: "We use a professional Prochem truck-mount system with the Rotovac Powerwand 360° — delivering 200°F+ heat at 300-500 PSI for carpet. This is professional grade equipment, not the consumer rentals other companies use.",
  default: "Great question! We serve 33+ cities across Maryland and Delaware's Eastern Shore with RF™ residue-free cleaning. Carpet starts at $99, windows $13/window, tile $125/room. Book online at /booking for an instant quote or call 443-856-3244! 🌴"
};

function getResponse(message: string): string {
  const low = message.toLowerCase();
  if (low.includes("carpet") || low.includes("rug")) return RESPONSES.carpet;
  if (low.includes("upholster") || low.includes("sofa") || low.includes("couch") || low.includes("furniture")) return RESPONSES.upholstery;
  if (low.includes("tile") || low.includes("grout") || low.includes("bathroom")) return RESPONSES.tile;
  if (low.includes("hardwood") || low.includes("wood floor")) return RESPONSES.hardwood;
  if (low.includes("window")) return RESPONSES.window;
  if (low.includes("ez breeze") || low.includes("ezbreeze") || low.includes("vinyl") || low.includes("porch")) return RESPONSES.ezbreeze;
  if (low.includes("price") || low.includes("cost") || low.includes("how much") || low.includes("rate")) return RESPONSES.price;
  if (low.includes("area") || low.includes("location") || low.includes("city") || low.includes("serve") || low.includes("near")) return RESPONSES.area;
  if (low.includes("residue") || low.includes("rf") || low.includes("difference") || low.includes("process")) return RESPONSES.residue;
  if (low.includes("pet") || low.includes("dog") || low.includes("cat") || low.includes("odor") || low.includes("smell")) return RESPONSES.pet;
  if (low.includes("book") || low.includes("schedule") || low.includes("appointment")) return RESPONSES.book;
  if (low.includes("dry") || low.includes("how long")) return RESPONSES.dry;
  if (low.includes("prochem") || low.includes("rotovac") || low.includes("equipment") || low.includes("machine")) return RESPONSES.prochem;
  return RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [{ role: "user", content: body.message || "" }];
    const lastMessage = messages[messages.length - 1]?.content || "";
    const text = getResponse(lastMessage);
    return NextResponse.json({ message: text, response: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ message: "Call us at 443-856-3244!", response: "Call us at 443-856-3244!" });
  }
}
