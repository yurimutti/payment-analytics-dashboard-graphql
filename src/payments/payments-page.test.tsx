import type { MockedResponse } from "@apollo/client/testing";
import { describe, expect, it } from "vitest";
import { renderPage, screen } from "@/test";
import { PaymentsPage } from "./payments-page";
import { CHARGES_QUERY } from "./use-payments-query";

const variables = { search: undefined, filter: undefined, size: 10, from: 0 };

function chargesMock(items: Record<string, unknown>[], total = items.length): MockedResponse {
  return {
    request: { query: CHARGES_QUERY, variables },
    result: { data: { charges: { total, items } } },
  };
}

describe("<PaymentsPage>", () => {
  it("shows the page shell with no decisive content before the query resolves", async () => {
    renderPage(<PaymentsPage />, {
      mocks: [{ ...chargesMock([]), delay: Number.POSITIVE_INFINITY }],
    });

    expect(await screen.findByText("All Transactions")).toBeInTheDocument();

    expect(screen.queryByText("Could not load payments")).not.toBeInTheDocument();
    expect(screen.queryByText("No payments found")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });

  it("renders the error state with a retry button when the request fails", async () => {
    const mocks: MockedResponse[] = [
      { request: { query: CHARGES_QUERY, variables }, error: new Error("offline") },
    ];

    renderPage(<PaymentsPage />, { mocks });

    expect(await screen.findByText("Could not load payments")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("renders the empty state when the API returns zero charges", async () => {
    renderPage(<PaymentsPage />, { mocks: [chargesMock([])] });

    expect(await screen.findByText("No payments found")).toBeInTheDocument();
  });

  it("renders charge rows on success", async () => {
    const items = [
      {
        id: "ch_alpha",
        amount: 1500,
        currency: "EUR",
        status: "SUCCEEDED",
        createdAt: 1700000000,
        updatedAt: 1700000000,
        orderId: "order_42",
        livemode: false,
        customer: { name: "Alice Doe", email: "alice@example.com", phone: null },
        paymentMethod: null,
      },
    ];

    renderPage(<PaymentsPage />, { mocks: [chargesMock(items)] });

    expect(await screen.findByText("Alice Doe")).toBeInTheDocument();
    expect(screen.getByText("1 payment")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
