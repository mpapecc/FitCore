import { Bell, Building2, CreditCard, Palette, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SettingsTab = "General" | "Membership Plans" | "Notifications" | "Appearance" | "Account";

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const tabs: { id: SettingsTab; icon: LucideIcon; label: string }[] = [
  { id: "General",          icon: Building2,  label: "General"          },
  { id: "Membership Plans", icon: CreditCard, label: "Membership Plans" },
  { id: "Notifications",    icon: Bell,       label: "Notifications"    },
  { id: "Appearance",       icon: Palette,    label: "Appearance"       },
  { id: "Account",          icon: UserCircle, label: "Account"          },
];

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden w-full">
      {tabs.map(({ id, icon: Icon, label }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`group flex items-center gap-3 px-4 py-3.5 w-full text-left border-l-4 border-b border-stroke last:border-b-0 transition-all duration-DEFAULT ${
              active
                ? "border-l-green bg-ghost text-primary font-semibold"
                : "border-l-transparent text-secondary hover:bg-ghost hover:text-primary"
            }`}
          >
            <Icon
              size={18}
              className={`shrink-0 transition-all duration-DEFAULT ${
                active ? "text-green" : "text-secondary group-hover:text-primary"
              }`}
            />
            <span className="text-sm font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
