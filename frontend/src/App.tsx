import { Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "./components/Loading";
import { useAuth } from "./hooks/useAuth";
import { AppLayout } from "./layouts/AppLayout";
import { AdminPage } from "./pages/admin/AdminPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { LandingPage } from "./pages/landing/LandingPage";
import { MentorPage } from "./pages/mentor/MentorPage";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { QuizPage } from "./pages/quiz/QuizPage";
import { RoadmapPage } from "./pages/roadmap/RoadmapPage";

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
