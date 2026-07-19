"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureAttribution, track } from "@/lib/tracking";

/**
 * Capture l'attribution (UTM/clids) au chargement, charge Google Tag Manager
 * uniquement si NEXT_PUBLIC_GTM_ID est défini, et pousse l'événement view_offer.
 */
export function Tracking({
  pageEvent = "view_offer",
}: {
  pageEvent?: string;
}) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    captureAttribution();
    track(pageEvent, { offer: "climatisation_reversible_de_dietrich" });
  }, [pageEvent]);

  if (!gtm) return null;
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
    </>
  );
}
