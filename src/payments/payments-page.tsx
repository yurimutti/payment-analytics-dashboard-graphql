import { MOCK_CHARGES } from "./payments-mock";
import { PaymentRow } from "./payment-row";

export function PaymentsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-hairline px-6 py-4">
        <p className="text-xs text-ink-subtle">
          {MOCK_CHARGES.length} payments — mock data
        </p>
      </div>

      {/* List */}
      <div>
        {MOCK_CHARGES.map((charge) => (
          <PaymentRow key={charge.id} charge={charge} />
        ))}
      </div>
    </div>
  );
}
