import { useNavigate, useSearchParams } from "react-router-dom";
import { Dumbbell, Mail } from "lucide-react";

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
          <span className="text-2xl font-black text-white tracking-tight">FitCore</span>
        </div>
        <div>
          <div className="text-green text-7xl font-black leading-none -mb-4">"</div>
          <p className="text-white text-xl font-light italic leading-relaxed">
            Your fitness journey starts here.
          </p>
          <p className="text-white/40 text-sm mt-3">— Trusted by gym owners worldwide</p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel />
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          <div className="bg-green/10 rounded-full p-4 mb-6">
            <Mail className="w-16 h-16 text-green" />
          </div>

          <h1 className="text-2xl font-bold text-primary">Check your email</h1>
          <p className="text-secondary text-sm mt-2 mb-2">
            We sent a confirmation link to
          </p>
          {email && (
            <p className="font-semibold text-primary text-sm mb-6">{email}</p>
          )}
          <p className="text-secondary text-sm mb-8 max-w-xs">
            Click the link in the email to activate your account before signing in.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base"
          >
            Go to Login →
          </button>

          <div className="border-t border-stroke my-6 w-full" />

          <p className="text-secondary text-xs">
            Didn't receive the email? Check your spam folder or contact your gym admin.
          </p>
        </div>
      </div>
    </div>
  );
}
