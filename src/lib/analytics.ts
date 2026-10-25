
import posthog from "posthog-js";

export type AnalyticsEvent =
  | "test_completed"
  | "test_link_copied"
  | "result_card_downloaded";

export function trackEvent(event: AnalyticsEvent) {
  if (!posthog.__loaded) return;

  posthog.capture(event, {
    $ip: null,
    $geoip_disable: true,
  });
}
