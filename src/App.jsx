import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth, ROLE_CONFIG } from './context/AuthContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import BuyersPortalPage from './pages/BuyersPortalPage';
import InvestorHubPage from './pages/InvestorHubPage';
import ReservationsPage from './pages/ReservationsPage';
import ReservationConfirmedPage from './pages/ReservationConfirmedPage';
import ContractorOnboardingPage from './pages/ContractorOnboardingPage';
import ContractorQuizPage from './pages/ContractorQuizPage';
import ContractorSchedulePage from './pages/ContractorSchedulePage';
import ContractorRfidPage from './pages/ContractorRfidPage';
import ManageContractorPage from './pages/ManageContractorPage';
import LocalMechanicalPage from './pages/LocalMechanicalPage';
import HelpChatbotPage from './pages/HelpChatbotPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Auto scroll-to-top component on route transitions
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

// Guard role-specific pages only when a user is signed in; when signed out, all pages remain accessible
function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();
  if (user && !allowedRoles.includes(user.role)) {
    const fallback = ROLE_CONFIG[user.role]?.homeRoute || '/';
    return <Navigate to={fallback} replace />;
  }
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="buyers"
                element={
                  <RoleGuard allowedRoles={['customer']}>
                    <BuyersPortalPage />
                  </RoleGuard>
                }
              />
              <Route
                path="investor"
                element={
                  <RoleGuard allowedRoles={['investor']}>
                    <InvestorHubPage />
                  </RoleGuard>
                }
              />
              <Route
                path="reservations"
                element={
                  <RoleGuard allowedRoles={['customer']}>
                    <ReservationsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="reservations/confirmed"
                element={
                  <RoleGuard allowedRoles={['customer']}>
                    <ReservationConfirmedPage />
                  </RoleGuard>
                }
              />
              <Route
                path="contractor"
                element={
                  <RoleGuard allowedRoles={['contractor']}>
                    <ContractorOnboardingPage />
                  </RoleGuard>
                }
              />
              <Route
                path="contractor/quiz"
                element={
                  <RoleGuard allowedRoles={['contractor']}>
                    <ContractorQuizPage />
                  </RoleGuard>
                }
              />
              <Route
                path="contractor/schedule"
                element={
                  <RoleGuard allowedRoles={['contractor']}>
                    <ContractorSchedulePage />
                  </RoleGuard>
                }
              />
              <Route
                path="contractor/rfid"
                element={
                  <RoleGuard allowedRoles={['contractor']}>
                    <ContractorRfidPage />
                  </RoleGuard>
                }
              />
              <Route
                path="manage-contractor"
                element={
                  <RoleGuard allowedRoles={['customer', 'contractor']}>
                    <ManageContractorPage />
                  </RoleGuard>
                }
              />
              <Route
                path="local-mechanical"
                element={
                  <RoleGuard allowedRoles={['contractor']}>
                    <LocalMechanicalPage />
                  </RoleGuard>
                }
              />
              <Route path="help" element={<HelpChatbotPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
