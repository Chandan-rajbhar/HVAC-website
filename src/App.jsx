import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import BuyersPortalPage from './pages/BuyersPortalPage';
import InvestorHubPage from './pages/InvestorHubPage';
import ReservationsPage from './pages/ReservationsPage';
import ReservationConfirmedPage from './pages/ReservationConfirmedPage';
import ContractorOnboardingPage from './pages/ContractorOnboardingPage';
import ContractorSchedulePage from './pages/ContractorSchedulePage';
import ContractorRfidPage from './pages/ContractorRfidPage';
import ManageContractorPage from './pages/ManageContractorPage';
import LocalMechanicalPage from './pages/LocalMechanicalPage';
import HelpChatbotPage from './pages/HelpChatbotPage';
import NotFoundPage from './pages/NotFoundPage';

// Auto scroll-to-top component on route transitions
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="buyers" element={<BuyersPortalPage />} />
            <Route path="investor" element={<InvestorHubPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="reservations/confirmed" element={<ReservationConfirmedPage />} />
            <Route path="contractor" element={<ContractorOnboardingPage />} />
            <Route path="contractor/schedule" element={<ContractorSchedulePage />} />
            <Route path="contractor/rfid" element={<ContractorRfidPage />} />
            <Route path="manage-contractor" element={<ManageContractorPage />} />
            <Route path="local-mechanical" element={<LocalMechanicalPage />} />
            <Route path="help" element={<HelpChatbotPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
