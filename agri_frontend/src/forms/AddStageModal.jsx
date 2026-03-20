import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Loader2, Send, Barcode, CheckCircle2, Camera } from 'lucide-react';
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import api, { API_ENDPOINTS } from '../config/api';

const AddStageModal = ({ isOpen, onClose, batch, onStageAdded }) => {
    const today = new Date();
    const formattedDate = `${today.toLocaleString('en-US', { month: 'short' })} ${today.getDate()}, 2026`;

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [previewType, setPreviewType] = useState("image");
    const scanInputRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const scannerRef = useRef(null);

    let usedStages =[]
    if(batch){
        usedStages = batch.timeline.length > 0 ? batch.timeline.map(item => item.stage): [];
    }

    const [formData, setFormData] = useState({
        barcodeId: '', // Optional
        stage: '',     // Mandatory
        date: formattedDate,
        desc: '',      // Mandatory
        image: null
    });

    // Still auto-focus for convenience, but it won't block the user
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => scanInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // 1. Initialize the scanner variable outside the function or in a ref

    const startCamera = async () => {
        setShowCamera(true);

        setTimeout(async () => {
            try {
                scannerRef.current = new Html5Qrcode("reader");

                await scannerRef.current.start(
                    { facingMode: "environment" },
                    {
                        fps: 20, // Higher FPS for smoother scanning
                        // qrbox: (viewfinderWidth, viewfinderHeight) => {
                        //     // Logic to make the scanning area match your green corners
                        //     return { width: viewfinderWidth * 0.6, height: viewfinderHeight * 0.6 };
                        // },
                        aspectRatio: 1.0
                    },
                    (decodedText) => {
                        setFormData((prev) => ({ ...prev, barcodeId: decodedText }));
                        stopCamera();
                    },
                    () => { }
                );
            } catch (err) {
                console.error("Camera error:", err);
            }
        }, 300);
    };

    const stopCamera = async () => {
        if (scannerRef.current) {
            try {
                // 3. If it's still scanning, stop the hardware stream
                if (scannerRef.current.isScanning) {
                    await scannerRef.current.stop();
                }
                // 4. Completely destroy the instance and clear the DOM
                scannerRef.current.clear();
                scannerRef.current = null;
            } catch (err) {
                console.warn("Error stopping camera:", err);
            }
        }
        setShowCamera(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }

        if (file.type.startsWith("video/")) {
            setPreviewType("video");
        } else {
            setPreviewType("image");
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only validate the fields that ARE mandatory
        if (!formData.stage || !formData.desc) {
            alert("Please select a stage and provide a description.");
            return;
        }

        setLoading(true);
        const data = new FormData();
        // Barcode is sent only if it exists
        if (formData.barcodeId) data.append('barcodeId', formData.barcodeId);
        data.append('stage', formData.stage);
        data.append('date', formData.date);
        data.append('desc', formData.desc);
        if (formData.image) data.append('image', formData.image);

        try {
            console.log("Updating DB. Barcode provided:", formData.barcodeId || "None");
            await api.put(API_ENDPOINTS.ADD_TIMELINE(batch._id), data);

            setTimeout(() => {
                onStageAdded();
                onClose();
                setLoading(false);
                setFormData({ barcodeId: '', stage: '', date: formattedDate, desc: '', image: null });
                setPreview(null);
            }, 1000);
        } catch (err) {
            alert("Failed to update database");
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
                        className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden z-20"
                    >
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                            <div>
                                <h3 className="font-black text-stone-900 uppercase tracking-tighter italic">Update Journey</h3>
                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest text-left">Manual entry or optional scan</p>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-stone-100 rounded-full text-stone-400 hover:text-stone-900 transition"><X size={18} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">

                            {/* OPTIONAL Barcode Scanner Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                                        Barcode (Optional)
                                    </label>
                                    {formData.barcodeId && (
                                        <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">
                                            Scanned!
                                        </span>
                                    )}
                                </div>

                                <div className="relative">
                                    {/* Left Icon (Barcode) */}
                                    <Barcode
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${formData.barcodeId ? 'text-green-500' : 'text-stone-300'}`}
                                        size={20}
                                    />

                                    <input
                                        ref={scanInputRef}
                                        type="text"
                                        placeholder="Click here and scan..."
                                        value={formData.barcodeId}
                                        onChange={(e) => setFormData({ ...formData, barcodeId: e.target.value })}
                                        className={`w-full pl-12 pr-12 py-3 rounded-2xl border outline-none transition-all font-mono text-sm z-0 ${formData.barcodeId
                                            ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                                            : 'bg-stone-50 border-stone-100 focus:border-stone-400'
                                            }`}
                                    />

                                    {/* Right Icon (Camera Button) */}
                                    <button
                                        type="button"
                                        onClick={startCamera} // Direct function call
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-stone-200 rounded-full transition-colors"
                                    >
                                        <Camera className="text-stone-400" size={20} />
                                    </button>

                                    {/* Camera Modal */}
                                    {showCamera && (
                                        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
                                            <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">

                                                {/* Header */}
                                                <div className="pt-8 pb-4 text-center">
                                                    <h2 className="text-white text-lg font-medium tracking-tight">QR Barcode Scanner</h2>
                                                </div>

                                                {/* Scanner Container */}
                                                <div className="relative p-6 aspect-square">
                                                    {/* The Actual Camera Feed */}
                                                    <div id="reader" className="w-full h-full rounded-2xl overflow-hidden"></div>

                                                    {/* The Viewfinder Overlay (The Green Corners) */}
                                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-12">
                                                        <div className="relative w-full h-full">
                                                            {/* Top Left */}
                                                            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#C1FF72] rounded-tl-lg"></div>
                                                            {/* Top Right */}
                                                            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#C1FF72] rounded-tr-lg"></div>
                                                            {/* Bottom Left */}
                                                            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#C1FF72] rounded-bl-lg"></div>
                                                            {/* Bottom Right */}
                                                            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#C1FF72] rounded-br-lg"></div>

                                                            {/* Optional: Scanning Line Animation */}
                                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C1FF72]/40 shadow-[0_0_15px_#C1FF72] animate-scan-line"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Footer / Controls */}
                                                <div className="p-8 pt-2">
                                                    <button
                                                        onClick={stopCamera}
                                                        className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all backdrop-blur-md"
                                                    >
                                                        Close Scanner
                                                    </button>
                                                </div>
                                            </div>

                                            {/* CSS to clean up library elements and add animation */}
                                            <style dangerouslySetInnerHTML={{
                                                __html: `
      #reader { border: none !important; }
      #reader__scan_region { background: transparent !important; }
      #reader__dashboard { display: none !important; }
      video { 
        object-fit: cover !important; 
        width: 100% !important; 
        height: 100% !important; 
        border-radius: 1rem;
      }
      @keyframes scan {
        0% { top: 0%; }
        100% { top: 100%; }
      }
      .animate-scan-line {
        position: absolute;
        animation: scan 2s linear infinite;
      }
    `}} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* MANDATORY Stage Selection */}
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2 block ml-1">Stage <span className="text-red-400">*</span></label>
                                <select
                                    required
                                    value={formData.stage}
                                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                    className="w-full px-5 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700"
                                >
                                    <option>Select Stages</option>
                                    <option value="Seeding" disabled={usedStages.includes("Seeding")}>
                                        Seeding {usedStages.includes("Seeding") && "(Already Added)"}
                                    </option>

                                    <option value="Cultivation" disabled={usedStages.includes("Cultivation")}>
                                        Cultivation {usedStages.includes("Cultivation") && "(Already Added)"}
                                    </option>

                                    <option value="Harvest" disabled={usedStages.includes("Harvest")}>
                                        Harvest {usedStages.includes("Harvest") && "(Already Added)"}
                                    </option>

                                    <option value="Packaging" disabled={usedStages.includes("Packaging")}>
                                        Packaging {usedStages.includes("Packaging") && "(Already Added)"}
                                    </option>
                                </select>
                            </div>

                            {/* MANDATORY Description */}
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2 block ml-1">Description <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    rows="2"
                                    placeholder="Enter details..."
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full px-5 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-green-500 text-sm font-medium resize-none"
                                />
                            </div>

                            {/* Optional Media */}
                            <div className="relative group">
                                <input type="file" id="stageImg" className="hidden" onChange={handleImageChange} accept="image/*,video/*" />
                                <label htmlFor="stageImg" className="flex items-center justify-center w-full h-20 bg-dashed border-2 border-dashed border-stone-100 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition overflow-hidden">
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
                                            <span className="text-xs text-gray-400 font-medium">Add Photo or Video</span>
                                        </div>
                                    )}
                                </label>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600 transition shadow-xl"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Submit Update</>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddStageModal;