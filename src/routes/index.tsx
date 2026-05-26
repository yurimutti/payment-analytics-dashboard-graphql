import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/modules/analytics/analytics-page";

export const Route = createFileRoute("/")({ component: AnalyticsPage });
