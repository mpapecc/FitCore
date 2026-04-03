import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedAdminRoute } from "./components/auth/ProtectedAdminRoute";
import { ProtectedMemberRoute } from "./components/auth/ProtectedMemberRoute";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/auth/ForgotPasswordPage"),
);
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const RegisterSuccessPage = lazy(
  () => import("./pages/auth/RegisterSuccessPage"),
);
const ConfirmEmailPage = lazy(() => import("./pages/auth/ConfirmEmailPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const SelectTenantPage = lazy(() => import("./pages/auth/SelectTenantPage"));
const OnboardingPage = lazy(() => import("./pages/onboarding/OnboardingPage"));
const TrainerOnboardingPage = lazy(() => import("./pages/onboarding/TrainerOnboardingPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const MembersListPage = lazy(() => import("./pages/admin/MembersListPage"));
const MemberProfilePage = lazy(() => import("./pages/admin/MemberProfilePage"));
const ClassSchedulePage = lazy(() => import("./pages/admin/ClassSchedulePage"));
const BillingPage = lazy(() => import("./pages/admin/BillingPage"));
const NutritionPlansPage = lazy(
  () => import("./pages/admin/NutritionPlansPage"),
);
const WorkoutLogsPage = lazy(() => import("./pages/admin/WorkoutLogsPage"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const MemberDashboardPage = lazy(() => import("./pages/member/MemberDashboardPage"));
const BookClassPage = lazy(() => import("./pages/member/BookClassPage"));
const MyBookingsPage = lazy(() => import("./pages/member/MyBookingsPage"));
const MyProgressPage   = lazy(() => import("./pages/member/MyProgressPage"));
const MyNutritionPage  = lazy(() => import("./pages/member/MyNutritionPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/success" element={<RegisterSuccessPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/select-gym" element={<SelectTenantPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/onboarding/trainer" element={<TrainerOnboardingPage />} />

          {/* Admin routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/members" element={<MembersListPage />} />
              <Route path="/members/:id" element={<MemberProfilePage />} />
              <Route path="/class-schedule" element={<ClassSchedulePage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/nutrition-plans" element={<NutritionPlansPage />} />
              <Route path="/workout-logs" element={<WorkoutLogsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Member routes */}
          <Route element={<ProtectedMemberRoute />}>
            <Route element={<AppShell />}>
              <Route path="/member/dashboard" element={<MemberDashboardPage />} />
              <Route path="/member/book"      element={<BookClassPage />} />
              <Route path="/member/bookings" element={<MyBookingsPage />} />
              <Route path="/member/progress"   element={<MyProgressPage />} />
              <Route path="/member/nutrition"  element={<MyNutritionPage />} />
            </Route>
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
