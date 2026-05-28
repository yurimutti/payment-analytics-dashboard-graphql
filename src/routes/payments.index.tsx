import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PaymentsPage } from "@/payments";

const STATUSES = [
  "ALL",
  "SUCCEEDED",
  "PENDING",
  "PENDING_PROCESSING",
  "FAILED",
  "CANCELED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
  "AUTHORIZED",
  "EXPIRED",
  "PAID_OUT",
] as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const SearchSchema = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  first: z.coerce.number().int().positive().optional(),
  last: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  status: z.enum(STATUSES).optional(),
  createdFrom: z.string().regex(ISO_DATE).optional(),
  createdTo: z.string().regex(ISO_DATE).optional(),
});

export type PaymentsSearch = z.infer<typeof SearchSchema>;

export const Route = createFileRoute("/payments/")({
  component: PaymentsPage,
  validateSearch: SearchSchema.parse,
});
