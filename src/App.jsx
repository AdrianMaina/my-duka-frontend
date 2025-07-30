// =======================================================================
// FILE: src/App.jsx (FIXED)
// =======================================================================
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Toaster } from 'react-hot-toast';

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MotionWrapper from "./components/layout/MotionWrapper";

// Pages
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import InviteLogin from "./pages/public/InviteLogin";
import MerchantOverview from "./pages/merchant/MerchantOverview";
import ViewStores from "./pages/merchant/ViewStores";
import InviteAdmin from "./pages/merchant/InviteAdmin";
import MpesaTransactions from "./pages/merchant/MpesaTransactions";
import ReportsPage from "./pages/merchant/ReportsPage";
import PaySupplier from "./pages/merchant/PaySupplier";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminInventory from "./pages/admin/AdminInventory";
import InviteClerk from "./pages/admin/InviteClerk";
import SupplyRequestsPage from "./pages/admin/SupplyRequestsPage";
import ClerkOverview from "./pages/clerk/ClerkOverview";
import ReceiveStock from "./pages/clerk/ReceiveStock";
import LogSpoilage from "./pages/clerk/LogSpoilage";
import RequestStock from "./pages/clerk/RequestStock";
import RecordSale from "./pages/clerk/RecordSale";

function AnimatedRoutes() {
  const location = useLocation();
  const isLoaded = useSelector((state) => state.auth.isLoaded);

  if (!isLoaded) return null;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MotionWrapper><LandingPage /></MotionWrapper>} />
        <Route path="/login" element={<MotionWrapper><Login /></MotionWrapper>} />
        <Route path="/register" element={<MotionWrapper><Register /></MotionWrapper>} />
        <Route path="/invite/:token" element={<MotionWrapper><InviteLogin /></MotionWrapper>} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/merchant/overview" element={<MotionWrapper><MerchantOverview /></MotionWrapper>} />
            <Route path="/merchant/stores" element={<MotionWrapper><ViewStores /></MotionWrapper>} />
            <Route path="/merchant/invite-admin" element={<MotionWrapper><InviteAdmin /></MotionWrapper>} />
            <Route path="/merchant/reports" element={<MotionWrapper><ReportsPage /></MotionWrapper>} />
            <Route path="/merchant/mpesa-transactions" element={<MotionWrapper><MpesaTransactions /></MotionWrapper>} />
            <Route path="/merchant/pay-supplier" element={<MotionWrapper><PaySupplier /></MotionWrapper>} />
            <Route path="/admin/overview" element={<MotionWrapper><AdminOverview /></MotionWrapper>} />
            <Route path="/admin/inventory" element={<MotionWrapper><AdminInventory /></MotionWrapper>} />
            <Route path="/admin/supply-requests" element={<MotionWrapper><SupplyRequestsPage /></MotionWrapper>} />
            <Route path="/admin/invite-clerk" element={<MotionWrapper><InviteClerk /></MotionWrapper>} />
            <Route path="/clerk/overview" element={<MotionWrapper><ClerkOverview /></MotionWrapper>} />
            <Route path="/clerk/receive-stock" element={<MotionWrapper><ReceiveStock /></MotionWrapper>} />
            <Route path="/clerk/log-spoilage" element={<MotionWrapper><LogSpoilage /></MotionWrapper>} />
            <Route path="/clerk/request-stock" element={<MotionWrapper><RequestStock /></MotionWrapper>} />
            <Route path="/clerk/record-sale" element={<MotionWrapper><RecordSale /></MotionWrapper>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
