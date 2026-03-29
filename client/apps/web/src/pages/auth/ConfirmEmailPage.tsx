import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Dumbbell, Loader2, XCircle } from "lucide-react";
import { useConfirmEmail } from "@fit-core/shared";

function LeftPanel() {
  return (
    <div className="relative hidden lg:flex flex-col h-full w-1/2 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/75" />
      <div className="relative z-10 flex flex-col justify-between h-full p-10">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-8 h-8 text-green" />
          <span className="text-2xl font-black text-white tracking-tight">
            FitCore
          </span>
        </div>
        <div>
          <div className="text-green text-7xl font-black leading-none -mb-4">
            "
          </div>
          <p className="text-white text-xl font-light italic leading-relaxed">
            Your fitness journey starts here.
          </p>
          <p className="text-white/40 text-sm mt-3">
            — Trusted by gym owners worldwide
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center text-center">
      <Loader2 className="w-16 h-16 text-green animate-spin mb-6" />
      <h1 className="text-2xl font-bold text-primary">
        Confirming your email...
      </h1>
      <p className="text-secondary text-sm mt-2">Please wait a moment.</p>
    </div>
  );
}

function SuccessState() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-green/10 rounded-full p-4 mb-6">
        <CheckCircle className="w-16 h-16 text-green" />
      </div>
      <h1 className="text-2xl font-bold text-primary">Email confirmed!</h1>
      <p className="text-secondary text-sm mt-2 mb-8 max-w-xs">
        Your account is now active. You can sign in to FitCore.
      </p>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base"
      >
        Sign In Now →
      </button>
    </div>
  );
}

function ErrorState() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-error/10 rounded-full p-4 mb-6">
        <XCircle className="w-16 h-16 text-error" />
      </div>
      <h1 className="text-2xl font-bold text-primary">Confirmation failed</h1>
      <p className="text-secondary text-sm mt-2 mb-8 max-w-xs">
        This link may have expired or already been used.
      </p>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full border border-stroke text-primary hover:bg-ghost py-3 rounded-lg transition-all duration-DEFAULT font-medium"
      >
        Back to Login
      </button>
    </div>
  );
}

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const confirmMutation = useConfirmEmail();

  useEffect(() => {
    if (token && email) {
      console.log("Confirming email with token:", token, "and email:", email);
      confirmMutation.mutate({ token, email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel />
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12">
        <div className="w-full max-w-sm">
          {confirmMutation.isPending && <LoadingState />}
          {confirmMutation.isSuccess && <SuccessState />}
          {confirmMutation.isError && <ErrorState />}
          {!confirmMutation.isPending &&
            !confirmMutation.isSuccess &&
            !confirmMutation.isError && <LoadingState />}
        </div>
      </div>
    </div>
  );
}
