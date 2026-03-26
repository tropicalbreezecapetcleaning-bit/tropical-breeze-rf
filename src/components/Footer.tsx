import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white">
      
      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-xl font-bold text-white tracking-tight block">Tropical Breeze</span>
              <span className="text-teal-300 text-xs font-mono tracking-widest uppercase">RF™ Residue-Free</span>
            </div>
            <p className="text-sky-300 text-sm leading-relaxed mb-4">
              Maryland and Delaware's only certified Residue-Free cleaning service. Serving 33+ cities across the Eastern Shore.
            </p>
            <p className="text-teal-300 text-xs font-mono italic">Residue Doesn't Survive Here™</p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Services</h3>
            <ul className="space-y-2">
              {[
                { name: "Carpet Cleaning", href: "/carpet-cleaning" },
                { name: "Upholstery", href: "/upholstery" },
                { name: "Tile & Grout", href: "/tile-grout" },
                { name: "Hardwood Floors", href: "/hardwood" },
                { name: "Window Cleaning", href: "/windows" },
                { name: "EZ Breeze", href: "/ez-breeze" },
              ].map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-sky-300 hover:text-teal-300 text-sm transition">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-2">
              {[
                { name: "About RF™", href: "/about" },
                { name: "Golf Communities", href: "/golf-communities" },
                { name: "Book Online", href: "/booking" },
                { name: "Contact", href: "/contact" },
              ].map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-sky-300 hover:text-teal-300 text-sm transition">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:4438563244" className="text-teal-300 hover:text-white font-bold text-lg transition">
                  443-856-3244
                </a>
              </li>
              <li>
                <a href="mailto:tropicalbreezecapetcleaning@gmail.com" className="text-sky-300 hover:text-teal-300 text-xs transition break-all">
                  tropicalbreezecapetcleaning@gmail.com
                </a>
              </li>
              <li className="text-sky-300 text-sm">Salisbury, MD 21801</li>
              <li className="text-sky-300 text-sm">Mon–Sat 8am–6pm</li>
              <li className="text-sky-300 text-sm">Same-day available</li>
            </ul>
          </div>

        </div>

        {/* MARYLAND CITIES */}
        <div className="mt-12 pt-8 border-t border-sky-800">
          <p className="text-sky-400 text-xs font-mono uppercase tracking-widest mb-4">Maryland Service Areas</p>
          <div className="flex flex-wrap gap-2">
            {["Salisbury", "Ocean City", "Berlin", "Ocean Pines", "Cambridge", "Easton", "St Michaels", "Princess Anne", "Fruitland", "Delmar"].map((city) => (
              <Link key={city} href={`/${city.toLowerCase().replace(/\s+/g, '-')}-md`}
                className="text-sky-400 hover:text-teal-300 text-xs transition">
                {city} MD
              </Link>
            ))}
          </div>
        </div>

        {/* DELAWARE CITIES */}
        <div className="mt-4">
          <p className="text-sky-400 text-xs font-mono uppercase tracking-widest mb-4">Delaware Service Areas</p>
          <div className="flex flex-wrap gap-2">
            {["Rehoboth Beach", "Bethany Beach", "Fenwick Island", "Lewes", "Milton", "Georgetown", "Seaford", "Milford"].map((city) => (
              <Link key={city} href={`/${city.toLowerCase().replace(/\s+/g, '-')}-de`}
                className="text-sky-400 hover:text-teal-300 text-xs transition">
                {city} DE
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-sky-800 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <p className="text-sky-400 text-xs">
            © 2026 Tropical Breeze RF™ · All rights reserved
          </p>
          <p className="text-sky-400 text-xs">
            RF™ · Clean Wake™ · Zero Trace Seal™ · Pure Flow Mark™ · Residue Doesn't Survive Here™
          </p>
        </div>
      </div>

    </footer>
  );
}