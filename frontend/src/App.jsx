import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SessionsPage from "./pages/SessionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoadingScreen from "./components/ui/LoadingScreen";

// Inner app that has access to auth context
function AppInner() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (loading) return <LoadingScreen />;
  if (!user) return <LoginPage />;

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "sessions": return <SessionsPage />;
      case "analytics": return <AnalyticsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <AppInner />
      </SessionProvider>
    </AuthProvider>
  );
}
