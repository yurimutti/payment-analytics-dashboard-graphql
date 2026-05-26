import type { Charge, ChargeStatus } from "./payment-types";

const now = Math.floor(Date.now() / 1000);
const DAY = 86_400;

const statuses: ChargeStatus[] = [
  "SUCCEEDED", "SUCCEEDED", "SUCCEEDED", "SUCCEEDED",
  "FAILED", "FAILED",
  "REFUNDED",
  "PENDING",
  "CANCELED",
  "PARTIALLY_REFUNDED",
  "AUTHORIZED",
];

const methods = ["card", "card", "card", "bizum", "sepa", "paypal"];
const brands   = ["visa", "mastercard", "amex"];
const last4s   = ["4242", "5555", "0005", "1111", "3333", "9999", "2424", "8008"];
const names    = [
  "Ana García", "Carlos López", "Maria Costa", "Pedro Martínez",
  "Laura Fernández", "Javier Ruiz", "Sofía Hernández", "Diego Torres",
  "Elena Moreno", "Rafael Jiménez", "Isabela Sousa", "Mateo Alves",
];
const amounts  = [
  499, 999, 1299, 1999, 2499, 4900, 9900, 14900, 24900, 49900, 99900, 199900,
];

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

export const MOCK_CHARGES: Charge[] = Array.from({ length: 25 }, (_, i) => {
  const status  = pick(statuses, i * 3 + 7);
  const method  = pick(methods, i * 2 + 3);
  const name    = pick(names, i * 5 + 1);
  const amount  = pick(amounts, i * 4 + 2);
  const last4   = pick(last4s, i * 6 + 4);
  const brand   = pick(brands, i * 3 + 5);
  const daysAgo = Math.floor(i * 1.5);

  const charge: Charge = {
    id: `ch_${(i + 1).toString().padStart(3, "0")}${Math.random().toString(36).slice(2, 6)}`,
    amount,
    currency: "EUR",
    status,
    createdAt: now - daysAgo * DAY - Math.floor(Math.random() * DAY),
    updatedAt: now - daysAgo * DAY,
    livemode: false,
    orderId:  `order_${(i + 1).toString().padStart(4, "0")}`,
  };

  if (name) {
    charge.customer = {
      name,
      email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      phone: `+34 6${(Math.floor(Math.random() * 90_000_000) + 10_000_000).toString()}`,
    };
  }

  if (method === "card") {
    charge.paymentMethod = {
      method: "card",
      card: {
        brand,
        last4,
        expMonth: ((i % 12) + 1),
        expYear: 2026 + (i % 3),
      },
    };
  } else {
    charge.paymentMethod = { method };
  }

  if (status === "FAILED") {
    charge.statusCode = "E101";
    charge.statusMessage = pick(["Insufficient funds", "Card declined", "Invalid CVV"], i);
  }

  if (i % 5 === 0) {
    charge.metadata = [
      { key: "plan",  value: pick(["starter", "pro", "business"], i) },
      { key: "seats", value: String((i % 10) + 1) },
    ];
  }

  if (status === "PARTIALLY_REFUNDED" || status === "REFUNDED") {
    charge.description = "Subscription — partial refund issued";
  }

  return charge;
});
