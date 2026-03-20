import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react';
import api, { API_ENDPOINTS } from '../../config/api';
import AddProductModal from '../../forms/AddProductModal';
import EditProductModal from '../../forms/EditProductModal';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_PRODUCTS}?page=${page}&limit=${5}`);
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setLoading(true)
      await api.delete(API_ENDPOINTS.DELETE_PRODUCT(id));
      fetchProducts()
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUpdateProduct = async (updatedData) => {
    console.log(updatedData, "uuu")
    // Logic to call your API
    // await api.put(API_ENDPOINTS.UPDATE_PRODUCT(updatedData.id), updatedData);
    fetchProducts(); // Refresh list
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-400">Showing page {page} of {totalPages}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-lg"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
      ) : (
        <div className="grid gap-4">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 font-black text-xl overflow-hidden border border-green-100 shadow-inner">
                    {product.avatar ? (
                      <img src={product.avatar} alt={product.productName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{product.productName[0].toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{product.productName}</h4>
                    <p className="text-sm text-gray-400 font-mono">
                      <span>Item-Code: {product.uniqueCode} •</span> Stock: {product.stock}{product.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-green-600 mr-4">₹{product.price}/{product.unit}</span>
                  <button onClick={() => handleEditClick(product)} className="p-3 bg-stone-50 text-gray-400 rounded-xl hover:text-green-600 transition"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(product._id)} className="p-3 bg-stone-50 text-gray-400 rounded-xl hover:text-red-600 transition">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin text-green-600" size={24} />
                        <span className="text-sm font-medium text-gray-600">Deleting...</span>
                      </div>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            ))) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400 font-medium">No harvest items found.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination Numbers */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`w-10 h-10 rounded-xl font-bold transition ${page === pageNum ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'
              }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <EditProductModal
        isOpen={isEditOpen}
        product={selectedProduct}
        onClose={() => setIsEditOpen(false)}
        onSave={handleUpdateProduct}
      />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </div>
  );
};

export default ProductManagement;