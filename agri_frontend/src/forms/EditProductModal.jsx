import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData(product);
            setPreviewUrl(product.avatar)
        }
    }, [product]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 1. Update the formData with the actual File object
            setFormData({ ...formData, avatar: file });

            // 2. Create a temporary URL to show a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-green-500"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                className="w-full border p-2 rounded-md bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Vegetable">Vegetables</option>
                                <option value="Honey">Honey</option>
                                <option value="Mushroom">Mushroom</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Dairy">Dairy</option>
                            </select>
                        </div>

                        {/* Unique Code */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Unique Code</label>
                            <input
                                className="w-full border p-2 rounded-md bg-gray-50"
                                value={formData.uniqueCode}
                                disabled // Usually codes aren't editable, but you can enable if needed
                            />
                        </div>

                        {/* Price & Unit */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded-md"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Unit (e.g., kg, pcs)</label>
                            <input
                                className="w-full border p-2 rounded-md"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            />
                        </div>

                        {/* Stock & Avatar */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock Level</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded-md"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>

                        <div className="col-span-2 flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-white">
    {previewUrl ? (
      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
    ) : (
      <div className="flex items-center justify-center h-full text-gray-400 text-xs text-center">No Image</div>
    )}
  </div>
  
  <div className="flex-1">
    <label className="block text-sm font-medium mb-1">Product Image</label>
    <input 
      type="file" 
      accept="image/*"
      onChange={handleFileChange}
      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
    />
  </div>
</div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    Updating...
                                </>
                            ) : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal