import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPages';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './pages/DashboardLayout';
import QuizPage from './pages/QuizPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import DashboardHomePage from './pages/DashboardHomePage';
import TestPage from './pages/TestPage';
import ReportsPage from './pages/ReportsPage';
import AboutPage from './pages/AboutPage';
import ResourcesPage from './pages/ResourcesPage';
import AccountPage from './pages/AccountPage';
import SupportPage from './pages/SupportPage';
import TopicSelectionPage from './pages/TopicSelectionPage';

// --- NEW IMPORTS ADDED HERE ---
import AdminDashboard from './pages/AdminDashboard';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute'; 

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
    <Route path="/reset-password" element={<ResetPasswordConfirmPage />} />
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="test/:langId" element={<TopicSelectionPage />} />
      
        <Route path="quiz-start" element={<QuizPage />} />
        
        <Route path="reports" element={<ReportsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="support" element={<SupportPage />} />

        {/* Admin Route: Moved inside dashboard for consistent sidebar */}
        <Route
          path="admin" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;