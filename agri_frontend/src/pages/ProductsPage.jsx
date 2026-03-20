// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api, { API_ENDPOINTS } from '../config/api';

export default function ProductsPage() {
  const [allProducts, setallProducts] = useState([]);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_PRODUCTS}?page=${page}&limit=10`);
      setallProducts(response?.data?.data)
      setTotalPages(response?.data?.totalPages)
    } catch (error) {
      setError(`Our farm servers are resting. Please try again later.${error}`);
    } finally {
      setPageLoading(false);
    }

  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [page]);

  if (pageLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-stone-50">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="mt-4 text-stone-500 font-medium">Gathering the freshest data...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-stone-900 mb-12"
      >
        All Farm Products
      </motion.h1>

      {error && (
        <div className="bg-white border border-red-100 p-12 rounded-3xl text-center shadow-sm">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-stone-800">Connection Interrupted</h3>
          <p className="text-stone-500 mb-6">{error}</p>
          <button
            onClick={fetchProducts()}
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-md"
          >
            <RefreshCw size={18} /> Try Again
          </button>
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.length > 0 ? (
            allProducts.map((p) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={p.id || p._id}
                className="group cursor-pointer border border-gray-200 rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300" 
              >
                <div className="overflow-hidden rounded-2xl mb-4">
                  <img src={p.avatar} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <h3 className="font-bold text-lg">{p.productName}</h3>
                <p className="text-green-700 font-semibold">{p.price}/{p.unit}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400 font-medium">No harvest items found.</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded border
                ${page === pageNum
                ? "bg-green-600 text-white"
                : "bg-white hover:bg-gray-100"}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}