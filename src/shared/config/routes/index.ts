const PAYMENTS_BASE = "/payments";

const paymentRoutes = {
  LIST: PAYMENTS_BASE,
  DETAIL: `${PAYMENTS_BASE}/$id`,
} as const;

const ROUTES = {
  HOME: "/",
  PAYMENTS: {
    BASE_URL: PAYMENTS_BASE,
    ...paymentRoutes,
  },
} as const;

export { ROUTES };
