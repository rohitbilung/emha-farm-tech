import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import TraceProduct from './pages/TraceProduct';
import { AdminPanel } from './pages/AdminPanel';
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AuthProvider } from './context/AuthContext';
import FarmerDashboard from './pages/FarmerDashboard';

import LessonScreen from './pages/LessonScreen';

function AppContent() {
  const location = useLocation();

  // Define routes where you DON'T want the header and footer (like Admin)
  const hideLayout = location.pathname.startsWith('/admin') || 
  location.pathname.startsWith('/trace') || location.pathname.startsWith('/farmer')

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Conditionally render Header */}
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/trace/:getBatchParam" element={<TraceProduct />} />
        <Route path='/duo' element={<LessonScreen />} />
        <Route path="/farmer" element={
          <ProtectedRoute>
            <FarmerDashboard />
          </ProtectedRoute>
          } />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </div>
  );

}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;