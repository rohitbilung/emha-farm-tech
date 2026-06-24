import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Hero from '../components/common/Hero';
import About from '../components/common/About';
import ProductGrid from '../components/common/ProductGrid';
import Testimonials from '../components/common/Testimonials'; // Import new section
import Contact from '../components/common/Contact';
import api, { API_ENDPOINTS } from '../config/api'
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function LandingPage() {
    const [products, setProducts] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [heroIndex, setHeroIndex] = useState(0);
    const location = useLocation();
    const [showError, setShowError] = useState(false);

    const slideImages = [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000",
        "https://res.cloudinary.com/dxatj7ogd/image/upload/v1774333610/uploads/yympexkya0pwi1a58tvl.jpg"
    ];

    const fetchAllData = async () => {
    setLoading(true);

    try {
        const [prodRes, testRes] = await Promise.allSettled([
            api.get(API_ENDPOINTS.FEW_PRODUCTS),
            api.get(API_ENDPOINTS.TESTIMONIALS)
        ]);

        if (prodRes.status === "fulfilled") {
            setProducts(prodRes.value.data.product);
        }

        if (testRes.status === "fulfilled") {
            setTestimonials(testRes.value.data.data);
        }

    } catch (err) {
        console.log(err, "server error");
        setError("Our farm servers are resting. Please try again later.");
    } finally {
        setLoading(false);
        setPageLoading(false);
    }
};

    useEffect(() => {
        fetchAllData();
        if (location.state?.authError) {
            setShowError(true);
            // Auto-hide after 5 seconds
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
        const timer = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % slideImages.length);
        }, 5000);
        return () => clearInterval(timer);

    }, [slideImages.length, location]);

    if (pageLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-stone-50">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
                <p className="mt-4 text-stone-500 font-medium">Gathering the freshest data...</p>
            </div>
        );
    }

    return (
        <div className="pt-16">
            <AnimatePresence>
                {showError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-20 left-1/2 z-[100] w-full max-w-md px-4"
                    >
                        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-red-500 backdrop-blur-md bg-opacity-90">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <AlertCircle size={20} />
                                </div>
                                <p className="text-sm font-bold tracking-tight">
                                    {location.state.authError}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowError(false)}
                                className="p-1 hover:bg-white/10 rounded-lg transition"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Hero index={heroIndex} setIndex={setHeroIndex} slideImages={slideImages} />
            <About />
            <ProductGrid
                products={products}
                loading={loading}
                error={error}
                retry={fetchAllData}
            />
            
            {/* Testimonials will stay hidden if the array is empty */}
            {/* <Testimonials testimonials={testimonials} /> */}
            <Contact />
        </div>
    );
}