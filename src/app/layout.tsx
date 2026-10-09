import BrandLogo from "@/components/BrandLogo";
import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import FloatingSidebarCTA from "@/components/FloatingSidebarCTA";
import LeadPopup from "@/components/LeadPopup";
import SchemaMarkup from "@/components/SchemaMarkup";
import MobileCallBar from "@/components/MobileCallBar";

import PageTransition from "@/components/PageTransition";
import Link from "@/components/SmartLink";
import Script from "next/script";
import { Phone, Mail, Sparkles } from "lucide-react";

// Set to true to show the "Launching Tomorrow" landing page.
// Set to false to go live with the main website.
const IS_UNDER_CONSTRUCTION = false;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const logoFont = Outfit({
  variable: "--font-logo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pylon Energy — Solar Panels & Battery Storage | NSW Australia",
    template: "%s | Pylon Energy",
  },
  description:
    "Pylon Energy Pty Ltd — Premium solar panels, battery storage & EV charger installation across NSW and Australia. 25-Year Warranties. Save up to $3,500 with 2026 government rebates.",
  keywords: [
    "solar panels NSW",
    "solar installation Australia",
    "solar battery storage",
    "residential solar",
    "commercial solar",
    "EV charger installation",
    "Pylon Energy",
    "solar panels Sydney",
    "solar rebates 2026",
  ],
  authors: [{ name: "Pylon Energy Pty Ltd" }],
  creator: "Pylon Energy Pty Ltd",
  metadataBase: new URL("https://pylonenergy.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://pylonenergy.com.au",
    siteName: "Pylon Energy",
    title: "Pylon Energy — Solar Panels & Battery Storage | NSW Australia",
    description:
      "Premium solar panels, battery storage & EV charger installation. Save up to $3,500 with 2026 rebates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pylon Energy — Solar Panels & Battery Storage",
    description:
      "Premium solar panels & battery storage across NSW. 25-Year Warranties.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/settings`, { next: { revalidate: 5 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.settings;
  } catch {
    return {
      primaryNavy: "#002B5C",
      accentOrange: "#29ABE2",
      bannerVisible: false,
      bannerMessage: "",
      bannerLink: "",
      gtmId: "",
      pixelId: "",
      ga4Id: "",
      siteVerification: "",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en-AU"
      className={`${manrope.variable} ${logoFont.variable}`}
    >
      <head>
        <SchemaMarkup />
        {/* Google Search Console site verification */}
        {settings.siteVerification && (
          <meta name="google-site-verification" content={settings.siteVerification} />
        )}

        {/* Dynamic style block to inject admin custom brand colors */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-pe-navy-custom: ${settings.primaryNavy || "#002B5C"};
              --color-pe-navy-dark-custom: ${settings.primaryNavy ? settings.primaryNavy + "d9" : "#001A3A"};
              --color-pe-navy-mid-custom: ${settings.primaryNavy ? settings.primaryNavy + "b3" : "#0D3572"};
              --color-pe-orange-custom: ${settings.accentOrange === "#29ABE2" ? "#FF7029" : (settings.accentOrange || "#FF7029")};
              --color-pe-orange-dark-custom: ${settings.accentOrange === "#29ABE2" ? "#E5601E" : (settings.accentOrange ? settings.accentOrange + "d9" : "#E5601E")};
              --color-pe-orange-light-custom: ${settings.accentOrange === "#29ABE2" ? "#FFF0E5" : (settings.accentOrange ? settings.accentOrange + "1a" : "#FFF0E5")};
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-pe-gray-900" suppressHydrationWarning>
        {/* Google Tag Manager (Script Injection) */}
        {settings.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.gtmId}');
              `,
            }}
          />
        )}

        {/* Google Analytics 4 (Script Injection) */}
        {settings.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.ga4Id}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel (Script Injection) */}
        {settings.pixelId && (
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Dynamic Announcement Banner */}
        {settings.bannerVisible && !IS_UNDER_CONSTRUCTION && (
          <div className="bg-pe-orange text-white text-center py-2 px-4 text-xs font-bold transition-all relative z-50 animate-fade-in-up">
            <Link href={settings.bannerLink || "#"} className="hover:underline flex items-center justify-center gap-1.5">
              {settings.bannerMessage}
            </Link>
          </div>
        )}

        {IS_UNDER_CONSTRUCTION ? (
          <>
            {/* Background design */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pe-navy-mid via-pe-navy to-pe-navy-dark opacity-90 z-0" />
            <div 
              className="absolute inset-0 z-0" 
              style={{
                backgroundImage: "radial-gradient(rgba(41, 171, 226, 0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }}
            />

            {/* Content card */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
              <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl text-center flex flex-col items-center gap-8">
                {/* Logo SVG */}
                <div className="w-[280px] sm:w-[320px] bg-white rounded-2xl py-4 px-6 shadow-lg flex items-center justify-center">
                  <BrandLogo className="launch-brand-logo" onDark />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 self-center bg-pe-orange/15 border border-pe-orange/30 text-pe-orange text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full">
                    <Sparkles size={12} className="text-pe-orange animate-pulse" /> Launching Tomorrow
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-2 leading-tight">
                    Official Launch<br />
                    <span className="text-[#29ABE2]">July 16, 2026</span>
                  </h1>
                  <p className="text-pe-gray-300 text-sm md:text-base mt-2 leading-relaxed">
                    We are currently preparing the final setup for our brand new website. We will be officially live tomorrow morning!
                  </p>
                </div>

                {/* Contact options */}
                <div className="w-full pt-6 border-t border-white/10 flex flex-col gap-4">
                  <p className="text-xs font-semibold text-pe-gray-400 uppercase tracking-widest">
                    Need to reach us today?
                  </p>
                  <a 
                    href="tel:1300001598" 
                    className="w-full bg-[#FF7029] hover:bg-[#E5601E] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <Phone size={16} /> Call 1300 001 598
                  </a>
                  <a 
                    href="mailto:info@pylonenergy.com.au" 
                    className="text-sm font-semibold hover:text-[#29ABE2] text-white/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={15} /> info@pylonenergy.com.au
                  </a>
                </div>
              </div>
            </div>

            <footer className="py-8 text-center text-xs text-pe-gray-400 border-t border-white/5 relative z-10 w-full">
              © 2026 Pylon Energy Pty Ltd. All rights reserved. CEC Approved Retailer.
            </footer>
          </>
        ) : (
          <>
            <Header />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
            <FloatingSidebarCTA />
            <LeadPopup />


            <MobileCallBar />
          </>
        )}
      </body>
    </html>
  );
}
