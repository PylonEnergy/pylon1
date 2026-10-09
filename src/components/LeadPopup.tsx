"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight, Phone, ShieldCheck, Sun } from "lucide-react";
import QuoteForm from "./QuoteForm";
const AUTO_POPUP_DELAY = 60_000;
const AUTO_POPUP_LIMIT = 2;
export default function LeadPopup() {
 const pathname = usePathname();
 const dialog = useRef<HTMLDialogElement>(null);
 const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const completed = useRef(false);
 const automatic = useRef({count:0, nextAt:Date.now()+AUTO_POPUP_DELAY});
 const [request, setRequest] = useState({interest:"residential", postcode:"", message:""});
 const [mode,setMode] = useState("quote");
 useEffect(()=>{
  if(pathname.startsWith("/admin")) return;
  try { completed.current = sessionStorage.getItem("pylon_quote_complete") === "true"; } catch { /* Continue with in-memory completion when storage is unavailable. */ }
  try {
   const saved=JSON.parse(sessionStorage.getItem("pylon_quote_automatic")||"null");
   if(saved && Number.isFinite(saved.count) && Number.isFinite(saved.nextAt)) automatic.current=saved;
  } catch { /* Keep the session limit in memory if storage is unavailable. */ }
  const saveAutomatic=()=>{try {sessionStorage.setItem("pylon_quote_automatic",JSON.stringify(automatic.current));} catch {}};
  const clear = ()=>{if(timer.current) clearTimeout(timer.current);timer.current=null;};
  const show = (kind="quote")=>{ clear(); setMode(kind); document.body.style.overflow="hidden"; dialog.current?.showModal(); };
  const schedule = ()=>{
   clear();
   if(completed.current || automatic.current.count>=AUTO_POPUP_LIMIT) return;
   timer.current=setTimeout(()=>{
    if(completed.current || automatic.current.count>=AUTO_POPUP_LIMIT) return;
    automatic.current.count+=1;
    automatic.current.nextAt=Date.now()+AUTO_POPUP_DELAY;
    saveAutomatic();
    show();
   },Math.max(0,automatic.current.nextAt-Date.now()));
  };
  const quote = (event: Event)=>{
   const url=new URL((event as CustomEvent<string>).detail || "/get-quote",window.location.origin);
   const params=url.searchParams;
   const interest=params.get("interest")||"residential";
   setRequest({interest: ["commercial","battery","ev"].includes(interest)?interest:interest.includes("battery")?"battery":"residential",postcode:params.get("postcode")||"",message:Array.from(params.entries()).filter(([k])=> !["postcode","interest"].includes(k)).map(([k,v])=>`${k}: ${v}`).join("; ")});
   show();
  };
  const success=()=>{completed.current=true;try { sessionStorage.setItem("pylon_quote_complete","true"); } catch {} clear();};
  const payment=()=>show("payment");
  const capture=(e:MouseEvent)=>{const a=(e.target instanceof Element ? e.target.closest("a") : null); if(a && !a.dataset.pylonQuote && new URL(a.href).pathname==="/get-quote") {e.preventDefault();e.stopPropagation();quote(new CustomEvent("pylon:quote",{detail:a.href}));}};
  const close=()=>{document.body.style.overflow="";automatic.current.nextAt=Date.now()+AUTO_POPUP_DELAY;saveAutomatic();schedule();};
  const el=dialog.current;
  el?.addEventListener("close",close);
  window.addEventListener("pylon:quote",quote);window.addEventListener("pylon:lead-success",success);window.addEventListener("pylon:payment",payment);document.addEventListener("click",capture,true);
  saveAutomatic();schedule();
  return ()=>{clear(); el?.removeEventListener("close",close);if(el?.open){automatic.current.nextAt=Date.now()+AUTO_POPUP_DELAY;saveAutomatic();el.close();}window.removeEventListener("pylon:quote",quote);window.removeEventListener("pylon:lead-success",success);window.removeEventListener("pylon:payment",payment);document.removeEventListener("click",capture,true);document.body.style.overflow="";};
 },[pathname]);
 if(pathname.startsWith("/admin")) return null;
 return <dialog ref={dialog} className="quote-dialog" aria-labelledby="quote-dialog-title" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>
 <button className="dialog-close" aria-label="Close dialog" onClick={()=>dialog.current?.close()}><X size={21}/></button>
 {mode==="payment"?<div className="payment-content"><span className="eyebrow">PAYMENT ASSISTANCE</span><h2 id="quote-dialog-title">Let’s help with your payment.</h2><p>Have your invoice number ready. Contact our team for your invoice’s payment instructions or a secure payment link.</p><a className="button-orange" href="tel:1300001598"><Phone size={18}/>1300 001 598</a><a className="payment-email" href="mailto:info@pylonenergy.com.au?subject=Invoice%20payment%20assistance">Email the team <ArrowUpRight size={16}/></a></div>:<><div className="dialog-heading"><span className="eyebrow"><Sun size={16}/> YOUR NEXT CHAPTER STARTS HERE</span><h2 id="quote-dialog-title">A brighter home.<br/>A smaller energy bill.</h2><p>Tell us a little about yourself for a free, personalised quote.</p></div><div className="dialog-form"><QuoteForm defaultInterest={request.interest} defaultPostcode={request.postcode} defaultMessage={request.message} compact/><p className="dialog-trust"><ShieldCheck size={14}/> No obligation. Your details stay private.</p></div></>}
 </dialog>;
}
