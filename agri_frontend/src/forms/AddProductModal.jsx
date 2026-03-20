import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import api, { API_ENDPOINTS } from '../config/api';

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState("image");
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith("video/")) {
      setPreviewType("video");
    } else {
      setPreviewType("image");
    }

    setForm({ ...form, image: file });
    setPreview(fileUrl);


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);

    try {
      await api.post(API_ENDPOINTS.ADD_PRODUCT, formData);
      onSuccess();
      onClose();
      setForm({ name: '', price: '', stock: '',category:'', image: null });
      setPreview(null);
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden z-20"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">New Product</h2>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition"><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Product Image</label>
                <div className="relative group">
                  <input type="file" accept="image/*,video/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
                  <label htmlFor="imageUpload" className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition overflow-hidden">
                    {preview ? (
                      previewType === "video" ? (
                        <video
                          src={preview}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-gray-400 mb-1" size={24} />
                        <span className="text-xs text-gray-400 font-medium">Click to upload</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Group 1: Product Name */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Product Name
                  </label>
                  <input
                    required
                    value={form.name || ''}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Group 2: Category */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Category
                  </label>
                  <select
                    required
                    value={form.category || ''}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700 appearance-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Mushrooms">Mushrooms</option>
                    <option value="Honey">Honey</option>
                    <option value="Flowers">Flowers</option>
                    <option value="Fruits">Fruits</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition" />
                <input required placeholder="Stock (e.g. 50kg)" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition" />
              </div>

              <button disabled={loading} type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:bg-gray-300">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Product</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;