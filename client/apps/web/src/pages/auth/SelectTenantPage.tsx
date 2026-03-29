import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ChevronRight, Dumbbell, Loader2 } from "lucide-react";
import { useSelectTenant, session, type TenantInfo } from "@fit-core/shared";
import { tokenStorage } from "../../utils/token";

export default function SelectTenantPage() {
  const navigate = useNavigate();
  const selectMutation = useSelectTenant();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectorToken = sessionStorage.getItem("selector_token") ?? "";
  const tenants: TenantInfo[] = JSON.parse(
    sessionStorage.getItem("tenants") ?? "[]",
  );

  const handleSelectTenant = (tenantId: string) => {
    setSelectedId(tenantId);
    selectMutation.mutate(
      { selectorToken, tenantId },
      {
        onSuccess: (data) => {
          tokenStorage.set(data.accessToken);
          sessionStorage.setItem("refresh_token", data.refreshToken);

          session.setTokens(
            data.accessToken,
            data.refreshToken,
            data.userId,
            data.tenantId,
            data.role,
          );

          sessionStorage.removeItem("selector_token");
          sessionStorage.removeItem("tenants");

          if (data.role === "Member") {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        },
        onError: () => {
          setSelectedId(null);
        },
      },
    );
  };

  useEffect(() => {
    if (!selectorToken || tenants.length === 0) {
      navigate("/login", { replace: true });
      return;
    }
    if (tenants.length === 1) {
      handleSelectTenant(tenants[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show spinner while auto-selecting single tenant
  if (tenants.length === 1 && !selectMutation.isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ghost">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-green animate-spin" />
          <p className="text-secondary text-sm">Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghost">
      <div className="bg-white border border-stroke rounded-lg shadow-sm w-full max-w-md mx-4 overflow-hidden">
        {/* Card header */}
        <div className="bg-navy px-8 py-6">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-6 h-6 text-green" />
            <span className="text-xl font-black text-white tracking-tight">FitCore</span>
          </div>
          <p className="text-white/60 text-sm mt-1">Select your gym to continue</p>
        </div>

        {/* Card body */}
        <div className="px-8 py-6">
          <h1 className="text-xl font-bold text-primary mb-1">Welcome back!</h1>
          <p className="text-secondary text-sm mb-6">
            You are a member of multiple gyms. Which one would you like to access?
          </p>

          <div className="flex flex-col gap-3">
            {tenants.map((tenant) => (
              <button
                key={tenant.id}
                type="button"
                onClick={() => handleSelectTenant(tenant.id)}
                disabled={selectMutation.isPending}
                className={`w-full flex items-center justify-between border rounded-lg px-5 py-4 text-left transition-all duration-DEFAULT group disabled:opacity-60 disabled:cursor-not-allowed ${
                  selectedId === tenant.id
                    ? "border-green bg-green/5"
                    : "border-stroke hover:border-green/50 hover:bg-ghost"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {tenant.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-primary font-semibold">{tenant.name}</p>
                </div>

                {selectedId === tenant.id && selectMutation.isPending ? (
                  <Loader2 className="w-5 h-5 text-green animate-spin flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-secondary group-hover:text-green transition-all duration-DEFAULT flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {selectMutation.isError && (
            <div className="bg-error/10 border border-error/20 text-error text-sm rounded-lg px-4 py-3 flex items-center gap-2 mt-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Something went wrong. Please try again.
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="px-8 py-4 border-t border-stroke flex items-center gap-1">
          <span className="text-secondary text-sm">Not your account?</span>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("selector_token");
              sessionStorage.removeItem("tenants");
              navigate("/login");
            }}
            className="text-green text-sm hover:underline cursor-pointer"
          >
            Sign in with a different account
          </button>
        </div>
      </div>
    </div>
  );
}
