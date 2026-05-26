import { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MOCK_CHARGES } from "./payments-mock";
import { PaymentStatusBadge } from "./payment-status-badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/currency";
import { formatUnixDate } from "@/shared/lib/date";
import type { Charge } from "./payment-types";

// ─── Loading skeleton ──────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <Skeleton className="h-3 w-20" />
      <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Row helper ───────────────────────────────────────────────────────────────

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-ink-subtle shrink-0">{label}</span>
      <span className={`text-xs text-ink text-right break-all ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">{title}</h2>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PaymentDetailPage() {
  // No circular import — useParams with the route path directly
  const { id } = useParams({ from: "/payments/$id" });

  const [charge, setCharge] = useState<Charge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);
    // Simulate async fetch — replace with useQuery(CHARGE_QUERY, { variables: { id } }) when integrating
    const timer = setTimeout(() => {
      const found = MOCK_CHARGES.find((c) => c.id === id) ?? null;
      setCharge(found);
      setNotFound(!found);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <DetailSkeleton />;

  if (notFound || !charge) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
        <p className="text-sm font-medium text-ink">Payment not found</p>
        <p className="text-xs font-mono text-ink-subtle">{id}</p>
        <Link to="/payments" className="text-xs text-primary hover:underline">
          ← Back to payments
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-5">
      {/* Back */}
      <Link
        to="/payments"
        className="inline-flex items-center gap-1.5 text-xs text-ink-subtle hover:text-ink transition-colors"
      >
        <ArrowLeft size={13} />
        Payments
      </Link>

      {/* Summary */}
      <Section title="Summary">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tabular-nums text-ink">
              {formatCurrency(charge.amount, charge.currency)}
            </p>
            <p className="mt-0.5 text-xs text-ink-tertiary">{formatUnixDate(charge.createdAt, "MMM d, yyyy")}</p>
          </div>
          <PaymentStatusBadge status={charge.status} />
        </div>

        {(charge.description ?? charge.descriptor) && (
          <p className="text-sm text-ink-muted">{charge.description ?? charge.descriptor}</p>
        )}

        {charge.statusMessage && (
          <p className="text-xs text-red-400">{charge.statusMessage}</p>
        )}

        <Row label="Mode" value={charge.livemode ? "Live" : "Test"} />
      </Section>

      {/* Reference IDs */}
      <Section title="Reference IDs">
        <Row label="Payment ID"  value={charge.id}           mono />
        {charge.orderId     && <Row label="Order ID"     value={charge.orderId}     mono />}
        {charge.sequenceId  && <Row label="Sequence ID"  value={charge.sequenceId}  mono />}
        {charge.statusCode  && <Row label="Status code"  value={charge.statusCode}  mono />}
      </Section>

      {/* Customer */}
      {charge.customer && (
        <Section title="Customer">
          {charge.customer.name  && <Row label="Name"  value={charge.customer.name} />}
          {charge.customer.email && <Row label="Email" value={charge.customer.email} />}
          {charge.customer.phone && <Row label="Phone" value={charge.customer.phone} />}
        </Section>
      )}

      {/* Payment Method */}
      {charge.paymentMethod && (
        <Section title="Payment Method">
          <Row label="Method" value={charge.paymentMethod.method} />
          {charge.paymentMethod.card && (
            <>
              <Row label="Brand"   value={charge.paymentMethod.card.brand} />
              <Row label="Number"  value={`•••• •••• •••• ${charge.paymentMethod.card.last4}`} mono />
              <Row
                label="Expires"
                value={`${String(charge.paymentMethod.card.expMonth).padStart(2, "0")}/${charge.paymentMethod.card.expYear}`}
              />
            </>
          )}
        </Section>
      )}

      {/* Metadata */}
      {charge.metadata && charge.metadata.length > 0 && (
        <Section title="Metadata">
          {charge.metadata.map(({ key, value }) => (
            <Row key={key} label={key} value={value} mono />
          ))}
        </Section>
      )}
    </div>
  );
}
