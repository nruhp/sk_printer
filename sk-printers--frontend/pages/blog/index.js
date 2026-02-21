import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { FaClock, FaUser, FaTag, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'packaging-tips', name: 'Packaging Tips' },
    { id: 'industry-news', name: 'Industry News' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'guides', name: 'Guides' },
    { id: 'company-news', name: 'Company News' },
  ];

  // Sample blog data (replace with API call)
  const sampleBlogs = [
    {
      _id: '1',
      title: 'Top 10 Packaging Tips for E-commerce Businesses',
      slug: 'top-10-packaging-tips-ecommerce',
      excerpt: 'Learn how to choose the right packaging for your e-commerce products and reduce shipping costs.',
      category: 'packaging-tips',
      featuredImage: { url: '/images/blog1.jpg', alt: 'Packaging tips' },
      author: { name: 'SK Printers Team' },
      readTime: 5,
      publishedAt: new Date('2024-02-10'),
      tags: ['e-commerce', 'packaging', 'tips'],
    },
    {
      _id: '2',
      title: 'How to Choose Between 3-Ply, 5-Ply, and 7-Ply Boxes',
      slug: 'choose-3ply-5ply-7ply-boxes',
      excerpt: 'A comprehensive guide to understanding the differences and choosing the right box strength for your products.',
      category: 'guides',
      featuredImage: { url: '/images/blog2.jpg', alt: 'Box comparison' },
      author: { name: 'Technical Team' },
      readTime: 8,
      publishedAt: new Date('2024-02-08'),
      tags: ['guide', 'corrugated boxes', 'packaging'],
    },
    {
      _id: '3',
      title: 'Sustainable Packaging: Why It Matters in 2024',
      slug: 'sustainable-packaging-2024',
      excerpt: 'Discover the environmental impact of packaging and how choosing eco-friendly options benefits your business.',
      category: 'sustainability',
      featuredImage: { url: '/images/blog3.jpg', alt: 'Sustainable packaging' },
      author: { name: 'SK Printers Team' },
      readTime: 6,
      publishedAt: new Date('2024-02-05'),
      tags: ['sustainability', 'eco-friendly', 'environment'],
    },
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setBlogs(sampleBlogs);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setBlogs(sampleBlogs);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <Head>
        <title>Blog - SK Printers | Packaging Tips & Industry News</title>
        <meta name="description" content="Read our blog for packaging tips, industry news, sustainability insights, and guides on corrugated boxes." />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black mb-4">Our Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Insights, tips, and news about packaging and corrugated boxes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 shadow-sm">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="loading-spinner w-12 h-12 border-4 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No articles found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-2xl transition-shadow group"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaTag size={48} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                      {categories.find(c => c.id === blog.category)?.name || blog.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      {blog.author.name}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      {blog.readTime} min read
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center"
                  >
                    Read More →
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-gray-600 mb-8">Subscribe to our newsletter for packaging tips and industry insights</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
