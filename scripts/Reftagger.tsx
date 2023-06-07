import Script from "next/script";
import { PrefersColorScheme } from "../functions";

export function Reftagger(props: {
  settings?: {
    bibleVersion?: string;
    customStyle?: {
      body?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
      };
      heading?: {
        backgroundColor?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
      };
    };
    roundedCorners?: boolean;
    tooltipStyle?: PrefersColorScheme;
  };
}) {
  return (
    <Script id="reftagger" strategy="afterInteractive">
      {`var refTagger = ${JSON.stringify(props)};

        (function(d, t) {
          var n=d.querySelector("[nonce]");
          refTagger.settings.nonce = n && (n.nonce||n.getAttribute("nonce"));
          var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
          g.src = "https://api.reftagger.com/v2/RefTagger.js";
          g.nonce = refTagger.settings.nonce;
          s.parentNode.insertBefore(g, s);
        }(document, "script"))`}
    </Script>
  );
}
