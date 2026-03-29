import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  XCircle,
} from "lucide-react";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
  useResetPassword,
} from "@fit-core/shared";

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
  const config = strengthConfig[level];
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
      <p
        className={`text-xs mt-1 ${
          level === 4 ? "text-success" : level >= 2 ? "text-warning" : "text-error"
        }`}
      >
        {config.label}
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const resetMutation = useResetPassword();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = (data: ResetPasswordFormData) => {
    resetMutation.mutate(
      { email, token, newPassword: data.password },
      { onSuccess: () => setIsSuccess(true) },
    );
  };

  const isValidLink = token.length > 0 && email.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghost">
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-8 w-full max-w-sm mx-4">

        {/* Invalid link state */}
        {!isValidLink && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-error/10 rounded-full p-4 mb-4">
              <XCircle className="w-10 h-10 text-error" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Invalid reset link</h1>
            <p className="text-secondary text-sm mt-2 mb-6">
              This link may be expired or invalid.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full border border-stroke text-primary hover:bg-ghost py-3 rounded-lg transition-all duration-DEFAULT font-medium"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Success state */}
        {isValidLink && isSuccess && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-green/10 rounded-full p-4 mb-4">
              <CheckCircle className="w-10 h-10 text-green" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Password updated!</h1>
            <p className="text-secondary text-sm mt-2 mb-8">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base"
            >
              Sign In Now →
            </button>
          </div>
        )}

        {/* Form state */}
        {isValidLink && !isSuccess && (
          <>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 text-secondary hover:text-primary text-sm mb-6 transition-all duration-DEFAULT cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>

            <h1 className="text-2xl font-bold text-primary">Set new password</h1>
            <p className="text-secondary text-sm mt-2 mb-6">
              Choose a strong password for your FitCore account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  New password
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
                  Confirm new password
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
                disabled={resetMutation.isPending}
                className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {resetMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* API error */}
              {resetMutation.isError && (
                <div className="bg-error/10 border border-error/20 text-error text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Something went wrong. Please try again or request a new reset link.
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
