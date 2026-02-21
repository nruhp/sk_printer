import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaBox, FaSignOutAlt, FaBlog, FaEnvelope, FaQuoteLeft, FaTachometerAlt } from 'react-icons/fa';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', category: '3-ply', price: '', minOrder: '', stock: 'available'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editProduct) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${editProduct._id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setEditProduct(null);
      setForm({ name: '', description: '', category: '3-ply', price: '', minOrder: '', stock: 'available' });
      fetchProducts();
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name, description: product.description,
      category: product.category, price: product.price,
      minOrder: product.minOrder, stock: product.stock
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
      <Head><title>Products - SK Printers Admin</title></Head>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <header className="bg-white shadow-sm p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Products Management</h1>
            <button onClick={() => { setShowModal(true); setEditProduct(null); setForm({ name: '', description: '', category: '3-ply', price: '', minOrder: '', stock: 'available' }); }}
              className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              <FaPlus className="mr-2" />Add Product
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
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Min Order</th>
                      <th className="p-4 text-left">Stock</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr><td colSpan="6" className="p-8 text-center text-gray-500">No products yet. Add your first product!</td></tr>
                    ) : products.map((product) => (
                      <tr key={product._id} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-semibold">{product.name}</td>
                        <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{product.category}</span></td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">{product.minOrder} units</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded text-sm ${product.stock === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock}</span></td>
                        <td className="p-4">
                          <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-700 mr-4"><FaEdit /></button>
                          <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4">
            <h2 className="text-2xl font-bold mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Product Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="3" required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none">
                    <option value="3-ply">3-Ply</option>
                    <option value="5-ply">5-Ply</option>
                    <option value="7-ply">7-Ply</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Stock Status</label>
                  <select value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none">
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Min Order (units)</label>
                  <input type="number" value={form.minOrder} onChange={e => setForm({...form, minOrder: e.target.value})} required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700">
                  {editProduct ? 'Update Product' : 'Add Product'}
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
