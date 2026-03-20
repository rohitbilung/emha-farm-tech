import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import api, { API_ENDPOINTS } from '../../config/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${API_ENDPOINTS.PENDING_USER}?page=${page}&{limit=5}`);
      setUsers(response.data.data || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    if (action === 'reject' && !window.confirm("Reject this user?")) return;
    setProcessingId(userId);
    try {
      if (action === 'accept') {
        await api.put(API_ENDPOINTS.VALIDATE_USER(userId), { status: 'employee' });
      } else {
        await api.delete(API_ENDPOINTS.DELETE_USER(userId));
      }
      
      if (users.length === 1 && page > 1) setPage(p => p - 1);
      else fetchUsers();
    } catch (err) {
      alert("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">User Name</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-green-600" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">No pending validations</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="hover:bg-stone-50/50 transition">
                  <td className="px-8 py-6 font-bold text-gray-900">{user.name}</td>
                  <td className="px-8 py-6 font-bold text-gray-900">{user.email}</td>
                  <td className="px-8 py-6 font-bold text-gray-900">{user.role}</td>
                  <td className="px-8 py-6 text-right">
                    {processingId === user.id ? (
                      <Loader2 className="animate-spin text-green-600 inline-block" size={20} />
                    ) : (
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleAction(user._id, 'accept')} className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition">
                          <CheckCircle size={24} />
                        </button>
                        <button onClick={() => handleAction(user._id, 'reject')} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition">
                          <XCircle size={24} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 py-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition font-medium"
        >
          Previous
        </button>
        <span className="font-bold text-gray-600">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;