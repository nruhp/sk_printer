import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBox, 
  FaLeaf, 
  FaTruck, 
  FaCertificate, 
  FaIndustry,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import PriceCalculator from '../components/home/PriceCalculator';
import ContactForm from '../components/common/ContactForm';

export default function Home() {
  const [stats] = useState({
    clients: '50K+',
    boxes: '500+',
    delivery: '48hrs',
    satisfaction: '99.8%'
  });

  return (
    <Layout>
      <Head>
        <title>SK Printers - Manufacturing Sustainable Packaging Solutions</title>
        <meta name="description" content="Leading manufacturer of eco-friendly cardboard boxes. 3-ply, 5-ply, 7-ply corrugated packaging with custom printing. ISO certified with 48-hour delivery." />
        <meta name="keywords" content="cardboard boxes, corrugated boxes, packaging, 3-ply boxes, 5-ply boxes, custom packaging, sustainable packaging" />
        <meta property="og:title" content="SK Printers - Sustainable Packaging Solutions" />
        <meta property="og:description" content="Premium quality cardboard boxes for all industries" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yoursite.com" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Manufacturing the Future of <span className="text-yellow-300">Sustainable Packaging</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
                ISO 2045 Compliant • FSC 3485 Certified • Made with 100% Recyclable Material • Serving 500+ Companies
              </p>
              
              <div className="flex gap-4 items-center mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <span className="text-sm font-semibold">100% On-Time Delivery</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <span className="text-sm font-semibold">48-Hour Quick Service</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#calculator">
                  <a className="btn btn-primary bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4">
                    Get Instant Quote
                  </a>
                </Link>
                <Link href="#products">
                  <a className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4">
                    Request Free Sample
                  </a>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-4xl font-black text-yellow-300">{stats.clients}</div>
                      <div className="text-sm mt-2">Satisfied Clients</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-4xl font-black text-yellow-300">{stats.boxes}</div>
                      <div className="text-sm mt-2">Box Designs</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-4xl font-black text-yellow-300">{stats.delivery}</div>
                      <div className="text-sm mt-2">Delivery Time</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl">
                      <div className="text-4xl font-black text-yellow-300">{stats.satisfaction}</div>
                      <div className="text-sm mt-2">Quality Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding -mt-16 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard 
              icon={<FaBox />} 
              value="50K+" 
              label="Boxes Delivered"
              color="bg-blue-500"
            />
            <StatCard 
              icon={<FaIndustry />} 
              value="500+" 
              label="Business Clients"
              color="bg-green-500"
            />
            <StatCard 
              icon={<FaTruck />} 
              value="48hrs" 
              label="Delivery Time"
              color="bg-orange-500"
            />
            <StatCard 
              icon={<FaStar />} 
              value="99.8%" 
              label="Quality Standards"
              color="bg-purple-500"
            />
          </div>
        </div>
      </section>

      {/* To be continued in next part... */}
    </Layout>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="card text-center"
    >
      <div className={`${color} w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}
