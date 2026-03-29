import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Dumbbell,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
} from "lucide-react";
import {
  registerSchema,
  type RegisterFormData,
  useRegister,
} from "@fit-core/shared";

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

function getPasswordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0;
  if (password.length < 6) return 1;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (password.length >= 8 && hasUpper && hasNumber) return 4;
  if (password.length >= 8 && (hasUpper || hasNumber)) return 3;
  return 2;
}

const strengthConfig = [
  null,
  { label: "Very weak", bars: 1, color: "bg-error" },
  { label: "Weak", bars: 2, color: "bg-warning" },
  { label: "Good", bars: 3, color: "bg-warning" },
  { label: "Strong", bars: 4, color: "bg-success" },
] as const;

function PasswordStrengthIndicator({ password }: { password: string }) {
  const level = getPasswordStrength(password);
  if (!password) return null;
  const config = strengthConfig[level]!;
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1 flex-1 rounded-full transition-all duration-DEFAULT ${
              bar <= config.bars ? config.color : "bg-stroke"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs mt-1 ${level === 4 ? "text-success" : level >= 2 ? "text-warning" : "text-error"}`}>
        {config.label}
      </p>
    </div>
  );
}

function InvalidInvitation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-error" />
        </div>
        <h1 className="text-2xl font-black text-primary tracking-tight">Invalid invitation link</h1>
        <p className="text-secondary text-sm mt-2 mb-6">
          This invitation link is missing or invalid. Please ask your gym admin to resend the invitation.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sm text-green hover:underline cursor-pointer"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

function RightPanel({ token, email }: { token: string; email: string }) {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        password: data.password,
        invitationToken: token,
      },
      {
        onSuccess: () => {
          navigate("/register/success");
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12 overflow-y-auto">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-primary tracking-tight">Complete your registration</h1>
        <p className="text-secondary text-sm mt-2 mb-8">
          You were invited to join FitCore. Set up your account below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              First name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
              <input
                {...register("firstName")}
                type="text"
                placeholder="Jane"
                aria-invalid={!!errors.firstName}
                className="w-full pl-10 pr-4 py-3 border border-stroke rounded-lg text-primary placeholder:text-secondary bg-white focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none aria-invalid:border-error aria-invalid:ring-error/20"
              />
            </div>
            {errors.firstName && (
              <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Last name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
              <input
                {...register("lastName")}
                type="text"
                placeholder="Doe"
                aria-invalid={!!errors.lastName}
                className="w-full pl-10 pr-4 py-3 border border-stroke rounded-lg text-primary placeholder:text-secondary bg-white focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none aria-invalid:border-error aria-invalid:ring-error/20"
              />
            </div>
            {errors.lastName && (
              <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email — pre-filled, disabled */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full pl-10 pr-4 py-3 border border-stroke rounded-lg text-primary bg-ghost cursor-not-allowed opacity-75 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className="w-full pl-10 pr-12 py-3 border border-stroke rounded-lg text-primary placeholder:text-secondary bg-white focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none aria-invalid:border-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-all duration-DEFAULT"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrengthIndicator password={passwordValue} />
            {errors.password && (
              <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                aria-invalid={!!errors.confirmPassword}
                className="w-full pl-10 pr-12 py-3 border border-stroke rounded-lg text-primary placeholder:text-secondary bg-white focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none aria-invalid:border-error"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-all duration-DEFAULT"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {registerMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* API error */}
          {registerMutation.isError && (
            <div className="bg-error/10 border border-error/20 text-error text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Something went wrong. Please try again or contact your gym admin.
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-green hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const isValidInvitation = token.length > 0 && email.length > 0;

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel />
      {isValidInvitation ? (
        <RightPanel token={token} email={email} />
      ) : (
        <InvalidInvitation />
      )}
    </div>
  );
}
