import { createFileRoute } from "@tanstack/react-router";
import { PaymentDetailPage } from "@/payments";

export const Route = createFileRoute("/payments/$id")({ component: PaymentDetailPage });
