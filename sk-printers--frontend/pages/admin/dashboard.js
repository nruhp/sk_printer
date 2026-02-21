import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FaBox, FaSignOutAlt, FaBlog, FaEnvelope, FaQuoteLeft, FaTachometerAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ products: 0, blogs: 0, quotes: 0, contacts: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token) { router.push('/admin/login'); return; }
    setUser(JSON.parse(userData));
    fetchStats(token);
  }, []);

  const fetchStats = async (token) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [p, b, q, c] = await Promise.allSettled([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact`, { headers }),
      ]);
      setStats({
        products: p.value?.data?.data?.length || 0,
        blogs: b.value?.data?.data?.length || 0,
        quotes: q.value?.data?.data?.length || 0,
        contacts: c.value?.data?.data?.length || 0,
      });
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

  const statCards = [
    { label: 'Total Products', value: stats.products, color: 'bg-blue-500', icon: <FaBox />, href: '/admin/products' },
    { label: 'Blog Posts', value: stats.blogs, color: 'bg-green-500', icon: <FaBlog />, href: '/admin/blogs' },
    { label: 'Quote Requests', value: stats.quotes, color: 'bg-yellow-500', icon: <FaQuoteLeft />, href: '/admin/quotes' },
    { label: 'Contact Messages', value: stats.contacts, color: 'bg-red-500', icon: <FaEnvelope />, href: '/admin/contacts' },
  ];

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <Head><title>Dashboard - SK Printers Admin</title></Head>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="bg-gray-900 text-white w-64 min-h-screen p-4 fixed">
          <div className="text-2xl font-black mb-8">SK <span className="text-yellow-400">Admin</span></div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-400">{user?.role || 'Administrator'}</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className={`flex items-center p-3 rounded-lg transition-colors ${router.pathname === item.href ? 'bg-primary-600' : 'hover:bg-gray-800'}`}><span className="mr-3">{item.icon}</span>{item.name}</Link>
            ))}
          </nav>

          <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-gray-800 w-full mt-8 text-red-400">
            <FaSignOutAlt className="mr-3" />Logout
          </button>
        </aside>

        {/* Main */}
        <div className="flex-1 ml-64">
          <header className="bg-white shadow-sm p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <a href="/" target="_blank" className="px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all">
              View Website →
            </a>
          </header>

          <main className="p-6">
            {/* Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, i) => (
                <Link key={i} href={stat.href} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow block">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-xl`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-primary-600 text-sm mt-3 font-semibold">Manage →</p>
                  </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/products" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                    <FaBox className="text-3xl text-blue-500 mx-auto mb-2" />
                    <h3 className="font-bold">Add Product</h3>
                    <p className="text-sm text-gray-500 mt-1">Add 3-ply, 5-ply, 7-ply boxes</p>
                  </Link>
                <Link href="/admin/blogs" className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center">
                    <FaBlog className="text-3xl text-green-500 mx-auto mb-2" />
                    <h3 className="font-bold">New Blog Post</h3>
                    <p className="text-sm text-gray-500 mt-1">Write and publish articles</p>
                  </Link>
                <Link href="/admin/quotes" className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all text-center">
                    <FaQuoteLeft className="text-3xl text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold">View Quotes</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage quote requests</p>
                  </Link>
                <Link href="/admin/contacts" className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center">
                    <FaEnvelope className="text-3xl text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold">View Messages</h3>
                    <p className="text-sm text-gray-500 mt-1">Read contact messages</p>
                  </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
