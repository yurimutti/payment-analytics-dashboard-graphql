import type { MockedResponse } from "@apollo/client/testing";
import { describe, expect, it } from "vitest";
import { renderPage, screen } from "@/test";
import { AnalyticsPage } from "./analytics-page";
import { ANALYTICS_KPI_QUERY } from "./use-analytics-kpi-query";
import { RECENT_CHARGES_QUERY } from "./use-recent-charges-query";

const ZERO_TOTAL = {
  succeededAmount: 0,
  succeededCount: 0,
  capturedAmount: 0,
  capturedCount: 0,
  directAmount: 0,
  directCount: 0,
  canceledAmount: 0,
  canceledCount: 0,
  refundedAmount: 0,
  refundedCount: 0,
  failedAmount: 0,
  failedCount: 0,
};

function analyticsMock(): MockedResponse {
  return {
    request: { query: ANALYTICS_KPI_QUERY },
    variableMatcher: () => true,
    result: {
      data: {
        chargesDateRangeKPI: {
          currency: "EUR",
          total: ZERO_TOTAL,
          data: [],
        },
      },
    },
  };
}

function analyticsErrorMock(): MockedResponse {
  return {
    request: { query: ANALYTICS_KPI_QUERY },
    variableMatcher: () => true,
    error: new Error("offline"),
  };
}

function recentChargesMock(): MockedResponse {
  return {
    request: { query: RECENT_CHARGES_QUERY, variables: { size: 5 } },
    result: { data: { charges: { total: 0, items: [] } } },
  };
}

describe("<AnalyticsPage>", () => {
  it("renders neither the dashboard nor the error state while the queries are in flight", async () => {
    renderPage(<AnalyticsPage />, {
      mocks: [
        { ...analyticsMock(), delay: Number.POSITIVE_INFINITY },
        { ...recentChargesMock(), delay: Number.POSITIVE_INFINITY },
      ],
    });

    await screen.findByText("Latest customer transactions");
    expect(screen.queryByText("Could not load analytics")).not.toBeInTheDocument();
    expect(screen.queryByText("Total Volume")).not.toBeInTheDocument();
    expect(screen.queryByText("Success Rate")).not.toBeInTheDocument();
  });

  it("renders the full-page error state when the KPI query fails", async () => {
    renderPage(<AnalyticsPage />, { mocks: [analyticsErrorMock(), recentChargesMock()] });

    expect(await screen.findByText("Could not load analytics")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("renders the dashboard with zero-state KPIs on a clean success", async () => {
    renderPage(<AnalyticsPage />, { mocks: [analyticsMock(), recentChargesMock()] });

    expect(await screen.findByText("Total Volume")).toBeInTheDocument();
    expect(screen.getByText("Success Rate")).toBeInTheDocument();
    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();
  });
});
