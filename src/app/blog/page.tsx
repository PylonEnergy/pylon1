import type {Metadata} from "next";
import PageHero from "@/components/PageHero";
import BlogCards from "@/components/BlogCards";
import {getBlogs} from "@/lib/blogs";
export const metadata:Metadata={title:"Solar & Battery Guides",description:"Practical solar, battery and installation guides from Pylon Energy, with reading from Smart House Solar."};
export default async function BlogIndexPage(){const posts=await getBlogs();return <><PageHero title="Good advice. Brighter decisions." subtitle="Explore practical guides to solar systems, battery storage and planning your installation." breadcrumbs={[{label:"Blog"}]}/><section className="guides-section"><div className="page-width"><BlogCards posts={posts}/></div></section></>;}
