import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RegisterSuccessPage from "./pages/auth/RegisterSuccessPage";
import ConfirmEmailPage from "./pages/auth/ConfirmEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SelectTenantPage from "./pages/auth/SelectTenantPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import DashboardPage from "./pages/admin/DashboardPage";
import MembersListPage from "./pages/admin/MembersListPage";
import MemberProfilePage from "./pages/admin/MemberProfilePage";
import ClassSchedulePage from "./pages/admin/ClassSchedulePage";
import BillingPage from "./pages/admin/BillingPage";
import NutritionPlansPage from "./pages/admin/NutritionPlansPage";
import WorkoutLogsPage from "./pages/admin/WorkoutLogsPage";
import SettingsPage from "./pages/admin/SettingsPage";

function App() {
  return (
    <BrowserRouter>
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

        {/* Admin routes */}
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

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
