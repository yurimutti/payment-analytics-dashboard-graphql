import { useState, useEffect } from "react";
import { useParams, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CreditCard,
  User,
  Hash,
  Tag,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { PaymentStatusBadge } from "./payment-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { formatCurrency } from "@/shared/lib/currency";
import { formatUnixDate, timeAgo } from "@/shared/lib/date";
import { MOCK_CHARGES } from "./payments-mock";
import type { Charge, ChargeStatus } from "./payment-types";

// ─── Status icon ──────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: ChargeStatus }) {
  if (status === "SUCCEEDED" || status === "PAID_OUT")
    return <CheckCircle2 className="text-emerald-500" size={18} />;
  if (status === "FAILED" || status === "EXPIRED")
    return <AlertCircle className="text-red-400" size={18} />;
  return <Clock className="text-muted-foreground" size={18} />;
}

// ─── Row helper ───────────────────────────────────────────────────────────────

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

// ─── Skeleton ────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      <Skeleton className="h-4 w-20" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Skeleton className="h-36 rounded-lg" />
          <Skeleton className="h-36 rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-52 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Not found ────────────────────────────────────────────────────────────────

function NotFound({ id }: { id: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <AlertCircle size={40} className="text-muted-foreground" />
      <div className="text-center">
        <p className="text-sm font-medium">Payment not found</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{id}</p>
      </div>
      <Link to="/payments" className="text-sm text-primary hover:underline">
        ← Back to payments
      </Link>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function PaymentDetailPage() {
  const { id } = useParams({ from: "/payments/$id" });

  const [charge, setCharge]   = useState<Charge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound]   = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setNotFound(false);
    // Simulate async fetch — replace with useQuery(CHARGE_QUERY, { variables: { id } })
    const timer = setTimeout(() => {
      const found = MOCK_CHARGES.find((c) => c.id === id) ?? null;
      setCharge(found);
      setNotFound(!found);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <DetailSkeleton />;
  if (notFound)  return <NotFound id={id} />;

  const c = charge!;
  const customerInitials = c.customer?.name
    ? c.customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">

      {/* Back */}
      <Link
        to="/payments"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Payments
      </Link>

      {/* Hero — amount + status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <StatusIcon status={c.status} />
          <div>
            <p className="text-3xl font-bold tabular-nums">
              {formatCurrency(c.amount, c.currency)}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatUnixDate(c.createdAt, "MMM d, yyyy · HH:mm")}
              {" · "}
              {timeAgo(c.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PaymentStatusBadge status={c.status} className="text-sm px-3 py-1" />
          <Badge variant="outline" className="text-xs">
            {c.livemode ? "Live" : "Test"}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Two-column grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* ── Left column ────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Payment method */}
          {c.paymentMethod && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Payment Method</CardTitle>
                </div>
                <CardDescription className="capitalize">
                  {c.paymentMethod.method}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {c.paymentMethod.card ? (
                  <>
                    <Row label="Brand"   value={c.paymentMethod.card.brand.toUpperCase()} />
                    <Row label="Number"  value={`•••• •••• •••• ${c.paymentMethod.card.last4}`} mono />
                    <Row
                      label="Expires"
                      value={`${String(c.paymentMethod.card.expMonth).padStart(2, "0")} / ${c.paymentMethod.card.expYear}`}
                    />
                  </>
                ) : (
                  <Row label="Method" value={c.paymentMethod.method} />
                )}
              </CardContent>
            </Card>
          )}

          {/* Customer */}
          {c.customer && (
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
                    <p className="text-sm font-medium">{c.customer.name}</p>
                    {c.customer.email && (
                      <p className="text-xs text-muted-foreground">{c.customer.email}</p>
                    )}
                  </div>
                </div>
                <Separator className="mb-3" />
                {c.customer.name  && <Row label="Name"  value={c.customer.name} />}
                {c.customer.email && <Row label="Email" value={c.customer.email} />}
                {c.customer.phone && <Row label="Phone" value={c.customer.phone} />}
              </CardContent>
            </Card>
          )}

          {/* Status detail */}
          {(c.statusMessage || c.description || c.descriptor) && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {c.description   && <Row label="Description"    value={c.description} />}
                {c.descriptor    && <Row label="Descriptor"     value={c.descriptor} />}
                {c.statusMessage && <Row label="Status message" value={c.statusMessage} />}
              </CardContent>
            </Card>
          )}

        </div>

        {/* ── Right column ───────────────────────────────────── */}
        <div className="space-y-4">

          {/* Reference IDs */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Hash size={15} className="text-muted-foreground" />
                <CardTitle className="text-sm font-semibold">Reference IDs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-3" />
              <Row label="Payment ID"   value={c.id}          mono copyable />
              {c.orderId    && <Row label="Order ID"    value={c.orderId}    mono copyable />}
              {c.sequenceId && <Row label="Sequence ID" value={c.sequenceId} mono copyable />}
              {c.statusCode && <Row label="Status code" value={c.statusCode} mono />}
              <Row
                label="Created"
                value={formatUnixDate(c.createdAt, "MMM d, yyyy HH:mm:ss")}
              />
              <Row
                label="Updated"
                value={formatUnixDate(c.updatedAt, "MMM d, yyyy HH:mm:ss")}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          {c.metadata && c.metadata.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Metadata</CardTitle>
                </div>
                <CardDescription>{c.metadata.length} key{c.metadata.length !== 1 ? "s" : ""}</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {c.metadata.map(({ key, value }) => (
                  <Row key={key} label={key} value={value} mono />
                ))}
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
