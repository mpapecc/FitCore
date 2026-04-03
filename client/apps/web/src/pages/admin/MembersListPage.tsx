import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MembersFilterBar } from "../../components/members/MembersFilterBar";
import { MembersTable } from "../../components/members/MembersTable";
import { AddMemberModal } from "../../components/members/AddMemberModal";
import type { Member } from "@fit-core/shared";
import { useMembers } from "@fit-core/shared";

export default function MembersListPage() {
  const { t } = useTranslation("admin");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const { data: members, isLoading, error } = useMembers();

  const { t: tCommon } = useTranslation();
  if (isLoading) return <div>{tCommon("loading")}</div>;
  if (error) return <div>{tCommon("error")}</div>;
  let membersData: Member[] = members || [];
  // --- filtering ---

  // --- handlers ---
  function handleClearFilters(): void {
    setSearch("");
    setPlanFilter("");
    setStatusFilter("");
    setTrainerFilter("");
    setCurrentPage(1);
  }

  function handleView(id: number): void {
    navigate(`/members/${id}`);
  }

  function handleEdit(id: number): void {
    console.log("edit member:", id);
  }

  function handleDelete(id: number): void {
    if (window.confirm(t("deleteConfirmMember"))) {
      console.log("delete member:", id);
    }
  }

  return (
    <div className="flex-1">
      {/* Page header */}
      <div className="flex justify-between items-center mb-6">
        {/* <div>
          <h1 className="text-2xl font-bold text-primary">Members</h1>
          <p className="text-secondary text-sm mt-0.5">247 total members</p>
        </div> */}
      </div>

      {/* Filter bar */}
      <div className="mb-4">
        <MembersFilterBar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          planFilter={planFilter}
          onPlanChange={(v) => {
            setPlanFilter(v);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusChange={(v) => {
            setStatusFilter(v);
            setCurrentPage(1);
          }}
          trainerFilter={trainerFilter}
          onTrainerChange={(v) => {
            setTrainerFilter(v);
            setCurrentPage(1);
          }}
          onClearFilters={handleClearFilters}
          onAddMember={() => setIsModalOpen(true)}
        />
      </div>

      {/* Table */}
      <MembersTable
        members={membersData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      {/* Slide-over — fixed positioning escapes any overflow context */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log("new member data:", data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
