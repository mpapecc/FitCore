import { useState } from "react";
import { SettingsNav } from "../../components/settings/SettingsNav";
import type { SettingsTab } from "../../components/settings/SettingsNav";
import { GeneralSettingsPanel } from "../../components/settings/panels/GeneralSettingsPanel";
import MembershipPlansPanel from "../../components/settings/panels/MembershipPlansPanel";
import NotificationsPanel from "../../components/settings/panels/NotificationsPanel";
import AppearancePanel from "../../components/settings/panels/AppearancePanel";
import AccountPanel from "../../components/settings/panels/AccountPanel";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Settings</h1>
          <p className="text-secondary text-sm mt-0.5">
            Manage your gym configuration and preferences
          </p>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
        <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div>
          {activeTab === "General"          && <GeneralSettingsPanel />}
          {activeTab === "Membership Plans" && <MembershipPlansPanel />}
          {activeTab === "Notifications"    && <NotificationsPanel />}
          {activeTab === "Appearance"       && <AppearancePanel />}
          {activeTab === "Account"          && <AccountPanel />}
        </div>
      </div>
    </div>
  );
}
