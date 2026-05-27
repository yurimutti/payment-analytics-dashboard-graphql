import { describe, expect, it } from "vitest";
import type { ChargeStatus } from "@/shared/lib/graphql/gql/graphql";
import { render, screen } from "@/test";
import { PaymentStatusBadge } from "./payment-status-badge";

describe("<PaymentStatusBadge>", () => {
  it("renders the friendly label for a known status", () => {
    render(<PaymentStatusBadge status="SUCCEEDED" />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("uses different colour classes for success vs failure", () => {
    const { rerender } = render(<PaymentStatusBadge status="SUCCEEDED" />);
    expect(screen.getByText("Completed").className).toMatch(/emerald/);

    rerender(<PaymentStatusBadge status="FAILED" />);
    expect(screen.getByText("Failed").className).toMatch(/red/);
  });

  it("falls back to the raw status text for an unmapped value", () => {
    render(<PaymentStatusBadge status={"UNKNOWN_FUTURE_VALUE" as ChargeStatus} />);
    expect(screen.getByText("UNKNOWN_FUTURE_VALUE")).toBeInTheDocument();
  });
});
