import React, { useState } from 'react';
import { QrCode, Sprout, Leaf, Boxes, AlertTriangle, CheckCircle2 } from 'lucide-react';
// Assuming you have a reusable Modal component
// import Modal from './components/Modal'; 
// Reusing your existing AddStageModal
import AddStageModal from '../forms/AddStageModal'; 
// Reusing your existing BatchesTable/List component
import BatchesList from '../components/admin/BatchManagement'; 

const FarmerDashboard = ({ farmerId, farmerName }) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null); // 'success', 'error', or null
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');

  // 1. Scanner Logic (Placeholder for library like html5-qrcode)
  const handleStartScan = () => {
    setIsScannerOpen(true);
    setScanResult(null);
    console.log("Opening Camera API...");
    // Fake successful scan after 2 seconds for demonstration
    setTimeout(() => {
        setIsScannerOpen(false);
        setScanResult('success');
        // In reality, you'd call an API here: api.verifyProduct(scannedCode)
    }, 2000);
  };

  // 2. Limited Stages for the Update Modal
  const farmerStages = ["Cultivation", "Harvest"];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-12">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-stone-100 p-6 sticky top-0 z-10 shadow-sm">
        <p className="text-xs font-black text-green-600 uppercase tracking-widest">Farmer Portal</p>
        <h1 className="text-3xl font-extrabold text-stone-950 mt-1">Hello, {farmerName || 'Farmer'}!</h1>
        <p className="text-stone-500 text-sm mt-1">Ready for today's tasks?</p>
      </header>

      <main className="p-4 md:p-8 space-y-6">

        {/* --- 3-COLUMN CARD GRID (Responsive) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* --- CARD 1: SCAN PRODUCT --- */}
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100 mb-6 group-hover:bg-green-100 transition">
              <QrCode size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-950">Verify Product</h2>
            <p className="text-stone-500 mt-2 mb-8 text-sm leading-relaxed">Scan the barcode on the item to check if it's real.</p>
            
            <button 
                onClick={handleStartScan}
                className="w-full py-5 bg-green-600 text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-200 hover:bg-green-700 active:bg-green-800 transition"
            >
              <QrCode size={24} />
              Open Camera & Scan
            </button>

            {/* Scan Feedback Message */}
            {scanResult === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-xl border border-green-100 font-bold w-full justify-center">
                    <CheckCircle2 size={20} /> Product Verified
                </div>
            )}
            {scanResult === 'error' && (
                <div className="mt-4 flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-xl border border-red-100 font-bold w-full justify-center">
                    <AlertTriangle size={20} /> Not Found
                </div>
            )}
          </div>

          {/* --- CARD 2: UPDATE TIMELINE --- */}
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center border-4 border-amber-100 mb-6 group-hover:bg-amber-100 transition">
              <Leaf size={40} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-950">Update Progress</h2>
            <p className="text-stone-500 mt-2 mb-8 text-sm leading-relaxed">Did you start planting or finish harvesting? Let us know.</p>
            
            {/* For Mobile: It's easier to tap a big button than select a batch first */}
            <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="w-full py-5 bg-amber-500 text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg shadow-amber-100 hover:bg-amber-600 active:bg-amber-700 transition"
            >
              <Sprout size={24} />
              Add Activity
            </button>
          </div>

          {/* --- CARD 3: MY BATCHES (Overview) --- */}
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all md:col-span-1 col-span-1">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center border-4 border-stone-200 mb-6 group-hover:bg-stone-200 transition">
              <Boxes size={40} className="text-stone-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-950">My Batches</h2>
            <p className="text-stone-500 mt-2 mb-8 text-sm leading-relaxed">See all the active crops assigned to you.</p>
            
            {/* Anchor tag to scroll down to the full list */}
            <a href="#batch-list-section" className="w-full py-5 bg-stone-800 text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg shadow-stone-200 hover:bg-stone-950 active:bg-black transition">
              View List
            </a>
          </div>

        </div> {/* End Grid */}


        {/* --- FULL BATCH LIST SECTION --- */}
        <section id="batch-list-section" className="mt-12 bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-stone-950">Your Active Batches</h2>
            <span className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-black rounded-full uppercase tracking-wider border border-green-100">
                Live Data
            </span>
          </div>
          
          {/* Reusing your existing component, passing the filter */}
          <BatchesList 
            filter={{ assignedFarmerId: farmerId }} 
            isMobileView={true} // Hint to the component to render cards, not a table
          />
        </section>

      </main>

      {/* --- MODALS --- */}

      {/* 1. Placeholder Scan Modal */}
      {/* <Modal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} title="Scan Barcode">
        <div className="aspect-square bg-black rounded-2xl flex items-center justify-center text-white text-sm font-mono p-4 text-center">
            [ Camera View Container ]<br/>
            (Integrate html5-qrcode here)
        </div>
        <p className="text-center text-stone-500 mt-4 text-sm">Point camera at the product barcode</p>
      </Modal> */}

      {/* 2. Reusing your AddStageModal (Modified to handle limited stages) */}
      <AddStageModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        farmerId={farmerId} // Maybe needed to filter batch selection inside modal
        allowedStages={farmerStages} // **NEW PROP** to restrict dropdown
        onStageAdded={() => { /* refresh data */ }}
      />

    </div>
  );
};

export default FarmerDashboard;