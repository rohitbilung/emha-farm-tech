import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Leaf, MapPin, Calendar, UserRoundPlus } from 'lucide-react';
import api, { API_ENDPOINTS } from '../config/api';

const RegisterBatchModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // To select which product this batch belongs to
  const [farmers, setFarmers] = useState([
    {
      _id: 1,
      name: "rohit"
    },
    {
      _id: 2,
      name: "mohit"
    }
  ]); // To select which product this batch belongs to

  const [formData, setFormData] = useState({
    productId: '',
    farmName: '',
    farmerId: ''
  });

  // Fetch products to populate the dropdown
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.GET_PRODUCTS);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Could not load products for selection");
      }
    };
    if (isOpen) fetchProducts();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const payload = {
        ...formData
      };
      await api.post(API_ENDPOINTS.REGISTER_BATCH, payload);
      onSuccess();
      onClose();
      setFormData({ productId: '', farmName: '',farmerId: '' });
    } catch (err) {
      alert("Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden z-20"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-stone-900 uppercase tracking-tighter italic">Register New Batch</h2>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Initialization Phase</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition text-stone-400"><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              {/* Full Width Field */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block ml-1">Link Product</label>
                <div className="relative">
                  <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <select
                    required
                    value={formData.productId || ''}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700 appearance-none"
                  >
                    <option value="">Select Inventory Item</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.productName}</option>)}
                  </select>
                </div>
              </div>

              {/* Two Column Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Farm Location */}
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block ml-1">Farm Origin</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <input
                      placeholder="Sector 4..."
                      required
                      value={formData.farmName || ''}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700 placeholder:text-stone-300"
                    />
                  </div>
                </div>

                {/* Assign Farmer */}
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block ml-1">Assign Farmer</label>
                  <div className="relative">
                    {/* Make sure UserRoundPlus is imported! */}
                    <UserRoundPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                    <select
                      required
                      value={formData.farmerId || ''}
                      onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700 appearance-none"
                    >
                      <option value="">Assign Farmers</option>
                      {farmers.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-stone-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-2xl shadow-stone-200 group"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    <Save size={20} className="group-hover:scale-110 transition" />
                    Confirm Registration
                  </>
                )}
              </button>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegisterBatchModal;