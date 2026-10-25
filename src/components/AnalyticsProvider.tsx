
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function AnalyticsProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key || !host) return;

    posthog.init(key, {
      api_host: host,

      // We'll send only events we explicitly define.
      autocapture: false,

      // No automatic page view events.
      capture_pageview: false,
      capture_pageleave: false,

      // Do not persist a tracking identity.
      persistence: "memory",

      // Avoid storing session information.
      disable_session_recording: true,

      // Avoid automatically collecting user profile properties.
      person_profiles: "never",
    });
  }, []);

  return null;
}
