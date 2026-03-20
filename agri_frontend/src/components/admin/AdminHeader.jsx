import React from 'react';
import { ArrowRight } from 'lucide-react';

const titles = {
  dashboard: 'Dashboard',
  users: 'Pending Validations',
  products: 'Inventory Control',
  batches: 'Batch Tracking',
  generateqr:'Generate QR'
};

const AdminHeader = ({ activeTab, user, onProfileClick }) => (
  <header className="mb-10 flex justify-between items-start">
    <div>
      <h1 className="text-3xl font-black text-gray-900">
        {titles[activeTab] || 'Dashboard'}
      </h1>
      <p className="text-gray-500">System logged as Administrator</p>
    </div>
    <button
      onClick={onProfileClick}
      className="relative group flex items-center gap-4 bg-white/80 backdrop-blur-md p-1.5 pr-6 rounded-[2rem] border border-white shadow-sm hover:shadow-md hover:border-green-100 transition-all active:scale-95"
    >
      <div className="relative p-0.5 rounded-[1.4rem] bg-gradient-to-tr from-green-100 to-stone-50 group-hover:from-green-400 transition-all">
        <div className="w-12 h-12 bg-white rounded-[1.2rem] flex items-center justify-center text-green-600 font-black text-xl overflow-hidden">
          {user?.img ? (
            <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span>{user?.name?.[0] || 'A'}</span>
          )}
        </div>
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse" />
      </div>
      <div className="text-left hidden sm:block">
        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{user?.role}</p>
        <p className="text-sm font-black text-stone-800 truncate max-w-[120px]">{user?.name || 'Admin'}</p>
      </div>
      <ArrowRight size={14} className="text-stone-300 group-hover:translate-x-1 transition-transform" />
    </button>
  </header>
);

export default AdminHeader;