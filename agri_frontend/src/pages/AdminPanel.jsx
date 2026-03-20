import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import New Components
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import ProductManagement from '../components/admin/ProductManagement';
import BatchManagement from '../components/admin/BatchManagement';
import QRGenerator from '../components/admin/QRGenerator';
import ProfileModal from '../forms/ProfileModal';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('adminTab') || 'users');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/');
    }
  };

  // Helper function to render the correct component
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'batches':
        return <BatchManagement />;
      case 'generateqr':
        return <QRGenerator />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    localStorage.setItem('adminTab', activeTab);
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="ml-64 flex-1 p-10">
        <AdminHeader
          activeTab={activeTab}
          user={user}
          onProfileClick={() => setIsProfileOpen(true)}
        />

        {/* Dynamic Content */}
        {renderContent()}

        {/* Modals */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </main>
    </div>
  );
};