import { expect, type Locator, type Page } from "@playwright/test";

export class PaymentDetailPage {
  readonly paymentIdRow: Locator;
  readonly backLink: Locator;

  constructor(public readonly page: Page) {
    this.paymentIdRow = page.getByText("Payment ID").locator("..");
    this.backLink = page.getByRole("link", { name: /payments/i }).first();
  }

  async waitForLoaded() {
    await expect(this.page.getByText("Payment Method")).toBeVisible({ timeout: 15_000 });
  }
}
