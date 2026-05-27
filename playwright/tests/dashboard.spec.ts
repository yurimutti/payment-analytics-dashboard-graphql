import { expect, test } from "@playwright/test";
import { AnalyticsPage } from "../pages/analytics.page";

test("dashboard shows KPI cards with no error UI", async ({ page }) => {
  const dashboard = new AnalyticsPage(page);
  await dashboard.goto();
  await dashboard.waitForLoaded();

  await expect(dashboard.totalVolumeCard).toBeVisible();
  await expect(dashboard.successRateCard).toBeVisible();
  await expect(page.getByText("Could not load analytics")).not.toBeVisible();
});
