import { createFileRoute } from "@tanstack/react-router";
import { PaymentsPage } from "@/payments";

export const Route = createFileRoute("/payments/")({ component: PaymentsPage });
