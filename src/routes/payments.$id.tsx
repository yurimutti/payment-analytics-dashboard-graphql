import { createFileRoute } from "@tanstack/react-router";
import { PaymentDetailPage } from "@/payments/payment-detail-page";

export const Route = createFileRoute("/payments/$id")({ component: PaymentDetailPage });
