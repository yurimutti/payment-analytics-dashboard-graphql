import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Hash,
  Tag,
  User,
} from "lucide-react";
import { INITIALS_LENGTH, ROUTES } from "@/shared/config";
import { formatCurrency } from "@/shared/lib/currency";
import { formatUnixDate, timeAgo } from "@/shared/lib/date";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ErrorState } from "@/shared/ui/error-state";
import { Separator } from "@/shared/ui/separator";
import { PaymentDetailSkeleton } from "./payment-detail.skeleton";
import { PaymentStatusBadge } from "./payment-status-badge";
import { type ChargeDetail, usePaymentDetailQuery } from "./use-payment-detail-query";

type ChargeStatus = ChargeDetail["status"];

function StatusIcon({ status }: { status: ChargeStatus }) {
  if (status === "SUCCEEDED" || status === "PAID_OUT")
    return <CheckCircle2 className="text-emerald-500" size={18} />;
  if (status === "FAILED" || status === "EXPIRED")
    return <AlertCircle className="text-red-400" size={18} />;
  return <Clock className="text-muted-foreground" size={18} />;
}

function Row({
  label,
  value,
  mono = false,
  copyable = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-2">
      <span className="text-sm text-muted-foreground shrink-0 w-32">{label}</span>
      <span
        className={`text-sm text-right break-all ${mono ? "font-mono text-xs" : ""} ${copyable ? "cursor-pointer select-all" : ""}`}
        title={copyable ? "Click to select" : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function NotFound({ id }: { id: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <AlertCircle size={40} className="text-muted-foreground" />
      <div className="text-center">
        <p className="text-sm font-medium">Payment not found</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{id}</p>
      </div>
      <Link to={ROUTES.PAYMENTS.LIST} className="text-sm text-primary hover:underline">
        ← Back to payments
      </Link>
    </div>
  );
}

export function PaymentDetailPage() {
  const { id } = useParams({ from: "/payments/$id" });

  const { payment, loading, error, errorMessage, refetch, notFound } = usePaymentDetailQuery(id);

  if (loading) return <PaymentDetailSkeleton />;

  if (error && !payment) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
        <ErrorState
          title="Could not load payment details"
          description={errorMessage}
          onRetry={() => refetch()}
        />
        <Link
          to={ROUTES.PAYMENTS.LIST}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to payments
        </Link>
      </div>
    );
  }

  if (notFound || !payment) return <NotFound id={id} />;

  const {
    id: paymentId,
    status,
    amount,
    currency,
    createdAt,
    updatedAt,
    livemode,
    statusCode,
    statusMessage,
    descriptor,
    description,
    orderId,
    sequenceId,
    customer,
    paymentMethod,
    metadata,
  } = payment;

  const customerInitials = customer?.name
    ? customer.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, INITIALS_LENGTH)
        .toUpperCase()
    : "?";

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      <Link
        to={ROUTES.PAYMENTS.LIST}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Payments
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <StatusIcon status={status} />
          <div>
            <p className="text-3xl font-bold tabular-nums">
              {formatCurrency(amount ?? 0, currency)}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatUnixDate(createdAt ?? 0, "MMM d, yyyy · HH:mm")}
              {" · "}
              {timeAgo(createdAt ?? 0)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PaymentStatusBadge status={status} className="text-sm px-3 py-1" />
          <Badge variant="outline" className="text-xs">
            {livemode ? "Live" : "Test"}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,360px)]">
        <div className="space-y-4">
          {paymentMethod && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Payment Method</CardTitle>
                </div>
                <CardDescription className="capitalize">{paymentMethod.method}</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {paymentMethod.card ? (
                  <>
                    {paymentMethod.card.brand && (
                      <Row label="Brand" value={paymentMethod.card.brand.toUpperCase()} />
                    )}
                    {paymentMethod.card.last4 && (
                      <Row
                        label="Number"
                        value={`•••• •••• •••• ${paymentMethod.card.last4}`}
                        mono
                      />
                    )}
                    {paymentMethod.card.expiration && (
                      <Row
                        label="Expires"
                        value={formatUnixDate(paymentMethod.card.expiration, "MM / yyyy")}
                      />
                    )}
                  </>
                ) : (
                  <Row label="Method" value={paymentMethod.method ?? "—"} />
                )}
              </CardContent>
            </Card>
          )}

          {customer && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <User size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Customer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {customerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{customer.name}</p>
                    {customer.email && (
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    )}
                  </div>
                </div>
                <Separator className="mb-3" />
                {customer.name && <Row label="Name" value={customer.name} />}
                {customer.email && <Row label="Email" value={customer.email} />}
                {customer.phone && <Row label="Phone" value={customer.phone} />}
              </CardContent>
            </Card>
          )}

          {(statusMessage || description || descriptor) && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {description && <Row label="Description" value={description} />}
                {descriptor && <Row label="Descriptor" value={descriptor} />}
                {statusMessage && <Row label="Status message" value={statusMessage} />}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Hash size={15} className="text-muted-foreground" />
                <CardTitle className="text-sm font-semibold">Reference IDs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-3" />
              <Row label="Payment ID" value={paymentId} mono copyable />
              {orderId && <Row label="Order ID" value={orderId} mono copyable />}
              {sequenceId && <Row label="Sequence ID" value={sequenceId} mono copyable />}
              {statusCode && <Row label="Status code" value={statusCode} mono />}
              <Row label="Created" value={formatUnixDate(createdAt ?? 0, "MMM d, yyyy HH:mm:ss")} />
              <Row label="Updated" value={formatUnixDate(updatedAt ?? 0, "MMM d, yyyy HH:mm:ss")} />
            </CardContent>
          </Card>

          {metadata && metadata.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Metadata</CardTitle>
                </div>
                <CardDescription>
                  {metadata.length} key{metadata.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {metadata.map(({ key, value }) => (
                  <Row key={key} label={key} value={value ?? ""} mono />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
