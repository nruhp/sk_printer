import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FaBox, FaSignOutAlt, FaBlog, FaEnvelope, FaQuoteLeft, FaTachometerAlt, FaEye, FaTrash } from 'react-icons/fa';

export default function AdminContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data.data || []);
    } catch (err) {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact message?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      alert('Error deleting contact');
    }
  };

  const handleMarkRead = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, { isRead: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
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
      <Head><title>Contacts - SK Printers Admin</title></Head>
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
            <h1 className="text-2xl font-bold">Contact Messages</h1>
          </header>
          <main className="p-6">
            {loading ? (
              <div className="text-center py-20"><div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Email</th>
                      <th className="p-4 text-left">Subject</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? (
                      <tr><td colSpan="6" className="p-8 text-center text-gray-500">No contact messages yet.</td></tr>
                    ) : contacts.map((contact) => (
                      <tr key={contact._id} className={`border-t hover:bg-gray-50 ${!contact.isRead ? 'bg-blue-50' : ''}`}>
                        <td className="p-4 font-semibold">{contact.name}</td>
                        <td className="p-4">{contact.email}</td>
                        <td className="p-4 max-w-xs truncate">{contact.subject}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-sm ${contact.isRead ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700 font-semibold'}`}>
                            {contact.isRead ? 'Read' : 'New'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          <button onClick={() => { setSelectedContact(contact); handleMarkRead(contact._id); }} className="text-blue-600 hover:text-blue-700"><FaEye /></button>
                          <button onClick={() => handleDelete(contact._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
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

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4">
            <h2 className="text-2xl font-bold mb-6">Message Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Name</p><p className="font-semibold">{selectedContact.name}</p></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-semibold">{selectedContact.email}</p></div>
                <div><p className="text-sm text-gray-500">Phone</p><p className="font-semibold">{selectedContact.phone || '-'}</p></div>
                <div><p className="text-sm text-gray-500">Date</p><p className="font-semibold">{new Date(selectedContact.createdAt).toLocaleDateString()}</p></div>
              </div>
              <div><p className="text-sm text-gray-500">Subject</p><p className="font-semibold">{selectedContact.subject}</p></div>
              <div><p className="text-sm text-gray-500">Message</p><p className="bg-gray-50 p-4 rounded-lg mt-1">{selectedContact.message}</p></div>
            </div>
            <div className="flex gap-4 mt-6">
              <a href={`mailto:${selectedContact.email}`} className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-primary-700">
                Reply via Email
              </a>
              <button onClick={() => setSelectedContact(null)} className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
