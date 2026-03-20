import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Edit, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || user?.mobile || 'NA',
    address: user?.address || 'NA',
    image: user?.image || null
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call placeholder: await api.put(API_ENDPOINTS.UPDATE_PROFILE, profile);
      setTimeout(() => { setLoading(false); onClose(); }, 800);
    } catch (err) {
      alert("Update failed");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden z-20">
            
            <div className="bg-stone-50 p-10 border-b border-gray-100 flex flex-col items-center">
              <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white rounded-full transition text-gray-400"><X /></button>
              <div className="relative group">
                <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                  {profile.image ? <img src={profile.image} className="w-full h-full object-cover" alt="Profile" /> : <Users size={48} className="text-green-600" />}
                </div>
                <label className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2.5 rounded-2xl cursor-pointer hover:bg-stone-900 transition shadow-lg">
                  <Edit size={16} /><input type="file" className="hidden" />
                </label>
              </div>
              <h2 className="mt-5 text-2xl font-black text-gray-900 uppercase tracking-tighter">{profile.name}</h2>
              <p className="text-gray-400 font-medium">{profile.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone</label>
                  <input defaultValue={profile.phone} className="w-full px-6 py-4 bg-stone-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-stone-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 transition" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Address</label>
                <textarea rows="2" defaultValue={profile.address} className="w-full px-6 py-4 bg-stone-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 transition resize-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition">Cancel</button>
                <button disabled={loading} type="submit" className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Update Profile</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;