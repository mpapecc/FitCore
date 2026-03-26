import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@fit-core/shared";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    // TODO: call real API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedEmail(data.email);
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghost">
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-8 w-full max-w-sm">
        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex items-center gap-1 text-secondary hover:text-primary text-sm mb-6 transition-all duration-DEFAULT cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </button>

        <h1 className="text-2xl font-bold text-primary">Forgot password?</h1>
        <p className="text-secondary text-sm mt-2 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {submitted ? (
          <div className="bg-success/10 border border-success text-success rounded-lg p-4 text-sm">
            Check your inbox! We've sent a reset link to <strong>{submittedEmail}</strong>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 pointer-events-none" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className="w-full pl-10 pr-4 py-3 border border-stroke rounded-lg text-primary placeholder:text-secondary bg-white focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none aria-invalid:border-error aria-invalid:ring-error/20"
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
