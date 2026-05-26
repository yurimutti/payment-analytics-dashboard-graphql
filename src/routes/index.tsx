import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/analytics/analytics-page";

export const Route = createFileRoute("/")({ component: AnalyticsPage });
