import type { Invoice, InvoiceStatus } from "@fit-core/shared";

export type { Invoice, InvoiceStatus };

// ─── Status Colors ────────────────────────────────────────────────────────────

export const invoiceStatusColors: Record<
  InvoiceStatus,
  { bg: string; border: string; text: string }
> = {
  Paid:    { bg: "bg-success/10", border: "border-success", text: "text-success" },
  Pending: { bg: "bg-warning/10", border: "border-warning", text: "text-warning" },
  Overdue: { bg: "bg-error/10",   border: "border-error",   text: "text-error"   },
};

// ─── Plan Prices ──────────────────────────────────────────────────────────────

export const planPrices: Record<string, number> = {
  Basic:   29.99,
  Pro:     59.99,
  Elite:   99.99,
  Student: 19.99,
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────

export const invoices: Invoice[] = [
  { id: "1",  invoiceNumber: "INV-2026-001", member: { id: "1",  name: "Sarah Mitchell", avatarInitials: "SM" }, plan: "Pro",     amount: 59.99, issueDate: "Mar 01, 2026", dueDate: "Mar 15, 2026", status: "Paid"    },
  { id: "2",  invoiceNumber: "INV-2026-002", member: { id: "2",  name: "John Carter",    avatarInitials: "JC" }, plan: "Elite",   amount: 99.99, issueDate: "Mar 01, 2026", dueDate: "Mar 15, 2026", status: "Paid"    },
  { id: "3",  invoiceNumber: "INV-2026-003", member: { id: "3",  name: "Emma Davis",     avatarInitials: "ED" }, plan: "Basic",   amount: 29.99, issueDate: "Mar 05, 2026", dueDate: "Mar 20, 2026", status: "Pending" },
  { id: "4",  invoiceNumber: "INV-2026-004", member: { id: "4",  name: "Mike Torres",    avatarInitials: "MT" }, plan: "Pro",     amount: 59.99, issueDate: "Feb 01, 2026", dueDate: "Feb 15, 2026", status: "Overdue" },
  { id: "5",  invoiceNumber: "INV-2026-005", member: { id: "5",  name: "Lisa Wong",      avatarInitials: "LW" }, plan: "Student", amount: 19.99, issueDate: "Mar 05, 2026", dueDate: "Mar 20, 2026", status: "Pending" },
  { id: "6",  invoiceNumber: "INV-2026-006", member: { id: "6",  name: "James Hill",     avatarInitials: "JH" }, plan: "Elite",   amount: 99.99, issueDate: "Feb 01, 2026", dueDate: "Feb 15, 2026", status: "Overdue" },
  { id: "7",  invoiceNumber: "INV-2026-007", member: { id: "7",  name: "Anna Brooks",    avatarInitials: "AB" }, plan: "Basic",   amount: 29.99, issueDate: "Mar 01, 2026", dueDate: "Mar 15, 2026", status: "Paid"    },
  { id: "8",  invoiceNumber: "INV-2026-008", member: { id: "8",  name: "Carlos Mendez",  avatarInitials: "CM" }, plan: "Pro",     amount: 59.99, issueDate: "Mar 05, 2026", dueDate: "Mar 20, 2026", status: "Pending" },
  { id: "9",  invoiceNumber: "INV-2026-009", member: { id: "9",  name: "Rachel Green",   avatarInitials: "RG" }, plan: "Elite",   amount: 99.99, issueDate: "Feb 15, 2026", dueDate: "Mar 01, 2026", status: "Overdue" },
  { id: "10", invoiceNumber: "INV-2026-010", member: { id: "10", name: "Tom Wilson",     avatarInitials: "TW" }, plan: "Basic",   amount: 29.99, issueDate: "Mar 01, 2026", dueDate: "Mar 15, 2026", status: "Paid"    },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/** Format amount as USD currency string: 59.99 → "$59.99" */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Calculate total collected, pending, and overdue amounts from an invoices array */
export function calculateSummary(data: Invoice[]): {
  totalCollected: number;
  pendingAmount: number;
  overdueAmount: number;
} {
  return {
    totalCollected: data
      .filter((i) => i.status === "Paid")
      .reduce((sum, i) => sum + i.amount, 0),
    pendingAmount: data
      .filter((i) => i.status === "Pending")
      .reduce((sum, i) => sum + i.amount, 0),
    overdueAmount: data
      .filter((i) => i.status === "Overdue")
      .reduce((sum, i) => sum + i.amount, 0),
  };
}
