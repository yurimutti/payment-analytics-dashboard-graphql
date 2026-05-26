import { createFileRoute } from "@tanstack/react-router";
import { PaymentDetailPage } from "@/modules/payments/payment-detail-page";

export const Route = createFileRoute("/payments/$id")({ component: PaymentDetailPage });
