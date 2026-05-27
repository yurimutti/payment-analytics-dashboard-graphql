import { expect, type Locator, type Page } from "@playwright/test";

export class AnalyticsPage {
  readonly totalVolumeCard: Locator;
  readonly successRateCard: Locator;

  constructor(public readonly page: Page) {
    this.totalVolumeCard = page.getByText("Total Volume");
    this.successRateCard = page.getByText("Success Rate");
  }

  async goto() {
    await this.page.goto("/");
  }

  async waitForLoaded() {
    await expect(this.totalVolumeCard).toBeVisible({ timeout: 15_000 });
  }
}
