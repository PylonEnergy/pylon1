import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SolarPackages from "@/components/home/SolarPackages";

export const metadata: Metadata = {
  title: "Solar Packages & Pricing | Pylon Energy",
  description: "Browse our packages combining Tier-1 panels, hybrid inverters, and battery systems. Government rebates active. Get upfront estimates.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Solar Packages &amp; Pricing"
        subtitle="Compare our transparent system pricing for residential solar setups, premium batteries, and hybrid configurations."
        breadcrumbs={[{ label: "Solar Packages" }]}
      />

      <SolarPackages />

      <section className="section-padding bg-white"><div className="page-width"><div className="section-heading-row"><div><span className="eyebrow">KNOW WHAT YOU’RE COMPARING</span><h2>A clearer way to choose.</h2></div><p>Compare how each option works. Your quote includes the final equipment specifications, installation scope and warranty terms.</p></div><div className="overflow-x-auto rounded-xl border border-pe-gray-200"><table className="package-explainer"><caption className="sr-only">Comparison of solar, battery and combined systems</caption><thead><tr><th scope="col">What matters</th><th scope="col">Solar system</th><th scope="col">Solar battery</th><th scope="col">Solar + battery</th></tr></thead><tbody>{[
 ["Main purpose","Generate daytime electricity","Store surplus energy","Generate and store electricity"],
 ["Best starting point","A roof and a recent electricity bill","An existing solar system and evening usage","A complete new system or substantial upgrade"],
 ["Equipment","Panels + grid-connected inverter","Battery + compatible inverter / control equipment","Panels + hybrid inverter + battery"],
 ["Night-time energy","Grid electricity","Stored energy, within usable capacity","Stored energy, within usable capacity"],
 ["Blackout backup","Usually unavailable without dedicated backup equipment","Optional; selected equipment and circuits","Optional; selected equipment and circuits"],
 ["What we assess","Roof space, shading and daily usage","Surplus solar, inverter compatibility and backup needs","Solar generation, battery capacity and energy needs"]
 ].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><p className="package-footnote">kW measures power. kWh measures energy capacity. Nominal battery capacity and usable capacity are different; your written quote confirms both.</p></div></section>
    </>
  );
}
