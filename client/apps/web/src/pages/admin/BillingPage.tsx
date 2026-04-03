import { useState } from "react";
import { Plus } from "lucide-react";
import type { InvoiceStatus } from "@fit-core/shared";
import { useTranslation } from "react-i18next";
import { BillingSummaryCards } from "../../components/billing/BillingSummaryCards";
import { InvoicesTable } from "../../components/billing/InvoicesTable";
import { invoices } from "../../components/billing/billingData";

type Tab = "All" | InvoiceStatus;

const ITEMS_PER_PAGE = 7;

export default function BillingPage() {
  const { t } = useTranslation("admin");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInvoices =
    activeTab === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === activeTab);

  function handleTabChange(tab: Tab): void {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("billing")}</h1>
          <p className="text-secondary text-sm mt-0.5">{t("manageBillingDesc")}</p>
        </div>
        <button className="flex items-center gap-2 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover">
          <Plus size={16} />
          {t("createInvoice")}
        </button>
      </div>

      {/* Summary Cards — always totals from all invoices */}
      <BillingSummaryCards invoices={invoices} />

      {/* Invoices Table */}
      <InvoicesTable
        invoices={filteredInvoices}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onView={(id) => console.log("View invoice:", id)}
        onSendReminder={(id) => {
          const inv = invoices.find((i) => i.id === id);
          console.log("Reminder sent to", inv?.member.name);
        }}
        onDownload={(id) => {
          const inv = invoices.find((i) => i.id === id);
          console.log("Downloading invoice", inv?.invoiceNumber);
        }}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
