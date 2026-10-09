import {solarGuides, type SolarGuide} from "@/data/solarGuides";
const api=process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export async function getBlogs():Promise<SolarGuide[]> {
 try {const res=await fetch(`${api}/api/blogs`,{next:{revalidate:30}});if(!res.ok)return solarGuides;const data=await res.json();const posts=(data.blogs||[]).filter((p:SolarGuide)=>p.slug&&!solarGuides.some(g=>g.slug===p.slug)&&!["blog_1","blog_2"].includes(p._id));return [...solarGuides,...posts];}catch{return solarGuides;}
}
export async function getBlog(slug:string):Promise<SolarGuide|null>{
 const guide=solarGuides.find(p=>p.slug===slug);if(guide)return guide;
 try {const res=await fetch(`${api}/api/blogs/${encodeURIComponent(slug)}`,{next:{revalidate:30}});if(!res.ok)return null;const data=await res.json();return data.blog||null;}catch{return null;}
}
