import React, { useState, useEffect } from 'react';
import {
  Layers, Search, Loader2, ArrowRight,
  MapPin, Calendar, CheckCircle2, Plus
} from 'lucide-react';
import api, { API_ENDPOINTS } from '../../config/api';
import TimelineModal from '../../forms/TimelineModal';
import AddStageModal from '../../forms/AddStageModal';

const FarmerBatches = ({farmerId}) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isAddStageOpen, setIsAddStageOpen] = useState(false);
  const [farmerFilter, setFarmerFilter] = useState(''); // Selected ID
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handleOpenTimeline = (batch) => {
    setSelectedBatch(batch);
    setIsTimelineOpen(true);
  };

  const handleOpenAddStage = (batch) => {
    setSelectedBatch(batch);
    setIsAddStageOpen(true);
  };
  // Fetch the list of farmers once on mount
  useEffect(() => {
    // Set the farmer filter from prop once (prop may change when auth changes)
    setFarmerFilter(farmerId || '');
  }, [farmerId]);

  useEffect(() => {
    // Fetch batches whenever filters/pagination/search change
    fetchBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmerFilter, searchTerm, currentPage]);

  const fetchBatches = async () => {
    setLoading(true);
    try {
        
      const response = await api.get(API_ENDPOINTS.GET_BATCHES, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm || undefined,
          farmerId: farmerFilter || undefined // Send the farmer ID to the backend
        }
      });

      setBatches(response?.data?.data || []);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Update fetchBatches to include the farmer filter
 
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-[0.2em]">Live Production Batches</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
          <input
            type="text"
            placeholder="Search batch number..."
            value={searchTerm}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl outline-none focus:border-green-500 transition font-medium text-stone-600"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

      </div>
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product & Batch</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Stage</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Harvest Date</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="5" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-green-600" /></td></tr>
            ) : batches.map((batch) => (
              <tr key={batch._id} className="hover:bg-stone-50/40 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={batch.mainImg} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt="" />
                    <div>
                      <div className="text-sm font-black text-gray-900">{batch.productName}</div>
                      <div className="whitespace-nowrap text-[11px] font-mono text-green-600 font-bold">{batch.batchId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={14} className="text-stone-300" />
                    <span className="text-xs font-bold truncate max-w-[150px] cursor-pointer" title={batch.farmName}>{batch.farmName}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="whitespace-nowrap px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wider border border-green-100">
                      {batch.timeline.length > 0 ? batch.timeline[0].stage : 'not started'} {/* First item in array is usually the latest stage */}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={14} />
                    <span className="text-xs font-bold">{batch.harvestDate}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleOpenAddStage(batch)}
                      className="p-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-green-600 hover:text-white transition flex-shrink-0"
                      title="Add Journey Stage"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => handleOpenTimeline(batch)}
                      className="inline-flex items-center gap-2 text-xs font-black text-green-600 hover:text-green-700 transition uppercase tracking-tighter whitespace-nowrap">
                      Timeline <ArrowRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add this after the </table> */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs font-bold text-stone-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-white border border-stone-200 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages || loading}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-stone-900 text-white rounded-xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Add the Modal component at the bottom */}
      <AddStageModal
        isOpen={isAddStageOpen}
        onClose={() => setIsAddStageOpen(false)}
        batch={selectedBatch}
        onStageAdded={() => fetchBatches()} // Re-fetch data after update
      />
      <TimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        batch={selectedBatch}
      />
    </div>
  );
};

export default FarmerBatches;