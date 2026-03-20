import React from 'react';
import { Users, Package, Layers, QrCode, LogOut, LayoutDashboard } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Employee Validation', icon: Users },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'batches', label: 'Batch Management', icon: Layers },
    { id: 'generateqr', label: 'Generate QR', icon: QrCode },
  ];
  return (
  <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
    <div className="p-8 text-2xl font-black tracking-tighter text-green-500">
      EMHA_ADMIN
    </div>
    <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activeTab === item.id 
                ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} /> {item.label}
          </button>
        ))}
      </nav>
    <div className="p-4 border-t border-gray-800">
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 w-full rounded-xl transition group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Logout</span>
      </button>
    </div>
  </aside>
)};

export default Sidebar;