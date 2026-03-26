import { UserCircle } from "lucide-react";

export default function AccountPanel() {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-stroke">
        <h2 className="text-base font-semibold text-primary">Account</h2>
        <p className="text-sm text-secondary mt-0.5">Manage your admin account and security</p>
      </div>
      <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
        <UserCircle className="w-12 h-12 text-secondary/20 mb-4" />
        <p className="text-primary font-medium">Account Settings</p>
        <p className="text-secondary text-sm mt-1">This section is coming soon</p>
      </div>
    </div>
  );
}
