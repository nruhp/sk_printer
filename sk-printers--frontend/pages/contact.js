import Head from 'next/head';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/common/ContactForm';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact Us - SK Printers | Get in Touch</title>
        <meta name="description" content="Contact SK Printers for custom packaging solutions. Call, email, or visit us. We're here to help!" />
      </Head>

      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-xl">We're here to help with all your packaging needs</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? Fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-gray-600">+91 98765-43210</p>
                    <p className="text-gray-600">+91 98765-43211</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-600">info@skprinters.com</p>
                    <p className="text-gray-600">sales@skprinters.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Industrial Area, Phase 2<br />
                      Manufacturing Hub<br />
                      Tamil Nadu, India - 632001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Facility</h2>
          <p className="text-gray-600 mb-8">Come see our state-of-the-art manufacturing process</p>
          <div className="bg-gray-300 h-96 rounded-xl flex items-center justify-center">
            <p className="text-gray-600">Google Maps Integration (Add your location)</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
