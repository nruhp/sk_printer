import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaBox, FaSignOutAlt, FaBlog, FaEnvelope, FaQuoteLeft, FaTachometerAlt } from 'react-icons/fa';

export default function AdminBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '', category: 'packaging-tips',
    tags: '', status: 'draft', readTime: 5
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(res.data.data || []);
    } catch (err) {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
    try {
      if (editBlog) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${editBlog._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setEditBlog(null);
      setForm({ title: '', content: '', excerpt: '', category: 'packaging-tips', tags: '', status: 'draft', readTime: 5 });
      fetchBlogs();
    } catch (err) {
      alert('Error saving blog: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setForm({
      title: blog.title, content: blog.content, excerpt: blog.excerpt,
      category: blog.category, tags: blog.tags?.join(', ') || '',
      status: blog.status, readTime: blog.readTime
    });
    setShowModal(true);
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
      <Head><title>Blogs - SK Printers Admin</title></Head>
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
          <header className="bg-white shadow-sm p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Blog Management</h1>
            <button onClick={() => { setShowModal(true); setEditBlog(null); setForm({ title: '', content: '', excerpt: '', category: 'packaging-tips', tags: '', status: 'draft', readTime: 5 }); }}
              className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              <FaPlus className="mr-2" />New Blog Post
            </button>
          </header>

          <main className="p-6">
            {loading ? (
              <div className="text-center py-20"><div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">Title</th>
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Read Time</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">No blog posts yet. Create your first post!</td></tr>
                    ) : blogs.map((blog) => (
                      <tr key={blog._id} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-semibold max-w-xs truncate">{blog.title}</td>
                        <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{blog.category}</span></td>
                        <td className="p-4"><span className={`px-2 py-1 rounded text-sm ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{blog.status}</span></td>
                        <td className="p-4">{blog.readTime} min</td>
                        <td className="p-4">
                          <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-700 mr-4"><FaEdit /></button>
                          <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold mb-6">{editBlog ? 'Edit Blog Post' : 'New Blog Post'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Excerpt (Short Description)</label>
                <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows="2" required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Content</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows="6" required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none">
                    <option value="packaging-tips">Packaging Tips</option>
                    <option value="industry-news">Industry News</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="guides">Guides</option>
                    <option value="company-news">Company News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="packaging, boxes, tips"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Read Time (minutes)</label>
                  <input type="number" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700">
                  {editBlog ? 'Update Post' : 'Create Post'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
