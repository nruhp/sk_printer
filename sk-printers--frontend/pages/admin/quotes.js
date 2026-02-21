import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FaBox, FaSignOutAlt, FaBlog, FaEnvelope, FaQuoteLeft, FaTachometerAlt, FaEye, FaTrash, FaCheck } from 'react-icons/fa';

export default function AdminQuotes() {
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuotes(res.data.data || []);
    } catch (err) {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this quote?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQuotes();
    } catch (err) {
      alert('Error deleting quote');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/quotes/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQuotes();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, href: '/admin/dashboard' },
    { name: 'Products', icon: <FaBox />, href: '/admin/products' },
    { name: 'Blogs', icon: <FaBlog />, href: '/admin/blogs' },
    { name: 'Quotes', icon: <FaQuoteLeft />, href: '/admin/quotes' },
    { name: 'Contacts', icon: <FaEnvelope />, href: '/admin/contacts' },
  ];

  return (
    <>
      <Head><title>Quotes - SK Printers Admin</title></Head>
      <div className="min-h-screen bg-gray-100 flex">
        <aside className="bg-gray-900 text-white w-64 min-h-screen p-4 fixed">
          <div className="text-2xl font-black mb-8">SK <span className="text-yellow-400">Admin</span></div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className={`flex items-center p-3 rounded-lg transition-colors ${router.pathname === item.href ? 'bg-primary-600' : 'hover:bg-gray-800'}`}><span className="mr-3">{item.icon}</span>{item.name}</Link>
            ))}
          </nav>
          <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-gray-800 w-full mt-8 text-red-400">
            <FaSignOutAlt className="mr-3" />Logout
          </button>
        </aside>

        <div className="flex-1 ml-64">
          <header className="bg-white shadow-sm p-6">
            <h1 className="text-2xl font-bold">Quote Requests</h1>
          </header>
          <main className="p-6">
            {loading ? (
              <div className="text-center py-20"><div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">Customer</th>
                      <th className="p-4 text-left">Company</th>
                      <th className="p-4 text-left">Box Type</th>
                      <th className="p-4 text-left">Quantity</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.length === 0 ? (
                      <tr><td colSpan="6" className="p-8 text-center text-gray-500">No quote requests yet.</td></tr>
                    ) : quotes.map((quote) => (
                      <tr key={quote._id} className="border-t hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-semibold">{quote.name}</div>
                          <div className="text-sm text-gray-500">{quote.email}</div>
                        </td>
                        <td className="p-4">{quote.company || '-'}</td>
                        <td className="p-4">{quote.boxType}</td>
                        <td className="p-4">{quote.quantity}</td>
                        <td className="p-4">
                          <select value={quote.status || 'pending'}
                            onChange={e => handleStatusUpdate(quote._id, e.target.value)}
                            className={`px-2 py-1 rounded text-sm border ${quote.status === 'completed' ? 'bg-green-100 text-green-700' : quote.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          <button onClick={() => setSelectedQuote(quote)} className="text-blue-600 hover:text-blue-700"><FaEye /></button>
                          <button onClick={() => handleDelete(quote._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4">
            <h2 className="text-2xl font-bold mb-6">Quote Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Name</p><p className="font-semibold">{selectedQuote.name}</p></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-semibold">{selectedQuote.email}</p></div>
                <div><p className="text-sm text-gray-500">Phone</p><p className="font-semibold">{selectedQuote.phone}</p></div>
                <div><p className="text-sm text-gray-500">Company</p><p className="font-semibold">{selectedQuote.company || '-'}</p></div>
                <div><p className="text-sm text-gray-500">Box Type</p><p className="font-semibold">{selectedQuote.boxType}</p></div>
                <div><p className="text-sm text-gray-500">Quantity</p><p className="font-semibold">{selectedQuote.quantity}</p></div>
                <div><p className="text-sm text-gray-500">Dimensions</p><p className="font-semibold">{selectedQuote.length}×{selectedQuote.width}×{selectedQuote.height} cm</p></div>
                <div><p className="text-sm text-gray-500">Printing</p><p className="font-semibold">{selectedQuote.printing ? 'Yes' : 'No'}</p></div>
              </div>
              {selectedQuote.specialRequirements && (
                <div><p className="text-sm text-gray-500">Special Requirements</p><p className="font-semibold">{selectedQuote.specialRequirements}</p></div>
              )}
            </div>
            <button onClick={() => setSelectedQuote(null)} className="mt-6 w-full border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
