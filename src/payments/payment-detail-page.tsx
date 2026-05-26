import { useParams } from "@tanstack/react-router";
import { Route } from "@/routes/payments.$id";
import { MOCK_CHARGES } from "./payments-mock";
import { PaymentStatusBadge } from "./payment-status-badge";
import { formatAmount, formatDate } from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PaymentDetailPage() {
  const { id } = Route.useParams();
  const charge = MOCK_CHARGES.find((c) => c.id === id);

  if (!charge) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
        <p className="text-sm font-medium text-ink">Payment not found</p>
        <p className="text-xs text-ink-subtle">ID: {id}</p>
        <Link to="/payments" className="text-xs text-primary hover:underline">
          Back to payments
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      {/* Back */}
      <Link
        to="/payments"
        className="inline-flex items-center gap-1.5 text-xs text-ink-subtle hover:text-ink transition-colors"
      >
        <ArrowLeft size={13} />
        Payments
      </Link>

      {/* Summary */}
      <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-ink">
              {formatAmount(charge.amount, charge.currency)}
            </p>
            <p className="mt-1 text-xs text-ink-tertiary">{formatDate(charge.createdAt)}</p>
          </div>
          <PaymentStatusBadge status={charge.status} />
        </div>

        {(charge.description || charge.descriptor) && (
          <p className="text-sm text-ink-muted">{charge.description ?? charge.descriptor}</p>
        )}

        {charge.statusMessage && (
          <p className="text-xs text-red-400">{charge.statusMessage}</p>
        )}
      </div>

      {/* IDs */}
      <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
          Reference IDs
        </h2>
        <Row label="Payment ID" value={charge.id} mono />
        {charge.orderId && <Row label="Order ID" value={charge.orderId} mono />}
        {charge.sequenceId && <Row label="Sequence ID" value={charge.sequenceId} mono />}
        {charge.statusCode && <Row label="Status code" value={charge.statusCode} mono />}
      </div>

      {/* Customer */}
      {charge.customer && (
        <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            Customer
          </h2>
          {charge.customer.name && <Row label="Name" value={charge.customer.name} />}
          {charge.customer.email && <Row label="Email" value={charge.customer.email} />}
          {charge.customer.phone && <Row label="Phone" value={charge.customer.phone} />}
        </div>
      )}

      {/* Payment Method */}
      {charge.paymentMethod && (
        <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            Payment Method
          </h2>
          <Row label="Method" value={charge.paymentMethod.method} />
          {charge.paymentMethod.card && (
            <>
              <Row label="Brand" value={charge.paymentMethod.card.brand} />
              <Row label="Last 4" value={`•••• ${charge.paymentMethod.card.last4}`} mono />
              <Row
                label="Expires"
                value={`${charge.paymentMethod.card.expMonth}/${charge.paymentMethod.card.expYear}`}
              />
            </>
          )}
        </div>
      )}

      {/* Metadata */}
      {charge.metadata && charge.metadata.length > 0 && (
        <div className="rounded-lg border border-hairline bg-surface-1 p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            Metadata
          </h2>
          {charge.metadata.map(({ key, value }) => (
            <Row key={key} label={key} value={value} mono />
          ))}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-ink-subtle shrink-0">{label}</span>
      <span className={`text-xs text-ink text-right break-all ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
