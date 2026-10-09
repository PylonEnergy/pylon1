"use client";
import BrandLogo from "@/components/BrandLogo";
import { useState } from "react";
import Link from "@/components/SmartLink";
import { Phone, Menu, X, ArrowUpRight, CreditCard, Sparkles } from "lucide-react";
const links = [ ["Solar Packages", "/solar-packages"], ["Battery Storage", "/services/solar-batteries"], ["Services", "/services"], ["About Us", "/about"], ["Guides", "/blog"], ["Contact", "/contact"] ];
export default function Header() {
 const [open, setOpen] = useState(false);
 return <header className="site-header">
  <div className="offer-strip"><Link href="/special-offers"><Sparkles size={14}/><strong>Special offers</strong><span>Explore our solar & battery packages</span><ArrowUpRight size={15}/></Link><button onClick={()=>window.dispatchEvent(new Event("pylon:payment"))}><CreditCard size={14}/> Make a Payment</button></div>
  <div className="navigation-shell"><Link href="/" className="brand" aria-label="Pylon Energy homepage"><BrandLogo className="brand-logo" /></Link>
  <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
  <div className="header-actions"><a className="call-button" href="tel:1300001598"><Phone size={16}/><span>Call 1300 001 598</span></a><Link href="/get-quote" className="quote-header">Get a Quote <ArrowUpRight size={16}/></Link><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>
  {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{links.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} href={href}>{label}<ArrowUpRight size={16}/></Link>)}<Link href="/special-offers" onClick={()=>setOpen(false)}>Special Offers</Link><Link href="/get-quote" onClick={()=>setOpen(false)} className="button-orange">Get a Free Quote</Link></nav>}
 </header>;
}
