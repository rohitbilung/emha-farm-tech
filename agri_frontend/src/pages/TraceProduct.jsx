import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api, { API_ENDPOINTS } from '../config/api';
import mockDb from '../../db.json';

const ProductTransparencyPortal = () => {
  const { getBatchParam } = useParams();
  const [batchData, setBatchData] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.TRACE_PRODUCT(getBatchParam))
        setBatchData(response?.data?.data)
        setLoading(false);
      } catch (error) {
        setError(`Our farm servers are resting. Please try again later.${error}`);
      }
    }
    fetchBatch();
    // setBatchData(mockDb);

  }, [getBatchParam]);

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollSentinelRef = useRef(null);

  useEffect(() => {
    if (loading) return; // Don't start observer if we are still loading

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: [1.0],
        rootMargin: "-1px 0px 0px 0px" // Trigger exactly at the top
      }
    );

    if (scrollSentinelRef.current) {
      observer.observe(scrollSentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading]); // Re-run this effect when loading finishes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">
        <div className="animate-pulse text-stone-400 font-serif">Loading Batch...</div>
      </div>
    );
  }

  if (!batchData) return <div className="p-20 text-center text-gray-400">Verifying Batch Authenticity...</div>;

  // Since it's for customers, we show the full journey (all steps are complete)
  // const displayPhases = [...batchData.timeline].reverse();

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-slate-900 pb-10">
      <div ref={scrollSentinelRef} className="absolute top-0 w-full h-px pointer-events-none" />
      {/* 1. BRAND & BATCH HEADER */}
      <div className={`
        bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm transition-all duration-300
        ${isScrolled ? 'py-2' : 'py-6'} 
      `}>
        {/* container is max-w-full to allow logo to sit at the edge */}
        <div className="max-w-full px-6 py-4 flex items-center justify-between">

          {/* 1. LEFT COLUMN: Brand Logo */}
          <div className="flex-1 flex justify-start">
            <div className="flex flex-col leading-none border-l-4 border-emerald-900 pl-3">
              <span className="text-sm font-black text-green-700 tracking-tighter uppercase">Emhafarm</span>
              <span className="text-[10px] text-emerald-600 font-bold tracking-[0.2em] uppercase">Pvt Ltd</span>
            </div>
          </div>

          {/* 2. CENTER COLUMN: Product Info (The "Hero" of the header) */}
          <div className="flex-[2] flex flex-col items-center text-center">
            {/* PRODUCT IMAGE CIRCLE */}
            <div className={`
              relative transition-all duration-300
              ${isScrolled ? 'w-10 h-10 mb-0' : 'w-14 h-14 mb-2'}
            `}>
              <div className="w-full h-full rounded-full border-2 border-stone-100 shadow-inner overflow-hidden bg-stone-50">
                <img
                  src={batchData.mainImg}
                  alt={batchData.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">
                ✓
              </div>
            </div>

            <h1 className={`
              font-serif font-bold text-stone-800 transition-all duration-300
              ${isScrolled ? 'text-sm' : 'text-xl'}
            `}>
              {batchData.productName}
            </h1>
            <div className="text-[9px] bg-stone-100 px-2 py-0.5 rounded font-mono text-stone-500 font-bold">
              BATCH: {batchData.batchId}
            </div>
            {/* <div className={`transition-all duration-300 ${isScrolled ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>
              <div className="text-[9px] bg-stone-100 px-2 py-0.5 rounded font-mono text-stone-500 font-bold">
                BATCH: {batchData.batchId}
              </div>
            </div> */}
          </div>

          {/* 3. RIGHT COLUMN: Spacer (Keeps center content perfectly centered) */}
          <div className="flex-1 flex justify-end">
            <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest hidden sm:block">
              Verified History
            </div>
          </div>

        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="max-w-xl mx-auto px-6 grid grid-cols-2 gap-4 -mt-4 relative z-40">
        <div className="bg-white p-4 rounded-2xl shadow-md border border-stone-200">
          <p className="text-[10px] text-stone-400 uppercase font-bold">Origin</p>
          <p className="text-sm font-semibold">{batchData.farmName}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border border-stone-200">
          <p className="text-[10px] text-stone-400 uppercase font-bold">Harvest Date</p>
          <p className="text-sm font-semibold">{batchData.harvestDate}</p>
        </div>
      </div>

      {/* SUSTAINABILITY DASHBOARD */}
      <div className="max-w-xl mx-auto px-6 mt-8">
        <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-widest">Sustainability Score</p>
                <h2 className="text-3xl font-black">Grade {mockDb.sustainability.grade}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-widest">Total Footprint</p>
                <p className="text-xl font-mono">{mockDb.sustainability.totalFootprint}</p>
              </div>
            </div>

            {/* Mini Progress Bars for Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {mockDb.sustainability.metrics.map(metric => (
                <div key={metric.label}>
                  <div className="flex justify-between text-[10px] mb-1 font-bold uppercase">
                    <span>{metric.icon} {metric.label}</span>
                    <span>{metric.score}/10</span>
                  </div>
                  <div className="h-1.5 w-full bg-emerald-800 rounded-full">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${metric.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Abstract Background Decoration */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* 3. THE JOURNEY (Timeline) */}
      <div className="max-w-xl mx-auto px-6 mt-12 relative">
        {/* Decorative Line */}
        <div className="absolute left-10 top-0 bottom-0 w-px bg-stone-200" />

        {batchData.timeline.map((phase, index) => (
          <div key={phase.id} className="relative mb-12 last:mb-0 pl-12">

            {/* Timeline Icon */}
            <div className="absolute left-[-4px] top-0 w-9 h-9 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center text-lg z-10 shadow-sm">
              {mockDb.icons.find(i => i.stage === phase.stage)?.icon}
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">

              {/* Media Section: Pre-recorded Video/Photo */}
              <div className="aspect-video bg-stone-200 relative">
                {/* In a real app, use: <video src={phase.mediaUrl} className="w-full h-full object-cover" /> */}
                {phase.media.match(/\.(mp4|webm|ogg)$/i) ?
                  <video src={phase.media} controls muted playsInline className="w-full h-full object-cover" /> :
                  <img src={phase.media} className="w-full h-full object-cover" />}
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded font-mono">
                  RECORDED: {phase.date}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5">
                <h3 className="font-bold text-stone-800 text-lg">{phase.stage}</h3>
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CertificateGallery
        batch={batchData.batchId}
      />
    </div>
  );
};



// 2. Add this Component at the bottom of your main page
const CertificateGallery = (batch) => {
  const certificates = [
    { id: 1, name: "USDA Organic", issuer: "Dept. of Agriculture", icon: "📜", image: "organic_cert.jpg" },
    { id: 2, name: "ISO 22000", issuer: "Food Safety Mgmt", icon: "🛡️", image: "iso_cert.jpg" },
    { id: 3, name: "Fair Trade", issuer: "Fairtrade Intl.", icon: "🤝", image: "fair_trade.jpg" },
    { id: 4, name: "Carbon Neutral", issuer: "Climate Standard", icon: "🌍", image: "carbon_cert.jpg" }
  ];
  return (
    <section className="max-w-xl mx-auto px-6 mt-12  border-t border-stone-200 pt-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-stone-800">Quality & Compliance</h2>
        <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-semibold">Verified Certificates</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative bg-white border border-stone-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-default overflow-hidden"
          >
            {/* The "View Only" Overlay */}
            <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-stone-600 shadow-sm">
                Official Document
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-2xl mb-3">
                {cert.icon}
              </div>
              <h3 className="text-sm font-bold text-stone-800 leading-tight">{cert.name}</h3>
              <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">{cert.issuer}</p>
            </div>

            {/* Subtle Document "Watermark" Decoration */}
            <div className="absolute -bottom-2 -right-2 opacity-[0.03] rotate-12 pointer-events-none">
              <i className="fa-thin fa-file-certificate text-6xl"></i>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-3">
        <span className="text-lg">🛡️</span>
        <p className="text-[10px] text-stone-500 leading-relaxed italic">
          Documents shown are digital copies for batch verification purposes. These records are cryptographically linked to <strong>Batch - {batch.batch}</strong> to ensure authenticity without allowing unauthorized distribution.
        </p>
      </div>
      <div className='mt-5 text-center px-10 pb-10'>
        <p className="text-stone-600 text-xs italic">
          Thank you for choosing transparent production.<br />Scan your next product to see its story.
        </p>
      </div>

      {/* 3. MAIN WEBSITE LINK */}
      <div className="text-center">
        <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest mb-4">Explore our Website</p>
        <a
          href="https://emhafarm.in"
          // target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-stone-800 transition-colors shadow-lg active:scale-95"
        >
          <span>Visit emhafarm.in</span>
          <span className="text-stone-400">→</span>
        </a>
      </div>

      {/* 4. COPYRIGHT & LOGO */}
      <div className="flex flex-col items-center border-t border-stone-100 pt-8">
        <div className="flex items-center gap-2 mb-2 opacity-30">
          <div className="w-5 h-5 bg-stone-900 rounded flex items-center justify-center text-[8px] text-white font-bold">EF</div>
          <span className="text-[9px] font-black uppercase tracking-tighter text-stone-800">Emhafarm Origins</span>
        </div>
        <p className="text-[9px] text-stone-300 font-medium">
          © 2026 Emhafarm Pvt Ltd. All production records are immutable.
        </p>
      </div>
    </section>
  );
};

export default ProductTransparencyPortal;