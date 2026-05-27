import { expect, test } from "@playwright/test";
import { PaymentDetailPage } from "../pages/payment-detail.page";
import { PaymentsListPage } from "../pages/payments-list.page";

test("user can navigate from the payments list to a payment's detail page", async ({ page }) => {
  const list = new PaymentsListPage(page);
  await list.goto();
  await list.waitForLoaded();

  const firstRow = list.rows.first();
  const href = await firstRow.getAttribute("href");
  expect(href).toMatch(/^\/payments\/.+/);

  await firstRow.click();
  await expect(page).toHaveURL(href!);

  const detail = new PaymentDetailPage(page);
  await detail.waitForLoaded();
  await expect(detail.paymentIdRow).toContainText(href!.replace("/payments/", ""));
});
