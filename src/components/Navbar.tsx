'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white tracking-tight">Tropical Breeze</span>
          <span className="text-teal-300 text-xs font-mono tracking-widest uppercase">RF™ Residue-Free</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-teal-300 transition">Home</Link>
          <Link href="/carpet-cleaning" className="hover:text-teal-300 transition">Carpet</Link>
          <Link href="/upholstery" className="hover:text-teal-300 transition">Upholstery</Link>
          <Link href="/tile-grout" className="hover:text-teal-300 transition">Tile & Grout</Link>
          <Link href="/hardwood" className="hover:text-teal-300 transition">Hardwood</Link>
          <Link href="/windows" className="hover:text-teal-300 transition">Windows</Link>
          <Link href="/ez-breeze" className="hover:text-teal-300 transition">EZ Breeze</Link>
        </div>
        <Link href="/about" className="hover:text-teal-300 transition">About</Link>
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:4438563244" className="text-sm text-teal-300 hover:text-white transition font-mono">443-856-3244</a>
          <a href="/booking" className="bg-teal-400 hover:bg-teal-300 text-sky-900 font-bold px-5 py-2 rounded-full text-sm transition">Book Now</a>
        </div>
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-sky-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Home</Link>
          <Link href="/carpet-cleaning" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Carpet Cleaning</Link>
          <Link href="/upholstery" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Upholstery</Link>
          <Link href="/tile-grout" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Tile & Grout</Link>
          <Link href="/hardwood" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Hardwood</Link>
          <Link href="/windows" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">Windows</Link>
          <Link href="/ez-breeze" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">EZ Breeze</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-teal-300 transition">About</Link>
          <div className="pt-2 border-t border-sky-700 flex flex-col gap-3">
            <a href="tel:4438563244" className="text-teal-300 font-mono">443-856-3244</a>
            <a href="/booking" className="bg-teal-400 text-sky-900 font-bold px-5 py-2 rounded-full text-center">Book Now</a>
          </div>
        </div>
      )}
    </nav>
  );
}<Link href="/contact" className="hover:text-teal-300 transition">Contact</Link>