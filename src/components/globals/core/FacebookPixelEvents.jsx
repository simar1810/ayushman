"use client";
import { useEffect } from "react";

const FacebookPixelEvents = () => {
  useEffect(() => {
    // Inject Facebook Pixel script dynamically
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    // Initialize Pixel
    if (window.fbq) {
      window.fbq("init", "594064510183284");
      window.fbq("track", "PageView");
    }
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=594064510183284&ev=PageView&noscript=1"
        alt="Facebook Pixel"
      />
    </noscript>
  );
};

export default FacebookPixelEvents;