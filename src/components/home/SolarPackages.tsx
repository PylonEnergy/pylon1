"use client";
import { useState, useEffect } from "react";
import Link from "@/components/SmartLink";
import { Check, Sun, Battery, Zap } from "lucide-react";

type Tab = "battery" | "solarBattery" | "solarSystem";

const tabs: { id: Tab; label: string }[] = [
  { id: "battery", label: "Solar Batteries" },
  { id: "solarBattery", label: "Solar Panels & Batteries" },
  { id: "solarSystem", label: "Solar System" },
];

const packages = {
  battery: [
    {
      name: "14kWh Battery",
      savings: "$1,500 – $1,700 / yr",
      daily: "12.5 – 13.5 kWh/day",
      warranty: "10-year warranty",
      suited: "2–3 person homes",
      popular: false,
      features: ["Premium lithium cells", "Smart monitoring app", "Backup options assessed", "Expandable capacity"],
    },
    {
      name: "28kWh Battery",
      savings: "$3,000 – $3,400 / yr",
      daily: "25 – 27 kWh/day",
      warranty: "10-year warranty",
      suited: "4–5 person homes",
      popular: true,
      features: ["Premium lithium cells", "Smart monitoring app", "Backup options assessed", "Expandable capacity"],
    },
    {
      name: "42kWh Battery",
      savings: "$4,500 – $5,100 / yr",
      daily: "38 – 41.5 kWh/day",
      warranty: "10-year warranty",
      suited: "Large homes / Commercial",
      popular: false,
      features: ["Premium lithium cells", "Smart monitoring app", "Backup options assessed", "3-phase ready"],
    },
  ],
  solarBattery: [
    {
      name: "6.6kW + 28kWh",
      specs: "14 × 475W Panels · 5kW Hybrid Inverter",
      savings: "$6,000 – $6,500 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
    {
      name: "10.5kW + 28kWh",
      specs: "22 × 475W Panels · 8kW Hybrid Inverter",
      savings: "$7,500 – $8,000 / yr",
      popular: true,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
    {
      name: "13.2kW + 28kWh",
      specs: "28 × 475W Panels · 10kW Hybrid Inverter",
      savings: "$8,800 – $9,200 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"],
    },
  ],
  solarSystem: [
    {
      name: "6.6kW Solar",
      specs: "14 × 475W Panels · 5kW Smart Inverter",
      savings: "$2,400 – $2,600 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
    {
      name: "10.45kW Solar",
      specs: "22 × 475W Panels · 8kW Smart Inverter",
      savings: "$4,400 – $4,800 / yr",
      popular: true,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
    {
      name: "13.2kW Solar",
      specs: "28 × 475W Panels · 10kW Smart Inverter",
      savings: "$5,500 – $5,800 / yr",
      popular: false,
      features: ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"],
    },
  ],
};


const categoryInfo = {
 battery: { title: "Make more of the solar you already have.", description: "Store surplus energy for evening use. We check your existing inverter, daytime generation and backup requirements before recommending capacity.", icon: Battery, href: "/services/solar-batteries", link: "Explore battery storage" },
 solarBattery: { title: "Generate it. Store it. Use it when you need it.", description: "A complete solar and storage solution with a hybrid inverter. The panel array and battery are matched to your energy use, roof space and future plans.", icon: Zap, href: "/blog/choosing-a-home-solar-battery", link: "Read our battery guide" },
 solarSystem: { title: "Put your roof to work, every sunny day.", description: "Solar panels and a grid-connected inverter supply electricity while the sun is shining. Compare array sizes, then request a design for your roof and daily usage.", icon: Sun, href: "/services/residential-solar", link: "Explore home solar" },
};

function getCardAnchorId(name: string) {
  const n = name.toLowerCase();
  if (n.includes("6.6kw +")) return "6-6kw-battery";
  if (n.includes("10.5kw +")) return "10-kw-battery";
  if (n.includes("13.2kw +")) return "13-kw-battery";
  if (n.includes("6.6kw")) return "6-6kw";
  if (n.includes("10.45kw")) return "10kw";
  if (n.includes("13.2kw")) return "13kw";
  if (n.includes("14kwh")) return "14kwh";
  if (n.includes("28kwh")) return "28kwh";
  if (n.includes("42kwh")) return "42kwh";
  return undefined;
}

export default function SolarPackages() {
  const [activeTab, setActiveTab] = useState<Tab>("solarSystem");
  const [packagesList, setPackagesList] = useState<any>(packages);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const [, setLoading] = useState(true);

  // Read URL hash on load/navigation to match clicked category tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (!hash) return;
        if (["#5kw", "#6-6kw", "#8kw", "#10kw", "#13kw"].includes(hash)) {
          setActiveTab("solarSystem");
          if (hash === "#5kw" || hash === "#6-6kw") setHighlightedCard("6.6kW Solar");
          if (hash === "#8kw" || hash === "#10kw") setHighlightedCard("10.45kW Solar");
          if (hash === "#13kw") setHighlightedCard("13.2kW Solar");
        } else if (["#6-6kw-battery", "#8kw-battery", "#10kw-battery", "#13kw-battery"].includes(hash)) {
          setActiveTab("solarBattery");
          if (hash === "#6-6kw-battery") setHighlightedCard("6.6kW + 28kWh");
          if (hash === "#8kw-battery" || hash === "#10kw-battery") setHighlightedCard("10.5kW + 28kWh");
          if (hash === "#13kw-battery") setHighlightedCard("13.2kW + 28kWh");
        } else if (["#14kwh", "#28kwh", "#42kwh", "#5kwh", "#10kwh", "#15kwh", "#20kwh"].includes(hash)) {
          setActiveTab("battery");
          if (hash === "#14kwh" || hash === "#5kwh") setHighlightedCard("14kWh Battery");
          if (hash === "#28kwh" || hash === "#10kwh") setHighlightedCard("28kWh Battery");
          if (hash === "#42kwh" || hash === "#15kwh" || hash === "#20kwh") setHighlightedCard("42kWh Battery");
        }

        // Scroll to the packages section
        const el = document.getElementById("packages");
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      };

      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/packages`);
        if (res.ok) {
          const data = await res.json();
          if (data.packages && data.packages.length > 0) {
            const grouped = {
              battery: [] as any[],
              solarBattery: [] as any[],
              solarSystem: [] as any[],
            };
            const sortedPkgs = [...data.packages].sort((a, b) => (a.order || 0) - (b.order || 0));
            sortedPkgs.forEach((pkg: any) => {
              const cat = pkg.category;
              if (grouped[cat as keyof typeof grouped]) {
                grouped[cat as keyof typeof grouped].push({
                  name: pkg.name,
                  specs: pkg.specs?.detail || [pkg.specs?.panels, pkg.specs?.inverter].filter(Boolean).join(" · "),
                  savings: pkg.annualSavings,
                  daily: pkg.dailyOutput ? `${pkg.dailyOutput} kWh/day` : "",
                  warranty: pkg.warranty,
                  suited: pkg.suitedFor,
                  popular: !!pkg.popular,
                  features: pkg.features || (cat === "battery"
                    ? ["Premium lithium cells", "Smart monitoring app", "Backup options assessed", "Expandable capacity"]
                    : cat === "solarBattery"
                    ? ["Premium Tier-1 panels", "Hybrid inverter", "Battery storage", "Smart monitoring"]
                    : ["Premium Tier-1 panels", "Wi-Fi inverter", "Fully installed", "25-yr panel warranty"]),
                });
              }
            });
            Object.keys(grouped).forEach((key) => {
              const catKey = key as keyof typeof grouped;
              if (grouped[catKey].length === 0) grouped[catKey] = packages[catKey];
            });
            setPackagesList(grouped);
          }
        }
      } catch (err) {
        console.error("Failed to load CMS packages:", err);
      } finally {
        setLoading(false);
      }
    }
    const t = setTimeout(fetchPackages, 500);
    return () => clearTimeout(t);
  }, []);

  const currentPackages = packagesList[activeTab];
  const info = categoryInfo[activeTab];

  return (
    <section id="packages" className="packages-section"><div className="page-width">
      <div className="section-heading-row"><div><span className="eyebrow">FIND YOUR PERFECT FIT</span><h2>Our packages.<br/>Your possibilities.</h2></div><div><p>From your first solar panels to complete energy storage. Compare the essentials and find a system that fits.</p><Link href="/solar-packages" className="text-link">Explore all packages ↗</Link></div></div>
      <div className="package-selector" role="tablist" aria-label="Package categories">{tabs.map(tab=><button key={tab.id} role="tab" id={`package-tab-${tab.id}`} aria-selected={activeTab===tab.id} aria-controls="package-results" tabIndex={activeTab===tab.id?0:-1} onKeyDown={e=>{const index=tabs.findIndex(t=>t.id===activeTab);let next=index;if(e.key==="ArrowRight")next=(index+1)%tabs.length;else if(e.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;else if(e.key==="Home")next=0;else if(e.key==="End")next=tabs.length-1;else return;e.preventDefault();setActiveTab(tabs[next].id);document.getElementById(`package-tab-${tabs[next].id}`)?.focus();}} className={activeTab===tab.id?"selected":""} onClick={()=>{setActiveTab(tab.id);setHighlightedCard(null);}}>{tab.label}</button>)}</div>
      <div id="package-results" role="tabpanel" aria-labelledby={`package-tab-${activeTab}`}><div className="package-category-intro"><info.icon size={30}/><div><h3>{info.title}</h3><p>{info.description}</p></div><Link href={info.href}>{info.link} ↗</Link></div><div className="new-package-grid">{currentPackages.map((pkg: {name:string;specs?:string;daily?:string;suited?:string;warranty?:string;popular:boolean;features:string[]},i:number)=><article key={pkg.name} id={getCardAnchorId(pkg.name)} className={`new-package-card ${pkg.popular?"featured":""} ${highlightedCard===pkg.name?"highlighted":""}`}>
        <div className="package-card-top"><span>{activeTab==="battery"?"ENERGY STORAGE":activeTab==="solarBattery"?"SOLAR + STORAGE":"HOME SOLAR"}</span><span>{pkg.popular?"POPULAR CHOICE":`0${i+1}`}</span></div>
        <div className="package-visual"><img src={activeTab==="battery"?"/sigenergy-sigenstor.png":activeTab==="solarBattery"?"/hero-battery.png":"/jinko-tiger-neo.png"} alt={activeTab==="battery"?"Battery storage system":activeTab==="solarBattery"?"Solar and battery solution":"Solar panel"}/></div>
        <h3>{pkg.name}</h3><p className="package-spec">{pkg.specs||pkg.suited||(activeTab==="solarSystem"?"Solar designed for your home":"Flexible storage for your home")}</p>
        <dl className="package-facts"><div><dt>{activeTab==="battery"?"Storage capacity":"Panel array"}</dt><dd>{activeTab==="battery"?pkg.name.replace(" Battery",""):pkg.specs?.split(" · ")[0]||"Designed for your roof"}</dd></div><div><dt>{activeTab==="solarBattery"?"Battery storage":activeTab==="battery"?"Compatibility":"Inverter"}</dt><dd>{activeTab==="solarBattery"?"28 kWh nominal":activeTab==="battery"?"Assessed before installation":pkg.specs?.split(" · ")[1]||"Matched to your system"}</dd></div><div><dt>{activeTab==="battery"?"Battery warranty":"Installation"}</dt><dd>{activeTab==="battery"?pkg.warranty||"Product-specific terms":"Included in your quote"}</dd></div></dl><div className="package-price"><span>Designed around your property</span><strong>Personalised quote</strong><small>Installation & system options explained upfront</small></div>
        <ul>{pkg.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
        <Link href={`/get-quote?interest=${activeTab==="solarSystem"?"residential":"battery"}&system=${encodeURIComponent(pkg.name)}`} className={pkg.popular?"button-orange":"button-outline"}>Get a Quote <span>↗</span></Link>
      </article>)}</div></div><p className="package-footnote">Package capacities are nominal. Final panel count, inverter model, usable storage, backup circuits, warranty and rebate eligibility are confirmed in your written quote. Savings depend on usage, tariffs, shading and export limits. System imagery is illustrative.</p>
    </div></section>
  );
}
