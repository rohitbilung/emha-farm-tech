import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { QrCode, Link as LinkIcon, Download, Printer, Loader2, Search } from 'lucide-react';
import api from '../../config/api';

const QRGenerator = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [loading, setLoading] = useState(true);

    // Base URL for your tracking page
    const BASE_TRACK_URL = "https://emhafarm.in/trace";

    useEffect(() => {
        const fetchBatches = async () => {
            setLoading(true);
            try {
                const res = await api.get('/batches');
                setBatches(res.data.data || []);
            } catch (err) {
                console.error("Error fetching batches for QR");
                // Fallback for demo
                setBatches([
                    { id: '1', batchNumber: 'BN-2026-001', name: 'Organic Kale' },
                    { id: '2', batchNumber: 'BN-2026-002', name: 'Organic Kale' },
                    { id: '3', batchNumber: 'BN-2026-003', name: 'Organic Kale' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const fullUrl = selectedBatch ? `${BASE_TRACK_URL}/${selectedBatch}` : '';

    const handleDownload = () => {
        const svg = document.querySelector(".qr-container svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = `QR-${selectedBatch}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Selection Card */}
            <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-stone-900 uppercase tracking-tighter italic">QR Label Generator</h2>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Generate tracking codes for packaging</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3 block ml-1">Select Active Batch</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                            <select
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-green-500 font-bold text-stone-700 appearance-none cursor-pointer transition-all"
                            >
                                <option value="">Choose a Batch Number...</option>
                                {batches.map(b => (
                                    <option key={b.id} value={b.batchNumber}>
                                        {b.batchNumber} — {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {fullUrl && (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
                            <LinkIcon size={16} className="text-green-600" />
                            <code className="text-xs font-bold text-green-700 truncate">{fullUrl}</code>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Display Card */}
            <div className={`printable-area transition-all duration-500 ${selectedBatch ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none translate-y-4'}`}>
                <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-xl flex flex-col items-center text-center">

                    <div className="qr-container p-6 bg-white border-8 border-stone-50 rounded-[2.5rem] shadow-inner mb-8">
                        {selectedBatch ? (
                            <QRCode
                                id="qr-code-canvas"
                                value={fullUrl}
                                size={200}
                                viewBox={`0 0 256 256`}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                fgColor="#1c1917" // stone-900
                            />
                        ) : (
                            <div className="w-[200px] h-[200px] flex items-center justify-center bg-stone-50 rounded-xl">
                                <QrCode size={40} className="text-stone-200" />
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-black text-stone-900">{selectedBatch || "No Batch Selected"}</h3>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Ready for Print Verification</p>
                    </div>

                    <div className="no-print flex gap-4 w-full max-w-sm">
                        <button
                            onClick={handlePrint}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-stone-100 text-stone-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-stone-200 transition"
                        >
                            <Printer size={18} /> Print
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition shadow-lg shadow-green-100">
                            <Download size={18} /> Download
                        </button>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    /* Hide everything else */
                    body * { visibility: hidden; }
  
                    /* Select the specific QR container and its children */
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
  
                    /* Position the QR at the top left of the page */
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        padding: 20px !important;
                    }

                    /* Explicitly hide buttons during print */
                    .no-print {
                        display: none !important;
                    }
                    }
            `}</style>
        </div>
    );
};

export default QRGenerator;