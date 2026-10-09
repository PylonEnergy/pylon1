"use client";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
interface Props { defaultPostcode?: string; defaultInterest?: string; defaultMessage?: string; compact?: boolean; }
export default function QuoteForm({defaultPostcode="",defaultInterest="residential",defaultMessage="",compact=false}:Props) {
 const id=useId();
 const [data,setData]=useState({name:"",email:"",phone:"",address:"",postcode:defaultPostcode,interest:defaultInterest,message:defaultMessage});
 const [status,setStatus]=useState("idle");const [error,setError]=useState("");
 useEffect(()=>{setData(d=>({...d,postcode:defaultPostcode,interest:defaultInterest,message:defaultMessage}));},[defaultPostcode,defaultInterest,defaultMessage]);
 const field=(key:keyof typeof data)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setData(d=>({...d,[key]:e.target.value}));
 async function submit(e:React.FormEvent){e.preventDefault();setStatus("sending");setError("");
 try {const params=new URLSearchParams(window.location.search);const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/leads`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,postcode:data.postcode || data.address.match(/\b\d{4}\b(?=\D*$)/)?.[0] || "",utmSource:params.get("utm_source")||"",utmMedium:params.get("utm_medium")||"",utmCampaign:params.get("utm_campaign")||""})});if(!res.ok)throw new Error("We couldn’t send your request. Please try again or call 1300 001 598.");setStatus("sent");window.dispatchEvent(new Event("pylon:lead-success"));}catch(err){setError(err instanceof Error?err.message:"Please try again.");setStatus("error");}}
 if(status==="sent")return <div className="form-success" role="status"><CheckCircle2 size={40}/><h3>You’re one step closer.</h3><p>Thank you! Our team will be in touch with your personalised quote.</p></div>;
 return <form onSubmit={submit} className={`lead-form ${compact?"compact-form":""}`}>
 <div className="lead-fields">{([{key:"name",label:"Full Name",type:"text",auto:"name",placeholder:"Your full name"},{key:"email",label:"Email Address",type:"email",auto:"email",placeholder:"you@example.com"},{key:"phone",label:"Contact Number",type:"tel",auto:"tel",placeholder:"04xx xxx xxx"},{key:"address",label:"Postal Address",type:"text",auto:"street-address",placeholder:"Street, suburb, state & postcode"}] as const).map(f=><label key={f.key} htmlFor={`${id}-${f.key}`}>{f.label}<input id={`${id}-${f.key}`} name={f.key} type={f.type} autoComplete={f.auto} required minLength={f.key==="phone"?8:f.key==="name"?2:undefined} value={data[f.key]} onChange={field(f.key)} placeholder={f.placeholder}/></label>)}</div>
 {!compact&&<div className="lead-fields"><label htmlFor={`${id}-interest`}>I’m interested in<select id={`${id}-interest`} value={data.interest} onChange={field("interest")}><option value="residential">Home solar</option><option value="battery">Solar + battery storage</option><option value="commercial">Commercial solar</option><option value="ev">EV charging</option></select></label><label htmlFor={`${id}-message`}>Anything else? <span>(optional)</span><input id={`${id}-message`} value={data.message} onChange={field("message")} placeholder="Your electricity bill or a question"/></label></div>}
 <button type="submit" className="button-orange" disabled={status==="sending"}>{status==="sending"?"Sending your request…":"Get My Free Quote"}<ArrowUpRight size={18}/></button>
 {error&&<p className="form-error" role="alert">{error}</p>}<p className="form-privacy">By submitting, you agree to be contacted about your enquiry. <a href="/privacy-policy">Privacy policy</a></p>
 </form>;
}
