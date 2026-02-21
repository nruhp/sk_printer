import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaBox, FaLeaf, FaTruck, FaCertificate, FaIndustry,
  FaCheckCircle, FaStar, FaQuoteLeft, FaArrowRight
} from 'react-icons/fa';
import Layout from '../components/layout/Layout';


export default function Home() {
  const stats = [
    { icon: <FaBox />, value: '50K+', label: 'Boxes Delivered', color: 'bg-blue-500' },
    { icon: <FaIndustry />, value: '500+', label: 'Business Clients', color: 'bg-green-500' },
    { icon: <FaTruck />, value: '48hrs', label: 'Delivery Time', color: 'bg-orange-500' },
    { icon: <FaStar />, value: '99.8%', label: 'Quality Standards', color: 'bg-purple-500' },
  ];

  const features = [
    {
      icon: <FaLeaf />,
      title: '100% Eco-Friendly',
      description: 'Made from recyclable materials with sustainable practices'
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: '48-hour guaranteed delivery across major cities'
    },
    {
      icon: <FaCertificate />,
      title: 'ISO Certified',
      description: 'ISO 2045 compliant quality assurance'
    },
  ];

  const products = [
    {
      title: '3-Ply Corrugated Boxes',
      description: 'Perfect for lightweight items and e-commerce shipping',
      features: ['Burst strength: 180-200', 'Weight capacity: 5-10kg', 'Cost-effective'],
      image: '/images/3ply-box.jpg'
    },
    {
      title: '5-Ply Corrugated Boxes',
      description: 'Ideal for medium-weight products and retail packaging',
      features: ['Burst strength: 200-250', 'Weight capacity: 10-20kg', 'Versatile use'],
      image: '/images/5ply-box.jpg'
    },
    {
      title: '7-Ply Corrugated Boxes',
      description: 'Heavy-duty boxes for industrial and export shipping',
      features: ['Burst strength: 250-300', 'Weight capacity: 20-30kg', 'Maximum protection'],
      image: '/images/7ply-box.jpg'
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'E-Commerce Solutions Ltd',
      text: 'SK Printers has been our packaging partner for 3 years. Their quality is unmatched and delivery is always on time.',
      rating: 5,
      image: '/images/testimonial-1.jpg'
    },
    {
      name: 'Priya Sharma',
      company: 'Fashion E-commerce Brand',
      text: 'The custom printed boxes helped elevate our brand image. Highly professional service!',
      rating: 5,
      image: '/images/testimonial-2.jpg'
    },
    {
      name: 'Amit Patel',
      company: 'Electronics Distributor',
      text: 'Excellent packaging quality for our sensitive electronics. Zero damage rate!',
      rating: 5,
      image: '/images/testimonial-3.jpg'
    },
  ];

  return (
    <Layout>
      <Head>
        <title>SK Printers - Manufacturing Sustainable Packaging Solutions</title>
        <meta name="description" content="Leading manufacturer of eco-friendly cardboard boxes. 3-ply, 5-ply, 7-ply corrugated packaging with custom printing. ISO certified with 48-hour delivery." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Manufacturing the Future of <span className="text-yellow-300">Sustainable Packaging</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                ISO 2045 Compliant • FSC Certified • 100% Recyclable • Serving 500+ Companies
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <span className="text-sm font-semibold">On-Time Delivery</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <span className="text-sm font-semibold">48-Hour Service</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4 text-center">
                  Get Instant Quote
                </a>
                <Link href="/products" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4 text-center">
                    View Products
                  </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl">
                    <div className="text-4xl font-black text-yellow-300">{stat.value}</div>
                    <div className="text-sm mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-2xl transition-shadow"
              >
                <div className="text-5xl text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">Choose the perfect packaging solution for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card group hover:scale-105 transition-transform"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  <FaBox size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/products" className="btn btn-outline w-full group-hover:bg-primary-600 group-hover:text-white">
                    Learn More
                  </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by 500+ businesses across India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card"
              >
                <FaQuoteLeft className="text-4xl text-primary-200 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join 500+ businesses who trust SK Printers for their packaging needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4">
                Request a Quote
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
