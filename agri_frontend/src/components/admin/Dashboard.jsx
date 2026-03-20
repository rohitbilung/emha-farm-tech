import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShoppingBag, Wallet, Activity, AlertTriangle, Search, MoreHorizontal, ArrowUpRight } from 'lucide-react';

const FullDashboard = () => {
  // Chart Data
  const financialData = [
    { name: 'Mon', profit: 2400, expenses: 1800 },
    { name: 'Tue', profit: 3200, expenses: 2100 },
    { name: 'Wed', profit: 4500, expenses: 2800 },
    { name: 'Thu', profit: 3800, expenses: 2400 },
    { name: 'Fri', profit: 5100, expenses: 3100 },
  ];

  const stockData = [
    { name: 'Sold', value: 65, color: '#6366f1' },
    { name: 'Remaining', value: 30, color: '#10b981' },
    { name: 'Loss', value: 5, color: '#f43f5e' },
  ];

  // Table Data
  const products = [
    { id: 1, name: "Dry Oyster", category: "Mushroom", sold: 450, remaining: 12, status: "Low Stock", price: "₹139/Kg" },
    { id: 2, name: "Onion", category: "Vegetable", sold: 890, remaining: 145, status: "Healthy", price: "₹29/Kg" },
    { id: 3, name: "Apple", category: "Fruits", sold: 210, remaining: 5, status: "Critical", price: "₹160/Kg" },
    { id: 4, name: "Button Mushroom", category: "Mushroom", sold: 120, remaining: 80, status: "Healthy", price: "₹120/Kg" },
  ];

  return (
    <div className="min-h-screen border rounded-[2rem] bg-[#f8fafc] p-6 lg:p-10 text-slate-800 font-sans">
      
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Emha <span className="text-indigo-600">Farm</span></h1>
          <p className="text-slate-500 font-medium"></p>
        </div>
        <div className="relative group">
          Last updated: <span className="text-indigo-400 font-mono">Just now</span>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Products Sold', val: '2,841', icon: <ShoppingBag size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Expenses', val: '₹8,240', icon: <Wallet size={20}/>, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Net Profit', val: '₹14,520', icon: <Activity size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Stock Alerts', val: '3 Items', icon: <AlertTriangle size={20}/>, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((card, i) => (
          <div key={i} className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>{card.icon}</div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{card.label}</p>
            <h3 className="text-2xl font-black mt-1">{card.val}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-8">Financial Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc', radius: 10}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="profit" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={20} />
                <Bar dataKey="expenses" fill="#e2e8f0" radius={[8, 8, 8, 8]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-8">Stock Mix</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                  {stockData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Inventory Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-bold">Inventory Details</h3>
          <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:underline">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Sold</th>
                <th className="px-8 py-4">Remaining</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-700">{p.name}</td>
                  <td className="px-8 py-5 text-slate-500">{p.category}</td>
                  <td className="px-8 py-5 font-semibold">{p.sold}</td>
                  <td className="px-8 py-5 font-semibold">{p.remaining}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      p.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 
                      p.status === 'Low Stock' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-slate-900">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FullDashboard;