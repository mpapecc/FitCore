import { Eye, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react";
import type { Invoice, InvoiceStatus } from "@fit-core/shared";
import { invoiceStatusColors, formatCurrency } from "./billingData";

type Tab = "All" | InvoiceStatus;

interface InvoicesTableProps {
  invoices: Invoice[];
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onView: (id: string) => void;
  onSendReminder: (id: string) => void;
  onDownload: (id: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const TABS: Tab[] = ["All", "Paid", "Pending", "Overdue"];

export function InvoicesTable({
  invoices,
  activeTab,
  onTabChange,
  onView,
  onSendReminder,
  onDownload,
  currentPage,
  onPageChange,
  itemsPerPage,
}: InvoicesTableProps) {
  // Tab counts
  const tabCounts: Record<Tab, number> = {
    All:     invoices.length,
    Paid:    invoices.filter((i) => i.status === "Paid").length,
    Pending: invoices.filter((i) => i.status === "Pending").length,
    Overdue: invoices.filter((i) => i.status === "Overdue").length,
  };

  // Filter by active tab
  const filtered =
    activeTab === "All" ? invoices : invoices.filter((i) => i.status === activeTab);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, filtered.length);
  const pageRows = filtered.slice(startIdx, endIdx);

  // Page numbers to show: current ± 1
  const pageNumbers: number[] = [];
  for (let p = Math.max(1, safePage - 1); p <= Math.min(totalPages, safePage + 1); p++) {
    pageNumbers.push(p);
  }

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden">
      {/* Filter Tabs */}
      <div className="flex border-b border-stroke px-6">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`py-4 px-4 text-sm font-medium border-b-2 transition-all duration-DEFAULT cursor-pointer ${
                isActive
                  ? "text-green border-green font-semibold"
                  : "text-secondary border-transparent hover:text-primary hover:border-stroke"
              }`}
            >
              {tab}
              <span
                className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-green/10 text-green"
                    : "bg-ghost text-secondary"
                }`}
              >
                {tabCounts[tab]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-ghost">
              {["Invoice ID", "Member", "Plan", "Amount", "Issue Date", "Due Date", "Status", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-secondary text-sm">
                  No invoices found.
                </td>
              </tr>
            ) : (
              pageRows.map((invoice) => {
                const isOverdue = invoice.status === "Overdue";
                const colors = invoiceStatusColors[invoice.status];
                return (
                  <tr
                    key={invoice.id}
                    className={`border-b border-stroke transition-all duration-DEFAULT ${
                      isOverdue
                        ? "border-l-4 border-l-error bg-error/[0.02] hover:bg-error/[0.04]"
                        : "bg-white hover:bg-ghost"
                    }`}
                  >
                    {/* Invoice ID */}
                    <td className="px-6 py-4 text-primary font-mono text-sm font-medium whitespace-nowrap">
                      {invoice.invoiceNumber}
                    </td>

                    {/* Member */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {invoice.member.avatarInitials}
                        </div>
                        <span className="ml-2 text-primary font-medium text-sm whitespace-nowrap">
                          {invoice.member.name}
                        </span>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className="bg-ghost text-primary text-xs font-medium px-2.5 py-1 rounded-md">
                        {invoice.plan}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 text-primary font-semibold text-sm whitespace-nowrap">
                      {formatCurrency(invoice.amount)}
                    </td>

                    {/* Issue Date */}
                    <td className="px-6 py-4 text-secondary text-sm whitespace-nowrap">
                      {invoice.issueDate}
                    </td>

                    {/* Due Date */}
                    <td className={`px-6 py-4 text-sm whitespace-nowrap ${isOverdue ? "text-error font-medium" : "text-secondary"}`}>
                      {invoice.dueDate}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`${colors.bg} ${colors.border} ${colors.text} border rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onView(invoice.id)}
                          title="View invoice"
                          className="text-secondary hover:text-green p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onSendReminder(invoice.id)}
                          title="Send reminder"
                          className={`text-secondary hover:text-warning p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT ${
                            invoice.status === "Paid" ? "invisible" : ""
                          }`}
                        >
                          <Bell size={15} />
                        </button>
                        <button
                          onClick={() => onDownload(invoice.id)}
                          title="Download PDF"
                          className="text-secondary hover:text-primary p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT"
                        >
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-stroke">
        <p className="text-secondary text-sm">
          Showing {filtered.length === 0 ? 0 : startIdx + 1}–{endIdx} of {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            onClick={() => onPageChange(safePage - 1)}
            disabled={safePage === 1}
            className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
          >
            <ChevronLeft size={15} />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-DEFAULT ${
                p === safePage
                  ? "bg-navy text-white font-semibold"
                  : "text-secondary hover:bg-ghost"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => onPageChange(safePage + 1)}
            disabled={safePage === totalPages}
            className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
