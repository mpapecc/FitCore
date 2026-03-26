import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Dumbbell, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { loginSchema, type LoginFormData, useLogin } from "@fit-core/shared";

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

function RightPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.tenants.length === 1) {
          console.log("Single tenant login:", response);
          navigate("/");
        } else {
          console.log("Multiple tenants:", response.tenants);
        }
      },
      onError: () => {
        // Error shown via loginMutation.isError
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12 overflow-y-auto">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black text-primary tracking-tight">Welcome back</h1>
        <p className="text-secondary text-sm mt-2 mb-8">Sign in to your FitCore account</p>

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

          {/* Password field */}
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
            {errors.password && (
              <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-green hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loginMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* API error */}
          {loginMutation.isError && (
            <div className="bg-error/10 border border-error/20 text-error text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Invalid email or password. Please try again.
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stroke" />
            <span className="text-secondary text-sm">or</span>
            <div className="flex-1 h-px bg-stroke" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="w-full border border-stroke text-primary hover:bg-ghost py-3 rounded-lg transition-all duration-DEFAULT font-medium flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-secondary">
          Having trouble? Contact your gym admin.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
