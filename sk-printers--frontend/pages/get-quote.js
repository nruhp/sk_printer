import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { FaBox, FaRuler, FaPalette, FaEnvelope, FaPhone, FaUser, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function GetQuote() {
  const [formData, setFormData] = useState({
    // Customer Info
    name: '',
    email: '',
    phone: '',
    company: '',
    // Box Requirements
    boxType: '3-ply',
    length: '',
    width: '',
    height: '',
    quantity: '',
    printingRequired: 'no',
    colors: '1',
    // Additional Details
    useCase: '',
    specialRequirements: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const quoteData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
        boxRequirements: {
          type: formData.boxType,
          dimensions: {
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            height: parseFloat(formData.height),
            unit: 'inch',
          },
          quantity: parseInt(formData.quantity),
          printingRequired: formData.printingRequired === 'yes',
          colors: formData.colors,
        },
        additionalDetails: {
          useCase: formData.useCase,
          specialRequirements: formData.specialRequirements,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quotes`,
        quoteData
      );

      if (response.data.success) {
        toast.success('Quote request submitted successfully! We\'ll contact you within 24 hours.');
        // Reset form
        setFormData({
          name: '', email: '', phone: '', company: '',
          boxType: '3-ply', length: '', width: '', height: '',
          quantity: '', printingRequired: 'no', colors: '1',
          useCase: '', specialRequirements: '',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Get Quote - SK Printers | Custom Packaging Solutions</title>
        <meta name="description" content="Request a custom quote for corrugated boxes. Fast response within 24 hours. Free samples available." />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black mb-4">Get Custom Quote</h1>
          <p className="text-xl">Fill out the form below and we'll get back to you within 24 hours</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaUser className="mr-3 text-primary-600" />
                Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="label">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>
            </div>

            {/* Box Requirements */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaBox className="mr-3 text-primary-600" />
                Box Requirements
              </h2>
              
              <div className="space-y-6">
                {/* Box Type */}
                <div>
                  <label className="label">Box Type *</label>
                  <select
                    name="boxType"
                    value={formData.boxType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="3-ply">3-Ply Corrugated</option>
                    <option value="5-ply">5-Ply Corrugated</option>
                    <option value="7-ply">7-Ply Corrugated</option>
                    <option value="custom">Custom Requirements</option>
                  </select>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="label">
                    <FaRuler className="inline mr-2" />
                    Dimensions (inches) *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="input-field"
                        placeholder="Length"
                      />
                      <p className="text-xs text-gray-500 mt-1">Length</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="input-field"
                        placeholder="Width"
                      />
                      <p className="text-xs text-gray-500 mt-1">Width</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="input-field"
                        placeholder="Height"
                      />
                      <p className="text-xs text-gray-500 mt-1">Height</p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="label">Quantity (units) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="100"
                    className="input-field"
                    placeholder="500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum order: 100 units</p>
                </div>

                {/* Printing */}
                <div>
                  <label className="label">
                    <FaPalette className="inline mr-2" />
                    Custom Printing Required? *
                  </label>
                  <select
                    name="printingRequired"
                    value={formData.printingRequired}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="no">No Printing (Plain Boxes)</option>
                    <option value="yes">Yes, Custom Printing</option>
                  </select>
                </div>

                {/* Number of Colors (if printing) */}
                {formData.printingRequired === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="label">Number of Colors</label>
                    <select
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="1">1 Color</option>
                      <option value="2">2 Colors</option>
                      <option value="3">3 Colors</option>
                      <option value="4">4 Colors (Full Color)</option>
                    </select>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Additional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="label">What will you use these boxes for?</label>
                  <input
                    type="text"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="E.g., E-commerce shipping, Product packaging, Storage"
                  />
                </div>

                <div>
                  <label className="label">Special Requirements or Notes</label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Any special requirements, urgent delivery needs, or other details..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-lg px-12 py-4"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner w-5 h-5 border-2 mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="inline mr-2" />
                    Submit Quote Request
                  </>
                )}
              </button>
              <p className="text-sm text-gray-600 mt-4">
                We'll respond within 24 hours with a detailed quotation
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-8">Need Immediate Assistance?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="card">
              <FaPhone className="text-4xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:+919876543210" className="text-primary-600 hover:underline">
                +91 98765-43210
              </a>
            </div>
            <div className="card">
              <FaEnvelope className="text-4xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:sales@skprinters.com" className="text-primary-600 hover:underline">
                sales@skprinters.com
              </a>
            </div>
            <div className="card">
              <FaBuilding className="text-4xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">Mon-Sat: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
