import { createFileRoute } from "@tanstack/react-router";
import { PaymentsPage } from "@/payments/payments-page";

export const Route = createFileRoute("/payments")({ component: PaymentsPage });
