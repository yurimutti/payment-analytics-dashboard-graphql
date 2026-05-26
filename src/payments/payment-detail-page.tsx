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

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-6 pt-6">
      <Skeleton className="h-4 w-28" />

      {/* Hero */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-4 w-32" /></CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex justify-between py-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex justify-between py-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
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
  if (notFound || !charge) return <NotFound id={id} />;

  const customerInitials = charge.customer?.name
    ? charge.customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
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
          <StatusIcon status={charge.status} />
          <div>
            <p className="text-3xl font-bold tabular-nums">
              {formatCurrency(charge.amount, charge.currency)}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatUnixDate(charge.createdAt, "MMM d, yyyy · HH:mm")}
              {" · "}
              {timeAgo(charge.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PaymentStatusBadge status={charge.status} className="text-sm px-3 py-1" />
          <Badge variant="outline" className="text-xs">
            {charge.livemode ? "Live" : "Test"}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Two-column grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* ── Left column ────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Payment method */}
          {charge.paymentMethod && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Payment Method</CardTitle>
                </div>
                <CardDescription className="capitalize">
                  {charge.paymentMethod.method}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {charge.paymentMethod.card ? (
                  <>
                    <Row label="Brand"   value={charge.paymentMethod.card.brand.toUpperCase()} />
                    <Row label="Number"  value={`•••• •••• •••• ${charge.paymentMethod.card.last4}`} mono />
                    <Row
                      label="Expires"
                      value={`${String(charge.paymentMethod.card.expMonth).padStart(2, "0")} / ${charge.paymentMethod.card.expYear}`}
                    />
                  </>
                ) : (
                  <Row label="Method" value={charge.paymentMethod.method} />
                )}
              </CardContent>
            </Card>
          )}

          {/* Customer */}
          {charge.customer && (
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
                    <p className="text-sm font-medium">{charge.customer.name}</p>
                    {charge.customer.email && (
                      <p className="text-xs text-muted-foreground">{charge.customer.email}</p>
                    )}
                  </div>
                </div>
                <Separator className="mb-3" />
                {charge.customer.name  && <Row label="Name"  value={charge.customer.name} />}
                {charge.customer.email && <Row label="Email" value={charge.customer.email} />}
                {charge.customer.phone && <Row label="Phone" value={charge.customer.phone} />}
              </CardContent>
            </Card>
          )}

          {/* Status detail */}
          {(charge.statusMessage || charge.description || charge.descriptor) && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {charge.description  && <Row label="Description"  value={charge.description} />}
                {charge.descriptor   && <Row label="Descriptor"   value={charge.descriptor} />}
                {charge.statusMessage && (
                  <Row label="Status message" value={charge.statusMessage} />
                )}
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
              <Row label="Payment ID"   value={charge.id}          mono copyable />
              {charge.orderId    && <Row label="Order ID"    value={charge.orderId}    mono copyable />}
              {charge.sequenceId && <Row label="Sequence ID" value={charge.sequenceId} mono copyable />}
              {charge.statusCode && <Row label="Status code" value={charge.statusCode} mono />}
              <Row
                label="Created"
                value={formatUnixDate(charge.createdAt, "MMM d, yyyy HH:mm:ss")}
              />
              <Row
                label="Updated"
                value={formatUnixDate(charge.updatedAt, "MMM d, yyyy HH:mm:ss")}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          {charge.metadata && charge.metadata.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Metadata</CardTitle>
                </div>
                <CardDescription>{charge.metadata.length} key{charge.metadata.length !== 1 ? "s" : ""}</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-3" />
                {charge.metadata.map(({ key, value }) => (
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
