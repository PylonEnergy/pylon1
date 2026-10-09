import Link from "./SmartLink";
import { Phone, ArrowUpRight } from "lucide-react";
export default function MobileCallBar(){return <div className="mobile-call-bar"><a href="tel:1300001598"><Phone size={17}/> Call the team</a><Link href="/get-quote">Get a Free Quote<ArrowUpRight size={17}/></Link></div>;}
