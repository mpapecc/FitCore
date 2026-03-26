import { CircleDollarSign, Clock, AlertCircle } from "lucide-react";
import type { Invoice } from "@fit-core/shared";
import { calculateSummary, formatCurrency } from "./billingData";

interface BillingSummaryCardsProps {
  invoices: Invoice[];
}

export function BillingSummaryCards({ invoices }: BillingSummaryCardsProps) {
  const { totalCollected, pendingAmount, overdueAmount } =
    calculateSummary(invoices);

  const pendingCount = invoices.filter((i) => i.status === "Pending").length;
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 — Total Collected */}
      <div className="bg-white border border-stroke border-l-4 border-l-success rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary uppercase tracking-wide">
            Total Collected
          </span>
          <div className="bg-success/10 rounded-full p-2">
            <CircleDollarSign size={18} className="text-success" />
          </div>
        </div>
        <p className="text-3xl font-black text-primary tracking-tight mt-2">
          {formatCurrency(totalCollected)}
        </p>
        <p className="text-secondary text-xs mt-1">This month</p>
      </div>

      {/* Card 2 — Pending Amount */}
      <div className="bg-white border border-stroke border-l-4 border-l-warning rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary uppercase tracking-wide">
            Pending Amount
          </span>
          <div className="bg-warning/10 rounded-full p-2">
            <Clock size={18} className="text-warning" />
          </div>
        </div>
        <p className="text-3xl font-black text-primary tracking-tight mt-2">
          {formatCurrency(pendingAmount)}
        </p>
        <p className="text-warning text-xs font-medium mt-1">
          {pendingCount} invoice{pendingCount !== 1 ? "s" : ""} pending
        </p>
      </div>

      {/* Card 3 — Overdue Amount */}
      <div className="bg-white border border-stroke border-l-4 border-l-error rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary uppercase tracking-wide">
            Overdue Amount
          </span>
          <div className="bg-error/10 rounded-full p-2">
            <AlertCircle size={18} className="text-error" />
          </div>
        </div>
        <p className="text-3xl font-black text-primary tracking-tight mt-2">
          {formatCurrency(overdueAmount)}
        </p>
        <p className="text-error text-xs font-medium mt-1">
          {overdueCount} invoice{overdueCount !== 1 ? "s" : ""} overdue
        </p>
      </div>
    </div>
  );
}
