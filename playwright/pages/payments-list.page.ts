import { expect, type Locator, type Page } from "@playwright/test";

export class PaymentsListPage {
  readonly heading: Locator;
  readonly rows: Locator;
  readonly searchInput: Locator;

  constructor(public readonly page: Page) {
    this.heading = page.getByText("All Transactions", { exact: true });
    this.rows = page.locator('a[href^="/payments/"]').filter({ hasNot: page.getByText("Payments") });
    this.searchInput = page.getByPlaceholder(/search id, order, customer/i);
  }

  async goto() {
    await this.page.goto("/payments");
  }

  async waitForLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.rows.first()).toBeVisible({ timeout: 30_000 });
  }
}
