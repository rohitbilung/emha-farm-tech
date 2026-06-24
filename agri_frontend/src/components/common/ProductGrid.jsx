import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductSkeleton from '../common/ProductSkeleton';
// import api, { API_ENDPOINTS } from '../api/axios'; // Import our new tools

const ProductGrid = ({ products, loading, error, retry }) => {
    // Example of how you'd trigger a WhatsApp inquiry for a specific product
    const handleInquiry = (productName) => {
        const message = encodeURIComponent(`Hello Emhafarm, I would like to inquire about ${productName}.`);
        window.open(`https://wa.me/911234567890?text=${message}`, '_blank');
    };

    return (
        <section className="bg-stone-100 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-stone-900">Weekly Harvest</h2>
                        <p className="text-stone-500 mt-2 text-lg">The freshest picks from our fields today.</p>
                    </div>
                    <Link to="/products" className="flex items-center text-green-700 font-bold group border-b-2 border-transparent hover:border-green-700 transition-all">
                        View All Products <ArrowRight className="ml-2 group-hover:translate-x-2 transition" />
                    </Link>
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(products.length)].map((_, i) => <ProductSkeleton key={i} />)}
                    </div>
                )}

                {/* ERROR STATE */}
                {error && !loading && (
                    <div className="bg-white border border-red-100 p-12 rounded-3xl text-center shadow-sm">
                        <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-stone-800">Connection Interrupted</h3>
                        <p className="text-stone-500 mb-6">{error}</p>
                        <button 
                            onClick={retry} 
                            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-md"
                        >
                            <RefreshCw size={18} /> Try Again
                        </button>
                    </div>
                )}

                {/* DATA STATE */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.length > 0 ? (
                            products.slice(0, products.length).map((p) => (
                                <motion.div 
                                    key={p.id || p._id}
                                    whileHover={{ y: -10 }} 
                                    className="group bg-white p-4 rounded-2xl shadow-sm border border-stone-200 transition-all hover:shadow-xl"
                                >
                                    <div className="relative overflow-hidden rounded-xl mb-4">
                                        <img 
                                            src={p.avatar} 
                                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            alt={p.productName} 
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                onClick={() => handleInquiry(p.productName)}
                                                className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-green-600 hover:text-white transition-colors"
                                            >
                                                <MessageCircle size={16} /> Inquire Now
                                            </button>
                                        </div>
                                    </div>

                                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{p.category}</span>
                                    <h3 className="font-bold text-stone-900 text-lg">{p.productName}</h3>
                                    <p className="text-stone-500 mt-1 font-medium">{p.price}/{p.unit}</p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200">
                                <p className="text-stone-400 font-medium">No harvest items found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="my-6 h-[1px] w-full bg-gray-300"></div>
        </section>
    );
}

export default memo(ProductGrid);