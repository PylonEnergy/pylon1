"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
export function openQuote(href = "/get-quote") { window.dispatchEvent(new CustomEvent("pylon:quote", { detail: href })); }
export default function SmartLink({href, onClick, ...props}: ComponentProps<typeof Link>) {
 const quote = typeof href === "string" && href.split("?")[0] === "/get-quote";
 return <Link {...props} data-pylon-quote={quote ? "true" : undefined} href={href} onClick={e=>{ if(quote) { e.preventDefault(); openQuote(String(href)); } onClick?.(e); }} />;
}
