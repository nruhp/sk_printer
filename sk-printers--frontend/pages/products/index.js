import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { FaBox, FaCheckCircle, FaRuler, FaWeight, FaIndustry } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: '3-Ply Corrugated Boxes',
      category: '3-ply',
      description: 'Perfect for lightweight items and e-commerce shipping',
      image: '/images/3ply-box.jpg',
      specifications: {
        burstStrength: '180-200 kPa',
        edgeCrush: '3.5 kN/m',
        weight: '5-10 kg capacity',
        thickness: '2-3 mm'
      },
      features: [
        'Lightweight and cost-effective',
        'Ideal for e-commerce packaging',
        'Recyclable and eco-friendly',
        'Quick delivery available'
      ],
      applications: [
        'E-commerce shipping',
        'Retail packaging',
        'Light products',
        'Gift boxes'
      ],
      pricing: {
        basePrice: 15,
        minQuantity: 100
      }
    },
    {
      id: 2,
      name: '5-Ply Corrugated Boxes',
      category: '5-ply',
      description: 'Ideal for medium-weight products and retail packaging',
      image: '/images/5ply-box.jpg',
      specifications: {
        burstStrength: '200-250 kPa',
        edgeCrush: '5.5 kN/m',
        weight: '10-20 kg capacity',
        thickness: '5-6 mm'
      },
      features: [
        'Medium strength protection',
        'Versatile usage',
        'Excellent stacking strength',
        'Custom printing available'
      ],
      applications: [
        'Electronics packaging',
        'Retail products',
        'Food packaging',
        'Export shipping'
      ],
      pricing: {
        basePrice: 25,
        minQuantity: 100
      }
    },
    {
      id: 3,
      name: '7-Ply Corrugated Boxes',
      category: '7-ply',
      description: 'Heavy-duty boxes for industrial and export shipping',
      image: '/images/7ply-box.jpg',
      specifications: {
        burstStrength: '250-300 kPa',
        edgeCrush: '7.5 kN/m',
        weight: '20-30 kg capacity',
        thickness: '8-10 mm'
      },
      features: [
        'Maximum strength and durability',
        'Heavy-duty protection',
        'Export quality',
        'Weather resistant'
      ],
      applications: [
        'Industrial products',
        'Heavy machinery parts',
        'Export containers',
        'Bulk storage'
      ],
      pricing: {
        basePrice: 40,
        minQuantity: 50
      }
    },
    {
      id: 4,
      name: 'Custom Printed Boxes',
      category: 'custom',
      description: 'Fully customizable boxes with your brand design',
      image: '/images/custom-box.jpg',
      specifications: {
        burstStrength: 'As per requirement',
        edgeCrush: 'Customizable',
        weight: 'Custom capacity',
        thickness: 'Variable'
      },
      features: [
        'Full color printing',
        'Custom sizes available',
        'Brand logo printing',
        'Multiple finish options'
      ],
      applications: [
        'Branded packaging',
        'Product launches',
        'Marketing campaigns',
        'Premium products'
      ],
      pricing: {
        basePrice: 30,
        minQuantity: 200
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: '3-ply', name: '3-Ply Boxes' },
    { id: '5-ply', name: '5-Ply Boxes' },
    { id: '7-ply', name: '7-Ply Boxes' },
    { id: 'custom', name: 'Custom Boxes' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <Head>
        <title>Our Products - SK Printers | Corrugated Box Manufacturing</title>
        <meta name="description" content="Browse our range of 3-ply, 5-ply, and 7-ply corrugated boxes. Custom printing available. ISO certified quality." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black mb-4">Our Products</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Premium quality corrugated boxes for all your packaging needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
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

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-2xl transition-shadow"
              >
                {/* Product Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                  <FaBox size={80} className="text-gray-400" />
                </div>

                {/* Product Info */}
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-sm mb-3 text-gray-700">Technical Specifications:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Burst Strength:</span>
                      <div className="font-semibold">{product.specifications.burstStrength}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Edge Crush:</span>
                      <div className="font-semibold">{product.specifications.edgeCrush}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Weight Capacity:</span>
                      <div className="font-semibold">{product.specifications.weight}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Thickness:</span>
                      <div className="font-semibold">{product.specifications.thickness}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2 text-gray-700">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications */}
                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-2 text-gray-700">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, i) => (
                      <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{product.pricing.basePrice}/unit
                    </div>
                    <div className="text-xs text-gray-500">Min. {product.pricing.minQuantity} units</div>
                  </div>
                  <Link href="/get-quote" className="btn btn-primary">
                    Get Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Products?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl text-primary-600 mb-4">
                <FaIndustry className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">ISO Certified Quality</h3>
              <p className="text-gray-600">
                All our products meet ISO 2045 standards for quality assurance
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl text-primary-600 mb-4">
                <FaRuler className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Sizes</h3>
              <p className="text-gray-600">
                We manufacture boxes in any size according to your requirements
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl text-primary-600 mb-4">
                <FaWeight className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bulk Discounts</h3>
              <p className="text-gray-600">
                Special pricing for large orders with fast delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a custom quote for your packaging needs. Fast delivery guaranteed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4">
              Request Quote
            </Link>
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
