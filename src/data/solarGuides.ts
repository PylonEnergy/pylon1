export interface SolarGuide {
 _id: string; slug: string; title: string; excerpt: string; category: string;
 author: string; readTime: string; coverImage: string; createdAt: string;
 content: string; sections?: {heading:string;body:string}[];
 source?: {title:string;url:string};
}
export const solarGuides: SolarGuide[] = [
 {
 _id:"guide-battery",slug:"choosing-a-home-solar-battery",title:"Choosing a solar battery that fits your home",category:"Battery storage",author:"Pylon Energy Team",readTime:"2 min read",coverImage:"/sigenergy-sigenstor-home.jpg",createdAt:"2026-10-08",excerpt:"Evening electricity use, spare solar generation and backup needs matter more than choosing the biggest battery.",content:"",
 sections:[
 {heading:"Start with your evening usage",body:"Look at the electricity you use after sunset, rather than your total daily bill alone. Battery storage is most useful when it shifts surplus daytime generation into the hours when your home needs it. A smaller household may need less storage than a large, all-electric home."},
 {heading:"Capacity is only part of the picture",body:"Check both usable energy capacity in kilowatt-hours and the power the battery can deliver at once. Your solar array must also generate enough surplus to recharge it. Air conditioning, electric hot water and EV charging can change the calculation."},
 {heading:"Ask about compatibility and backup",body:"An existing solar system may need an inverter upgrade or an AC-coupled battery. Backup capability depends on the chosen equipment, switching arrangement and connected circuits; storage alone does not guarantee whole-home backup. Ask what stays powered during an outage."},
 {heading:"Get a recommendation for your property",body:"Share a recent bill, your existing system details and your future plans with our team. We can compare battery options and explain usable capacity, installation requirements and product-specific warranty terms in your quote."}],
 source:{title:"Smart House Solar’s battery size comparison",url:"https://www.smarthousesolar.com.au/blog/solar-battery-size-comparison-australia"}
 },
 {
 _id:"guide-home-solar",slug:"planning-a-6-6kw-solar-system",title:"Is a 6.6kW solar system the right starting point?",category:"Home solar",author:"Pylon Energy Team",readTime:"2 min read",coverImage:"/hero-panels.png",createdAt:"2026-10-08",excerpt:"A practical guide to matching a home solar system to your roof, electricity use and daytime routine.",content:"",
 sections:[
 {heading:"Match the system to your household",body:"A system around 6.6kW is a common starting point for comparing residential solar. Suitability depends on your consumption, when you use electricity and the space available on your roof. A package size is a starting point for a design, rather than a promise of a particular bill reduction."},
 {heading:"Know what the rating means",body:"The panel array’s kilowatt rating describes its combined rated power. Daily generation is measured in kilowatt-hours and varies with weather, roof orientation, shade and season. The inverter rating is a separate specification; ask your consultant to explain both."},
 {heading:"Compare the full installation",body:"Panel count changes with the wattage of each panel. Compare panel models, the inverter, monitoring, installation scope and written warranty terms instead of comparing system size alone. Roof condition and any electrical upgrades also affect the final proposal."},
 {heading:"Think about the next few years",body:"Tell your consultant if you plan to add a battery, switch appliances to electricity or buy an EV. These plans can influence the best system design. Request an assessment using your address and a recent electricity bill."}],
 source:{title:"Smart House Solar’s 6.6kW system guide",url:"https://www.smarthousesolar.com.au/blog/6-6kw-solar-system-sunshine-coast-price-roi-and-output"}
 },
 {
 _id:"guide-larger-solar",slug:"planning-a-larger-solar-system",title:"When a larger solar system makes sense",category:"System planning",author:"Pylon Energy Team",readTime:"2 min read",coverImage:"/hero-commercial.png",createdAt:"2026-10-08",excerpt:"Explore the roof space, energy demand and installation considerations behind a larger solar array.",content:"",
 sections:[
 {heading:"Start with demand, not just roof space",body:"A larger array can suit households with greater electricity consumption or businesses with substantial daytime demand. Air conditioning and other large loads are useful details to share with your consultant. The right system is the one that fits your energy needs and site."},
 {heading:"Check the practical constraints",body:"Available roof area, shading and the layout of the property influence how many panels can be installed. Panel wattage affects the count needed for a given array rating. A site assessment should establish a workable layout and the appropriate inverter configuration."},
 {heading:"Compare expected output carefully",body:"System capacity and daily generation describe different things. A kilowatt rating alone cannot tell you your eventual savings. Ask for an estimate based on your location and usage, along with a clear explanation of the assumptions used."},
 {heading:"Plan the complete solution",body:"If your goal includes storage, discuss the battery alongside the solar array. Request a written proposal listing the equipment, installation scope, warranty terms and total price. Review these details together before deciding which package best suits your property."}],
 source:{title:"Smart House Solar’s larger solar system guide",url:"https://www.smarthousesolar.com.au/blog/10kw-solar-system-brisbane-price-roi-and-output"}
 },
 {
 _id:"guide-installation",slug:"what-to-expect-from-solar-installation",title:"Your solar installation: what to expect",category:"Installation",author:"Pylon Energy Team",readTime:"2 min read",coverImage:"/alpha-ess-smile5-home.jpg",createdAt:"2026-10-08",excerpt:"From your first consultation to ongoing support, here is what to discuss before your installation.",content:"",
 sections:[
 {heading:"Begin with a tailored assessment",body:"Share your energy bills, property address and goals. Residential and commercial installations have different requirements, so your consultant should recommend a system matched to your site rather than relying on a standard package alone."},
 {heading:"Review the equipment and scope",body:"Before proceeding, ask for the proposed panel and inverter models, the installation scope and the warranty documentation. Confirm what is included and who will answer any questions. A clear written quote makes different options easier to compare."},
 {heading:"Confirm the installation arrangements",body:"Discuss the planned installation with your team, including property access and the steps needed before the system can be commissioned. Timeframes depend on the installation and any approvals, so ask for an estimate appropriate to your property."},
 {heading:"Keep support details handy",body:"After installation, make sure you know how to contact the service team and where to find your system documents. Ask for help understanding monitoring and your equipment. Ongoing support is a useful part of the overall proposal, alongside the products and installation itself."}],
 source:{title:"Smart House Solar’s installation guide",url:"https://www.smarthousesolar.com.au/blog/solar-panel-installation-brisbane"}
 }
];
