import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { FaIndustry, FaLeaf, FaCertificate, FaTruck, FaUsers, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '50K+', label: 'Boxes Delivered' },
    { value: '48hrs', label: 'Delivery Time' },
    { value: '99.8%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: '100% recyclable materials and eco-friendly manufacturing processes',
    },
    {
      icon: <FaCertificate />,
      title: 'Quality Assurance',
      description: 'ISO 2045 certified with rigorous quality control at every step',
    },
    {
      icon: <FaTruck />,
      title: 'Timely Delivery',
      description: 'Guaranteed 48-hour delivery to major cities across India',
    },
    {
      icon: <FaUsers />,
      title: 'Customer First',
      description: 'Dedicated support team and customized solutions for every need',
    },
  ];

  const milestones = [
    { year: '2024', title: 'Company Founded', description: 'SK Printers was established with a vision to revolutionize packaging industry in India' },
    { year: '2024', title: 'ISO Certification', description: 'Achieved ISO 2045 certification for quality management within first year' },
    { year: '2024', title: '500+ Clients', description: 'Rapidly reached milestone of serving 500+ businesses across India' },
    { year: '2025', title: 'Expansion Plans', description: 'Planning to expand manufacturing capacity by 50% and enter new markets' },
  ];

  return (
    <Layout>
      <Head>
        <title>About Us - SK Printers | Leading Packaging Solutions Provider</title>
        <meta name="description" content="Learn about SK Printers - your trusted partner for eco-friendly corrugated packaging solutions since 2024. ISO certified quality." />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black mb-4">About SK Printers</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Manufacturing Excellence in Sustainable Packaging Solutions Since 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in <strong>2024</strong>, SK Printers was born from a simple yet powerful vision: to provide businesses with 
                  high-quality, sustainable packaging solutions that don't compromise on strength or reliability.
                </p>
                <p>
                  Starting as a modern manufacturing unit with cutting-edge technology, we've quickly grown into one of India's 
                  trusted names in corrugated packaging. Our commitment to quality, innovation, and customer satisfaction has 
                  helped us serve over 500+ businesses across various industries in our very first year.
                </p>
                <p>
                  Today, we manufacture 3-ply, 5-ply, and 7-ply corrugated boxes with state-of-the-art machinery 
                  and a dedicated team of professionals. Every box we produce carries our promise of quality, 
                  sustainability, and timely delivery.
                </p>
                <p className="font-semibold text-primary-600 text-lg">
                  We're not just making boxes - we're building partnerships and protecting what matters to your business.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg">
                    <div className="text-4xl font-black text-primary-600 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-2xl transition-shadow"
              >
                <div className="text-5xl text-primary-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-6 last:border-0">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose SK Printers?</h2>
            <p className="text-xl text-gray-600">What makes us different</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-2xl transition-shadow">
              <FaIndustry className="text-5xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Advanced Manufacturing</h3>
              <p className="text-gray-600">
                State-of-the-art machinery and modern production facilities ensure consistent quality
              </p>
            </div>
            <div className="card hover:shadow-2xl transition-shadow">
              <FaAward className="text-5xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Certified Quality</h3>
              <p className="text-gray-600">
                ISO 2045 certified processes with stringent quality checks at every stage
              </p>
            </div>
            <div className="card hover:shadow-2xl transition-shadow">
              <FaUsers className="text-5xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Experienced professionals dedicated to delivering the best packaging solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join 500+ businesses who trust SK Printers for their packaging needs
          </p>
          <a href="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-4 inline-block">
            Get Started Today
          </a>
        </div>
      </section>
    </Layout>
  );
}
