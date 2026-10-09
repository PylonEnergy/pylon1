import Link from "../SmartLink";
import BlogCards from "../BlogCards";
import {solarGuides} from "@/data/solarGuides";
export default function LatestGuides(){return <section className="guides-section"><div className="page-width"><div className="section-heading-row"><div><span className="eyebrow">A LITTLE KNOWLEDGE GOES A LONG WAY</span><h2>Good advice.<br/>Brighter decisions.</h2></div><div><p>Understand your options before you choose. Explore our guides to solar, batteries and installation.</p><Link className="text-link" href="/blog">Explore all guides ↗</Link></div></div><BlogCards posts={solarGuides.slice(0,3)}/></div></section>;}
